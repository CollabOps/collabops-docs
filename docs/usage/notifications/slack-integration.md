---
sidebar_position: 2
title: 슬랙 연동 방법
description: Slack을 통한 팀 협업 알림 설정
---

# 슬랙 연동 방법

CollabOps를 Slack과 연동하여 팀 채널에서 실시간으로 프로젝트 업데이트를 받을 수 있습니다.

## 🚀 연동 설정

### Slack 앱 설치
1. CollabOps 관리자 페이지 접속
2. "Integrations" → "Slack" 선택
3. "Add to Slack" 버튼 클릭
4. 워크스페이스 승인 및 권한 부여

### 채널별 알림 설정
```yaml
채널_알림_설정:
  "#dev-team":
    - pull_request_created
    - build_failed
    - deployment_success
    
  "#project-status":
    - milestone_completed
    - release_published
    - critical_issues
    
  "#security-alerts":
    - vulnerability_detected
    - security_scan_failed
```

## 💬 알림 메시지 예시

### PR 생성 알림
```
🚀 새로운 Pull Request가 생성되었습니다!

📋 제목: 사용자 인증 시스템 개선
👤 작성자: @john.doe
🌿 브랜치: feature/auth-improvement → main
🔗 링크: https://collabops.ai/pr/123

📝 변경사항:
• 로그인 보안 강화
• 2FA 기능 추가
• 세션 관리 개선
```

### 배포 완료 알림
```
✅ 프로덕션 배포가 완료되었습니다!

🚀 버전: v1.2.3
⏰ 배포 시간: 2024-01-15 14:30 KST
👤 배포자: @jane.smith

🔄 변경사항:
• 버그 수정 (3건)
• 성능 개선 (API 응답속도 20% 향상)
• 새로운 기능 (사용자 대시보드)

📊 상태: 모든 헬스체크 통과 ✅
```

---

**다음 단계**: [설치 및 연동](/installation/saas-guide) 