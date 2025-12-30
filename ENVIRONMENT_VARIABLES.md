# 🔐 Environment Variables - Quick Reference

## ⚡ Minimal Setup (2 Variables)

To get started, you only need **2 environment variables**:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-random-secret-key-here
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📋 All Available Variables

### **Required Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:pass@localhost:5432/canadabiz` |
| `JWT_SECRET` | Secret key for JWT tokens | `a1b2c3d4e5f6...` (32+ chars) |

### **Optional - AI Features**

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | - |
| `OPENAI_MODEL` | AI model to use | `gpt-4` |
| `OPENAI_MAX_TOKENS` | Max tokens per request | `1000` |

### **Optional - Email Service**

| Variable | Description | Default |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username/email | - |
| `SMTP_PASS` | SMTP password/app password | - |
| `EMAIL_FROM` | From email address | `noreply@canadabiz.io` |

### **Optional - Server Configuration**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origins | `*` |
| `LOG_LEVEL` | Logging level | `info` |

### **Optional - Canadian Business**

| Variable | Description | Default |
|----------|-------------|---------|
| `DEFAULT_TIMEZONE` | Default timezone | `America/Toronto` |
| `DEFAULT_CURRENCY` | Default currency | `CAD` |
| `DEFAULT_PROVINCE` | Default province | `Ontario` |

### **Optional - Feature Flags**

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_AI_FEATURES` | Enable AI recommendations | `true` |
| `ENABLE_EMAIL_NOTIFICATIONS` | Enable email sending | `true` |
| `ENABLE_WORKFLOW_SCHEDULING` | Enable cron scheduling | `true` |
| `ENABLE_ANALYTICS` | Enable analytics tracking | `true` |

---

## 🚀 Platform-Specific Examples

### **Railway**
```env
# Auto-set by Railway
DATABASE_URL=postgresql://postgres:xxx@containers-us-west-xxx.railway.app:5432/railway

# You add these
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-xxx
```

### **Vercel + Supabase**
```env
# From Supabase dashboard
DATABASE_URL=postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres

# You add these
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-xxx
```

### **Heroku**
```bash
# Auto-set by Heroku addon
heroku addons:create heroku-postgresql:mini

# Set manually
heroku config:set JWT_SECRET=your-secret-key
heroku config:set OPENAI_API_KEY=sk-xxx
```

### **Docker Compose**
```yaml
# In docker-compose.yml
environment:
  - DATABASE_URL=postgresql://postgres:password@db:5432/canadabiz
  - JWT_SECRET=your-secret-key
  - OPENAI_API_KEY=sk-xxx
```

### **Local Development**
```env
# .env file
DATABASE_URL=postgresql://postgres:password@localhost:5432/canadabiz
JWT_SECRET=dev-secret-key-change-in-production
OPENAI_API_KEY=sk-xxx
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🔑 How to Get API Keys

### **OpenAI API Key**
1. Visit https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy key (starts with `sk-`)
4. Add to `.env`: `OPENAI_API_KEY=sk-xxx`

**Cost:** ~$0.03 per AI recommendation

### **Gmail App Password**
1. Enable 2FA: https://myaccount.google.com/security
2. Generate app password: https://myaccount.google.com/apppasswords
3. Select "Mail" and your device
4. Copy 16-character password
5. Add to `.env`: `SMTP_PASS=abcd efgh ijkl mnop`

### **JWT Secret**
```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use OpenSSL
openssl rand -hex 32

# Add to .env
JWT_SECRET=<generated-secret>
```

---

## ✅ Setup Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Set `DATABASE_URL` (PostgreSQL connection)
- [ ] Set `JWT_SECRET` (random 32+ character string)
- [ ] Optional: Add `OPENAI_API_KEY` for AI features
- [ ] Optional: Add SMTP credentials for emails
- [ ] Verify `.env` is in `.gitignore`
- [ ] Test connection: `npm start`
- [ ] Check health: `curl http://localhost:3000/api/health`

---

## 🧪 Testing Your Configuration

```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1"

# Test JWT secret is set
echo $JWT_SECRET

# Test OpenAI API (if configured)
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Test server
npm start
curl http://localhost:3000/api/health
```

---

## 🔒 Security Notes

⚠️ **NEVER commit `.env` to Git!**

✅ **Best Practices:**
- Use strong, random JWT_SECRET (32+ characters)
- Different secrets for dev/staging/production
- Rotate secrets periodically
- Use environment-specific variables
- Enable SSL for database in production

❌ **Don't:**
- Commit secrets to Git
- Share secrets in plain text
- Use default/example secrets in production
- Store secrets in code

---

## 📚 Full Documentation

For detailed setup instructions, see:
- **[ENV_SETUP.md](ENV_SETUP.md)** - Complete environment setup guide
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute quick start
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Platform-specific deployment

---

## 💡 Quick Tips

**Minimal Setup (Works immediately):**
```env
DATABASE_URL=postgresql://localhost:5432/canadabiz
JWT_SECRET=dev-secret-change-in-production
```

**Full Setup (All features):**
```env
DATABASE_URL=postgresql://localhost:5432/canadabiz
JWT_SECRET=your-random-secret-key
OPENAI_API_KEY=sk-your-key
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Production Setup:**
```env
DATABASE_URL=postgresql://prod-host:5432/canadabiz
JWT_SECRET=super-secure-random-key-32-chars-min
NODE_ENV=production
OPENAI_API_KEY=sk-your-key
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=SG.xxx
```

---

**Environment configured! Ready to launch! 🚀**