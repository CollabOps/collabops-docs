# CollabOps Documentation Deployment Guide

This guide covers the complete deployment process for the CollabOps documentation site, including GitHub integration, Vercel deployment, and custom domain configuration.

## 🏗️ Architecture Overview

Our documentation site uses the following technology stack:
- **Framework**: Docusaurus v3 with TypeScript
- **Version Control**: GitHub (CollabOps/collabops-docs)
- **Hosting**: Vercel with automatic deployments
- **DNS**: Cloudflare with proxy and security features
- **Domain**: docs.collabops.ai (custom subdomain)

## 📋 Prerequisites

Before starting the deployment process, ensure you have:
- [ ] GitHub account with access to CollabOps organization
- [ ] Vercel account with GitHub integration
- [ ] Cloudflare account with collabops.ai domain management
- [ ] Admin access to domain DNS settings

## 🚀 Deployment Process

### Step 1: GitHub Repository Setup ✅ COMPLETED

- [x] Repository created: `CollabOps/collabops-docs`
- [x] Initial commit with complete Docusaurus project
- [x] Branch structure: `main` (production) and `development`
- [x] Documentation files created and structured
- [x] .gitignore and README.md configured

### Step 2: Vercel Deployment ✅ COMPLETED

- [x] vercel.json configuration file created
- [x] Build settings optimized for Docusaurus
- [x] Automatic deployment from main branch configured
- [x] Preview deployments for pull requests enabled

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "docusaurus",
  "installCommand": "npm install",
  "devCommand": "npm start"
}
```

### Step 3: Custom Domain Configuration 🔄 IN PROGRESS

#### 3.1 Cloudflare DNS Setup

1. **Login to Cloudflare Dashboard**
   - Navigate to DNS management for `collabops.ai`

2. **Add CNAME Record**
   ```
   Type: CNAME
   Name: docs
   Target: collabops-docs.vercel.app
   TTL: Auto
   Proxy: DNS only (initially)
   ```

3. **SSL/TLS Configuration**
   - Set encryption mode to "Full"
   - Enable "Always Use HTTPS"
   - Enable "Automatic HTTPS Rewrites"

#### 3.2 Vercel Domain Setup

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add `docs.collabops.ai`
   - Follow verification instructions

2. **Domain Verification**
   - Add TXT record to Cloudflare if prompted:
     ```
     Type: TXT
     Name: _vercel.docs
     Content: [verification string from Vercel]
     ```

3. **Wait for Propagation** (5-30 minutes)

#### 3.3 Final Configuration

1. **Activate Cloudflare Proxy**
   - Change CNAME record proxy status to "Proxied" (orange cloud)
   - This enables CDN, DDoS protection, and security features

2. **SSL Optimization**
   - Upgrade Cloudflare SSL to "Full (strict)" once working
   - Enable HSTS (HTTP Strict Transport Security)

## 🔧 Performance Optimization

### Cloudflare Settings

**Page Rules** for `docs.collabops.ai/*`:
- Cache Level: Standard
- Edge Cache TTL: 2 hours
- Browser Cache TTL: 30 minutes

**Caching Configuration**:
- Browser Cache TTL: 30 minutes
- Always Online: Enabled
- Origin Cache Control: Enabled

## 🧪 Testing Checklist

### DNS and Connectivity
- [ ] `docs.collabops.ai` resolves correctly
- [ ] HTTPS loads without certificate warnings
- [ ] HTTP automatically redirects to HTTPS
- [ ] All pages load correctly
- [ ] Mobile responsiveness verified

### Performance Testing
- [ ] Lighthouse score > 90 for Performance
- [ ] Core Web Vitals pass
- [ ] Assets load from CDN
- [ ] Cache headers properly configured

### Security Verification
- [ ] SSL Labs test shows A+ rating
- [ ] Mixed content warnings absent
- [ ] Security headers properly configured
- [ ] HSTS enabled (after verification)

## 🚨 Troubleshooting

### Common Issues

**DNS_PROBE_FINISHED_NXDOMAIN**
- Verify CNAME record in Cloudflare
- Check DNS propagation status
- Wait up to 48 hours for global propagation

**SSL Certificate Errors**
- Ensure Cloudflare SSL is "Full" not "Flexible"
- Verify Vercel certificate provisioned
- Check domain name matches exactly

**Redirect Loops**
- Temporarily disable "Always Use HTTPS" in Cloudflare
- Verify both platforms aren't enforcing HTTPS simultaneously

**Slow Performance**
- Check Cloudflare Analytics cache hit ratio
- Verify CDN proxy is enabled (orange cloud)
- Purge cache after deployments

### Emergency Procedures

**Site Down**
1. Check Vercel deployment status
2. Verify Cloudflare proxy status
3. Test direct Vercel URL (.vercel.app)
4. Check GitHub repository status

**SSL Issues**
1. Temporarily set Cloudflare to "DNS only"
2. Wait for Vercel SSL to provision
3. Re-enable Cloudflare proxy after verification

## 📊 Monitoring

### Regular Checks
- **Weekly**: Uptime monitoring and performance review
- **Monthly**: SSL certificate status and security scan
- **Quarterly**: Full performance audit with Lighthouse

### Key Metrics
- **Uptime**: Target > 99.9%
- **Load Time**: Target < 2 seconds
- **Core Web Vitals**: All metrics in "Good" range
- **SSL Rating**: Maintain A+ rating

## 🔄 Maintenance

### Updates and Deployments
1. **Content Updates**: Push to main branch for automatic deployment
2. **Feature Development**: Use development branch and pull requests
3. **Emergency Fixes**: Direct push to main with immediate verification

### Cache Management
- Purge Cloudflare cache after significant updates
- Monitor cache hit ratios and optimize rules
- Update cache headers in vercel.json as needed

### Security Updates
- Monitor Vercel and Cloudflare security announcements
- Apply security patches promptly
- Review access permissions quarterly

## 📞 Support Contacts

- **Vercel Support**: [vercel.com/help](https://vercel.com/help)
- **Cloudflare Support**: [support.cloudflare.com](https://support.cloudflare.com)
- **Internal Team**: CollabOps DevOps team via GitHub Issues

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [Task Master Research Report](./.taskmaster/docs/research/) - Detailed 2024 best practices 