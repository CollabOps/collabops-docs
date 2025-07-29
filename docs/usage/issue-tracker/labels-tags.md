---
sidebar_position: 3
title: 라벨, 태그 설정
description: 효율적인 이슈 분류를 위한 라벨과 태그 시스템
---

# 라벨, 태그 설정

체계적인 라벨과 태그 시스템으로 이슈를 효율적으로 분류하고 관리할 수 있습니다.

## 🏷️ 기본 라벨 시스템

### 타입별 라벨
```yaml
bug:
  color: "#d73a49"
  description: "버그 및 오류"
  
feature:
  color: "#0366d6"
  description: "새로운 기능"
  
enhancement:
  color: "#28a745"
  description: "기존 기능 개선"
  
documentation:
  color: "#6f42c1"
  description: "문서 관련"
  
task:
  color: "#e99695"
  description: "일반 작업"
```

### 우선순위 라벨
```yaml
priority-critical:
  color: "#b60205"
  description: "즉시 처리 필요"
  
priority-high:
  color: "#d93f0b"  
  description: "높은 우선순위"
  
priority-medium:
  color: "#fbca04"
  description: "보통 우선순위"
  
priority-low:
  color: "#0e8a16"
  description: "낮은 우선순위"
```

### 컴포넌트별 라벨
```yaml
frontend:
  color: "#1d76db"
  description: "프론트엔드 관련"
  
backend:
  color: "#0e8a16"  
  description: "백엔드 관련"
  
api:
  color: "#5319e7"
  description: "API 관련"
  
database:
  color: "#b60205"
  description: "데이터베이스 관련"
  
mobile:
  color: "#0366d6"
  description: "모바일 관련"
  
infrastructure:
  color: "#795548"
  description: "인프라 관련"
```

### 상태 라벨
```yaml
status-review:
  color: "#fbca04"
  description: "리뷰 대기 중"
  
status-blocked:
  color: "#d93f0b"
  description: "다른 작업에 의해 차단됨"
  
status-wontfix:
  color: "#6a737d"
  description: "수정하지 않음"
  
status-duplicate:
  color: "#cfd3d7"
  description: "중복 이슈"
```

## 🎨 라벨 설계 원칙

### 색상 코딩 전략

#### 의미 기반 색상
- **빨간색 계열**: 긴급, 버그, 차단
- **파란색 계열**: 기능, 개선, 정보
- **초록색 계열**: 완료, 승인, 안전
- **노란색 계열**: 주의, 대기, 검토
- **보라색 계열**: 문서, 설계, 아키텍처
- **회색 계열**: 비활성, 취소, 중복

#### 계층적 색상 시스템
```css
/* 우선순위 - 빨간색 계열 */
critical: #b60205  /* 진한 빨강 */
high:     #d93f0b  /* 주황 */
medium:   #fbca04  /* 노랑 */
low:      #0e8a16  /* 초록 */

/* 타입 - 파란색 계열 */
bug:      #d73a49  /* 빨강 (예외) */
feature:  #0366d6  /* 파랑 */
enhance:  #28a745  /* 초록 */
task:     #6f42c1  /* 보라 */
```

### 라벨 네이밍 규칙

#### 일관된 접두사 사용
```yaml
# 좋은 예
type: bug
type: feature  
type: enhancement

priority: critical
priority: high
priority: medium

area: frontend
area: backend
area: mobile

# 나쁜 예
bug           # 접두사 없음
high-priority # 하이픈 위치 불일치
front-end     # 일관성 없는 표기
```

#### 명확한 설명 작성
```yaml
good-examples:
  - name: "security"
    description: "보안 취약점 및 보안 관련 이슈"
  - name: "performance"  
    description: "성능 개선 및 최적화 관련"
  - name: "accessibility"
    description: "접근성 개선 관련"

bad-examples:
  - name: "misc"        # 너무 모호함
  - name: "stuff"       # 의미 불분명
  - name: "urgent"      # priority 라벨과 중복
```

## 🔄 자동 라벨링

### 파일 경로 기반 자동 라벨링
```yaml
# .collabops/labeler.yml
area: frontend:
  - "src/components/**/*"
  - "src/pages/**/*"
  - "public/**/*"

area: backend:
  - "server/**/*"
  - "api/**/*"
  - "database/**/*"

area: mobile:
  - "mobile/**/*"
  - "android/**/*"
  - "ios/**/*"

type: documentation:
  - "docs/**/*"
  - "README.md"
  - "*.md"
```

### 제목 기반 자동 라벨링
```javascript
// 자동 라벨링 규칙
const autoLabelRules = {
  // 제목에 키워드가 포함된 경우
  titleKeywords: {
    'fix': ['type: bug'],
    'feat': ['type: feature'],  
    'docs': ['type: documentation'],
    'perf': ['type: performance'],
    'security': ['type: security'],
    'test': ['type: testing']
  },
  
  // 본문에 키워드가 포함된 경우
  bodyKeywords: {
    'API': ['area: api'],
    'database': ['area: backend', 'component: database'],
    'mobile': ['area: mobile'],
    'performance': ['type: performance'],
    'crash': ['priority: high', 'type: bug']
  }
};
```

### 브랜치 기반 자동 라벨링
```yaml
# Git 브랜치명에 따른 자동 라벨링
branch-labels:
  feature/*:
    - "type: feature"
  
  bugfix/*:
    - "type: bug"
    
  hotfix/*:
    - "type: bug"
    - "priority: critical"
    
  docs/*:
    - "type: documentation"
    
  refactor/*:
    - "type: enhancement"
```

