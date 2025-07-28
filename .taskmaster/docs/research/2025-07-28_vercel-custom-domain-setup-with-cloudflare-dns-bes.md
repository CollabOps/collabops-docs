---
title: Research Session
query: "Vercel custom domain setup with Cloudflare DNS best practices 2024"
date: 7/28/2025
time: 11:56:33 AM
timestamp: 2025-07-28T02:56:33.495Z
exchanges: 1
---

# Research Session

## Initial Query

**Question:** Vercel custom domain setup with Cloudflare DNS best practices 2024

**Response:**

# Vercel Custom Domain Setup with Cloudflare DNS: Best Practices 2024

## Introduction

Setting up a custom domain for a Vercel deployment using Cloudflare DNS is a common requirement for modern web applications, as is the case with the CollabOps documentation site. This comprehensive guide covers the best practices for 2024, focusing specifically on connecting the `docs.collabops.ai` subdomain to a Vercel deployment while leveraging Cloudflare's DNS management and security features. The integration between these two platforms has evolved over time, with both companies refining their offerings and integration points to provide developers with more options and better performance.

The relationship between Vercel and Cloudflare is particularly important to understand, as both provide CDN and edge functionality that can sometimes overlap or conflict if not configured properly. In 2024, the recommended approaches have been refined to ensure optimal performance, security, and reliability. This guide will walk through the entire process, from DNS configuration to SSL setup, with specific attention to potential pitfalls and optimization opportunities.

## Understanding the Vercel-Cloudflare Relationship

Before diving into the technical setup, it's important to understand how Vercel and Cloudflare interact when used together:

1. **DNS Management**: Cloudflare will serve as the DNS provider, managing the records that point your domain to Vercel's servers.
2. **CDN Layers**: Both Vercel and Cloudflare provide CDN capabilities. When used together, traffic typically flows through Cloudflare first, then to Vercel's edge network.
3. **SSL/TLS**: Both platforms offer SSL/TLS encryption. The recommended configuration in 2024 is to use "Full" SSL mode in Cloudflare with Vercel's automatic SSL.
4. **Caching**: Both platforms cache content, which requires careful configuration to prevent cache conflicts.

The key to a successful integration is to leverage each platform's strengths while avoiding configuration conflicts.

## Step 1: Vercel Project Configuration

Before configuring Cloudflare, ensure your Vercel project is properly set up:

1. **Verify Deployment**: Ensure your Vercel project is successfully deployed from the GitHub repository. Your CollabOps documentation site should be accessible via the default Vercel URL (typically `project-name.vercel.app`).

2. **Prepare for Domain Addition**: In Vercel's dashboard, navigate to your project settings:
   - Go to the "Domains" section
   - Have the project ready for adding `docs.collabops.ai`

3. **Note Vercel Nameservers**: Although you'll be using Cloudflare for DNS, it's good practice to note Vercel's nameservers for reference:
   ```
   a.vercel-dns.com
   b.vercel-dns.com
   c.vercel-dns.com
   ```

## Step 2: Cloudflare DNS Configuration

The DNS configuration in Cloudflare is critical for properly routing traffic to your Vercel deployment:

1. **Login to Cloudflare**: Access your Cloudflare dashboard and select the `collabops.ai` domain.

2. **Add CNAME Record**: In the DNS management section, add a new CNAME record with the following values:
   - **Type**: CNAME
   - **Name**: docs (this creates the subdomain `docs.collabops.ai`)
   - **Target**: Your Vercel project's default URL (e.g., `collabops-docs.vercel.app`)
   - **TTL**: Auto
   - **Proxy status**: Initially set to "DNS only" (gray cloud icon) until verification is complete

   ```
   Type    Name    Content                      TTL     Proxy status
   CNAME   docs    collabops-docs.vercel.app    Auto    DNS only
   ```

3. **2024 Best Practice - Additional Records**: For improved reliability, add these recommended records:
   - An additional CNAME record for the `www` subdomain if you want `www.docs.collabops.ai` to work
   - A TXT record for domain verification (Vercel will provide this during domain verification)

