<p align="center">
  <h1 align="center">@mirunamu/create-next-kit</h1>
</p>

<p align="center">
  Production-ready Next.js starter kit — one command away.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mirunamu/create-next-kit"><img src="https://img.shields.io/npm/v/@mirunamu/create-next-kit.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@mirunamu/create-next-kit"><img src="https://img.shields.io/npm/dm/@mirunamu/create-next-kit.svg" alt="npm downloads" /></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="node version" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license" />
</p>

---

## Overview

`@mirunamu/create-next-kit`은 **Next.js 16 기반의 엔터프라이즈급 프론트엔드 스타터킷**입니다.

프레임워크 설정, UI 컴포넌트, 인증, 테스트, 린팅, 포맷팅까지 — 프로덕션에 필요한 모든 인프라가 사전 구성되어 있어, 비즈니스 로직에만 집중할 수 있습니다.

## Quick Start

```bash
npx @mirunamu/create-next-kit my-app
cd my-app
npm run dev
```

현재 디렉토리에 바로 생성:

```bash
mkdir my-app && cd my-app
npx @mirunamu/create-next-kit .
```

## Tech Stack

| Category | Stack | Version |
|---|---|---|
| **Framework** | Next.js (App Router, Turbopack) | 16 |
| **Language** | TypeScript (strict mode) | 5.9 |
| **Runtime** | React | 19 |
| **Styling** | Tailwind CSS | v4 |
| **UI Components** | shadcn/ui (New York style) | latest |
| **Animation** | Framer Motion + GSAP | 12 / 3 |
| **Auth** | NextAuth.js (GitHub OAuth, JWT) | v5 beta |
| **Theme** | next-themes (System / Light / Dark) | 0.4 |
| **Date** | Day.js (Korean locale, relativeTime) | 1.11 |
| **Linting** | ESLint 9 (Flat Config) + Prettier | 9 / 3 |
| **Unit Test** | Vitest + React Testing Library | 4 / 16 |
| **E2E Test** | Playwright (Chrome + Mobile) | 1.58 |
| **Coverage** | @vitest/coverage-v8 (60% threshold) | 4 |

---

## Project Structure

```
my-app/
├── e2e/                          # Playwright E2E 테스트
│   ├── home.spec.ts
│   └── not-found.spec.ts
├── public/
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/route.ts
│   │   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx              # Home page
│   │   ├── loading.tsx           # Skeleton loading UI
│   │   ├── not-found.tsx         # 404 page
│   │   ├── error.tsx             # Error boundary
│   │   ├── global-error.tsx      # Root error boundary
│   │   └── globals.css           # Tailwind v4 + CSS variables
│   ├── components/
│   │   ├── animations/           # 6 motion components
│   │   ├── effects/              # 12 visual effect components
│   │   ├── ui/                   # 13 shadcn/ui components
│   │   ├── providers.tsx         # SessionProvider wrapper
│   │   └── theme-provider.tsx    # Theme wrapper
│   ├── hooks/
│   │   └── use-mobile.tsx        # useIsMobile, useIsMounted
│   ├── lib/
│   │   ├── auth.ts               # NextAuth config
│   │   ├── date.ts               # Day.js utilities
│   │   ├── logger.ts             # Environment-aware logger
│   │   ├── site-config.ts        # Site metadata
│   │   └── utils.ts              # cn() helper
│   └── types/
│       └── next-auth.d.ts        # Auth type augmentation
├── eslint.config.mjs
├── next.config.ts
├── playwright.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── vitest.setup.ts
```

---

## Features

### UI Components (shadcn/ui)

13개의 프로덕션 레디 컴포넌트가 포함되어 있습니다. Radix UI 기반으로 접근성(a11y)이 보장됩니다.

| Component | Description |
|---|---|
| Button | 6 variants (default, destructive, outline, secondary, ghost, link) + 4 sizes |
| Card | Header, Content, Footer 구조 |
| Dialog | 모달 다이얼로그 |
| Dropdown Menu | 컨텍스트 메뉴, 서브메뉴 지원 |
| Sheet | 슬라이드 패널 (top, right, bottom, left) |
| Select | 커스텀 셀렉트 드롭다운 |
| Input | 텍스트 인풋 |
| Label | 폼 라벨 |
| Tooltip | 호버 툴팁 |
| Badge | 상태 뱃지 |
| Separator | 구분선 |
| Skeleton | 로딩 플레이스홀더 |
| Sonner | 토스트 알림 |

### Animation Components

| Component | Description |
|---|---|
| `AnimatedCounter` | 숫자 카운트업 애니메이션 |
| `BlurText` | 블러에서 선명하게 등장 |
| `FadeContent` | 페이드인/아웃 |
| `ScrollReveal` | 스크롤 위치에 따른 등장 |
| `SplitText` | 글자 단위 순차 애니메이션 |
| `StaggerList` | 리스트 아이템 순차 등장 |

### Visual Effects

| Component | Description |
|---|---|
| `Aurora` | 오로라 그라데이션 배경 |
| `ClickSpark` | 클릭 시 스파크 파티클 |
| `FloatingParticles` | 떠다니는 파티클 |
| `GradientBlur` | 그라데이션 블러 배경 |
| `GradientCursor` | 커서 따라다니는 그라데이션 |
| `GridPattern` | 그리드 패턴 배경 |
| `Magnetic` | 마우스에 끌리는 자석 효과 |
| `OrbitingIcons` | 아이콘 궤도 회전 |
| `SpotlightCard` | 마우스 추적 스포트라이트 |
| `Squares` | 사각형 패턴 애니메이션 |
| `TechMarquee` | 기술 스택 마키 스크롤 |
| `TiltCard` | 3D 틸트 + 글레어 효과 |

