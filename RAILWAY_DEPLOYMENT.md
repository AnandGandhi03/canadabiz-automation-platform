# 🚂 Railway Deployment Guide - Step by Step

Complete guide to deploy CanadaBiz Automation Platform on Railway in **under 5 minutes**.

---

## 📋 Prerequisites

- GitHub account
- Railway account (free tier available)
- This repository forked or accessible

---

## 🚀 Method 1: One-Click Deploy (Fastest - 2 Minutes)

### Step 1: Click Deploy Button

Visit the repository and click:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/AnandGandhi03/canadabiz-automation-platform)

### Step 2: Connect GitHub

1. Railway will ask you to login
2. Click "Login with GitHub"
3. Authorize Railway to access your repositories

### Step 3: Configure Template

Railway will show you the template configuration:

1. **Project Name:** `canadabiz-automation` (or your choice)
2. **Repository:** Select where to deploy from
3. Click **"Deploy Now"**

### Step 4: Wait for Deployment

Railway will automatically:
- ✅ Create PostgreSQL database
- ✅ Set DATABASE_URL environment variable
- ✅ Install dependencies
- ✅ Deploy your application
- ✅ Generate public URL

**Time:** ~2 minutes

### Step 5: Add Environment Variables

1. Go to your project dashboard
2. Click on your service (canadabiz-automation)
3. Go to **"Variables"** tab
4. Click **"+ New Variable"**
5. Add:

```
JWT_SECRET
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste as value.

6. Click **"Add"**

### Step 6: Redeploy

1. Railway will auto-redeploy with new variables
2. Wait ~1 minute for deployment

### Step 7: Access Your Platform

1. Go to **"Settings"** tab
2. Find **"Domains"** section
3. Click **"Generate Domain"**
4. Your app will be live at: `https://your-app.up.railway.app`

**Done! 🎉**

---

## 🛠️ Method 2: Manual Deploy (5 Minutes)

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Login with GitHub

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **"Configure GitHub App"**
4. Select your repository: `canadabiz-automation-platform`
5. Click **"Deploy Now"**

### Step 3: Add PostgreSQL Database

1. In your project dashboard, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway creates database and sets `DATABASE_URL` automatically

### Step 4: Configure Environment Variables

1. Click on your service (not the database)
2. Go to **"Variables"** tab
3. You'll see `DATABASE_URL` already set (from PostgreSQL)
4. Click **"+ New Variable"**

**Add these variables:**

**Required:**
```
Variable Name: JWT_SECRET
Value: [Generate with command below]
```

**Generate JWT Secret:**
```bash
# Run this in your terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use this online: https://randomkeygen.com/
```

**Optional (for AI features):**
```
Variable Name: OPENAI_API_KEY
Value: sk-your-openai-api-key
```

**Optional (for email):**
```
Variable Name: SMTP_HOST
Value: smtp.gmail.com

Variable Name: SMTP_PORT
Value: 587

Variable Name: SMTP_USER
Value: your-email@gmail.com

Variable Name: SMTP_PASS
Value: your-gmail-app-password
```

5. Click **"Add"** for each variable

### Step 5: Setup Database Schema

Railway doesn't auto-run migrations, so we need to set up the database:

**Option A: Using Railway CLI (Recommended)**

1. **Install Railway CLI:**
```bash
# macOS/Linux
curl -fsSL https://railway.app/install.sh | sh

# Windows (PowerShell)
iwr https://railway.app/install.ps1 | iex

# Or with npm
npm install -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Link to your project:**
```bash
railway link
# Select your project from the list
```

4. **Run database schema:**
```bash
railway run psql $DATABASE_URL -f database/schema.sql
```

**Option B: Using Railway Dashboard**

1. Go to your PostgreSQL database service
2. Click **"Data"** tab
3. Click **"Query"**
4. Copy contents of `database/schema.sql` from your repository
5. Paste into query editor
6. Click **"Run Query"**

**Option C: Using Local psql**

1. Get DATABASE_URL from Railway:
   - Click on PostgreSQL service
   - Go to **"Variables"** tab
   - Copy `DATABASE_URL` value

2. Run locally:
```bash
psql "postgresql://postgres:xxx@containers-us-west-xxx.railway.app:5432/railway" -f database/schema.sql
```

### Step 6: Generate Public Domain

1. Click on your service (canadabiz-automation)
2. Go to **"Settings"** tab
3. Scroll to **"Domains"** section
4. Click **"Generate Domain"**
5. Railway creates: `https://your-app-name.up.railway.app`

