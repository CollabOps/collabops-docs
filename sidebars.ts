import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // CollabOps Documentation Sidebar
  docs: [
    // 🏠 소개
    {
      type: 'category',
      label: '🏠 소개',
      collapsed: false,
      items: [
        'intro/what-is-collabops',
        'intro/vision-philosophy',
        'intro/target-users',
      ],
    },

    // 🚀 시작하기
    {
      type: 'category',
      label: '🚀 시작하기',
      collapsed: false,
      items: [
        'getting-started/quick-start-cloud',
        'getting-started/quick-start-onpremise',
        'getting-started/create-workspace',
        'getting-started/connect-git-repository',
        'getting-started/invite-team-members',
      ],
    },

    // 🧑‍💻 CollabOps 사용법
    {
      type: 'category',
      label: '🧑‍💻 CollabOps 사용법',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '이슈 트래커',
          items: [
            'usage/issue-tracker/create-manage-issues',
            'usage/issue-tracker/status-workflow',
            'usage/issue-tracker/labels-tags',
          ],
        },
        {
          type: 'category',
          label: 'Git 엔진',
          items: [
            'usage/git-engine/repository-branch-policy',
            'usage/git-engine/pull-request-management',
            'usage/git-engine/commit-history',
          ],
        },
        {
          type: 'category',
          label: 'AI 어시스턴트',
          items: [
            'usage/ai-assistant/code-review-automation',
            'usage/ai-assistant/risk-warnings',
            'usage/ai-assistant/test-recommendations',
          ],
        },
        {
          type: 'category',
          label: '통합 타임라인 보기',
          items: [
            'usage/timeline/issue-code-deploy-flow',
            'usage/timeline/role-based-filters',
          ],
        },
        {
          type: 'category',
          label: '알림 시스템',
          items: [
            'usage/notifications/web-email-webhook',
            'usage/notifications/slack-integration',
          ],
        },
      ],
    },

    // ⚙️ 설치 및 연동
    {
      type: 'category',
      label: '⚙️ 설치 및 연동',
      collapsed: true,
      items: [
        'installation/saas-guide',
        {
          type: 'category',
          label: '온프레미스 설치',
          items: [
            'installation/onpremise/helm-guide',
            'installation/onpremise/kubernetes-requirements',
            'installation/onpremise/security-configuration',
            'installation/onpremise/auth-integration',
          ],
        },
        {
          type: 'category',
          label: 'CI/CD 연동',
          items: [
            'installation/cicd/jenkins',
            'installation/cicd/argocd',
            'installation/cicd/github-actions',
            'installation/cicd/redmine-migration',
          ],
        },
      ],
    },

    // 🛡️ 보안 및 컴플라이언스
    {
      type: 'category',
      label: '🛡️ 보안 및 컴플라이언스',
      collapsed: true,
      items: [
        'security/rbac',
        'security/audit-logs',
        'security/repository-management',
        'security/compliance',
        'security/network-configuration',
      ],
    },

    // 🧠 AI 에이전트 시스템
    {
      type: 'category',
      label: '🧠 AI 에이전트 시스템',
      collapsed: true,
      items: [
        'ai-agents/system-overview',
        'ai-agents/agent-roles',
        'ai-agents/models',
        'ai-agents/self-hosting-vs-api',
        'ai-agents/cost-performance',
      ],
    },

    // 📊 관리자 및 분석 기능
    {
      type: 'category',
      label: '📊 관리자 및 분석 기능',
      collapsed: true,
      items: [
        'admin/user-management',
        'admin/project-settings',
        'admin/usage-billing',
        'admin/activity-dashboard',
      ],
    },

    // 📦 API 및 개발자 문서
    {
      type: 'category',
      label: '📦 API 및 개발자 문서',
      collapsed: true,
      items: [
        'api/overview',
        'api/authentication',
        'api/rest-reference',
        'api/webhooks',
        'api/cli-tools',
        'api/sdks',
      ],
    },

    // 📘 튜토리얼 및 활용 예시
    {
      type: 'category',
      label: '📘 튜토리얼 및 활용 예시',
      collapsed: true,
      items: [
        'tutorials/15min-team-setup',
        'tutorials/workflow-examples',
        'tutorials/custom-ci-pipeline',
        'tutorials/git-engine-customization',
        'tutorials/ai-prompt-tuning',
      ],
    },

    // 🧪 실험적 기능 (Beta)
    {
      type: 'category',
      label: '🧪 실험적 기능 (Beta)',
      collapsed: true,
      items: [
        'experimental/self-healing-pr',
        'experimental/dynamic-deployment',
        'experimental/plugin-system',
      ],
    },

    // 🧭 로드맵 및 버전 이력
    {
      type: 'category',
      label: '🧭 로드맵 및 버전 이력',
      collapsed: true,
      items: [
        'roadmap/2025-2026',
        'roadmap/version-history',
        'roadmap/milestones',
      ],
    },

    // 🧩 엔터프라이즈 전용 문서
    {
      type: 'category',
      label: '🧩 엔터프라이즈 전용 문서',
      collapsed: true,
      items: [
        'enterprise/sla-policy',
        'enterprise/case-studies',
        'enterprise/customization-guide',
        'enterprise/migration-guide',
        'enterprise/security-checklist',
      ],
    },

    // ❓ 자주 묻는 질문 (FAQ)
    {
      type: 'category',
      label: '❓ 자주 묻는 질문 (FAQ)',
      collapsed: true,
      items: [
        'faq/general',
        'faq/ai-features',
        'faq/onpremise-tips',
        'faq/adoption-cases',
      ],
    },

    // 📫 지원 및 문의
    {
      type: 'category',
      label: '📫 지원 및 문의',
      collapsed: true,
      items: [
        'support/technical-support',
        'support/enterprise-channel',
        'support/community',
      ],
    },
  ],
};

export default sidebars;
