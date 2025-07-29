---
sidebar_position: 2
title: 인증 방식 (JWT, API 키)
description: CollabOps API 인증 및 보안
---

# 인증 방식

CollabOps API는 JWT와 API 키를 통한 안전한 인증을 제공합니다.

## 🔐 인증 방법

### 1. API 키 인증 (권장)
```bash
curl -H "Authorization: Bearer your-api-key" \
     https://api.collabops.ai/v1/projects
```

### 2. JWT 토큰 인증
```bash
# 1. 로그인으로 JWT 획득
curl -X POST https://api.collabops.ai/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# 2. JWT로 API 호출
curl -H "Authorization: Bearer jwt-token" \
     https://api.collabops.ai/v1/projects
```

## 🔑 API 키 관리

### API 키 생성
```javascript
// 관리자 페이지에서 생성
const apiKey = await CollabOps.apiKeys.create({
  name: "CI/CD Integration",
  scopes: ["projects:read", "issues:write"],
  expiresIn: "1y"
});
```

### 권한 범위 (Scopes)
```yaml
프로젝트_권한:
  - "projects:read"
  - "projects:write" 
  - "projects:admin"

이슈_권한:
  - "issues:read"
  - "issues:write"
  - "issues:admin"

사용자_권한:
  - "users:read"
  - "users:write"
```

## 🛡️ 보안 고려사항

### API 키 보안
- 환경 변수로 저장
- 정기적인 키 로테이션
- 최소 권한 원칙
- 만료 시간 설정

### 요청 제한
```yaml
Rate_Limits:
  일반_사용자: "1000 requests/hour"
  프리미엄: "5000 requests/hour"
  엔터프라이즈: "10000 requests/hour"
```

---

**다음 단계**: [REST API 레퍼런스](/api/rest-reference) 