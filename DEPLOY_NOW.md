# 🚀 Deploy to Railway - Simple Instructions

## You DON'T Need to Select a Template!

Railway will automatically detect your project configuration. Just follow these steps:

---

## 📝 Method 1: Direct GitHub Deploy (Recommended)

### Step 1: Go to Railway
Visit: https://railway.app

### Step 2: Login
Click **"Login"** → **"Login with GitHub"**

### Step 3: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Click **"Configure GitHub App"**
4. Select repository: **`canadabiz-automation-platform`**
5. Click **"Deploy Now"**

### Step 4: Add PostgreSQL Database
1. In your project, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway automatically sets `DATABASE_URL`

### Step 5: Add JWT Secret
1. Click on your app service (not database)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add:
   ```
   Variable Name: JWT_SECRET
   Value: [paste secret below]
   ```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste as the value.

### Step 6: Setup Database Schema

**Option A: Using Railway CLI (Easiest)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Setup database
railway run psql $DATABASE_URL -f database/schema.sql
```

**Option B: Manual in Dashboard**
1. Click PostgreSQL service
2. Go to **"Data"** tab
3. Click **"Query"**
4. Copy all content from `database/schema.sql` file
5. Paste and click **"Run Query"**

### Step 7: Get Your URL
1. Click on your app service
2. Go to **"Settings"** tab
3. Scroll to **"Domains"**
4. Click **"Generate Domain"**
5. Your app is live at: `https://your-app.up.railway.app`

### Step 8: Test
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

---

## 🎯 Method 2: Using Railway Button (Even Easier!)

### Step 1: Click This Button

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/AnandGandhi03/canadabiz-automation-platform)

### Step 2: Login with GitHub

### Step 3: Click "Deploy Now"

Railway will automatically:
- ✅ Create your project
- ✅ Add PostgreSQL database
- ✅ Set DATABASE_URL
- ✅ Deploy your app

### Step 4: Add JWT_SECRET (same as Method 1, Step 5)

### Step 5: Setup Database Schema (same as Method 1, Step 6)

### Step 6: Done! Your app is live!

---

## ❓ FAQ

### Q: Which template should I select?
**A:** You don't select a template! Railway automatically detects your project type from:
- `package.json` (Node.js project)
- `railway.toml` (Railway config)
- `nixpacks.toml` (Build config)

### Q: What if Railway asks me to choose?
**A:** If you see template options, choose:
- **"Deploy from GitHub repo"** (not a template)
- Then select your repository

### Q: Do I need to configure anything?
**A:** Railway auto-configures everything! You only need to:
1. Add JWT_SECRET variable
2. Setup database schema

### Q: How much does it cost?
**A:** FREE! Railway gives you:
- $5 free credits/month
- 500 hours of usage
- Your app costs ~$0.34/month (covered by free tier)

### Q: What if I get stuck?
**A:** Check these guides:
- [RAILWAY_QUICKSTART.md](RAILWAY_QUICKSTART.md) - 2-minute guide
- [RAILWAY_VISUAL_GUIDE.md](RAILWAY_VISUAL_GUIDE.md) - Visual walkthrough
- [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - Complete guide

---

## 🔧 What Railway Auto-Detects

When you deploy, Railway automatically:

✅ **Detects Node.js** (from package.json)  
✅ **Installs dependencies** (npm install)  
✅ **Sets PORT** (automatically)  
✅ **Runs start command** (npm start)  
✅ **Enables health checks** (/api/health)  
✅ **Provides SSL** (HTTPS)  
✅ **Auto-deploys** (on Git push)  

---

## 📊 Your Project Configuration

Railway uses these files (already in your repo):

| File | Purpose |
|------|---------|
| `package.json` | Tells Railway it's a Node.js app |
| `railway.toml` | Railway-specific config |
| `nixpacks.toml` | Build configuration |
| `Procfile` | Backup start command |

**You don't need to do anything with these files!** They're already configured.

---

## ✅ Deployment Checklist

```
☐ Go to railway.app
☐ Login with GitHub
☐ Click "New Project"
☐ Select "Deploy from GitHub repo"
☐ Choose your repository
☐ Click "Deploy Now"
☐ Add PostgreSQL database
☐ Add JWT_SECRET variable
☐ Setup database schema
☐ Generate domain
☐ Test your app
☐ Done! 🎉
```

---

## 🎉 That's It!

**No template selection needed!**  
**Railway handles everything automatically!**

Just follow the steps above and you'll be live in 5 minutes.

---

## 🆘 Need Help?

**Quick Guides:**
- [RAILWAY_QUICKSTART.md](RAILWAY_QUICKSTART.md) - Fastest method
- [RAILWAY_VISUAL_GUIDE.md](RAILWAY_VISUAL_GUIDE.md) - Step-by-step with visuals

**Support:**
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/AnandGandhi03/canadabiz-automation-platform/issues

---

**Ready? Let's deploy! 🚀**

Click here → https://railway.app