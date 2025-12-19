# Deployment Guide - CanadaBiz Automation Platform

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. **Fork this repository**
2. **Go to [Railway.app](https://railway.app)**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select this repository**
5. **Add environment variables:**
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret-key-here
   OPENAI_API_KEY=sk-...
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   NODE_ENV=production
   ```
6. **Railway will auto-deploy!** ✅

### Option 2: Vercel + Supabase

1. **Database: Create Supabase project**
   - Go to [Supabase.com](https://supabase.com)
   - Create new project
   - Copy connection string
   - Run schema: `psql $DATABASE_URL -f database/schema.sql`

2. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

3. **Add environment variables in Vercel dashboard**

### Option 3: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create canadabiz-automation

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_USER=your-email
heroku config:set SMTP_PASS=your-password

# Deploy
git push heroku main

# Setup database
heroku pg:psql < database/schema.sql
```

### Option 4: DigitalOcean App Platform

1. **Connect GitHub repository**
2. **Configure build:**
   - Build Command: `npm install`
   - Run Command: `npm start`
3. **Add PostgreSQL database**
4. **Set environment variables**
5. **Deploy!**

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this

# AI (Optional - has fallbacks)
OPENAI_API_KEY=sk-your-openai-key

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=3000
NODE_ENV=production
```

## Database Setup

### PostgreSQL (Required)

**Option A: Supabase (Free tier available)**
```bash
# 1. Create project at supabase.com
# 2. Get connection string
# 3. Run schema
psql $DATABASE_URL -f database/schema.sql
```

**Option B: Railway PostgreSQL**
```bash
# Railway auto-provisions PostgreSQL
# Just run schema after deployment
railway run psql $DATABASE_URL -f database/schema.sql
```

**Option C: Local PostgreSQL**
```bash
createdb canadabiz
psql canadabiz -f database/schema.sql
```

## Post-Deployment Checklist

- [ ] Database schema created
- [ ] Environment variables set
- [ ] Health check working: `https://your-app.com/api/health`
- [ ] Test user registration
- [ ] Test workflow creation
- [ ] Test AI recommendations
- [ ] Email service configured (optional)
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)

## Monitoring & Logs

### Railway
```bash
railway logs
```

### Heroku
```bash
heroku logs --tail
```

### Vercel
Check dashboard at vercel.com/dashboard

## Scaling

### Database
- Start: Free tier (Supabase/Railway)
- Growth: Upgrade to paid tier
- Scale: Read replicas, connection pooling

### Server
- Railway: Auto-scales
- Heroku: Add dynos
- Vercel: Serverless auto-scales

## Backup Strategy

```bash
# Automated daily backups (Railway/Heroku)
# Manual backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## Security Checklist

- [ ] Change JWT_SECRET from default
- [ ] Use strong database password
- [ ] Enable SSL for database
- [ ] Set up CORS properly
- [ ] Enable rate limiting (already configured)
- [ ] Use environment variables (never commit secrets)
- [ ] Enable Helmet security headers (already configured)
- [ ] Regular dependency updates

## Custom Domain

### Railway
1. Go to project settings
2. Add custom domain
3. Update DNS records

### Vercel
1. Project settings → Domains
2. Add domain
3. Configure DNS

## Cost Estimates (Monthly)

**Free Tier:**
- Railway: $0 (500 hours free)
- Supabase: $0 (500MB database)
- Vercel: $0 (hobby tier)
- **Total: $0/month** ✅

**Production:**
- Railway Pro: $5-20
- Supabase Pro: $25
- Vercel Pro: $20
- **Total: $50-65/month**

## Support

- Documentation: See README.md
- Issues: GitHub Issues
- Email: support@canadabiz.io

## Next Steps After Deployment

1. **Test all features**
2. **Create demo workflows**
3. **Set up monitoring**
4. **Configure backups**
5. **Add custom domain**
6. **Enable analytics**
7. **Launch! 🚀**