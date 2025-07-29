---
sidebar_position: 4
title: 웹훅 가이드
description: CollabOps 웹훅 설정 및 활용 가이드
---

# 웹훅 가이드

실시간 이벤트 알림을 위한 웹훅 설정과 활용 방법입니다.

## 🎯 웹훅 개요

### 지원 이벤트
```yaml
이슈_이벤트:
  - issue.created
  - issue.updated
  - issue.closed
  - issue.assigned

PR_이벤트:
  - pull_request.opened
  - pull_request.merged
  - pull_request.closed
  - pull_request.reviewed

프로젝트_이벤트:
  - project.created
  - project.updated
  - project.archived
```

### 웹훅 등록
```http
POST /api/v1/webhooks
{
  "url": "https://your-app.com/webhook",
  "events": ["issue.created", "pull_request.merged"],
  "secret": "your-webhook-secret"
}
```

---

**다음 단계**: [CLI 도구](/api/cli-tools) 