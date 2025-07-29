---
sidebar_position: 3
title: 커밋 히스토리 보기
description: 코드 변경 이력 추적과 분석
---

# 커밋 히스토리 보기

코드 변경 이력을 체계적으로 추적하고 분석하여 프로젝트의 발전 과정을 이해할 수 있습니다.

## 📊 히스토리 시각화

### 브랜치 그래프 보기
```mermaid
gitgraph
    commit id: "Initial commit"
    commit id: "Add user model"
    branch feature/auth
    checkout feature/auth
    commit id: "Add login logic"
    commit id: "Add validation"
    checkout main
    commit id: "Update README"
    merge feature/auth
    commit id: "Release v1.0"
```

### 커밋 타임라인
```markdown
📅 2024-01-15
├── 09:30 🔧 fix: 로그인 버그 수정 (Alice)
├── 10:15 ✨ feat: 사용자 프로필 추가 (Bob)  
├── 14:20 📝 docs: API 문서 업데이트 (Charlie)
└── 16:45 🚀 deploy: v1.2.0 배포 (DevOps)

📅 2024-01-14
├── 11:00 🐛 fix: 메모리 누수 해결 (Alice)
├── 15:30 ⚡ perf: 쿼리 최적화 (Bob)
└── 17:10 🧪 test: 유닛 테스트 추가 (Charlie)
```

## 🔍 고급 검색 및 필터링

### 다양한 검색 조건
```bash
# 작성자별 검색
git log --author="Alice"

# 날짜 범위 검색  
git log --since="2024-01-01" --until="2024-01-31"

# 파일별 변경 이력
git log --follow -- src/components/Login.tsx

# 메시지 내용 검색
git log --grep="fix\|bug"

# 코드 내용 검색 (pickaxe)
git log -S "function loginUser"

# 정규식으로 검색
git log --grep="feat.*auth" --extended-regexp
```

### CollabOps 고급 필터
```yaml
히스토리_필터:
  작성자: ["Alice", "Bob", "Charlie"]
  날짜_범위: "2024-01-01 ~ 2024-01-31"
  파일_패턴: "*.tsx, *.ts"
  커밋_타입: ["feat", "fix", "docs"]
  이슈_연결: "#123, #124"
  브랜치: ["main", "develop"]
  라벨: ["frontend", "backend"]
```

## 📝 커밋 메시지 분석

### 커밋 메시지 규칙
```yaml
규칙:
  형식: "<type>(<scope>): <subject>"
  타입:
    - feat: 새로운 기능
    - fix: 버그 수정
    - docs: 문서 변경
    - style: 코드 스타일 (포매팅, 세미콜론 등)
    - refactor: 리팩토링
    - test: 테스트 추가/수정
    - chore: 빌드, 도구 설정 등
  
  예시:
    - "feat(auth): 소셜 로그인 추가"
    - "fix(api): 사용자 데이터 검증 오류 수정"
    - "docs(readme): 설치 가이드 업데이트"
```

### 커밋 품질 분석
```markdown
📊 커밋 품질 지표:

📏 메시지 길이:
- 제목: 평균 45자 (권장: 50자 이하)
- 본문: 평균 120자 (권장: 72자 개행)

🏷️ 타입 분포:
- feat: 40% (기능 개발)
- fix: 25% (버그 수정)  
- refactor: 15% (리팩토링)
- docs: 10% (문서)
- test: 6% (테스트)
- style: 4% (스타일)

🔗 이슈 연결률: 85% (목표: 90%+)
```

## 🎯 변경 영향도 분석

### 파일 변경 빈도
```markdown
🔥 핫스팟 분석 (최근 3개월):

1. src/components/UserProfile.tsx (47회 변경)
   - 주요 기여자: Alice (60%), Bob (30%)
   - 변경 이유: 기능 추가 (70%), 버그 수정 (30%)

2. src/api/auth.ts (32회 변경)  
   - 주요 기여자: Charlie (80%), Alice (20%)
   - 변경 이유: 보안 강화 (50%), 기능 개선 (50%)

3. docs/api.md (28회 변경)
   - 주요 기여자: Bob (90%), Charlie (10%)
   - 변경 이유: 문서 업데이트 (100%)
```

### 코드 영향도 매트릭스
```yaml
영향도_분석:
  높은_위험:
    - "src/core/": 시스템 핵심 (변경 시 광범위 영향)
    - "src/auth/": 보안 관련 (신중한 검토 필요)
  
  중간_위험:
    - "src/components/": UI 컴포넌트 (화면 영향)
    - "src/utils/": 유틸리티 (다수 모듈에서 사용)
  
  낮은_위험:
    - "docs/": 문서 (코드 영향 없음)
    - "tests/": 테스트 (기능 영향 최소)
```

## 📈 개발자 기여도 분석

### 팀원별 기여 통계
```markdown
👥 팀 기여도 (최근 1개월):

Alice (Frontend Lead):
  - 커밋: 45개 (35%)
  - 추가 라인: 2,850
  - 삭제 라인: 1,200
  - 주요 영역: Components, UI/UX
  - 평균 커밋 크기: 89 라인

Bob (Backend Lead):
  - 커밋: 38개 (30%)  
  - 추가 라인: 3,200
  - 삭제 라인: 890
  - 주요 영역: API, Database
  - 평균 커밋 크기: 108 라인

Charlie (Full-stack):
  - 커밋: 35개 (27%)
  - 추가 라인: 1,950
  - 삭제 라인: 1,100
  - 주요 영역: Auth, Documentation
  - 평균 커밋 크기: 82 라인
```

