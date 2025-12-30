# 🔧 Environment Variables Setup Guide

Complete guide to configuring environment variables for CanadaBiz Automation Platform.

## 📋 Quick Setup

### Step 1: Copy Template
```bash
cp .env.example .env
```

### Step 2: Configure Required Variables
Edit `.env` and set these **required** variables:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-random-secret-key
```

### Step 3: Start Application
```bash
npm start
```

That's it! The platform will work with just these two variables.

---

## 🔑 Required Variables

### DATABASE_URL
**PostgreSQL connection string**

**Format:**
```
postgresql://username:password@host:port/database
```

**Examples:**

**Local Development:**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/canadabiz
```

**Railway:**
```env
DATABASE_URL=postgresql://postgres:xxx@containers-us-west-xxx.railway.app:5432/railway
```

**Supabase:**
```env
DATABASE_URL=postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres
```

**Heroku:**
```env
# Automatically set by Heroku
DATABASE_URL=postgres://xxx:xxx@ec2-xxx.compute-1.amazonaws.com:5432/xxx
```

### JWT_SECRET
**Secret key for JWT token signing**

**Generate a secure key:**
```bash
# Method 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Method 2: OpenSSL
openssl rand -hex 32

# Method 3: Online
# Visit: https://randomkeygen.com/
```

**Example:**
```env
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

⚠️ **IMPORTANT:** Never commit your actual JWT_SECRET to Git!

---

## 🎨 Optional Variables

### AI Features (OpenAI)

**Get API Key:**
1. Visit https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and paste into .env

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=1000
```

**Note:** Platform works without this (uses fallback recommendations)

**Cost:** ~$0.03 per AI recommendation

### Email Service (SMTP)

**Gmail Setup:**

1. **Enable 2-Factor Authentication:**
   - Go to Google Account settings
   - Security → 2-Step Verification

2. **Generate App Password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Configure .env:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
EMAIL_FROM=noreply@yourdomain.com
```

**Other Providers:**

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxx
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@yourdomain.com
SMTP_PASS=your-mailgun-password
```

**AWS SES:**
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

---

## 🚀 Platform-Specific Setup

### Railway

**Automatic:**
- DATABASE_URL is auto-set when you add PostgreSQL
- Just add JWT_SECRET in Variables tab

**Manual Setup:**
1. Go to your project
2. Click "Variables" tab
3. Add variables:
   ```
   JWT_SECRET=your-secret-key
   OPENAI_API_KEY=sk-xxx (optional)
   SMTP_USER=your-email (optional)
   SMTP_PASS=your-password (optional)
   ```

### Vercel

**Setup:**
1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, Development
3. Redeploy

**Note:** Vercel is serverless - use Supabase for database

### Heroku

**Setup:**
```bash
# Add PostgreSQL (auto-sets DATABASE_URL)
heroku addons:create heroku-postgresql:mini

# Set other variables
heroku config:set JWT_SECRET=your-secret-key
heroku config:set OPENAI_API_KEY=sk-xxx
heroku config:set SMTP_USER=your-email
heroku config:set SMTP_PASS=your-password

# View all variables
heroku config
```

### Docker / Docker Compose

**Edit docker-compose.yml:**
```yaml
services:
  app:
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/canadabiz
      - JWT_SECRET=your-secret-key
      - OPENAI_API_KEY=sk-xxx
      - SMTP_USER=your-email
      - SMTP_PASS=your-password
```

**Or use .env file:**
```yaml
services:
  app:
    env_file:
      - .env
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Use strong, random JWT_SECRET (32+ characters)
- Keep .env file in .gitignore
- Use different secrets for dev/staging/production
- Rotate secrets periodically
- Use environment-specific variables
- Enable SSL for database connections in production

### ❌ DON'T:
- Commit .env to Git
- Share secrets in plain text
- Use default/example secrets in production
- Store secrets in code
- Use same secrets across environments

---

## 🧪 Testing Your Configuration

### Test Database Connection
```bash
# Using psql
psql $DATABASE_URL -c "SELECT 1"

# Using Node.js
node -e "const {Pool}=require('pg');new Pool({connectionString:process.env.DATABASE_URL}).query('SELECT 1').then(()=>console.log('✅ Connected')).catch(e=>console.log('❌ Error:',e.message))"
```

### Test JWT Secret
```bash
# Check if set
echo $JWT_SECRET

# Should output your secret (not empty)
```

### Test OpenAI API
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Should return list of models
```

### Test SMTP
```bash
# Send test email via API
curl -X POST http://localhost:3000/api/test/email \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com"}'
```

---

## 📊 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | ✅ Yes | - | PostgreSQL connection string |
| `JWT_SECRET` | ✅ Yes | - | Secret for JWT signing |
| `PORT` | ❌ No | 3000 | Server port |
| `NODE_ENV` | ❌ No | development | Environment mode |
| `OPENAI_API_KEY` | ❌ No | - | OpenAI API key for AI features |
| `SMTP_HOST` | ❌ No | - | SMTP server hostname |
| `SMTP_PORT` | ❌ No | 587 | SMTP server port |
| `SMTP_USER` | ❌ No | - | SMTP username |
| `SMTP_PASS` | ❌ No | - | SMTP password |
| `CORS_ORIGIN` | ❌ No | * | Allowed CORS origins |
| `DEFAULT_TIMEZONE` | ❌ No | America/Toronto | Default timezone |

---

## 🆘 Troubleshooting

### Error: "DATABASE_URL is not defined"
**Solution:**
```bash
# Check if .env exists
ls -la .env

# Check if variable is set
cat .env | grep DATABASE_URL

# Restart server after adding variable
```

### Error: "Invalid JWT secret"
**Solution:**
```bash
# Generate new secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env
echo "JWT_SECRET=your-new-secret" >> .env
```

### Error: "SMTP authentication failed"
**Solution:**
- For Gmail: Use App Password, not regular password
- Check username/password are correct
- Verify SMTP host and port
- Enable "Less secure app access" (if using regular password)

### Error: "OpenAI API rate limit"
**Solution:**
- Check your OpenAI account has credits
- Reduce OPENAI_MAX_TOKENS
- Platform will use fallback recommendations automatically

---

## 💡 Pro Tips

1. **Use .env.local for local overrides:**
   ```bash
   # .env.local (gitignored)
   DATABASE_URL=postgresql://localhost:5432/canadabiz_dev
   ```

2. **Validate environment on startup:**
   - Server checks required variables
   - Fails fast if missing critical config

3. **Use different databases per environment:**
   ```
   Dev: canadabiz_dev
   Staging: canadabiz_staging
   Production: canadabiz_production
   ```

4. **Monitor your API usage:**
   - OpenAI: Check usage at platform.openai.com
   - SMTP: Monitor email sending limits

---

## 📞 Need Help?

- **Documentation:** See README.md
- **Issues:** GitHub Issues
- **Email:** support@canadabiz.io

---

**Your environment is now configured! 🎉**