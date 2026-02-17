# Windows 전환 정책 (MSI v1.x -> MSIX v2 최신)

## 핵심 결론
- MSI 설치본은 MSIX로 직접 인플레이스 업데이트되지 않습니다.
- 따라서 `v1.x` 사용자 전환은 `v1`의 마지막 브리지 릴리스에서 수행하고, 전환 완료 후부터 `v2.x`(MSIX) 업데이트 체인을 탑니다.
- 현재 기준 첫 전환 타깃은 `v2.0.8`이며, 운영 원칙은 항상 "v2 최신 빌드"입니다.

## 버전별 로직 탑재 지점

1. MSI 브리지 로직 탑재
- 탑재 버전: `MSI v1.(마지막)`
- 역할:
  - Store의 `MSIX v2 최신` 설치 유도/트리거
  - 전환 안내 표시(앱 재시작/새 버전 실행 안내)

2. MSIX 설치 대상 버전
- 대상: 고정 `2.0.0`이 아니라 배포 시점의 최신 `v2.x`
- 현재 예시: `v2.0.8` (첫 빌드 후보)

3. 데이터 마이그레이션 단계
- 없음 (적용하지 않음)

4. 대체 필수 단계: MCP 설정 전환 안내 (Mac/Windows 공통)
- 적용 버전: `v1.(마지막)` 안내 + `v2.x` 첫 실행 보호 안내
- 안내 내용:
  - V1에서 사용하던 SSE MCP 서버 엔트리 삭제
  - V2 방식으로 서버 재등록
- 즉, V1 -> V2의 핵심 변경점은 데이터가 아니라 MCP config 변경입니다.

5. MSI 제거 및 이후 업데이트 체인
- `v1.(마지막)` 또는 `v2.x`에서 구버전(MSI) 제거 유도/처리
- 전환 완료 후: Windows는 Store/MSIX 업데이트 경로로 지속 업데이트

## 릴리스 노트 권장 문구

### v1.(마지막) (Windows 브리지 릴리스)
- "Windows 사용자는 이번 버전 이후 Microsoft Store의 v2 최신 MSIX로 전환됩니다."
- "V2부터 MCP(SSE) 설정이 변경되어, 기존 MCP 서버를 삭제 후 다시 등록해야 합니다. (Mac/Windows 공통)"

### v2.x (첫 Store 공개: 예 `v2.0.8`)
- "V1 설정과 호환되지 않습니다. 기존 SSE MCP 서버를 삭제하고 V2 방식으로 재등록하세요."

## 참고 문서 (Microsoft 공식)

1. 전환 가이드 (EXE/MSI -> Store 패키지 앱)  
https://learn.microsoft.com/en-us/windows/apps/distribute-through-store/how-to-transition-users-from-your-web-unpackaged-app-to-store-packaged-app

2. MSIX 업데이트 제약 (같은 Package Family 내 업데이트)  
https://learn.microsoft.com/en-us/windows/msix/app-package-updates

3. 패키지 아이덴티티 (Name/Publisher 등)  
https://learn.microsoft.com/en-us/windows/apps/desktop/modernize/package-identity-overview

4. Store Product Identity 값 확인 (manifest에 넣어야 할 값)  
https://learn.microsoft.com/en-us/windows/apps/publish/view-app-identity-details

5. MSIX 서명 개요  
https://learn.microsoft.com/en-us/windows/msix/package/signing-package-overview