### Step 7: Verify Deployment

1. Visit your generated domain
2. You should see the CanadaBiz dashboard
3. Test API health:
```bash
curl https://your-app.up.railway.app/api/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "message": "CanadaBiz Automation Platform API",
  "version": "1.0.0"
}
```

**Deployment Complete! 🎉**

---

## 🔧 Post-Deployment Configuration

### Add Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Click **"Custom Domain"**
3. Enter your domain: `app.yourdomain.com`
4. Add CNAME record to your DNS:
   ```
   Type: CNAME
   Name: app
   Value: your-app.up.railway.app
   ```
5. Wait for DNS propagation (~5-10 minutes)

### Enable SSL (Automatic)

Railway automatically provides SSL certificates for:
- ✅ Generated domains (*.up.railway.app)
- ✅ Custom domains (after DNS verification)

### Set Up Monitoring

1. Go to **"Observability"** tab
2. View:
   - Deployment logs
   - Resource usage (CPU, Memory)
   - Request metrics
   - Error tracking

### Configure Automatic Deployments

Railway automatically deploys when you push to GitHub:

1. Go to **"Settings"** → **"Service"**
2. **"Source"** section shows:
   - Connected repository
   - Branch (usually `main`)
   - Auto-deploy: **Enabled** ✅

**To trigger deployment:**
```bash
git push origin main
```

Railway will automatically:
1. Detect changes
2. Build application
3. Deploy new version
4. Zero-downtime deployment

---

## 📊 Monitoring Your Deployment

### View Logs

**In Railway Dashboard:**
1. Click on your service
2. Go to **"Deployments"** tab
3. Click on latest deployment
4. View real-time logs

**Using Railway CLI:**
```bash
railway logs
```

### Check Resource Usage

1. Go to **"Metrics"** tab
2. View:
   - CPU usage
   - Memory usage
   - Network traffic
   - Request count

### Monitor Database

1. Click on PostgreSQL service
2. Go to **"Metrics"** tab
3. View:
   - Database size
   - Connection count
   - Query performance

---

## 🧪 Testing Your Deployment

### Test 1: Health Check
```bash
curl https://your-app.up.railway.app/api/health
```

**Expected:**
```json
{
  "status": "healthy",
  "message": "CanadaBiz Automation Platform API"
}
```

### Test 2: Register User
```bash
curl -X POST https://your-app.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "fullName": "Test User",
    "companyName": "Test Company",
    "province": "Ontario"
  }'
```

**Expected:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Test 3: Create Workflow
```bash
# Use token from registration
curl -X POST https://your-app.up.railway.app/api/workflows \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "your-business-id",
    "name": "Test Workflow",
    "type": "email-marketing",
    "description": "Test automation",
    "schedule": "0 9 * * *"
  }'
```

### Test 4: Get AI Recommendations
```bash
curl -X POST https://your-app.up.railway.app/api/ai/optimize \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "your-business-id",
    "type": "email-marketing",
    "data": {}
  }'
```

---

## 💰 Railway Pricing

### Free Tier (Hobby Plan)
- **Cost:** $0/month
- **Includes:**
  - $5 free credits/month
  - 500 hours of usage
  - 512 MB RAM
  - 1 GB disk
  - Shared CPU

**Perfect for:**
- Development
- Testing
- Small projects
- Personal use

### Pro Plan
- **Cost:** $20/month
- **Includes:**
  - $20 credits included
  - Unlimited hours
  - Up to 8 GB RAM
  - Up to 50 GB disk
  - Priority support

**Perfect for:**
- Production apps
- Multiple projects
- Team collaboration
- Business use

### Usage-Based Pricing
- **Compute:** ~$0.000463/GB-hour
- **Database:** ~$0.000231/GB-hour
- **Network:** Free egress

**Estimated Monthly Costs:**

**Small Business:**
- App: 512 MB RAM × 730 hours = ~$0.17
- Database: 1 GB × 730 hours = ~$0.17
- **Total:** ~$0.34/month (covered by free tier)