## 📊 라벨 분석 및 관리

### 라벨 사용 통계
```markdown
라벨별 이슈 분포:
- type: bug        ████████████░░ 85% (42/50)
- type: feature    ████████░░░░░░ 60% (30/50)  
- priority: high   ██████░░░░░░░░ 45% (22/50)
- area: frontend   ███████░░░░░░░ 50% (25/50)
- area: backend    ████████░░░░░░ 64% (32/50)

미사용 라벨:
- performance (3개월간 미사용)
- legacy (6개월간 미사용)
→ 삭제 검토 필요
```

### 라벨 정리 및 최적화
```yaml
정리_작업:
  중복_라벨_통합:
    - "bug" + "defect" → "type: bug"
    - "new-feature" + "enhancement" → "type: feature"
  
  색상_일관성_개선:
    - priority 라벨들의 색상 체계 통일
    - area 라벨들의 색상 구분 명확화
  
  설명_개선:
    - 모든 라벨에 명확한 설명 추가
    - 사용 예시 및 가이드라인 포함
```

### 라벨 거버넌스
```yaml
라벨_관리_규칙:
  생성_권한:
    - Admin: 모든 라벨 생성/수정/삭제
    - PM: 프로젝트별 라벨 생성/수정
    - Developer: 제안만 가능
  
  승인_프로세스:
    1. 라벨 제안 (이슈 또는 토론)
    2. 팀 피드백 수집 (3일)
    3. PM/Admin 승인
    4. 라벨 생성 및 문서 업데이트
  
  정기_검토:
    - 월간: 사용률 낮은 라벨 검토
    - 분기: 전체 라벨 체계 리뷰
    - 연간: 라벨 전략 재수립
```

## 🎯 라벨 활용 전략

### 검색 및 필터링
```bash
# 복합 조건 검색
label:"type: bug" label:"priority: high" is:open

# 제외 조건
label:"area: frontend" -label:"status: wontfix"

# OR 조건
label:"priority: critical" OR label:"priority: high"

# 날짜 범위와 조합
label:"type: feature" created:2024-01-01..2024-01-31
```

### 라벨 기반 자동화
```yaml
자동화_규칙:
  우선순위_알림:
    - trigger: label added "priority: critical"
    - action: notify team leads immediately
    
  보안_검토:
    - trigger: label added "security"  
    - action: assign to security team
    
  문서_리뷰:
    - trigger: label added "type: documentation"
    - action: assign to tech writer
```

### 대시보드 및 리포팅
```yaml
라벨_기반_메트릭:
  버그_추세:
    - 주간 신규 bug 라벨 이슈 수
    - 해결된 bug 라벨 이슈 수
    - 미해결 critical/high 버그 수
  
  기능_개발_현황:
    - feature 라벨 이슈의 완료율
    - 평균 기능 개발 시간
    - 컴포넌트별 기능 분포
  
  팀별_작업량:
    - area 라벨별 이슈 분포
    - 팀별 평균 해결 시간
    - 팀 간 협업 이슈 비율
```

## 🏗️ 고급 라벨 시스템

### 계층적 라벨 구조
```yaml
epic-labels:
  "epic: user-management":
    child-labels:
      - "story: user-registration"
      - "story: user-profile"
      - "story: user-preferences"
  
  "epic: payment-system":
    child-labels:
      - "story: payment-gateway"
      - "story: billing-history"
      - "story: subscription-management"
```

### 조건부 라벨 적용
```javascript
// 라벨 조합 규칙
const labelCombinationRules = {
  // security + critical = 보안팀 즉시 알림
  ["security", "priority: critical"]: {
    actions: ["notify-security-team", "create-incident"]
  },
  
  // bug + frontend + critical = 프론트엔드 리드 알림
  ["type: bug", "area: frontend", "priority: critical"]: {
    actions: ["assign-frontend-lead", "notify-product-team"]
  },
  
  // feature + backend = 백엔드 아키텍트 리뷰 필요
  ["type: feature", "area: backend"]: {
    actions: ["request-architecture-review"]
  }
};
```

### 동적 라벨 시스템
```yaml
# 상태 기반 자동 라벨 변경
dynamic-labels:
  time-based:
    - condition: "created > 30 days ago AND status: open"
      action: add "status: stale"
    
    - condition: "priority: critical AND created > 24 hours ago"
      action: add "status: overdue"
  
  progress-based:
    - condition: "has commits in last 7 days"
      action: add "status: active"
      
    - condition: "no activity for 14 days"
      action: add "status: inactive"
```

## 📋 라벨 베스트 프랙티스

### Do's (권장사항)
- ✅ 일관된 네이밍 규칙 사용
- ✅ 색상 의미를 직관적으로 설정
- ✅ 라벨 설명을 명확하게 작성
- ✅ 자동화 규칙 적극 활용
- ✅ 정기적인 라벨 정리 수행
- ✅ 팀원 교육 및 가이드 제공

### Don'ts (주의사항)
- ❌ 너무 많은 라벨 생성 (관리 복잡도 증가)
- ❌ 모호한 라벨명 사용
- ❌ 중복 의미의 라벨 생성
- ❌ 색상 의미 혼재 사용
- ❌ 사용하지 않는 라벨 방치
- ❌ 라벨 규칙 문서화 누락

---

**다음 단계**: [Git 엔진 - 저장소 생성 및 브랜치 정책](/usage/git-engine/repository-branch-policy) 