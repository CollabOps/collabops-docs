---
sidebar_position: 1
title: 사용자/권한 관리
description: 팀원 계정 및 권한 관리 시스템
---

# 사용자/권한 관리

CollabOps의 강력한 사용자 관리 시스템으로 팀을 효율적으로 운영하세요.

## 👥 사용자 관리

### 사용자 추가
1. **Admin** → **Users** → **Invite User**
2. 이메일 주소 입력
3. 역할 선택 (Admin, PM, Developer, Viewer)
4. 프로젝트 할당
5. 초대 이메일 발송

### 일괄 사용자 추가
```csv
email,role,projects,department
john@company.com,developer,"project1,project2",engineering
jane@company.com,pm,project1,product
```

### 사용자 상태 관리
```yaml
사용자_상태:
  active: "활성 사용자"
  pending: "초대 대기중"
  suspended: "일시 정지"
  deactivated: "비활성화"
```

## 🔐 권한 관리

### 역할 기반 권한
- **시스템 관리자**: 전체 시스템 관리
- **워크스페이스 관리자**: 워크스페이스 관리
- **프로젝트 관리자**: 프로젝트 관리
- **개발자**: 개발 및 리뷰
- **뷰어**: 읽기 전용

### 세밀한 권한 제어
```yaml
권한_설정:
  이슈_관리:
    - 생성: [PM, Developer]
    - 편집: [PM, Developer, 작성자]
    - 삭제: [PM, Admin]
    
  코드_관리:
    - 커밋: [Developer]
    - 리뷰: [Developer, PM]
    - 머지: [PM, Admin]
    
  설정_관리:
    - 프로젝트_설정: [PM, Admin]
    - 사용자_관리: [Admin]
    - 통합_설정: [Admin]
```

## 📊 사용자 분석

### 활동 대시보드
- 로그인 이력
- 작업 활동량
- 프로젝트 기여도
- 성과 지표

### 액세스 로그
```markdown
최근 사용자 활동:
- john.doe: 로그인 (2시간 전)
- jane.smith: PR 리뷰 (30분 전)  
- bob.wilson: 이슈 생성 (1시간 전)
```

## 🔧 고급 기능

### SSO 통합
- SAML 2.0
- OAuth 2.0
- LDAP/Active Directory
- Google Workspace
- Microsoft 365

### 자동화 규칙
```yaml
자동화_설정:
  신규_사용자:
    - 자동_프로젝트_할당
    - 온보딩_체크리스트_생성
    - 팀_채널_초대
    
  비활성_사용자:
    - 90일_후_알림
    - 120일_후_일시정지
```

---

**다음 단계**: [프로젝트 설정](/admin/project-settings) 