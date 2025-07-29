# CollabOps Documentation

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://docs.collabops.ai)
[![Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-2e8555?style=flat&logo=docusaurus&logoColor=white)](https://docusaurus.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Search](https://img.shields.io/badge/Search-Local%20Search-2563EB?style=flat)](https://github.com/easyops-cn/docusaurus-search-local)

> **Modern, responsive documentation site for CollabOps - streamlining team collaboration and operations.**

🌐 **Live Site**: [docs.collabops.ai](https://docs.collabops.ai)  
📚 **Repository**: [CollabOps/collabops-docs](https://github.com/CollabOps/collabops-docs)

## ✨ Features

- 🎨 **Modern CollabOps Branding** - Custom design system with Primary Blue (#2563EB), Secondary Teal (#0D9488), and Accent Orange (#F97316)
- 🔍 **Fast Local Search** - Instant search functionality with highlighted results and contextual previews
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices with mobile-first design
- 🌙 **Dark/Light Mode** - Complete theme support with automatic system preference detection
- ♿ **Accessibility First** - WCAG 2.1 compliant with keyboard navigation and screen reader support
- ⚡ **Performance Optimized** - Fast loading times with optimized assets and caching strategies
- 🚀 **Auto Deployment** - Continuous deployment via Vercel with GitHub integration
- 📖 **Rich Documentation** - Comprehensive guides for API, self-hosting, and getting started

## 🏗️ Tech Stack

- **Framework**: [Docusaurus 3.8.1](https://docusaurus.io/) with TypeScript
- **Styling**: Custom CSS with modern design system and responsive breakpoints
- **Search**: [@easyops-cn/docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) for client-side search
- **Deployment**: [Vercel](https://vercel.com/) with automatic builds from GitHub
- **DNS**: Cloudflare with CDN and security features
- **Fonts**: Inter (body text) and JetBrains Mono (code blocks)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/CollabOps/collabops-docs.git
cd collabops-docs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

This command starts a local development server and opens up a browser window at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

### 4. Build for Production

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### 5. Serve Production Build Locally

```bash
npm run serve
```

## 📁 Project Structure

```
collabops-docs/
├── docs/                          # Documentation content
│   ├── intro.md                   # Introduction page
│   ├── getting-started.md         # Getting started guide
│   ├── deployment-guide.md        # Deployment guide
│   ├── api/                       # API documentation
│   │   ├── index.md              # API overview
│   │   └── authentication.md     # Authentication guide
│   ├── self-hosting/              # Self-hosting guides
│   │   ├── index.md              # Self-hosting overview
│   │   └── helm.md               # Helm chart guide
│   └── faq/                       # Frequently asked questions
│       ├── index.md              # FAQ overview
│       └── common.md             # Common questions
├── blog/                          # Release notes and blog posts
├── src/                           # Source files
│   └── css/                       # Custom styling
│       ├── custom.css            # Main CSS file with CollabOps design system
│       └── search-local.css      # Search functionality styling
├── static/                        # Static assets (images, favicons, etc.)
├── docusaurus.config.ts           # Docusaurus configuration
├── sidebars.ts                    # Sidebar navigation configuration
└── package.json                   # Project dependencies and scripts
```

## 🎨 Design System

The documentation site uses CollabOps' custom design system:

### Color Palette

```css
/* Primary Colors */
--ifm-color-primary: #188BFF;           /* Primary/500 - Main brand blue */
--collabops-secondary: #44E4AF;         /* Green-1 - Bright secondary */
--collabops-accent: #F9A825;            /* Yellow-1 - Accent color */

/* Status Colors */
--ifm-color-success: #1D8235;           /* Green-2 - Success state */
--ifm-color-warning: #F9A825;           /* Yellow-1 - Warning state */
--ifm-color-danger: #F74632;            /* Red-2 - Error state */
--ifm-color-info: #188BFF;              /* Primary/500 - Info state */
```

### Typography

- **Body Text**: Inter font family for excellent readability
- **Code Blocks**: JetBrains Mono for enhanced developer experience
- **Responsive Scaling**: Automatic font size adjustments for mobile devices

### Components

- **Navbar**: Backdrop blur effect with CollabOps branding
- **Sidebar**: Smooth hover animations with proper spacing
- **Search**: Custom-styled search modal with gradient header
- **Cards**: Interactive hover effects with shadow elevations
- **Code Blocks**: Syntax highlighting with CollabOps color scheme

## 📝 Content Management

### Adding New Documentation

1. **Create a new markdown file** in the appropriate `docs/` subdirectory
2. **Add frontmatter** with title, description, and sidebar position:

```markdown
---
sidebar_position: 1
title: Your Page Title
description: Brief description of the page content
---

# Your Page Title

Your content here...
```

3. **Update navigation** in `sidebars.ts` if needed
4. **Test locally** with `npm start`
5. **Commit and push** - Vercel will auto-deploy

### Content Guidelines

- Use **clear, concise headings** with proper hierarchy (H1 → H2 → H3)
- Include **code examples** with proper syntax highlighting
- Add **screenshots or diagrams** when helpful (place in `static/img/`)
- Follow **consistent formatting** for links, lists, and tables
- Test **all links and anchors** before publishing

### Markdown Features

Docusaurus supports extended markdown features:

```markdown
:::tip Pro Tip
This is a tip callout box.
:::

:::warning Important
This is a warning callout box.
:::

```javascript title="example.js"
// Code blocks with title and syntax highlighting
console.log('Hello, CollabOps!');
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>
    npm install package-name
  </TabItem>
  <TabItem value="yarn" label="yarn">
    yarn add package-name
  </TabItem>
</Tabs>
```

## 🚀 Deployment

### Automatic Deployment

The site automatically deploys to production when changes are pushed to the `main` branch:

1. **GitHub Action** triggers on push to `main`
2. **Vercel** builds the site using `npm run build`
3. **Deployment** goes live at [docs.collabops.ai](https://docs.collabops.ai)
4. **CDN Cache** is automatically purged via Cloudflare

### Manual Deployment

For manual deployments or testing:

```bash
# Build the site
npm run build

# Deploy to Vercel (requires Vercel CLI)
npx vercel --prod
```

### Environment Configuration

The site uses the following production configuration:

- **Domain**: docs.collabops.ai
- **SSL**: Automatic HTTPS via Vercel + Cloudflare
- **CDN**: Cloudflare with global edge caching

- **Search Index**: Generated during build process

## 🤝 Contributing

We welcome contributions to improve the CollabOps documentation! Here's how you can help:

### Quick Contributions

- **Fix typos or grammar** - Submit small fixes directly via GitHub's web editor
- **Update content** - Keep documentation current with the latest features
- **Add examples** - Include practical code examples and use cases

### Larger Contributions

1. **Read** our [Contributing Guidelines](./CONTRIBUTING.md)
2. **Fork** the repository
3. **Create** a feature branch: `git checkout -b feature/your-feature-name`
4. **Make** your changes and test locally
5. **Submit** a pull request with a clear description

### Reporting Issues

- **Documentation Issues**: [GitHub Issues](https://github.com/CollabOps/collabops-docs/issues)
- **Product Issues**: [Main CollabOps Issues](https://github.com/CollabOps/collabops/issues)
- **Feature Requests**: [Discussions](https://github.com/CollabOps/collabops/discussions)

## 🔧 Development

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run serve      # Serve production build locally
npm run clear      # Clear Docusaurus cache
npm run typecheck  # Run TypeScript type checking
```

### Local Search Development

The search functionality uses a local search plugin that indexes content during build:

- **Index Generation**: Automatic during `npm run build`
- **Search Scope**: Docs and blog content (excludes static pages)
- **Languages**: English (configurable in `docusaurus.config.ts`)
- **Customization**: Search styling in `src/css/search-local.css`

### Troubleshooting

**Build Issues:**
```bash
# Clear cache and reinstall dependencies
npm run clear
rm -rf node_modules package-lock.json
npm install
```

**Search Not Working:**
- Ensure search index is generated during build
- Check browser console for JavaScript errors
- Verify search plugin configuration in `docusaurus.config.ts`

**Styling Issues:**
- Check CSS custom properties in `src/css/custom.css`
- Verify dark/light mode variable definitions
- Test responsive breakpoints at 768px and 996px

## 📞 Support

- **Documentation Team**: [GitHub Issues](https://github.com/CollabOps/collabops-docs/issues)
- **CollabOps Support**: [Main Repository](https://github.com/CollabOps/collabops)
- **Community**: [GitHub Discussions](https://github.com/CollabOps/collabops/discussions)

## 📄 License

This documentation is part of the CollabOps project. See the main [CollabOps repository](https://github.com/CollabOps/collabops) for license information.

---

**Built with ❤️ by the CollabOps team**
