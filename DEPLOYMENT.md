# SnapPortfolio Deployment Guide

## 🚀 Deployment Options

### Recommended Stack
- **Frontend**: Vercel
- **Backend**: Railway / Render / AWS EC2
- **Database**: MongoDB Atlas
- **Cache**: Upstash Redis
- **Storage**: Cloudinary

---

## 📦 **Part 1: Database Setup**

### MongoDB Atlas

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (all IPs)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/snapportfolio
   ```

### Upstash Redis

1. Go to [upstash.com](https://upstash.com)
2. Create Redis database
3. Copy connection string:
   ```
   redis://:password@endpoint:port
   ```

---

## 🎨 **Part 2: External Services**

### Cloudinary (Image Upload)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret

### GitHub OAuth App

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Create New OAuth App
3. Settings:
   - **Homepage URL**: `https://your-domain.com`
   - **Callback URL**: `https://your-domain.com/api/auth/callback/github`
4. Save Client ID and Client Secret

### Google OAuth (Optional)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create project
3. Enable Google+ API
4. Create OAuth credentials
5. Add authorized redirect URI:
   ```
   https://your-domain.com/api/auth/callback/google
   ```

---

## 🔧 **Part 3: Backend Deployment**

### Option A: Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to server directory
cd server

# Initialize project
railway init

# Add environment variables via Railway dashboard
railway variables set MONGODB_URI=your-mongodb-uri
railway variables set REDIS_URL=your-redis-url
railway variables set JWT_SECRET=your-secret
railway variables set ENCRYPTION_KEY=your-key
# ... add all variables from server/.env.example

# Deploy
railway up
```

**Railway Environment Variables**:
```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://...
REDIS_URL=redis://...
JWT_SECRET=your-secret
ENCRYPTION_KEY=your-32-char-key
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Option B: Render

