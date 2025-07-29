---
sidebar_position: 5
title: CLI 툴 소개
description: CollabOps 명령줄 도구 사용법
---

# CLI 툴 소개

CollabOps 명령줄 도구로 터미널에서 직접 작업하세요.

## 📦 설치

```bash
# npm으로 설치
npm install -g @collabops/cli

# 또는 yarn으로 설치
yarn global add @collabops/cli
```

## 🚀 기본 사용법

### 인증
```bash
collabops auth login
```

### 프로젝트 관리
```bash
# 프로젝트 목록
collabops projects list

# 이슈 생성
collabops issues create --title "Bug fix" --type bug
```

---

**다음 단계**: [SDK](/api/sdks) 