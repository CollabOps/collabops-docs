---
sidebar_position: 1
title: 저장소 생성 및 브랜치 정책
description: Git 저장소 관리와 브랜치 전략 설정
---

# 저장소 생성 및 브랜치 정책

효율적인 코드 관리를 위한 Git 저장소 설정과 브랜치 전략을 알아보겠습니다.

## 📁 저장소 생성 및 설정

### 새 저장소 생성
1. **Repository** → **New Repository** 클릭
2. 저장소 정보 입력:
   ```
   Repository Name: my-awesome-project
   Description: 우리 팀의 핵심 프로젝트
   Visibility: Private/Public 선택
   ```
3. 초기 설정:
   - **README.md** 자동 생성
   - **.gitignore** 템플릿 선택
   - **라이선스** 선택 (오픈소스인 경우)

### 기존 저장소 연동
```bash
# GitHub 연동 예시
git remote add origin https://github.com/username/repo.git
git branch -M main
git push -u origin main

# GitLab 연동 예시  
git remote add origin https://gitlab.com/username/repo.git
git push -u origin main

# Bitbucket 연동 예시
git remote add origin https://bitbucket.org/username/repo.git
git push -u origin main
```

### 저장소 설정 최적화
```bash
# Git 설정 최적화
git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global rebase.autoStash true
git config --global push.default simple

# CollabOps 연동 설정
git config --local collabops.workspace "your-workspace"
git config --local collabops.project "project-id"
```

## 🌿 브랜치 전략

### Git Flow 전략
```mermaid
gitgraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Dev 1"
    branch feature/login
    checkout feature/login
    commit id: "Login work"
    checkout develop
    merge feature/login
    branch release/v1.0
    checkout release/v1.0
    commit id: "Release prep"
    checkout main
    merge release/v1.0
    tag: "v1.0"
    checkout develop
    merge main
```

