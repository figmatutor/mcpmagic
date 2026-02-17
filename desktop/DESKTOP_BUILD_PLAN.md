# Manual GitHub Actions Workflow for MAS/MSIX Builds (Remote Clone Only)

## Summary
- GitHub Actions는 수동 실행(`workflow_dispatch`)만 사용한다.
- 빌드는 항상 원격 `https://github.com/grab/TalkToFigmaDesktop`를 클론하여 수행한다.
- 로컬 `/Users/jude.park/Sites/kotlin/TalkToFigmaDesktop`는 구조/설정 참고용으로만 사용한다.
- `electron-forge make`로 MAS는 `pkg`, Windows는 `msix` 두 종류만 생성한다.
- 수동 실행 시에도 GitHub Release에 아티팩트를 업로드한다(항상 업로드).
- 버전/태그는 클론된 TalkToFigmaDesktop의 `package.json` version을 그대로 사용한다. (예: `v1.2.3`)

## 1) GitHub Actions Workflow 상세 스펙
**파일**: `.github/workflows/build.yml`

**Workflow Diagram**
```text
workflow_dispatch
  |
  |--> build-mas (macos-latest)
  |       |
  |       +-- checkout mcpmagic
  |       +-- setup node
  |       +-- decode certs/profiles
  |       +-- clone TalkToFigmaDesktop
  |       +-- patch package.json + forge.config.ts
  |       +-- copy branding assets
  |       +-- npm ci
  |       +-- forge make --targets=pkg --platform=mas
  |       +-- upload artifacts
  |       +-- upload release (v{version})
  |
  |--> build-msix (windows-latest)
          |
          +-- checkout mcpmagic
          +-- setup node
          +-- (no signing) use MSIX metadata only
          +-- clone TalkToFigmaDesktop
          +-- patch package.json + forge.config.ts
          +-- copy branding assets
          +-- npm ci
          +-- forge make --targets=msix
          +-- upload artifacts
          +-- upload release (v{version})
```

**트리거**
- `workflow_dispatch` (자동 트리거 없음)

**Inputs**
- 없음 (항상 MAS + MSIX 빌드 및 Release 업로드)

**Job: build-mas (macos-latest)**
- 단계:
  1. `actions/checkout` (mcpmagic)
  2. `actions/setup-node`
  3. Apple 인증서/프로비저닝 프로파일 Base64 디코딩 → 키체인 등록
  4. 원격 클론 → 브랜딩/메타데이터 패치 → `electron-forge make --targets=pkg --platform=mas`
  5. `actions/upload-artifact` → `artifacts/**`
  6. `softprops/action-gh-release` → `v{TalkToFigmaDesktop version}`에 업로드

**Job: build-msix (windows-latest)**
- 단계:
  1. `actions/checkout` (mcpmagic)
  2. `actions/setup-node`
  3. 원격 클론 → 브랜딩/메타데이터 패치 → `electron-forge make --targets=msix`
  4. `actions/upload-artifact` → `artifacts/**`
  5. `softprops/action-gh-release` → `v{TalkToFigmaDesktop version}`에 업로드

**Secrets**
- macOS (현재 mcpmagic 기준):
  - `APPLE_ID`, `APPLE_PASSWORD`, `APPLE_TEAM_ID`
  - `SIGNING_IDENTITY_APPSTORE`
  - `INSTALLER_IDENTITY`
  - `SIGNING_CERTIFICATE_BASE64`, `SIGNING_CERTIFICATE_PASSWORD`
  - `INSTALLER_CERTIFICATE_BASE64`, `PROVISIONING_PROFILE_BASE64`
- MSIX Metadata (준비 필요):
  - `MSIX_IDENTITY_NAME`, `MSIX_PUBLISHER`, `MSIX_PUBLISHER_DISPLAY_NAME`, `MSIX_PACKAGE_NAME`

## 2) 빌드 로직 (Workflow 내부에서 직접 처리)
- 스크립트(`build.mjs`)는 제거하고, 워크플로우에서 아래를 직접 수행한다.
  1. 임시 디렉터리 정리 후 원격 클론
  2. `package.json`과 `forge.config.ts`에 브랜딩/번들ID 반영
  3. 아이콘 등 브랜딩 자산 복사
  4. `npm ci`
  5. MAS: `electron-forge make --targets=pkg --platform=mas` (PLATFORM=mas)
  6. MSIX: `electron-forge make --targets=msix` (PLATFORM=msstore)
  7. `artifacts/`로 산출물 및 버전 파일 복사
  8. 임시 디렉터리 정리

**버전 관리**
- `TalkToFigmaDesktop/package.json`의 `version`을 그대로 유지.
- GitHub Release 태그는 `v${version}` 포맷으로 자동 생성.
- MAS/ MSIX 빌드 번호는 `version + buildNumber`로 구성한다.
  - 예: `2.0.7` + buildNumber `1` → `2.0.7.1`
  - buildNumber는 GitHub Actions의 `run_attempt` 값을 사용한다.
  - 동적 관리: 동일한 `workflow_dispatch` 재시도 시 `run_attempt`가 증가하므로 자동 증분된다.

## 3) 브랜딩/메타데이터 구조
- `desktop/branding/metadata.json` (version 없음)
- `desktop/branding/`에 `icon.icns`, `icon.ico`, `icon.png`, `icon.iconset/` 복사
- `desktop/.env` 및 `desktop/.env.template` 제공

## Test Scenarios
- GitHub Actions 수동 실행 (항상 MAS + MSIX 빌드 및 Release 업로드)

## Local Test (개발/검증용)
- 로컬 테스트는 생략하고 CI에서만 검증한다.

## Assumptions / Defaults
- `TalkToFigmaDesktop`는 항상 `main`을 원격 클론한다.
- 로컬 `/Users/jude.park/Sites/kotlin/TalkToFigmaDesktop`는 구조 참고용이다.
- 자동 트리거는 사용하지 않는다.
- 릴리즈 업로드는 항상 수행한다.
- `forge.config.ts`는 클론된 파일을 패치하여 사용한다.