**Medium Business:**
- App: 2 GB RAM × 730 hours = ~$0.68
- Database: 5 GB × 730 hours = ~$0.84
- **Total:** ~$1.52/month

---

## 🔧 Troubleshooting

### Issue: Deployment Failed

**Solution:**
1. Check **"Deployments"** tab for error logs
2. Common issues:
   - Missing dependencies in package.json
   - Build errors
   - Port configuration

**Fix:**
```bash
# Ensure package.json has all dependencies
npm install

# Test locally first
npm start
```

### Issue: Database Connection Error

**Solution:**
1. Verify DATABASE_URL is set:
   - Go to **"Variables"** tab
   - Check DATABASE_URL exists
2. Ensure PostgreSQL service is running
3. Check database schema is created:
```bash
railway run psql $DATABASE_URL -c "\dt"
```

### Issue: Environment Variables Not Working

**Solution:**
1. Go to **"Variables"** tab
2. Verify all required variables are set:
   - DATABASE_URL ✅
   - JWT_SECRET ✅
3. Click **"Redeploy"** after adding variables
4. Wait for deployment to complete

### Issue: 502 Bad Gateway

**Solution:**
1. Check if app is listening on correct port:
   - Railway sets PORT automatically
   - Ensure server.js uses `process.env.PORT`
2. Check logs for startup errors:
```bash
railway logs
```

### Issue: Database Schema Not Created

**Solution:**
```bash
# Using Railway CLI
railway run psql $DATABASE_URL -f database/schema.sql

# Or manually in Railway dashboard
# PostgreSQL service → Data → Query → Paste schema
```

### Issue: Custom Domain Not Working

**Solution:**
1. Verify DNS records:
```bash
dig app.yourdomain.com CNAME
```
2. Wait for DNS propagation (up to 48 hours)
3. Check Railway dashboard for verification status

---

## 🚀 Advanced Configuration

### Enable Automatic Backups

1. Click on PostgreSQL service
2. Go to **"Settings"**
3. Enable **"Automated Backups"** (Pro plan)

**Manual Backup:**
```bash
railway run pg_dump $DATABASE_URL > backup.sql
```

### Scale Your Application

**Vertical Scaling (More Resources):**
1. Go to service **"Settings"**
2. Adjust:
   - Memory limit
   - CPU allocation
3. Click **"Save"**

**Horizontal Scaling:**
- Railway doesn't support multiple instances on free tier
- Pro plan allows multiple replicas

### Set Up Staging Environment

1. Create new Railway project
2. Connect same repository
3. Use different branch: `staging`
4. Set different environment variables
5. Deploy staging version

### Configure Health Checks

Railway automatically monitors:
- HTTP health checks
- Process health
- Resource usage

**Custom health check:**
Already implemented at `/api/health`

### Set Up Alerts

1. Go to **"Settings"** → **"Notifications"**
2. Add webhook URL or email
3. Configure alerts for:
   - Deployment failures
   - High resource usage
   - Downtime

---

## 📚 Useful Railway Commands

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Run commands in Railway environment
railway run npm start

# Access database
railway run psql $DATABASE_URL

# Deploy manually
railway up

# View environment variables
railway variables

# Open project in browser
railway open
```

---

## 🎯 Deployment Checklist

- [ ] Railway account created
- [ ] Project deployed from GitHub
- [ ] PostgreSQL database added
- [ ] DATABASE_URL automatically set
- [ ] JWT_SECRET added to variables
- [ ] Database schema created
- [ ] Public domain generated
- [ ] Health check passing
- [ ] User registration tested
- [ ] Workflow creation tested
- [ ] AI recommendations tested
- [ ] Optional: Custom domain configured
- [ ] Optional: OPENAI_API_KEY added
- [ ] Optional: SMTP credentials added
- [ ] Monitoring enabled
- [ ] Backups configured

---

## 🌟 Your Platform is Live!

**Deployment URL:** `https://your-app.up.railway.app`

**Next Steps:**
1. Share URL with your team
2. Create your first workflows
3. Get AI recommendations
4. Monitor usage in Railway dashboard
5. Scale as needed

**Support:**
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Project Issues: https://github.com/AnandGandhi03/canadabiz-automation-platform/issues

---

**Congratulations! Your CanadaBiz Automation Platform is now live on Railway! 🎉🚂**