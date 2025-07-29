---
sidebar_position: 4
title: Git 저장소 연결하기
description: 다양한 Git 플랫폼과 CollabOps 연동 방법
---

# Git 저장소 연결하기

CollabOps는 다양한 Git 플랫폼과 완벽하게 연동되어 코드 변경사항을 실시간으로 추적하고 이슈와 연결할 수 있습니다.

## 🔗 지원하는 Git 플랫폼

### ✅ 완전 지원
- **GitHub** (github.com, GitHub Enterprise Server)
- **GitLab** (gitlab.com, self-hosted GitLab)
- **Bitbucket** (Atlassian Cloud, Bitbucket Server)
- **Azure DevOps** (Azure Repos)

### 🚧 베타 지원
- **Gitea** / **Forgejo**
- **CodeCommit** (AWS)
- **Gerrit**

## 🐙 GitHub 연동

### 1. GitHub App 설치
1. **Settings** → **Integrations** → **GitHub** 이동
2. **"Connect to GitHub"** 클릭
3. GitHub 로그인 및 권한 승인
4. 조직 또는 개인 계정 선택
5. 연동할 저장소 선택

### 2. 권한 설정
```yaml
필요한 권한:
  읽기:
    - Repository metadata
    - Repository contents
    - Issues
    - Pull requests
    - Commit statuses
  쓰기:
    - Commit statuses (CI/CD 상태 업데이트)
    - Pull request reviews
    - Issue comments
```

### 3. Webhook 자동 설정
CollabOps가 자동으로 다음 웹훅을 설정합니다:
- `push` - 코드 푸시 시
- `pull_request` - PR 생성/수정 시
- `issues` - 이슈 생성/수정 시
- `issue_comment` - 댓글 작성 시
- `pull_request_review` - 코드 리뷰 시

### 4. 연동 확인
```bash
# 테스트 커밋 생성
git commit -m "test: CollabOps 연동 테스트

Refs #1"
git push origin main
```

## 🦊 GitLab 연동

### 1. Personal Access Token 생성
```bash
# GitLab.com 또는 self-hosted GitLab에서
1. User Settings → Access Tokens
2. Token name: "CollabOps Integration"
3. Scopes 선택:
   - api
   - read_repository
   - write_repository
4. Create personal access token
```

### 2. CollabOps에서 설정
1. **Settings** → **Integrations** → **GitLab**
2. **GitLab URL** 입력 (self-hosted의 경우)
   ```
   GitLab.com: https://gitlab.com
   Self-hosted: https://gitlab.yourcompany.com
   ```
3. **Personal Access Token** 입력
4. **Test Connection** 클릭

### 3. 프로젝트 연결
1. **Projects** → **Add Repository**
2. GitLab 그룹/프로젝트 선택
3. 브랜치 보호 규칙 설정
4. Webhook 자동 생성 확인

## 🪣 Bitbucket 연동

### 1. App Password 생성
```bash
# Bitbucket 계정 설정에서
1. Personal settings → App passwords
2. Label: "CollabOps"
3. Permissions:
   - Repositories: Read, Write
   - Pull requests: Read, Write
   - Issues: Read, Write
4. Create password
```

### 2. 워크스페이스 연결
1. **Settings** → **Integrations** → **Bitbucket**
2. **Username** 및 **App Password** 입력
3. **Workspace** 선택
4. 저장소 목록에서 연동할 저장소 선택

## ☁️ Azure DevOps 연동

### 1. Personal Access Token 생성
```bash
# Azure DevOps에서
1. User settings → Personal access tokens
2. Name: "CollabOps Integration"
3. Scopes: Full access 또는 Custom 선택
   - Code: Read & Write
   - Work Items: Read & Write
   - Pull Request: Read & Write
4. Create token
```

### 2. 조직 및 프로젝트 설정
1. **Settings** → **Integrations** → **Azure DevOps**
2. **Organization URL** 입력
   ```
   https://dev.azure.com/yourorganization
   ```
3. **Personal Access Token** 입력
4. 프로젝트 및 저장소 선택

## 🔧 고급 연동 설정

### 브랜치 보호 규칙
```yaml
main 브랜치 보호:
  - Pull Request 필수
  - 코드 리뷰 1명 이상 승인
  - CI/CD 성공 시에만 머지
  - 관리자도 규칙 적용
  - Force push 금지
  - Branch 삭제 금지

develop 브랜치 보호:
  - Pull Request 필수
  - CI/CD 성공 시에만 머지
  - Fast-forward merge 허용
```

