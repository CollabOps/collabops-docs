import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CollabOps Documentation',
  tagline: 'Streamline your team collaboration and operations',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.collabops.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'collabops', // Usually your GitHub org/user name.
  projectName: 'collabops-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
            docs: {
      sidebarPath: './sidebars.ts',
      // Set docs to be served from the root path instead of /docs/
      routeBasePath: '/',
      // Edit this page on GitHub - points directly to GitHub's editor
      editUrl: 'https://github.com/collabops/collabops-docs/edit/main/',
      // Enable editing of the current version
      editCurrentVersion: true,
      // Enable editing of localized files if we add i18n later
      editLocalizedFiles: true,
    },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Edit this page on GitHub - points directly to GitHub's editor
          editUrl: 'https://github.com/collabops/collabops-docs/edit/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // TEMPORARILY DISABLED - Search functionality commented out
    // [
    //   '@easyops-cn/docusaurus-search-local',
    //   {
    //     // Whether to index docs pages
    //     indexDocs: true,
    //     // Whether to index blog pages
    //     indexBlog: true,
    //     // Whether to index static pages
    //     indexPages: false,
    //     // Language for search
    //     language: ['en'],
    //     // Whether to highlight search terms on target page
    //     highlightSearchTermsOnTargetPage: true,
    //   },
    // ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/collabops-social-card.jpg',
    navbar: {
      title: 'CollabOps',
      logo: {
        alt: 'CollabOps Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo_white.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Release Notes', position: 'left'},
        {
          href: 'https://github.com/collabops/collabops-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'API Reference',
              to: '/api',
            },
            {
              label: 'Self-Hosting',
              to: '/self-hosting',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/collabops/collabops/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/collabops/collabops/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Release Notes',
              to: '/blog',
            },
            {
              label: 'Main Website',
              href: 'https://collabops.ai',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/collabops/collabops-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CollabOps. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
