# 🚀 Quick Start Guide - CanadaBiz Automation Platform

Get your automation platform running in **under 5 minutes**!

## 🎯 Choose Your Path

### Path 1: Railway (Fastest - 2 minutes)

1. **Click Deploy Button:**
   - Visit: https://github.com/AnandGandhi03/canadabiz-automation-platform
   - Click "Deploy on Railway" button

2. **Configure:**
   - Railway auto-creates PostgreSQL database
   - Add these environment variables:
     ```
     JWT_SECRET=your-random-secret-key-here
     ```

3. **Done!** 🎉
   - Your app is live at: `https://your-app.railway.app`
   - Database is automatically configured

### Path 2: Docker (3 minutes)

```bash
# Clone repository
git clone https://github.com/AnandGandhi03/canadabiz-automation-platform.git
cd canadabiz-automation-platform

# Start everything (app + database)
docker-compose up -d

# Visit http://localhost:3000
```

**That's it!** Database schema is auto-created.

### Path 3: Local Development (5 minutes)

```bash
# 1. Clone repository
git clone https://github.com/AnandGandhi03/canadabiz-automation-platform.git
cd canadabiz-automation-platform

# 2. Install dependencies
npm install

# 3. Set up PostgreSQL
createdb canadabiz
psql canadabiz -f database/schema.sql

# 4. Configure environment
cp .env.example .env
# Edit .env:
DATABASE_URL=postgresql://localhost:5432/canadabiz
JWT_SECRET=your-secret-key

# 5. Start server
npm start

# Visit http://localhost:3000
```

## 📝 First Steps After Installation

### 1. Create Your Account

**Via Dashboard:**
- Visit `http://localhost:3000` (or your deployed URL)
- Click "Register" (you'll need to add this to the UI)

**Via API:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "you@example.com",
    "password": "securePassword123",
    "fullName": "Your Name",
    "companyName": "Your Company",
    "province": "Ontario"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

**Save your token!** You'll need it for API calls.

### 2. Create Your First Workflow

**Via Dashboard:**
1. Fill out the "Create New Automation" form
2. Select automation type (e.g., "Email Marketing")
3. Add description
4. Set schedule (e.g., `0 9 * * *` for daily at 9 AM)
5. Click "Create Automation"

**Via API:**
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "your-business-id",
    "name": "Daily Sales Report",
    "type": "reporting",
    "description": "Automated daily sales summary",
    "schedule": "0 9 * * *",
    "config": {
      "emailRecipients": ["you@example.com"]
    }
  }'
```

### 3. Get AI Recommendations

**Via Dashboard:**
1. Select automation type
2. Click "Get AI Recommendations"
3. View personalized suggestions

**Via API:**
```bash
curl -X POST http://localhost:3000/api/ai/optimize \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "your-business-id",
    "type": "email-marketing",
    "data": {
      "openRate": 0.18,
      "clickRate": 0.03
    }
  }'
```

## 🎨 Customize Your Platform

### Add Your Branding

Edit `public/index.html`:
```html
<!-- Change title -->
<h1>🍁 Your Company Automation</h1>

<!-- Change colors -->
<style>
  .header h1 {
    color: #YOUR_COLOR;
  }
</style>
```

### Configure Email Service

Edit `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Gmail Setup:**
1. Enable 2-factor authentication
2. Generate app password: https://myaccount.google.com/apppasswords
3. Use app password in `SMTP_PASS`

### Add OpenAI Integration

Edit `.env`:
```env
OPENAI_API_KEY=sk-your-openai-api-key
```

Get API key: https://platform.openai.com/api-keys

**Note:** Platform works without OpenAI (uses fallback recommendations)

## 🧪 Test Your Installation

### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

**Expected:**
```json
{
  "status": "healthy",
  "message": "CanadaBiz Automation Platform API",
  "version": "1.0.0"
}
```

### 2. Database Connection
```bash
# Check if tables exist
psql $DATABASE_URL -c "\dt"
```

**Expected:** List of 7 tables (users, businesses, workflows, etc.)

### 3. Create Test Workflow
Use the API example from step 2 above.

## 📊 Monitor Your Platform

### View Logs

**Railway:**
```bash
railway logs
```

**Docker:**
```bash
docker-compose logs -f
```

**Local:**
Check terminal output

### Check Workflow Executions

```bash
curl http://localhost:3000/api/workflows/WORKFLOW_ID/executions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔧 Common Issues & Solutions

### Issue: Database connection failed

**Solution:**
```bash
# Check DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Change port in .env
PORT=3001

# Or kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Issue: JWT token invalid

**Solution:**
- Ensure JWT_SECRET is set in .env
- Token expires after 7 days - login again
- Check Authorization header format: `Bearer <token>`

### Issue: Workflow not executing

**Solution:**
```bash
# Check cron expression is valid
# Use: https://crontab.guru/

# Check workflow status
curl http://localhost:3000/api/workflows \
  -H "Authorization: Bearer YOUR_TOKEN"

# Verify workflow is "active"
```

## 📚 Next Steps

1. **Read Full Documentation:**
   - [API Documentation](API.md)
   - [Feature List](FEATURES.md)
   - [Deployment Guide](DEPLOYMENT.md)

2. **Explore Automation Types:**
   - Email Marketing
   - Inventory Management
   - Customer Service
   - Social Media
   - Reporting
   - Invoicing

3. **Set Up Integrations:**
   - Email service (SMTP)
   - AI service (OpenAI)
   - Payment processing (coming soon)

4. **Deploy to Production:**
   - Railway (recommended)
   - Vercel + Supabase
   - Heroku
   - DigitalOcean

## 💡 Pro Tips

1. **Start Simple:** Create one workflow, test it, then expand
2. **Use AI Recommendations:** They're tailored for Canadian businesses
3. **Monitor Executions:** Check execution history regularly
4. **Set Up Email Alerts:** Get notified when workflows complete
5. **Backup Database:** Set up automated backups (Railway/Heroku do this automatically)

## 🆘 Need Help?

- **Documentation:** Check README.md and API.md
- **Issues:** https://github.com/AnandGandhi03/canadabiz-automation-platform/issues
- **Email:** support@canadabiz.io

## 🎉 You're Ready!

Your automation platform is now running. Start creating workflows and watch your business efficiency soar!

**Happy Automating! 🚀**