### 자동 이슈 연결
```bash
# 커밋 메시지 패턴
git commit -m "feat: 사용자 로그인 기능 추가

- JWT 토큰 기반 인증 구현
- 로그인 실패 시 에러 처리
- 비밀번호 암호화 적용

Closes #123
Refs #124, #125"
```

**지원하는 키워드:**
- `Closes #123`, `Fixes #123`, `Resolves #123` - 이슈 자동 닫기
- `Refs #123`, `References #123` - 이슈 참조
- `Part of #123` - 부분 작업 표시

### CI/CD 상태 연동
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
      - name: Update CollabOps
        uses: collabops/github-action@v1
        with:
          token: ${{ secrets.COLLABOPS_TOKEN }}
          status: ${{ job.status }}
```

## 📊 멀티 저장소 관리

### 모노레포 설정
```yaml
# collabops.yml
repositories:
  - name: "Frontend"
    path: "packages/frontend"
    type: "react"
    owner: "frontend-team"
  
  - name: "Backend"
    path: "packages/backend"
    type: "node"
    owner: "backend-team"
  
  - name: "Mobile"
    path: "packages/mobile"
    type: "react-native"
    owner: "mobile-team"
```

### 크로스 레포지토리 이슈 연결
```bash
# 다른 저장소 이슈 참조
git commit -m "fix: API 호출 오류 수정

frontend 저장소의 API 스펙 변경에 따른 수정

Refs frontend#45
Closes backend#23"
```

## 🔒 보안 고려사항

### Personal Access Token 관리
- **최소 권한 원칙**: 필요한 권한만 부여
- **토큰 만료 기간**: 90일 이내 설정 권장
- **정기적 갱신**: 만료 전 자동 알림
- **팀 공유 금지**: 개인별 토큰 사용

### Webhook 보안
```bash
# Webhook Secret 설정으로 검증
WEBHOOK_SECRET=your-random-secret-key

# IP 화이트리스트 (온프레미스)
허용 IP: 
  - 10.0.0.0/8 (내부 네트워크)
  - GitHub Hook IPs
```

### SSH 키 관리
```bash
# 배포용 SSH 키 생성
ssh-keygen -t ed25519 -C "deploy@collabops"

# 읽기 전용 배포 키 등록
cat ~/.ssh/id_ed25519.pub
# → GitHub Repository Settings → Deploy keys
```

## 🚨 문제 해결

### 연동 실패 시 체크포인트

#### 1. 네트워크 연결 확인
```bash
# GitHub API 접근 테스트
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/user

# GitLab API 접근 테스트
curl -H "PRIVATE-TOKEN: YOUR_TOKEN" \
  https://gitlab.com/api/v4/user
```

#### 2. 권한 확인
- **Organization 권한**: 3rd party 앱 허용 확인
- **Repository 권한**: Admin 권한 필요
- **2FA 설정**: Personal Access Token 사용 필수

#### 3. Webhook 상태 확인
```bash
# Webhook 전송 로그 확인
Settings → Webhooks → Recent Deliveries
```

### 자주 발생하는 문제

#### GitHub App 권한 오류
```
Error: Resource not accessible by integration
해결: GitHub App에 Repository Write 권한 추가
```

#### GitLab Token 만료
```
Error: 401 Unauthorized
해결: Personal Access Token 재생성 및 업데이트
```

#### Webhook 응답 지연
```
Warning: Webhook timeout
해결: Webhook URL 응답 시간 최적화 (< 10초)
```

## 📈 연동 효과 측정

### 연동 품질 지표
- **동기화 지연**: 이벤트 발생부터 CollabOps 반영까지 시간
- **이슈 연결율**: 커밋당 이슈 참조 비율
- **CI/CD 통합**: 빌드 상태 자동 업데이트 성공률
- **팀 협업**: 코드 리뷰 및 이슈 댓글 활동

### 성과 개선 팁
- **일관된 커밋 메시지**: 이슈 연결 자동화
- **적절한 브랜치 전략**: Git Flow 또는 GitHub Flow
- **코드 리뷰 문화**: PR 템플릿 및 체크리스트 활용
- **자동화 확대**: CI/CD 파이프라인과 완전 통합

---

**다음 단계**: [팀원 초대하기](/getting-started/invite-team-members) 