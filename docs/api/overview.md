---
sidebar_position: 1
title: API 개요
description: CollabOps REST API 소개 및 기본 개념
---

# API 개요

CollabOps는 강력한 REST API를 제공하여 외부 시스템과의 통합과 자동화를 지원합니다.

## 🚀 API 기본 정보

### Base URL
```
Production: https://api.collabops.ai/v1
Staging: https://staging-api.collabops.ai/v1
```

### 지원 기능
- **프로젝트 관리**: 워크스페이스, 프로젝트, 팀원 관리
- **이슈 트래킹**: 이슈 CRUD, 상태 관리, 라벨링
- **Git 연동**: 저장소, 브랜치, PR 관리
- **알림**: 웹훅, 실시간 이벤트 스트림
- **분석**: 메트릭, 리포트, 대시보드 데이터

## 📋 API 표준

### HTTP 메서드
- `GET`: 리소스 조회
- `POST`: 리소스 생성  
- `PUT`: 리소스 전체 업데이트
- `PATCH`: 리소스 부분 업데이트
- `DELETE`: 리소스 삭제

### 응답 형식
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Example Project",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 20
  }
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {
      "name": ["Name is required"]
    }
  }
}
```

## 🔧 빠른 시작

### 1. API 키 생성
1. CollabOps 설정 → API Keys
2. "Generate New Key" 클릭
3. 권한 범위 설정
4. 키 안전하게 보관

### 2. 첫 번째 API 호출
```bash
curl -H "Authorization: Bearer your-api-key" \
     https://api.collabops.ai/v1/projects
```

### 3. SDK 사용 (JavaScript)
```javascript
import { CollabOpsAPI } from '@collabops/sdk';

const api = new CollabOpsAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.collabops.ai/v1'
});

const projects = await api.projects.list();
console.log(projects);
```

---

**다음 단계**: [API 인증](/api/authentication) 