### 협업 패턴 분석
```yaml
협업_지표:
  페어_프로그래밍:
    - Alice + Bob: 12회 (공동 커밋)
    - Bob + Charlie: 8회
    - Alice + Charlie: 5회
  
  코드_리뷰_참여:
    - Alice: 리뷰 23회, 승인 18회
    - Bob: 리뷰 28회, 승인 22회  
    - Charlie: 리뷰 31회, 승인 25회
  
  멘토링_활동:
    - Senior → Junior 지식 전수: 15건
    - 코드 품질 개선 제안: 23건
```

## 🔄 릴리스 히스토리 추적

### 버전별 변경사항
```markdown
📦 릴리스 히스토리:

🚀 v1.3.0 (2024-01-15)
├── ✨ 새로운 기능 (8개)
│   ├── 사용자 프로필 업로드
│   ├── 다크 모드 지원
│   └── 실시간 알림
├── 🐛 버그 수정 (12개)
│   ├── 로그인 세션 만료 이슈
│   └── 파일 업로드 오류
└── 🔧 개선사항 (5개)
    ├── 성능 최적화
    └── UI/UX 개선

🚀 v1.2.1 (2024-01-08) - 핫픽스
├── 🚨 긴급 수정 (2개)
│   ├── 보안 취약점 패치
│   └── 결제 시스템 오류 수정
```

### 마일스톤 진행률
```yaml
마일스톤_추적:
  Q1_2024_목표:
    전체_진행률: 75%
    완료_기능:
      - 사용자 관리 시스템 ✅
      - API v2 개발 ✅
      - 모바일 반응형 ✅
    진행중_기능:
      - 결제 시스템 (80%)
      - 관리자 대시보드 (60%)
    대기_기능:
      - 다국어 지원
      - 고급 분석 기능
```

## 🛠️ 히스토리 관리 도구

### 커밋 수정 및 정리
```bash
# 최근 커밋 메시지 수정
git commit --amend -m "새로운 커밋 메시지"

# 여러 커밋 대화형 rebase
git rebase -i HEAD~3

# 커밋 스쿼시 (여러 커밋을 하나로)
git rebase -i HEAD~3
# pick → squash로 변경

# 커밋 분할
git rebase -i HEAD~2
# pick → edit으로 변경
git reset HEAD^
git add file1
git commit -m "첫 번째 변경"
git add file2  
git commit -m "두 번째 변경"
git rebase --continue
```

### 히스토리 분석 자동화
```javascript
// 커밋 패턴 분석 스크립트
const analyzeCommits = async (dateRange) => {
  const commits = await git.log(dateRange);
  
  return {
    typeDistribution: analyzeCommitTypes(commits),
    authorStats: analyzeAuthors(commits),
    fileHotspots: analyzeFileChanges(commits),
    qualityScore: calculateQualityScore(commits)
  };
};

// 품질 점수 계산
const calculateQualityScore = (commits) => {
  const scores = commits.map(commit => ({
    messageQuality: scoreMessage(commit.message),
    issueLinked: commit.message.includes('#') ? 10 : 0,
    size: commit.changes < 100 ? 10 : 5,
    testIncluded: commit.files.some(f => f.includes('test')) ? 10 : 0
  }));
  
  return scores.reduce((avg, score) => avg + score.total, 0) / scores.length;
};
```

## 📊 히스토리 리포팅

### 주간 개발 리포트
```markdown
📈 주간 개발 리포트 (2024-01-08 ~ 2024-01-14):

🚀 생산성 지표:
- 총 커밋: 28개 (+12% vs 지난주)
- 코드 라인: +1,245 / -456
- PR 머지: 8개
- 이슈 해결: 12개

🏆 팀 하이라이트:
- Alice: 새로운 UI 컴포넌트 라이브러리 완성
- Bob: API 응답 시간 30% 개선
- Charlie: 테스트 커버리지 85% 달성

⚠️ 주의사항:
- 핫픽스 필요한 버그 2건 발견
- 성능 이슈 1건 모니터링 중
- 코드 리뷰 대기 시간 증가 (평균 4시간)

🎯 다음 주 목표:
- 결제 모듈 통합 테스트 완료
- 모바일 앱 베타 버전 출시
- 문서화 80% 완성
```

### 월간 품질 리포트
```yaml
코드_품질_트렌드:
  테스트_커버리지:
    현재: 82%
    목표: 85%
    추세: ↗️ +3% (지난달 대비)
  
  코드_복잡도:
    평균: 6.2 (양호)
    최대: 12.8 (리팩토링 필요)
    추세: ↘️ -0.5 (개선)
  
  버그_밀도:
    버그/KLOC: 2.1
    목표: < 2.0
    추세: ↘️ -0.3 (개선)
```

---

**다음 단계**: [AI 어시스턴트 - 코드 리뷰 자동화](/usage/ai-assistant/code-review-automation) 