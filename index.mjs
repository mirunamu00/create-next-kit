#!/usr/bin/env node

import { existsSync, cpSync, readFileSync, writeFileSync, renameSync } from "node:fs";
import { resolve, join, basename } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// ── 색상 헬퍼 ───────────────────────────────
const bold = (t) => `\x1b[1m${t}\x1b[0m`;
const green = (t) => `\x1b[32m${t}\x1b[0m`;
const cyan = (t) => `\x1b[36m${t}\x1b[0m`;
const red = (t) => `\x1b[31m${t}\x1b[0m`;
const dim = (t) => `\x1b[2m${t}\x1b[0m`;

// ── 인자 파싱 ───────────────────────────────
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
  ${bold("@mirunamu/create-next-kit")} - Next.js 스타터킷으로 새 프로젝트 생성

  ${bold("사용법:")}
    npx @mirunamu/create-next-kit ${cyan("<project-name>")}

  ${bold("예시:")}
    npx @mirunamu/create-next-kit my-app
    npx @mirunamu/create-next-kit .          ${dim("(현재 디렉토리에 생성)")}

  ${bold("옵션:")}
    --help, -h     도움말 표시
    --version, -v  버전 표시
`);
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  const pkg = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf-8"));
  console.log(pkg.version);
  process.exit(0);
}

const projectName = args[0];

if (!projectName) {
  console.error(red("✖ 프로젝트 이름을 입력해주세요."));
  console.log(`\n  ${dim("사용법:")} npx @mirunamu/create-next-kit ${cyan("<project-name>")}\n`);
  process.exit(1);
}

// ── 대상 경로 결정 ───────────────────────────
const targetDir = resolve(process.cwd(), projectName);
const isCurrentDir = projectName === ".";
const displayName = basename(targetDir);

if (!isCurrentDir && existsSync(targetDir)) {
  console.error(red(`✖ "${projectName}" 디렉토리가 이미 존재합니다.`));
  process.exit(1);
}

// ── 템플릿 복사 ──────────────────────────────
const templateDir = join(__dirname, "template");

if (!existsSync(templateDir)) {
  console.error(red("✖ template 디렉토리를 찾을 수 없습니다."));
  process.exit(1);
}

console.log();
console.log(bold(`  @mirunamu/next-kit 프로젝트를 생성합니다...`));
console.log();

// template/ → targetDir 전체 복사
cpSync(templateDir, targetDir, { recursive: true });

// dotfiles 복원: _gitignore → .gitignore 등
// npm publish 시 .gitignore가 제외되므로 _접두사로 우회
const dotfileMap = [
  "_gitignore",
  "_prettierignore",
  "_prettierrc.json",
  "_nvmrc",
  "_env.example",
];

for (const name of dotfileMap) {
  const src = join(targetDir, name);
  if (existsSync(src)) {
    renameSync(src, join(targetDir, name.replace(/^_/, ".")));
  }
}

// ── package.json 이름 치환 ───────────────────
const pkgPath = join(targetDir, "package.json");
if (existsSync(pkgPath)) {
  let pkgContent = readFileSync(pkgPath, "utf-8");
  const pkg = JSON.parse(pkgContent);
  pkg.name = displayName;
  pkg.version = "0.1.0";
  delete pkg.private; // 사용자가 필요하면 직접 설정
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
}

// ── npm install ──────────────────────────────
console.log(dim("  📦 의존성을 설치합니다... (시간이 좀 걸릴 수 있습니다)"));
console.log();

try {
  execSync("npm install", {
    cwd: targetDir,
    stdio: "inherit",
  });
} catch {
  console.log();
  console.log(red("  ⚠ npm install에 실패했습니다. 직접 실행해주세요:"));
  console.log(dim(`    cd ${projectName} && npm install`));
  console.log();
}

// ── 완료 메시지 ──────────────────────────────
console.log();
console.log(green("  ✔ 프로젝트가 생성되었습니다!"));
console.log();
console.log(`  ${bold("시작하기:")}`);
if (!isCurrentDir) {
  console.log(cyan(`    cd ${projectName}`));
}
console.log(cyan("    npm run dev"));
console.log();
console.log(`  ${bold("유용한 명령어:")}`);
console.log(dim("    npm run build        프로덕션 빌드"));
console.log(dim("    npm run lint         ESLint 검사"));
console.log(dim("    npm run type-check   타입 체크"));
console.log(dim("    npm run test         유닛 테스트 (Vitest)"));
console.log(dim("    npm run test:e2e     E2E 테스트 (Playwright)"));
console.log(dim("    npm run format       Prettier 포맷"));
console.log();