**브랜치 구조:**
- **main**: 프로덕션 배포용
- **develop**: 개발 통합 브랜치
- **feature/**: 기능 개발 브랜치
- **release/**: 릴리스 준비 브랜치
- **hotfix/**: 긴급 수정 브랜치

**적용 시나리오:**
- 정기적인 릴리스 사이클
- 대규모 팀 (10명+)
- 안정성이 중요한 프로젝트

### GitHub Flow 전략
```mermaid
gitgraph
    commit id: "Initial"
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Auth logic"
    commit id: "Tests added"
    checkout main
    merge feature/user-auth
    commit id: "Deploy"
```

**브랜치 구조:**
- **main**: 항상 배포 가능한 상태
- **feature/**: 모든 작업 브랜치

**적용 시나리오:**
- 지속적 배포
- 소규모 팀 (2-10명)
- 빠른 반복 개발

### GitLab Flow 전략
```mermaid
gitgraph
    commit id: "Initial"
    branch production
    checkout main
    commit id: "Feature 1"
    branch pre-production
    checkout pre-production
    merge main
    commit id: "QA Testing"
    checkout production
    merge pre-production
    tag: "v1.0"
```

**브랜치 구조:**
- **main**: 개발 완료 브랜치
- **pre-production**: 스테이징 환경
- **production**: 프로덕션 환경

**적용 시나리오:**
- 단계별 배포 환경
- 엄격한 QA 프로세스
- 엔터프라이즈 환경

## 🔒 브랜치 보호 규칙

### 메인 브랜치 보호
```yaml
main_branch_protection:
  require_pull_request: true
  required_reviews: 2
  dismiss_stale_reviews: true
  require_code_owner_reviews: true
  
  status_checks:
    strict: true
    required_checks:
      - "CI/CD Pipeline"
      - "Code Quality Check"
      - "Security Scan"
  
  restrictions:
    push_allowances: []  # 직접 푸시 금지
    merge_allowances: ["admin"]
    
  enforce_admins: true
  allow_force_pushes: false
  allow_deletions: false
```

### 개발 브랜치 보호
```yaml
develop_branch_protection:
  require_pull_request: true
  required_reviews: 1
  dismiss_stale_reviews: false
  
  status_checks:
    strict: false
    required_checks:
      - "Unit Tests"
      - "Lint Check"
  
  allow_force_pushes: false
  allow_deletions: false
```

### 브랜치 네이밍 규칙
```yaml
branch_naming_rules:
  feature_branches:
    pattern: "feature/*"
    description: "새로운 기능 개발"
    examples:
      - "feature/user-authentication"
      - "feature/payment-integration"
  
  bugfix_branches:
    pattern: "bugfix/*"
    description: "버그 수정"
    examples:
      - "bugfix/login-error"
      - "bugfix/memory-leak"
  
  hotfix_branches:
    pattern: "hotfix/*"
    description: "긴급 수정"
    examples:
      - "hotfix/security-patch"
      - "hotfix/critical-bug"
  
  release_branches:
    pattern: "release/*"
    description: "릴리스 준비"
    examples:
      - "release/v1.2.0"
      - "release/2024-q1"
```

## 🚀 브랜치 자동화

### 자동 브랜치 생성
```javascript
// 이슈 기반 브랜치 자동 생성
const createBranchFromIssue = (issue) => {
  const branchName = `${issue.type}/${issue.id}-${issue.title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')}`;
  
  // 예시 결과: "feature/123-user-login-page"
  return git.createBranch(branchName, 'develop');
};
```

### 자동 머지 규칙
```yaml
auto_merge_conditions:
  feature_to_develop:
    required_checks: ["tests", "lint"]
    required_reviews: 1
    auto_merge: true
    
  develop_to_main:
    required_checks: ["full-test-suite", "security-scan"]
    required_reviews: 2
    auto_merge: false  # 수동 승인 필요
    
  hotfix_to_main:
    required_checks: ["critical-tests"]
    required_reviews: 1
    auto_merge: true
    emergency_override: true
```

### 브랜치 정리 자동화
```yaml
branch_cleanup:
  auto_delete_merged:
    enabled: true
    exclude_branches: ["main", "develop", "staging"]
    grace_period: 7  # 7일 후 삭제
  
  stale_branch_detection:
    enabled: true
    inactive_days: 30
    notify_author: true
    actions:
      - label: "stale"
      - comment: "이 브랜치는 30일간 비활성 상태입니다."
```

## 📋 브랜치 워크플로우

### 기능 개발 워크플로우
```bash
# 1. 최신 develop 브랜치로 업데이트
git checkout develop
git pull origin develop

# 2. 새 기능 브랜치 생성
git checkout -b feature/user-profile

# 3. 개발 작업 및 커밋
git add .
git commit -m "feat: 사용자 프로필 페이지 추가

- 프로필 조회/수정 UI 구현
- 이미지 업로드 기능 추가
- 유효성 검증 로직 구현

Closes #123"

# 4. 리모트에 푸시
git push origin feature/user-profile

# 5. Pull Request 생성
# (CollabOps에서 자동으로 이슈와 연결)

# 6. 코드 리뷰 후 머지
# 7. 로컬 브랜치 정리
git checkout develop
git pull origin develop
git branch -d feature/user-profile
```

### 핫픽스 워크플로우
```bash
# 1. main 브랜치에서 핫픽스 브랜치 생성
git checkout main
git pull origin main
git checkout -b hotfix/security-patch

# 2. 긴급 수정 작업
git add .
git commit -m "fix: 보안 취약점 긴급 패치

- XSS 취약점 수정
- 입력값 검증 강화

Fixes #456"

# 3. main과 develop 모두에 머지 필요
git push origin hotfix/security-patch

# 4. main 브랜치로 Pull Request 생성
# 5. develop 브랜치로도 별도 PR 생성 (충돌 해결)
```

## 🔍 브랜치 모니터링

### 브랜치 현황 대시보드
```markdown
활성 브랜치 현황:
📈 총 브랜치: 23개
🔥 활성 브랜치: 8개 (30일 내 커밋)
💤 비활성 브랜치: 15개

타입별 분포:
- feature/*: 12개
- bugfix/*: 4개  
- hotfix/*: 1개
- release/*: 1개
- 기타: 5개

위험 요소:
⚠️ 3개월 이상 비활성: 8개 브랜치
⚠️ main과 100+ 커밋 차이: 2개 브랜치
⚠️ 충돌 가능성 높음: 1개 브랜치
```

### 브랜치 건강도 체크
```yaml
branch_health_metrics:
  freshness:
    - last_commit_days: 계산식(현재 - 마지막 커밋일)
    - behind_main_commits: main 브랜치 대비 뒤처진 커밋 수
  
  quality:
    - test_coverage: 테스트 커버리지 비율
    - lint_issues: 코드 품질 이슈 수
    - security_vulnerabilities: 보안 취약점 수
  
  collaboration:
    - contributors_count: 기여자 수
    - review_participation: 리뷰 참여도
    - merge_conflicts: 머지 충돌 빈도
```

## 🎯 브랜치 전략 선택 가이드

### 팀 규모별 권장사항
| 팀 크기 | 권장 전략 | 브랜치 수 | 복잡도 |
|---------|-----------|-----------|--------|
| 1-3명 | GitHub Flow | 최소 | 낮음 |
| 4-10명 | GitHub Flow + Staging | 중간 | 중간 |
| 11-30명 | GitLab Flow | 중간 | 중간 |
| 30명+ | Git Flow | 많음 | 높음 |

### 프로젝트 성격별 권장사항
```yaml
웹_애플리케이션:
  배포_주기: 지속적 (주 1-2회)
  권장_전략: GitHub Flow
  핵심_브랜치: [main, staging(optional)]

모바일_앱:
  배포_주기: 정기적 (월 1-2회) 
  권장_전략: Git Flow
  핵심_브랜치: [main, develop, release]

엔터프라이즈_소프트웨어:
  배포_주기: 계획적 (분기별)
  권장_전략: Git Flow + 환경별 브랜치
  핵심_브랜치: [main, develop, staging, production]

오픈소스_프로젝트:
  배포_주기: 버전 기반
  권장_전략: GitHub Flow + Fork
  핵심_브랜치: [main, feature branches from forks]
```

## 🛠️ 고급 브랜치 관리

### 브랜치 템플릿
```bash
# 브랜치 생성 시 자동으로 적용되는 템플릿
# .collabops/branch-templates/feature.md
## 기능 개발 체크리스트
- [ ] 이슈 링크 확인
- [ ] 테스트 케이스 작성
- [ ] 문서 업데이트
- [ ] 코드 리뷰 요청
- [ ] CI/CD 파이프라인 통과

## 머지 전 확인사항
- [ ] 모든 테스트 통과
- [ ] 코드 리뷰 승인
- [ ] 충돌 해결 완료
- [ ] 기능 동작 검증
```

### 브랜치 정책 시뮬레이션
```javascript
// 브랜치 정책 테스트 도구
const simulateBranchPolicy = (action, branch, user) => {
  const policies = getBranchPolicies(branch);
  
  return policies.map(policy => ({
    rule: policy.name,
    passed: policy.check(action, branch, user),
    message: policy.message
  }));
};

// 사용 예시
const result = simulateBranchPolicy(
  'push', 
  'main', 
  { role: 'developer', reviews: 1 }
);
console.log(result);
// [{ rule: 'require_reviews', passed: false, message: '2개 이상의 리뷰 필요' }]
```

---

**다음 단계**: [Pull Request 관리](/usage/git-engine/pull-request-management) 