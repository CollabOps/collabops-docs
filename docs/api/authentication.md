---
sidebar_position: 1
title: Authentication
description: Learn how to authenticate with the CollabOps API
---

# API Authentication

CollabOps API supports multiple authentication methods to ensure secure access to your data and resources.

## 🔑 Authentication Methods

### 1. API Keys (Recommended)

API keys are the simplest way to authenticate with CollabOps API.

#### Getting Your API Key

1. **Login** to your CollabOps dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **"Generate New API Key"**
4. **Copy** and store your key securely
5. **Set permissions** for the key (read, write, admin)

#### Using API Keys

Include your API key in the request header:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     https://api.collabops.ai/v1/projects
```

```javascript
// JavaScript/Node.js
const response = await fetch('https://api.collabops.ai/v1/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
```

```python
# Python
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.collabops.ai/v1/projects', headers=headers)
```

### 2. OAuth 2.0

For applications that need to access user data on behalf of users.

#### OAuth Flow

1. **Register your application** in CollabOps Developer Console
2. **Redirect users** to authorization URL:

```
https://api.collabops.ai/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  response_type=code&
  scope=read+write
```

3. **Exchange authorization code** for access token:

```bash
curl -X POST https://api.collabops.ai/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "code=AUTHORIZATION_CODE" \
  -d "redirect_uri=YOUR_REDIRECT_URI"
```

4. **Use access token** in API requests:

```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
     https://api.collabops.ai/v1/user/profile
```

### 3. JWT Tokens

For server-to-server authentication and custom integrations.

#### Generating JWT

```javascript
const jwt = require('jsonwebtoken');

const payload = {
  iss: 'your-client-id',
  sub: 'user-id',
  aud: 'https://api.collabops.ai',
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
  iat: Math.floor(Date.now() / 1000)
};

const token = jwt.sign(payload, 'your-secret-key', { algorithm: 'HS256' });
```

#### Using JWT

```bash
curl -H "Authorization: Bearer JWT_TOKEN" \
     https://api.collabops.ai/v1/projects
```

## 🔒 Security Best Practices

### API Key Security

- ✅ **Store securely**: Never commit API keys to version control
- ✅ **Rotate regularly**: Update API keys every 90 days
- ✅ **Use environment variables**: Store keys in env files
- ✅ **Limit permissions**: Grant minimum required permissions
- ❌ **Never expose**: Don't include keys in client-side code

```bash
# Good: Use environment variables
export COLLABOPS_API_KEY="your-api-key"

# Good: In your application
const apiKey = process.env.COLLABOPS_API_KEY;
```

### OAuth Security

- ✅ **Use HTTPS**: Always use secure redirect URIs
- ✅ **Validate state**: Implement CSRF protection
- ✅ **Short-lived tokens**: Use reasonable expiration times
- ✅ **Refresh tokens**: Implement token refresh flow

### Rate Limiting

All authentication methods are subject to rate limits:

- **API Keys**: 1000 requests/hour
- **OAuth**: 5000 requests/hour  
- **JWT**: 2000 requests/hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 📝 Examples

### Complete API Key Example

```javascript
class CollabOpsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.collabops.ai/v1';
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getProjects() {
    return this.request('/projects');
  }

  async createProject(project) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  }
}

// Usage
const client = new CollabOpsClient(process.env.COLLABOPS_API_KEY);
const projects = await client.getProjects();
```

### OAuth Flow Example

```javascript
// Express.js OAuth implementation
app.get('/auth/collabops', (req, res) => {
  const authURL = 'https://api.collabops.ai/oauth/authorize' +
    '?client_id=' + CLIENT_ID +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
    '&response_type=code' +
    '&scope=read+write';
  
  res.redirect(authURL);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  const tokenResponse = await fetch('https://api.collabops.ai/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI
    })
  });
  
  const { access_token } = await tokenResponse.json();
  // Store access_token securely and use for API calls
});
```

## ❗ Error Handling

### Common Authentication Errors

```json
// 401 Unauthorized
{
  "error": "unauthorized",
  "message": "Invalid or missing API key",
  "code": "AUTH_001"
}

// 403 Forbidden  
{
  "error": "forbidden", 
  "message": "Insufficient permissions for this resource",
  "code": "AUTH_002"
}

// 429 Rate Limited
{
  "error": "rate_limited",
  "message": "Too many requests",
  "code": "RATE_001", 
  "retry_after": 3600
}
```

### Handling Expired Tokens

```javascript
async function makeAuthenticatedRequest(url, token) {
  try {
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.status === 401) {
      // Token expired, refresh or re-authenticate
      const newToken = await refreshToken();
      return makeAuthenticatedRequest(url, newToken);
    }
    
    return response.json();
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}
```

## 🛠️ Testing Authentication

Use our authentication tester endpoint:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.collabops.ai/v1/auth/test
```

Response:
```json
{
  "authenticated": true,
  "user_id": "user_123",
  "permissions": ["read", "write"],
  "expires_at": "2024-01-01T00:00:00Z"
}
```

---

**Next Steps:**
- [API Reference](/docs/api) - Explore all available endpoints
- [SDKs](/docs/api/sdks) - Use our official client libraries
- [Webhooks](/docs/api/webhooks) - Set up real-time notifications 