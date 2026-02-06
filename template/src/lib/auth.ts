import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const ALLOWED_USERS = process.env.ALLOWED_USERS
  ? process.env.ALLOWED_USERS.split(",")
  : [];

export const { handlers, auth, signIn, signOut } = NextAuth({
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
});