4. **Cloudflare Settings Optimization**:
   - Navigate to SSL/TLS section and set the encryption mode to "Full" (not "Full (strict)" initially)
   - In the Edge Certificates section, ensure "Always Use HTTPS" is enabled
   - Enable "Automatic HTTPS Rewrites" to prevent mixed content issues

## Step 3: Vercel Domain Configuration

With Cloudflare DNS configured, now set up the domain in Vercel:

1. **Add Custom Domain**: In your Vercel project:
   - Go to "Settings" > "Domains"
   - Enter `docs.collabops.ai` in the domain input field
   - Click "Add"

2. **Domain Verification**: Vercel will detect that you're using Cloudflare and provide specific verification instructions:
   - If prompted to add a TXT record for verification, add it to Cloudflare as instructed
   - The TXT record typically looks like:
     ```
     Type    Name                   Content                                TTL
     TXT     _vercel.docs           [verification string provided by Vercel] Auto
     ```

3. **Wait for Verification**: Domain verification can take 5-30 minutes to propagate. Vercel will automatically check and confirm when verification is complete.

4. **Configure Domain Settings in Vercel**:
   - Enable "Redirect to www" if you want all traffic to use the www subdomain
   - Alternatively, enable "Redirect to primary domain" if you want all traffic on the apex domain

## Step 4: SSL Configuration and Optimization

Proper SSL configuration is crucial for security and avoiding redirect loops:

1. **Vercel SSL**: Vercel automatically provisions SSL certificates through Let's Encrypt. No manual action is required on the Vercel side.

2. **Cloudflare SSL Configuration** (2024 Best Practice):
   - In Cloudflare, go to SSL/TLS > Overview
   - Set SSL mode to "Full" (not "Flexible" which can cause issues with Vercel)
   - After verification is complete and everything is working, you can upgrade to "Full (strict)" for maximum security

