import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// ────────────────────────────────────────────────────────────
// 다른 Provider 추가 방법
// ────────────────────────────────────────────────────────────
//
// 1. Provider import:
//    import Google from "next-auth/providers/google";
//    import Kakao  from "next-auth/providers/kakao";
//    import Naver  from "next-auth/providers/naver";
//    import Credentials from "next-auth/providers/credentials";
//
// 2. providers 배열에 추가:
//    providers: [
//      GitHub({ ... }),                          // ← 기존
//      Google({                                  // ← 추가
//        clientId: process.env.GOOGLE_CLIENT_ID!,
//        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//      }),
//      Kakao({
//        clientId: process.env.KAKAO_CLIENT_ID!,
//        clientSecret: process.env.KAKAO_CLIENT_SECRET!,
//      }),
//      Naver({
//        clientId: process.env.NAVER_CLIENT_ID!,
//        clientSecret: process.env.NAVER_CLIENT_SECRET!,
//      }),
//    ]
//
// 3. .env.local에 해당 Provider의 Client ID/Secret 추가
//
// 4. GitHub만 쓰지 않을 경우 isAuthConfigured 조건도 수정할 것
//
// Provider 전체 목록: https://authjs.dev/getting-started/providers
// ────────────────────────────────────────────────────────────

const ALLOWED_USERS = process.env.ALLOWED_USERS
  ? process.env.ALLOWED_USERS.split(",")
  : [];

// AUTH_SECRET + Provider 키가 모두 있어야 인증 활성화
// 환경변수가 없으면 에러 없이 인증 비활성화 상태로 동작
const isAuthConfigured = !!(
  process.env.AUTH_SECRET &&
  process.env.GITHUB_CLIENT_ID &&
  process.env.GITHUB_CLIENT_SECRET
);

const { handlers, auth, signIn, signOut } = isAuthConfigured
  ? NextAuth({
      session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
      },
      providers: [
        GitHub({
          clientId: process.env.GITHUB_CLIENT_ID!,
          clientSecret: process.env.GITHUB_CLIENT_SECRET!,
          authorization: {
            params: {
              scope: "read:user user:email",
            },
          },
        }),
        // 여기에 다른 Provider 추가
      ],
      callbacks: {
        async signIn({ profile }) {
          if (ALLOWED_USERS.length === 0) return true;
          const githubUsername = (profile as { login?: string })?.login || "";
          return ALLOWED_USERS.includes(githubUsername);
        },
        async jwt({ token, account, profile }) {
          if (account && profile) {
            token.accessToken = account.access_token;
            token.githubUsername = (profile as { login?: string })?.login;
          }
          return token;
        },
        async session({ session, token }) {
          session.accessToken = token.accessToken;
          session.user.githubUsername = token.githubUsername;
          return session;
        },
      },
    })
  : {
      handlers: {
        GET: () => Response.json({ message: "Auth not configured" }),
        POST: () => Response.json({ message: "Auth not configured" }),
      },
      auth: () => Promise.resolve(null),
      signIn: () => Promise.resolve(),
      signOut: () => Promise.resolve(),
    };

export { handlers, auth, signIn, signOut };