### Utilities

| Utility | Path | Description |
|---|---|---|
| `cn()` | `lib/utils.ts` | clsx + tailwind-merge 기반 클래스 병합 |
| `logger` | `lib/logger.ts` | 환경별 로깅 (production에서 debug 비활성화) |
| `date` | `lib/date.ts` | `formatDate`, `timeAgo`, `diffDays`, `isToday`, `isPast` 등 8개 함수 |
| `site-config` | `lib/site-config.ts` | 사이트명, URL, 작성자 정보 중앙 관리 |

### Authentication

NextAuth v5 기반 인증이 사전 구성되어 있습니다.

- **Provider**: GitHub OAuth
- **Strategy**: JWT (24h 만료)
- **Access Control**: `ALLOWED_USERS` 환경변수로 허용 유저 제한 가능
- **Type Safety**: `next-auth.d.ts`로 세션 타입 확장

```env
# .env.example
AUTH_SECRET=your-secret
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
ALLOWED_USERS=user1,user2
```

### Theme

`next-themes` 기반 다크모드가 내장되어 있습니다.

- System / Light / Dark 자동 감지
- CSS 변수 기반 (class strategy)
- 전환 시 깜빡임 방지 (`disableTransitionOnChange`)

### Error Handling

모든 에러 시나리오에 대한 페이지가 준비되어 있습니다.

| File | Purpose |
|---|---|
| `not-found.tsx` | 404 — "Go Home" 링크 포함 |
| `error.tsx` | Route 단위 에러 바운더리 — "Try Again" 버튼 |
| `global-error.tsx` | Root 레벨 에러 바운더리 (html/body 포함) |
| `loading.tsx` | Skeleton 기반 로딩 UI |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | 개발 서버 시작 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 시작 |
| `npm run lint` | ESLint 검사 |
| `npm run type-check` | TypeScript 타입 검사 (`tsc --noEmit`) |
| `npm run format` | Prettier 코드 포맷 |
| `npm run format:check` | 포맷 위반 확인 (CI용) |
| `npm run test` | Vitest watch 모드 |
| `npm run test:run` | Vitest 단일 실행 |
| `npm run test:ui` | Vitest UI 대시보드 |
| `npm run test:coverage` | 커버리지 리포트 (v8, 60% threshold) |
| `npm run test:e2e` | Playwright E2E (Desktop Chrome + Pixel 7) |
| `npm run test:e2e:ui` | Playwright UI 모드 |

---

## Testing

### Unit / Component Tests

[Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)로 구성됩니다.

```bash
npm run test          # watch 모드
npm run test:run      # 단일 실행
npm run test:coverage # 커버리지 (v8)
```

테스트 파일은 대상 파일 옆 `__tests__/` 디렉토리에 colocate 합니다:

```
src/lib/utils.ts
src/lib/__tests__/utils.test.ts
```

**포함된 예제 테스트:**
- `utils.test.ts` — `cn()` 클래스 병합 검증 (7 tests)
- `date.test.ts` — 날짜 유틸리티 전체 검증 (14 tests)
- `use-mobile.test.tsx` — 훅 테스트 with renderHook (8 tests)
- `button.test.tsx` — 컴포넌트 variants, sizes, events (15 tests)

### E2E Tests

[Playwright](https://playwright.dev/)로 실제 브라우저 환경에서 테스트합니다.

```bash
npm run test:e2e      # headless 실행
npm run test:e2e:ui   # UI 모드 (디버깅)
```

**Targets**: Desktop Chrome, Pixel 7 (mobile)

**포함된 예제 테스트:**
- `home.spec.ts` — 메인 페이지 렌더링 검증 (5 tests)
- `not-found.spec.ts` — 404 페이지 및 네비게이션 (3 tests)

---

## Configuration

| File | Purpose |
|---|---|
| `next.config.ts` | Next.js 설정 (reactStrictMode, Turbopack) |
| `tailwind.config.ts` | Tailwind CSS v4 + shadcn/ui 테마 |
| `tsconfig.json` | TypeScript strict + `@/*` path alias |
| `eslint.config.mjs` | ESLint 9 Flat Config (next + core-web-vitals + typescript) |
| `.prettierrc.json` | Prettier + tailwindcss 플러그인 (printWidth: 100) |
| `vitest.config.ts` | Vitest (jsdom, coverage v8, path alias) |
| `playwright.config.ts` | Playwright (Chrome + Pixel 7, webServer 자동 시작) |
| `components.json` | shadcn/ui CLI 설정 (New York style) |
| `.nvmrc` | Node.js 버전 고정 (22.21.1) |

---

## CLI Options

```bash
npx @mirunamu/create-next-kit <project-name>

Options:
  --help, -h       도움말 표시
  --version, -v    버전 표시
```

| Argument | Description |
|---|---|
| `my-app` | 새 디렉토리 `my-app/`에 프로젝트 생성 |
| `.` | 현재 디렉토리에 프로젝트 생성 |

---

## Requirements

- **Node.js** >= 18
- **npm** >= 9

---

## License

[MIT](LICENSE)
