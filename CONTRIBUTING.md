# Contributing to CollabOps Documentation

Thank you for your interest in contributing to the CollabOps documentation! This guide will help you understand our contribution process and standards.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Documentation Standards](#documentation-standards)
- [Submission Guidelines](#submission-guidelines)
- [Review Process](#review-process)
- [Style Guides](#style-guides)
- [Community](#community)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- **Be respectful** and inclusive in your language and actions
- **Be collaborative** and help others learn and contribute
- **Be constructive** in your feedback and suggestions
- **Be patient** with new contributors and those learning

## 🚀 How to Contribute

### Types of Contributions

We welcome various types of contributions:

1. **📝 Content Improvements**
   - Fix typos, grammar, or formatting issues
   - Update outdated information
   - Add missing documentation
   - Improve clarity and readability

2. **🔍 Technical Improvements**
   - Fix broken links or images
   - Improve site performance
   - Enhance accessibility
   - Update dependencies

3. **✨ New Features**
   - Add new documentation sections
   - Implement new UI components
   - Enhance search functionality
   - Improve mobile experience

4. **🐛 Bug Reports**
   - Report issues with the site
   - Identify accessibility problems
   - Report broken functionality

### Before You Start

- **Check existing issues** to avoid duplicate work
- **Open an issue** for large changes to discuss approach
- **Read this guide** completely before contributing
- **Test your changes** locally before submitting

## 🛠️ Development Setup

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Git version control
- Code editor (VS Code recommended)

### Local Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/collabops-docs.git
   cd collabops-docs
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/CollabOps/collabops-docs.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start development server**:
   ```bash
   npm start
   ```

6. **Open browser** to `http://localhost:3000`

### Development Workflow

1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and test locally

4. **Commit your changes** (see [Commit Guidelines](#commit-guidelines))

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a pull request** via GitHub

## 📚 Documentation Standards

### File Organization

```
docs/
├── intro.md                    # Main introduction
├── getting-started.md          # Getting started guide
├── deployment-guide.md         # Deployment information
├── api/                        # API documentation
│   ├── index.md               # API overview
│   └── authentication.md      # Specific API topics
├── self-hosting/               # Self-hosting guides
│   ├── index.md               # Self-hosting overview
│   └── specific-guides.md     # Detailed guides
└── faq/                        # Frequently asked questions
    ├── index.md               # FAQ overview
    └── category-specific.md   # Categorized FAQs
```

### Frontmatter Requirements

Every documentation page must include proper frontmatter:

```markdown
---
sidebar_position: 1
title: Page Title
description: Brief description for SEO and previews
tags: [tag1, tag2]  # Optional, for better organization
keywords: [keyword1, keyword2]  # Optional, for SEO
---
```

### Content Guidelines

#### Writing Style

- **Use clear, concise language** suitable for both beginners and experts
- **Write in active voice** when possible
- **Use "you" to address the reader** directly
- **Explain technical terms** or link to definitions
- **Include practical examples** for complex concepts

#### Structure

- **Start with a brief overview** of what the page covers
- **Use descriptive headings** (H2, H3, H4) to organize content
- **Include a table of contents** for long pages
- **End with next steps** or related links

#### Code Examples

Always include complete, working examples:

```javascript title="example.js"
// ✅ Good: Complete, working example
const config = {
  apiKey: 'your-api-key',
  endpoint: 'https://api.collabops.ai'
};

async function fetchData() {
  try {
    const response = await fetch(`${config.endpoint}/data`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

```javascript
// ❌ Bad: Incomplete or unclear example
fetch(endpoint)
  .then(res => res.json())
```

#### Callout Boxes

Use appropriate callout boxes for different types of information:

```markdown
:::tip Pro Tip
Use this for helpful tips and best practices.
:::

:::warning Important
Use this for important warnings or breaking changes.
:::

:::danger Critical
Use this for critical warnings about data loss or security.
:::

:::info Note
Use this for additional information or context.
:::
```

#### Links and References

- **Use descriptive link text** instead of "click here"
- **Link to relevant sections** within the documentation
- **Verify all links** work before submitting
- **Use relative links** for internal documentation

```markdown
<!-- ✅ Good -->
See our [authentication guide](./authentication.md) for details.

<!-- ❌ Bad -->
Click [here](./authentication.md) for more information.
```

#### Images and Screenshots

- **Optimize images** for web (use WebP when possible)
- **Include alt text** for accessibility
- **Use descriptive filenames**
- **Store images** in `static/img/` directory

```markdown
![CollabOps Dashboard Overview](../static/img/dashboard-overview.webp)
```

## 📤 Submission Guidelines

### Pull Request Process

1. **Fill out the PR template** completely
2. **Link related issues** using keywords (fixes, closes, resolves)
3. **Provide clear description** of changes and why they're needed
4. **Include screenshots** for visual changes
5. **Test your changes** thoroughly
6. **Request specific reviewers** if needed

### PR Title Format

Use conventional commit format for PR titles:

```
type(scope): brief description

Examples:
feat(docs): add new API authentication guide
fix(search): resolve search indexing issue
docs(readme): update installation instructions
style(css): improve mobile responsive design
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Style/formatting change
- [ ] Refactoring (no functional changes)

## Testing
- [ ] I have tested these changes locally
- [ ] I have checked for broken links
- [ ] I have verified responsive design on mobile
- [ ] I have tested dark/light mode functionality

## Screenshots (if applicable)
Before:
[Screenshot or description]

After:
[Screenshot or description]

## Additional Notes
Any additional information, context, or concerns.
```

### Commit Guidelines

Follow conventional commit format:

```bash
# Format
type(scope): description

# Types
feat:     New feature or enhancement
fix:      Bug fix
docs:     Documentation changes
style:    Formatting, CSS changes
refactor: Code refactoring
test:     Adding or updating tests
chore:    Maintenance tasks

# Examples
feat(search): implement local search functionality
fix(mobile): resolve navigation overlay issue
docs(api): add authentication examples
style(css): update color scheme for better contrast
```

### Commit Message Guidelines

- **Use present tense** ("add feature" not "added feature")
- **Use imperative mood** ("move cursor to..." not "moves cursor to...")
- **Limit first line to 72 characters** or less
- **Include longer description** if needed in body
- **Reference issues and PRs** liberally

Example:
```
feat(docs): add comprehensive API authentication guide

- Add OAuth 2.0 flow documentation
- Include JWT token examples
- Add security best practices section
- Update navigation to include new guide

Closes #123
Related to #124
```

## 🔍 Review Process

### What We Look For

**Content Quality:**
- Accuracy and completeness
- Clear, helpful explanations
- Proper grammar and spelling
- Consistent tone and style

**Technical Quality:**
- Working code examples
- Proper markdown formatting
- Accessible images and links
- Mobile responsiveness

**User Experience:**
- Logical information flow
- Easy navigation
- Helpful cross-references
- Practical examples

### Review Timeline

- **Small fixes**: 1-2 business days
- **Content updates**: 2-3 business days
- **New features**: 3-5 business days
- **Major changes**: 1-2 weeks

### Addressing Review Feedback

1. **Read feedback carefully** and ask questions if unclear
2. **Make requested changes** in new commits
3. **Respond to comments** to show changes made
4. **Re-request review** when ready

## 🎨 Style Guides

### CSS Guidelines

When contributing CSS changes:

```css
/* ✅ Good: Use CSS custom properties */
.search-result {
  background-color: var(--ifm-background-color);
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: var(--ifm-border-radius);
}

/* ❌ Bad: Hard-coded values */
.search-result {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 4px;
}
```

**CSS Rules:**
- Use existing CSS custom properties when possible
- Follow BEM naming convention for new classes
- Include responsive design considerations
- Test in both light and dark modes
- Comment complex CSS rules

### Markdown Guidelines

- **Use ATX-style headers** (`#`) instead of Setext-style (`===`)
- **Include blank lines** around headers and code blocks
- **Use fenced code blocks** with language specification
- **Indent nested lists** consistently (2 spaces)
- **Use reference-style links** for repeated URLs

### Image Guidelines

- **Maximum width**: 1200px for screenshots
- **Format**: WebP preferred, PNG for transparency, JPEG for photos
- **Compression**: Optimize for web without losing clarity
- **Naming**: Use descriptive, kebab-case filenames
- **Alt text**: Descriptive and helpful for screen readers

## 💬 Community

### Getting Help

- **Documentation Issues**: [GitHub Issues](https://github.com/CollabOps/collabops-docs/issues)
- **General Questions**: [GitHub Discussions](https://github.com/CollabOps/collabops/discussions)
- **Real-time Chat**: Join our community Discord (link in main repo)

### Communication Guidelines

- **Be respectful** and professional in all interactions
- **Search existing issues** before creating new ones
- **Provide context** when asking questions
- **Include relevant details** like browser, OS, and steps to reproduce

### Recognition

We recognize contributors in several ways:

- **Contributors section** in README
- **Release notes** mention significant contributions
- **Special thanks** in our community channels
- **Contributor badge** for significant contributors

## 📄 License

By contributing to CollabOps Documentation, you agree that your contributions will be licensed under the same license as the project. See the main [CollabOps repository](https://github.com/CollabOps/collabops) for license details.

## 🙏 Thank You

Thank you for contributing to CollabOps Documentation! Your efforts help make our documentation better for everyone in the community.

For questions about this guide, please [open an issue](https://github.com/CollabOps/collabops-docs/issues) or reach out to the maintainers.

---

**Happy contributing! 🎉** 