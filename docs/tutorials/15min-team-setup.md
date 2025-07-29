---
sidebar_position: 1
title: 15분 만에 팀 세팅하기
description: 빠른 팀 온보딩 가이드
---

# 15분 만에 팀 세팅하기

새로운 개발팀을 위한 CollabOps 빠른 설정 가이드입니다.

## ⏱️ 타임라인 (총 15분)

### 1-3분: 워크스페이스 생성
1. [collabops.ai](https://collabops.ai) 가입
2. 워크스페이스 이름: "우리회사 개발팀"
3. 팀 크기 선택: 10명 미만

### 4-6분: 프로젝트 생성
1. **"새 프로젝트"** 클릭
2. 프로젝트명: "메인 웹사이트"
3. 템플릿 선택: "웹 애플리케이션"
4. Git 저장소 연결

### 7-10분: 팀원 초대
```csv
# 일괄 초대용 CSV
이메일,역할,부서
john@company.com,developer,개발팀
jane@company.com,pm,기획팀
bob@company.com,designer,디자인팀
alice@company.com,qa,QA팀
```

### 11-13분: 첫 이슈 생성
```markdown
제목: 로그인 페이지 개선
설명: 
- 현재 로그인 UI가 반응형이 아님
- 소셜 로그인 버튼 추가 필요
- 비밀번호 찾기 기능 개선

우선순위: High
담당자: john@company.com
라벨: frontend, ui-improvement
```

### 14-15분: 알림 설정
1. Slack 연동 설정
2. 이메일 알림 빈도: 즉시
3. 팀 채널에 CollabOps 봇 추가

## ✅ 완료 체크리스트

```markdown
체크리스트:
- [ ] 워크스페이스 생성 완료
- [ ] 프로젝트 1개 이상 생성
- [ ] 팀원 3명 이상 초대
- [ ] Git 저장소 연결
- [ ] 첫 번째 이슈 생성
- [ ] Slack 또는 이메일 알림 설정
- [ ] 팀원들의 계정 활성화 확인
```

## 🎯 다음 단계 (추가 10분)

### 고급 설정
1. **브랜치 보호 규칙**
   - main 브랜치 직접 푸시 금지
   - PR 리뷰 2명 이상 필수

2. **자동화 설정**
   - 이슈 템플릿 생성
   - PR 템플릿 생성
   - 자동 라벨링 규칙

3. **AI 어시스턴트 활성화**
   - 코드 리뷰 자동화
   - 보안 스캔 활성화
   - 성능 모니터링 설정

## 💡 팀 온보딩 팁

### 첫 주 권장 활동
1. **모든 팀원이 첫 이슈 할당받기**
2. **첫 PR 생성 및 리뷰 경험**
3. **타임라인 뷰 활용법 숙지**
4. **알림 설정 개인화**

### 성공 지표
- 팀원 90% 이상 활성 사용
- 일일 이슈 생성 5개 이상
- PR 리뷰 시간 24시간 이내
- Slack 알림 정상 동작

## 🚀 추가 리소스

### 학습 자료
- [CollabOps 기본 워크플로우](/tutorials/workflow-examples)
- [Git 연동 고급 설정](/usage/git-engine/repository-branch-policy)
- [AI 기능 활용법](/usage/ai-assistant/code-review-automation)

### 지원 채널
- 📧 이메일: support@collabops.ai
- 💬 Slack: [커뮤니티 채널](https://collabops-community.slack.com)
- 📚 도움말: [help.collabops.ai](https://help.collabops.ai)

---

**축하합니다! 🎉 팀 설정이 완료되었습니다.**

다음 단계: [워크플로우 예시 보기](/tutorials/workflow-examples) 