3. **Edge Certificates**: In Cloudflare:
   - Enable "Always Use HTTPS"
   - Set minimum TLS version to 1.2 (2024 security best practice)
   - Enable "Automatic HTTPS Rewrites"
   - Consider enabling "HSTS" after everything is working correctly (with caution, as it's hard to revert)

4. **Activate Cloudflare Proxy** (Orange Cloud):
   - Once everything is verified and working with SSL, return to the DNS section
   - Change the proxy status for your CNAME record from "DNS only" (gray cloud) to "Proxied" (orange cloud)
   - This enables Cloudflare's CDN, DDoS protection, and other security features

## Step 5: Performance Optimization (2024 Best Practices)

To maximize performance when using Vercel with Cloudflare in 2024:

1. **Cloudflare Page Rules**:
   - Create a page rule for `docs.collabops.ai/*` with the following settings:
     - Cache Level: Standard
     - Edge Cache TTL: a reasonable value based on how often your docs update (e.g., 2 hours)
     - Browser Cache TTL: 30 minutes

2. **Cloudflare Cache Configuration**:
   - In Caching > Configuration, set the following:
     - Browser Cache TTL: 30 minutes
     - Always Online: Enabled
     - Enable Origin Cache Control: Yes

3. **Vercel Analytics Integration**:
   - In Vercel, ensure Web Analytics is enabled for your domain
   - Add the Vercel Analytics script to your Docusaurus configuration if not automatically included

4. **Cloudflare Workers (Advanced)**:
   - Consider implementing a Cloudflare Worker to further optimize asset delivery
   - Example worker for optimizing Docusaurus sites:

   ```javascript
   addEventListener('fetch', event => {
     event.respondWith(handleRequest(event.request))
   })

   async function handleRequest(request) {
     // Add caching for static assets
     const url = new URL(request.url)
     if (url.pathname.match(/\.(js|css|png|jpg|svg|woff2)$/)) {
       const response = await fetch(request)
       const newResponse = new Response(response.body, response)
       newResponse.headers.set('Cache-Control', 'public, max-age=86400')
       return newResponse
     }
     return fetch(request)
   }
   ```

## Step 6: Testing and Verification

After configuration, thorough testing is essential:

1. **DNS Propagation Check**:
   - Use tools like [dnschecker.org](https://dnschecker.org/) to verify DNS propagation
   - Check that `docs.collabops.ai` resolves to Cloudflare's IP addresses (indicating the proxy is working)

2. **SSL Verification**:
   - Visit `https://docs.collabops.ai` and verify the SSL certificate is valid
   - Check for any mixed content warnings in browser console
   - Use [SSL Labs](https://www.ssllabs.com/ssltest/) to test SSL configuration quality

3. **Redirect Testing**:
   - Test that `http://docs.collabops.ai` redirects to `https://docs.collabops.ai`
   - If configured, test that www redirects work as expected

4. **Performance Testing**:
   - Use tools like [WebPageTest](https://www.webpagetest.org/) or Lighthouse to measure performance
   - Compare performance with and without Cloudflare proxy to ensure it's providing benefits

5. **Mobile Responsiveness**:
   - Verify the site works correctly on mobile devices
   - Test loading times on both fast and throttled connections

## Step 7: Monitoring and Maintenance

Ongoing monitoring ensures continued optimal performance:

1. **Set Up Monitoring**:
   - Configure Cloudflare Analytics to monitor traffic and performance
   - Set up Vercel Analytics to track deployment performance
   - Consider implementing uptime monitoring with a service like UptimeRobot

2. **Regular Certificate Checks**:
   - Although both Vercel and Cloudflare handle certificate renewal automatically, set calendar reminders to verify certificate status monthly

3. **Performance Audits**:
   - Schedule quarterly performance audits using Lighthouse or similar tools
   - Review Cloudflare Analytics for cache hit ratios and optimize as needed

4. **Security Updates**:
   - Keep informed about security updates from both Vercel and Cloudflare
   - Implement new security features as they become available

## Troubleshooting Common Issues

Even with careful setup, issues can arise. Here are solutions to common problems:

1. **DNS_PROBE_FINISHED_NXDOMAIN Error**:
   - Verify DNS records are correctly configured in Cloudflare
   - Check for typos in domain names
   - Ensure DNS propagation has completed (can take up to 48 hours in some regions)

2. **SSL Certificate Errors**:
   - Ensure Cloudflare SSL is set to "Full" not "Flexible"
   - Verify Vercel has issued its certificate correctly
   - Check for certificate name mismatch issues

3. **Redirect Loops**:
   - Common when both Cloudflare and Vercel are trying to enforce HTTPS
   - Solution: In Cloudflare, temporarily disable "Always Use HTTPS" and test again

4. **Slow Performance**:
   - Check cache hit rates in Cloudflare Analytics
   - Verify Cloudflare is properly caching static assets
   - Consider implementing a Cache-Control header strategy in your Docusaurus build

5. **Deployment Changes Not Reflecting**:
   - Purge Cloudflare cache after significant deployments
   - Add cache-busting parameters to critical resources

## Conclusion

Setting up `docs.collabops.ai` with Vercel and Cloudflare following 2024 best practices provides an optimal balance of performance, security, and reliability for your CollabOps documentation site. The configuration leverages Cloudflare's robust DNS management and security features while taking advantage of Vercel's streamlined deployment and hosting capabilities.

For the CollabOps project specifically, this setup aligns perfectly with Task 7 in your project context, providing a comprehensive implementation of the custom domain configuration. Once completed, you'll have a professional, secure, and high-performance documentation site accessible at `https://docs.collabops.ai` that integrates seamlessly with your existing Vercel deployment from GitHub.

Remember to document this setup process in your deployment documentation (Task 10) to ensure team members can understand and maintain the configuration in the future.


---

*Generated by Task Master Research Command*  
*Timestamp: 2025-07-28T02:56:33.495Z*
