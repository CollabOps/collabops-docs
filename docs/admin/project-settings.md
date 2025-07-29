---
sidebar_position: 2
title: 프로젝트 설정
description: CollabOps 프로젝트 구성 및 설정 관리
---

# 프로젝트 설정

프로젝트별 세부 설정을 통해 팀의 워크플로우를 최적화하세요.

## 🎯 기본 프로젝트 설정

### 프로젝트 정보
- **프로젝트명**: 팀이 식별하기 쉬운 이름
- **설명**: 프로젝트의 목적과 범위
- **가시성**: Public, Private, Internal
- **프로젝트 템플릿**: 사전 정의된 워크플로우

### 팀 구성
```yaml
팀_역할:
  project_owner: "프로젝트 소유자"
  maintainer: "유지보수자"
  developer: "개발자"
  guest: "게스트"
```

## 🔧 워크플로우 설정

### 이슈 관리
- **이슈 템플릿**: 버그 리포트, 기능 요청, 개선사항
- **라벨 정책**: 자동 라벨링 규칙
- **상태 관리**: 커스텀 워크플로우 상태
- **우선순위**: High, Medium, Low, Critical

### Git 브랜치 정책
```yaml
브랜치_보호:
  main:
    require_pr_reviews: 2
    dismiss_stale_reviews: true
    require_status_checks: true
    
  develop:
    require_pr_reviews: 1
    allow_force_pushes: false
```

### 코드 리뷰 정책
- **필수 리뷰어 수**: 1-5명
- **자동 리뷰어 할당**: 코드 소유자, 팀별
- **승인 정책**: 모든 리뷰어, 과반수
- **변경 요청 처리**: 재승인 필요 여부

## 🤖 AI 설정

### AI 어시스턴트 활성화
```yaml
ai_features:
  code_review:
    enabled: true
    confidence_threshold: 0.8
    
  security_scan:
    enabled: true
    severity_levels: ["critical", "high"]
    
  performance_check:
    enabled: false
    threshold: "20%_degradation"
```

### 알림 설정
- **즉시 알림**: 보안 이슈, 빌드 실패
- **일괄 알림**: 일일/주간 요약
- **채널별 설정**: 이메일, Slack, 웹훅

## 🔗 통합 연동

### Git 플랫폼
- **GitHub**: Repository, Issues, PR 동기화
- **GitLab**: Merge Request, Pipeline 연동
- **Bitbucket**: Branch, Build 상태 연동

### CI/CD 통합
```yaml
cicd_integrations:
  jenkins:
    webhook_url: "https://jenkins.company.com/webhook"
    trigger_events: ["push", "pr_created"]
    
  github_actions:
    auto_sync: true
    status_reporting: true
```

## 📊 분석 및 리포팅

### 메트릭 설정
- **코드 품질**: 복잡도, 중복도, 테스트 커버리지
- **팀 성과**: 완료율, 평균 리뷰 시간, 버그 발견율
- **프로젝트 진행**: 번다운 차트, 속도 추적

### 대시보드 구성
```yaml
dashboard_widgets:
  - name: "이슈 상태"
    type: "pie_chart"
    data_source: "issues"
    
  - name: "PR 리뷰 시간"
    type: "line_chart" 
    data_source: "pull_requests"
```

## 🛡️ 보안 설정

### 접근 권한
- **브랜치 보호**: main, develop 브랜치 직접 푸시 금지
- **시크릿 관리**: API 키, 토큰 안전 저장
- **감사 로그**: 모든 변경사항 추적

### 컴플라이언스
- **GDPR**: 개인정보 처리 정책
- **SOX**: 재무 관련 코드 변경 추적
- **HIPAA**: 의료 데이터 보안 요구사항

## ⚙️ 고급 설정

### 자동화 규칙
```yaml
automation_rules:
  auto_assign:
    - trigger: "issue_created"
      condition: "label:bug"
      action: "assign_to_team:backend"
      
  auto_close:
    - trigger: "pr_merged"
      action: "close_linked_issues"
```

### 커스텀 필드
- **이슈 필드**: 스프린트, 에픽, 스토리 포인트
- **PR 필드**: 테스트 타입, 배포 환경
- **팀 필드**: 역량, 전문 분야

---

**다음 단계**: [활동 대시보드](/admin/activity-dashboard) 