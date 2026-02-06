# Contributing

## Commit Convention

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/ko/) 규칙을 따릅니다.
`commitlint + husky`가 설정되어 있어, 규칙에 맞지 않는 커밋은 자동으로 거부됩니다.

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

- `type`과 `subject`는 **필수**, 나머지는 선택입니다.
- `subject`는 소문자로 시작하며 마침표를 붙이지 않습니다.

### Type 목록

| Type | 설명 | 버전 변경 | CHANGELOG |
|---|---|---|---|
| `feat` | 새로운 기능 추가 | **minor** (1.x.0) | Features |
| `fix` | 버그 수정 | **patch** (1.0.x) | Bug Fixes |
| `docs` | 문서 변경 (README 등) | patch | Documentation |
| `style` | 코드 포맷팅, 세미콜론 등 (동작 변경 없음) | - | 숨김 |
| `refactor` | 리팩토링 (기능/버그 변경 없음) | patch | Refactoring |
| `perf` | 성능 개선 | patch | Performance |
| `test` | 테스트 추가/수정 | - | 숨김 |
| `chore` | 빌드, 패키지 매니저, 기타 잡무 | patch | Miscellaneous |
| `ci` | CI/CD 설정 변경 | - | 숨김 |

### Breaking Change

하위 호환이 깨지는 변경은 **major** 버전이 올라갑니다 (x.0.0).

두 가지 방법으로 표시할 수 있습니다:

```bash
# 방법 1: type 뒤에 ! 추가
feat!: drop Node 18 support

# 방법 2: footer에 BREAKING CHANGE 명시
feat: rewrite CLI with new API

BREAKING CHANGE: --output flag is now required
```

### Scope (선택)

변경 범위를 괄호 안에 명시할 수 있습니다:

```bash
feat(cli): add --dry-run flag
fix(template): missing .gitignore in generated project
docs(readme): add authentication section
```

### 예시

```bash
# 새 기능
feat: add interactive project name prompt
feat(cli): support --typescript flag

# 버그 수정
fix: dotfile rename failing on Windows
fix(template): missing postcss.config.mjs

# 문서
docs: update Quick Start section
docs(readme): add contributing guide

# 리팩토링
refactor: extract color helpers to utils
refactor(cli): simplify argument parsing

# 잡무
chore: update dependencies
chore(deps): bump framer-motion to v13

# Breaking Change
feat!: require Node.js >= 20
```

---

## Release 프로세스

이 프로젝트는 [release-please](https://github.com/googleapis/release-please)로 버전 관리가 자동화되어 있습니다.

### 흐름

```
커밋 push (main)
    ↓
release-please가 커밋 분석
    ↓
Release PR 자동 생성/업데이트
  - package.json 버전 bump
  - CHANGELOG.md 자동 작성
    ↓
Release PR merge
    ↓
GitHub Release 생성 + npm publish 자동 실행
```

### 버전 결정 규칙

| 커밋 내용 | 버전 변경 | 예시 |
|---|---|---|
| `fix:` 만 포함 | patch | 1.0.2 → 1.0.3 |
| `feat:` 포함 | minor | 1.0.2 → 1.1.0 |
| `BREAKING CHANGE` 포함 | major | 1.0.2 → 2.0.0 |

여러 커밋이 쌓여 있으면 **가장 높은 변경 수준**이 적용됩니다.
예: `fix` 3개 + `feat` 1개 → minor 버전 bump.
