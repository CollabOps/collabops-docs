---
sidebar_position: 3
title: 워크스페이스 만들기
description: CollabOps 워크스페이스 생성 및 초기 설정 가이드
---

# 워크스페이스 만들기

워크스페이스는 팀의 모든 프로젝트와 협업이 이루어지는 공간입니다. 효율적인 팀 협업을 위한 워크스페이스 설정 방법을 알아보겠습니다.

## 🏗️ 워크스페이스 생성

### 기본 정보 설정

1. **워크스페이스 이름**
   ```
   예시: "우리회사 개발팀", "Product Team", "Backend Squad"
   ```
   - 팀을 대표할 수 있는 명확한 이름 선택
   - 한글, 영문, 숫자, 공백 사용 가능
   - 나중에 변경 가능

2. **워크스페이스 URL**
   ```
   클라우드: yourteam.collabops.ai
   온프레미스: collabops.yourcompany.com/yourteam
   ```
   - 고유한 식별자 역할
   - 영문 소문자, 숫자, 하이픈만 사용
   - 설정 후 변경 불가능 (신중히 선택)

3. **워크스페이스 설명**
   ```
   예시: "우리 회사의 모든 개발 프로젝트를 관리하는 공간입니다."
   ```
   - 팀원들이 이해할 수 있는 간단한 설명
   - 선택사항이지만 권장

### 팀 특성 설정

#### 업무 유형 선택
- **웹 개발**: 프론트엔드, 백엔드, 풀스택
- **모바일 앱**: iOS, Android, React Native, Flutter
- **게임 개발**: Unity, Unreal, 모바일 게임
- **데이터 사이언스**: AI/ML, 데이터 분석
- **DevOps/인프라**: 클라우드, 배포, 모니터링
- **QA/테스팅**: 자동화 테스트, 품질 관리
- **기타**: 다양한 프로젝트 혼재

#### 팀 규모
- **1-5명**: 스타트업, 소규모 팀
- **6-20명**: 중소기업, 프로덕트 팀
- **21-100명**: 대기업 부서, 스쿼드
- **100명+**: 대규모 조직, 멀티 팀

## ⚙️ 고급 설정

### 시간대 및 지역 설정
```
지역: 대한민국
시간대: Asia/Seoul (UTC+9)
언어: 한국어
날짜 형식: YYYY-MM-DD
시간 형식: 24시간
```

### 알림 정책
```yaml
기본 알림 설정:
  이슈 생성: 즉시
  PR 생성: 즉시
  댓글: 5분 지연 배치
  멘션: 즉시
  마감일 임박: 1일 전, 1시간 전
```

### 보안 정책
- **2FA 필수 여부**: 팀 보안 수준에 따라 결정
- **세션 만료 시간**: 기본 24시간, 보안 강화 시 8시간
- **IP 제한**: 사무실/VPN IP만 허용 (선택사항)
- **비밀번호 정책**: 최소 8자, 특수문자 포함 등

## 👥 역할 및 권한 설정

### 기본 역할 정의

#### 🔑 Admin (관리자)
**권한:**
- 워크스페이스 설정 변경
- 모든 프로젝트 접근
- 팀원 초대/제거
- 결제 및 구독 관리

**적합한 사람:**
- 팀 리더, CTO, 부서장

#### 👨‍💼 PM (프로젝트 매니저)
**권한:**
- 프로젝트 생성/수정
- 이슈 관리 및 할당
- 보고서 및 분석 접근
- 팀원 작업 현황 조회

**적합한 사람:**
- 프로덕트 매니저, 스크럼 마스터

#### 👨‍💻 Developer (개발자)
**권한:**
- 코드 작성 및 리뷰
- 이슈 생성/수정
- PR 생성/리뷰
- 자신의 작업 관리

**적합한 사람:**
- 개발자, 엔지니어

#### 👀 Viewer (뷰어)
**권한:**
- 프로젝트 현황 조회
- 이슈 및 PR 읽기
- 댓글 작성
- 대시보드 접근

**적합한 사람:**
- 클라이언트, 디자이너, 마케터

### 커스텀 역할 생성
```yaml
QA Engineer:
  permissions:
    - issue.create
    - issue.edit
    - pr.review
    - test.manage
  restrictions:
    - no_admin_access
    - no_billing_access

DevOps:
  permissions:
    - all_developer_permissions
    - deployment.manage
    - infrastructure.view
    - security.configure
```