1. Create account at [render.com](https://render.com)
2. New Web Service
3. Connect GitHub repo
4. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
5. Add environment variables in Render dashboard

### Option C: AWS EC2

```bash
# SSH into EC2
ssh ubuntu@your-ip

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Clone repo
git clone your-repo-url
cd snapportfolio/server

# Install dependencies
pnpm install

# Build
pnpm build

# Setup PM2
npm install -g pm2
pm2 start dist/server.js --name snapportfolio-api
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo apt install nginx
# Configure nginx to proxy port 80 to 4000
```

---

## 🌐 **Part 4: Frontend Deployment (Vercel)**

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from root directory
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: snapportfolio
# - Directory: ./ (root)
# - Override settings? No

# Production deployment
vercel --prod
```

### Vercel Environment Variables

Add these in Vercel Dashboard (Settings → Environment Variables):

```env
# App URLs
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
API_URL=https://your-backend-url.railway.app

# NextAuth
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Update OAuth Callback URLs

After deployment, update:

1. **GitHub OAuth App**:
   - Homepage: `https://your-app.vercel.app`
   - Callback: `https://your-app.vercel.app/api/auth/callback/github`

2. **Google OAuth**:
   - Authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`

---

## 🔐 **Part 5: Security Checklist**

- [ ] Change all default secrets
- [ ] Enable CORS only for your frontend domain
- [ ] Set secure cookies in production
- [ ] Enable rate limiting
- [ ] Setup SSL/TLS (auto with Vercel/Railway)
- [ ] Whitelist IPs in MongoDB if possible
- [ ] Never commit `.env` files
- [ ] Use environment variables for all secrets
- [ ] Setup monitoring (Sentry, LogRocket)

---

## 📊 **Part 6: Post-Deployment**

### DNS Configuration (Custom Domains)

**For Main App**:
1. Add domain in Vercel dashboard
2. Add DNS records from Vercel:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

**For Portfolio Subdomains**:
1. Add wildcard DNS record:
   ```
   Type: CNAME
   Name: *.snapportfolio
   Value: cname.vercel-dns.com
   ```

### Monitoring Setup

**Backend Logs**:
```bash
# Railway
railway logs

# PM2 on EC2
pm2 logs snapportfolio-api
```

**Error Tracking**:
- Setup [Sentry](https://sentry.io) for error tracking
- Add Sentry DSN to environment variables

**Performance**:
- Setup [Vercel Analytics](https://vercel.com/analytics)
- Monitor MongoDB slow queries in Atlas

---

## 🧪 **Part 7: Testing Deployment**

### Frontend Tests
```bash
# Test build locally
pnpm build
pnpm start

# Open http://localhost:3000
# - Landing page loads
# - Can login with GitHub
# - Dashboard displays
# - Editor works
```

### Backend Tests
```bash
# Health check
curl https://your-backend.railway.app/health

# Expected: {"status":"ok","timestamp":"..."}
```

### Full Flow Test
1. Sign up with GitHub
2. Generate portfolio
3. Edit portfolio
4. Publish
5. Visit public URL
6. Check analytics tracking

---

## 🔄 **Part 8: CI/CD Setup**

### Vercel (Frontend)
Auto-deploys on push to `main` branch.

### Railway (Backend)
```yaml
# railway.json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd server && pnpm install && pnpm build"
  },
  "deploy": {
    "startCommand": "cd server && pnpm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g @railway/cli
      - run: cd server && railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 📝 **Environment Variables Checklist**

### Frontend (.env.local)
```env
✓ NEXT_PUBLIC_APP_URL
✓ NEXT_PUBLIC_API_URL
✓ API_URL
✓ NEXTAUTH_URL
✓ NEXTAUTH_SECRET
✓ GITHUB_CLIENT_ID
✓ GITHUB_CLIENT_SECRET
✓ GOOGLE_CLIENT_ID (optional)
✓ GOOGLE_CLIENT_SECRET (optional)
```

### Backend (.env)
```env
✓ NODE_ENV
✓ PORT
✓ MONGODB_URI
✓ REDIS_URL
✓ JWT_SECRET
✓ ENCRYPTION_KEY
✓ CLOUDINARY_CLOUD_NAME
✓ CLOUDINARY_API_KEY
✓ CLOUDINARY_API_SECRET
✓ FRONTEND_URL
✓ SMTP_HOST (optional, for emails)
✓ SMTP_USER (optional)
✓ SMTP_PASS (optional)
```

---

## 🚨 **Troubleshooting**

### Issue: 502 Bad Gateway
- Check backend is running: `railway logs`
- Verify CORS settings include frontend URL
- Check MongoDB connection string

### Issue: Authentication Not Working
- Verify OAuth callback URLs match exactly
- Check NEXTAUTH_SECRET is set
- Ensure cookies are allowed (secure in production)

### Issue: Slow Performance
- Check MongoDB indexes are created
- Verify Redis is caching GitHub API calls
- Enable Vercel Edge Caching
- Optimize images with Next.js Image component

### Issue: Build Failures
- Check all dependencies are in `package.json`
- Verify Node version (20+)
- Check for TypeScript errors: `pnpm lint`

---

## 📊 **Cost Estimates**

### Free Tier (Good for MVP)
- **Vercel**: Free (Hobby plan)
- **Railway**: $5/month after trial
- **MongoDB Atlas**: Free (512MB)
- **Upstash Redis**: Free (10K commands/day)
- **Cloudinary**: Free (25 credits/month)

**Total: ~$5/month**

### Production Scale (~1000 users)
- **Vercel**: $20/month (Pro)
- **Railway**: $20/month
- **MongoDB Atlas**: $9/month (M2)
- **Upstash Redis**: $10/month
- **Cloudinary**: $0 (free tier sufficient)

**Total: ~$59/month**

---

## ✅ **Deployment Checklist**

- [ ] MongoDB Atlas database created
- [ ] Upstash Redis created
- [ ] Cloudinary account setup
- [ ] GitHub OAuth app created
- [ ] Backend deployed to Railway/Render
- [ ] Frontend deployed to Vercel
- [ ] All environment variables set
- [ ] OAuth callback URLs updated
- [ ] DNS configured (if custom domain)
- [ ] Test signup flow
- [ ] Test portfolio generation
- [ ] Test public portfolio access
- [ ] Analytics tracking works
- [ ] Error monitoring setup

---

## 🎉 **You're Live!**

Once deployed, share your app:
- Landing page: `https://your-app.vercel.app`
- Example portfolio: `https://your-app.vercel.app/p/username`
- Dashboard: `https://your-app.vercel.app/dashboard`

---

**Need help?** Check the main [README.md](./README.md) or [SETUP.md](./SETUP.md)
