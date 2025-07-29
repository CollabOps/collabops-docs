---
sidebar_position: 6
title: SDK (Python, JS)
description: CollabOps SDK 라이브러리 사용법
---

# SDK (Python, JS)

다양한 언어로 CollabOps API를 쉽게 사용할 수 있습니다.

## 🐍 Python SDK

### 설치
```bash
pip install collabops-python
```

### 사용법
```python
from collabops import CollabOps

client = CollabOps(api_key="your-api-key")
projects = client.projects.list()
```

## 🟨 JavaScript SDK

### 설치
```bash
npm install @collabops/sdk
```

### 사용법
```javascript
import { CollabOps } from '@collabops/sdk';

const client = new CollabOps({ apiKey: 'your-api-key' });
const projects = await client.projects.list();
```

---

**이전 단계**: [CLI 도구](/api/cli-tools) 