## 🎨 워크스페이스 커스터마이징

### 브랜딩 설정
- **로고 업로드**: 200x200px SVG 또는 PNG
- **컬러 테마**: 회사 브랜드 색상 적용
- **파비콘**: 16x16px 아이콘

### 커스텀 도메인 (엔터프라이즈)
```bash
# DNS 설정
CNAME collabops.yourcompany.com -> proxy.collabops.ai

# SSL 인증서 설정
Certificate: yourcompany.com wildcard 또는 collabops.yourcompany.com
```

## 📊 초기 프로젝트 템플릿

### 웹 개발 프로젝트 템플릿
```markdown
기본 이슈 라벨:
- bug: 🐛 버그
- feature: ✨ 새 기능
- enhancement: 🔧 개선
- documentation: 📝 문서
- frontend: 🎨 프론트엔드
- backend: ⚙️ 백엔드

기본 워크플로우:
Backlog → In Progress → Review → Testing → Done
```

### 모바일 앱 템플릿
```markdown
플랫폼별 라벨:
- ios: 📱 iOS
- android: 🤖 Android
- react-native: ⚛️ React Native

기본 워크플로우:
Planning → Development → Code Review → QA → App Store Review → Released
```

### 게임 개발 템플릿
```markdown
게임 특화 라벨:
- gameplay: 🎮 게임플레이
- graphics: 🎨 그래픽
- audio: 🔊 오디오
- performance: ⚡ 성능
- platform: 💻 플랫폼

에셋 관리:
- Git LFS 자동 설정
- 대용량 파일 관리
- 빌드 자동화
```

## 🔗 외부 도구 연동

### Git 플랫폼 연결
1. **GitHub**: Organization 또는 Personal 계정 연동
2. **GitLab**: gitlab.com 또는 self-hosted 인스턴스
3. **Bitbucket**: Atlassian 계정 연동
4. **Azure DevOps**: Microsoft 계정 연동

### 커뮤니케이션 도구
- **Slack**: 워크스페이스 연동, 채널별 알림 설정
- **Microsoft Teams**: 팀 채널 연동
- **Discord**: 서버 연동 (게임 개발팀에 인기)

### CI/CD 도구
- **Jenkins**: Webhook 설정
- **GitHub Actions**: 자동 통합
- **GitLab CI**: 파이프라인 연동
- **CircleCI**: 프로젝트 연결

## 🎯 성공적인 워크스페이스 런칭

### 론칭 전 체크리스트
- [ ] 기본 정보 설정 완료
- [ ] 핵심 팀원 초대 완료
- [ ] Git 저장소 연동 완료
- [ ] 첫 번째 프로젝트 생성
- [ ] 기본 이슈 템플릿 설정
- [ ] 알림 설정 최적화
- [ ] 팀 온보딩 자료 준비

### 첫 주 액션 플랜
1. **1일차**: 워크스페이스 설정 및 핵심 팀원 초대
2. **2-3일차**: 기존 이슈 마이그레이션 또는 새 이슈 생성
3. **4-5일차**: Git 저장소 연동 및 첫 번째 PR
4. **6-7일차**: 팀 피드백 수집 및 설정 최적화

### 온보딩 지원
```markdown
팀원용 빠른 가이드:
1. 초대 이메일에서 계정 활성화
2. 프로필 설정 (이름, 사진, 역할)
3. 알림 설정 개인화
4. 첫 번째 이슈 할당받기
5. Git 저장소 clone 및 첫 커밋
```

## 📈 워크스페이스 성과 측정

### 초기 성공 지표
- **팀원 활성도**: 일일 로그인 사용자 수
- **이슈 처리율**: 생성 대비 완료 이슈 비율
- **코드 리뷰 참여**: PR당 평균 리뷰어 수
- **협업 품질**: 댓글 및 피드백 활동

### 월간 리뷰 포인트
- 워크플로우 효율성 점검
- 권한 및 역할 재검토
- 외부 도구 연동 상태 확인
- 팀 피드백 기반 개선사항 적용

---

**다음 단계**: [Git 저장소 연결하기](/getting-started/connect-git-repository) 