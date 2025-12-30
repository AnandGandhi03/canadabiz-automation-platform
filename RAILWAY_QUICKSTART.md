# 🚂 Railway Quick Start - 2 Minutes to Deploy

The **fastest** way to deploy CanadaBiz Automation Platform.

---

## ⚡ Super Quick Deploy (2 Minutes)

### 1️⃣ Click Deploy Button

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/AnandGandhi03/canadabiz-automation-platform)

### 2️⃣ Login with GitHub

- Click "Login with GitHub"
- Authorize Railway

### 3️⃣ Deploy

- Click "Deploy Now"
- Wait ~2 minutes

### 4️⃣ Add JWT Secret

**Generate secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Add to Railway:**
1. Go to Variables tab
2. Add variable:
   - Name: `JWT_SECRET`
   - Value: [paste generated secret]
3. Click "Add"

### 5️⃣ Setup Database

**Using Railway CLI:**
```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Setup database
railway run psql $DATABASE_URL -f database/schema.sql
```

**Or manually in Railway dashboard:**
1. Click PostgreSQL service
2. Go to "Data" → "Query"
3. Copy/paste contents from `database/schema.sql`
4. Click "Run Query"

### 6️⃣ Get Your URL

1. Go to Settings → Domains
2. Click "Generate Domain"
3. Your app is live at: `https://your-app.up.railway.app`

---

## ✅ Verify Deployment

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

## 🎯 What Railway Does Automatically

✅ Creates PostgreSQL database  
✅ Sets DATABASE_URL environment variable  
✅ Installs dependencies (npm install)  
✅ Builds application  
✅ Deploys to production  
✅ Generates HTTPS URL  
✅ Enables auto-deploy on Git push  
✅ Provides SSL certificate  
✅ Sets up monitoring  

---

## 🔧 Optional: Add More Features

### Enable AI Recommendations

1. Get OpenAI API key: https://platform.openai.com/api-keys
2. Add to Railway Variables:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-your-key`

### Enable Email Notifications

Add to Railway Variables:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

**Get Gmail App Password:**
1. Enable 2FA: https://myaccount.google.com/security
2. Generate app password: https://myaccount.google.com/apppasswords

---

## 💰 Cost

**Free Tier:**
- $5 free credits/month
- 500 hours usage
- Perfect for getting started

**Your app will cost ~$0.34/month** (covered by free tier!)

---

## 📚 Full Documentation

For detailed instructions, see:
- **[RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)** - Complete guide
- **[QUICKSTART.md](QUICKSTART.md)** - General quick start
- **[README.md](README.md)** - Full documentation

---

## 🆘 Troubleshooting

### Deployment Failed?
```bash
# Check logs
railway logs
```

### Database Connection Error?
```bash
# Verify DATABASE_URL is set
railway variables

# Test connection
railway run psql $DATABASE_URL -c "SELECT 1"
```

### Need Help?
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/AnandGandhi03/canadabiz-automation-platform/issues

---

## 🎉 You're Live!

Your CanadaBiz Automation Platform is now running on Railway!

**Next Steps:**
1. Visit your app URL
2. Create an account
3. Build your first workflow
4. Get AI recommendations

**Happy Automating! 🚀**