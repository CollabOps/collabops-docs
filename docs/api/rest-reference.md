---
sidebar_position: 3
title: REST API 레퍼런스
description: 전체 API 엔드포인트 참조
---

# REST API 레퍼런스

CollabOps REST API의 전체 엔드포인트 참조 문서입니다.

## 📋 프로젝트 API

### 프로젝트 목록 조회
```http
GET /v1/projects
```

**응답 예시:**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "name": "Web Application",
      "description": "Main web app project",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "team_count": 8
    }
  ]
}
```

### 프로젝트 생성
```http
POST /v1/projects
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description",
  "visibility": "private"
}
```

## 🎯 이슈 API

### 이슈 목록 조회
```http
GET /v1/projects/:project_id/issues?status=open&assignee=john
```

### 이슈 생성
```http
POST /v1/projects/:project_id/issues
Content-Type: application/json

{
  "title": "Fix login bug",
  "description": "Users cannot login with special characters",
  "type": "bug",
  "priority": "high",
  "assignee_id": 456,
  "labels": ["frontend", "security"]
}
```

### 이슈 업데이트
```http
PATCH /v1/issues/:issue_id
Content-Type: application/json

{
  "status": "in_progress",
  "assignee_id": 789
}
```

## 🌿 Git API

### 저장소 목록
```http
GET /v1/projects/:project_id/repositories
```

### 브랜치 목록
```http
GET /v1/repositories/:repo_id/branches
```

### Pull Request 생성
```http
POST /v1/repositories/:repo_id/pulls
Content-Type: application/json

{
  "title": "Add user authentication",
  "head": "feature/auth",
  "base": "main",
  "description": "Implements JWT-based authentication"
}
```

## 👥 사용자 API

### 사용자 목록
```http
GET /v1/users?role=developer&status=active
```

### 사용자 초대
```http
POST /v1/workspaces/:workspace_id/invitations
Content-Type: application/json

{
  "email": "newuser@example.com",
  "role": "developer",
  "projects": [123, 456]
}
```

## 📊 분석 API

### 프로젝트 메트릭
```http
GET /v1/projects/:project_id/metrics?period=30d
```

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "issues": {
      "total": 245,
      "open": 23,
      "closed": 222,
      "average_resolution_time": "2.5 days"
    },
    "commits": {
      "total": 1250,
      "this_month": 89
    },
    "pull_requests": {
      "merged": 156,
      "average_review_time": "4.2 hours"
    }
  }
}
```

## 🔔 웹훅 API

### 웹훅 등록
```http
POST /v1/projects/:project_id/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/collabops",
  "events": ["issue.created", "pull_request.merged"],
  "secret": "your-webhook-secret"
}
```

## 📄 페이지네이션

모든 목록 API는 페이지네이션을 지원합니다:

```http
GET /v1/issues?page=2&per_page=50
```

**응답 메타데이터:**
```json
{
  "meta": {
    "current_page": 2,
    "per_page": 50,
    "total_pages": 10,
    "total_count": 500
  }
}
```

## ⚠️ 에러 코드

```yaml
400: "Bad Request - 잘못된 요청"
401: "Unauthorized - 인증 필요"
403: "Forbidden - 권한 없음"
404: "Not Found - 리소스 없음"
422: "Unprocessable Entity - 유효성 검사 실패"
429: "Too Many Requests - 요청 제한 초과"
500: "Internal Server Error - 서버 오류"
```

---

**다음 단계**: [웹훅 가이드](/api/webhooks) 