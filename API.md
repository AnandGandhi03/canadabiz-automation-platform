# API Documentation - CanadaBiz Automation Platform

## Base URL
```
Production: https://your-domain.com/api
Development: http://localhost:3000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "companyName": "Acme Inc",
  "province": "Ontario"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

---

## Workflow Endpoints

### Get All Workflows
```http
GET /api/workflows
Authorization: Bearer <token>
```

**Response:**
```json
{
  "workflows": [
    {
      "id": "uuid",
      "business_id": "uuid",
      "name": "Daily Sales Report",
      "type": "reporting",
      "description": "Automated daily sales summary",
      "schedule": "0 9 * * *",
      "status": "active",
      "execution_count": 45,
      "last_run": "2025-12-19T09:00:00Z",
      "created_at": "2025-12-01T10:00:00Z"
    }
  ],
  "count": 1
}
```

### Create Workflow
```http
POST /api/workflows
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "businessId": "uuid",
  "name": "Weekly Inventory Check",
  "type": "inventory",
  "description": "Check stock levels every Monday",
  "schedule": "0 9 * * 1",
  "config": {
    "threshold": 10,
    "emailRecipients": ["manager@example.com"]
  }
}
```

**Response:**
```json
{
  "workflow": {
    "id": "uuid",
    "business_id": "uuid",
    "name": "Weekly Inventory Check",
    "type": "inventory",
    "status": "active",
    "created_at": "2025-12-19T10:00:00Z"
  },
  "message": "Workflow created successfully"
}
```

### Update Workflow
```http
PUT /api/workflows/:id
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Updated Workflow Name",
  "schedule": "0 10 * * 1",
  "status": "paused"
}
```

### Delete Workflow
```http
DELETE /api/workflows/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Workflow deleted successfully"
}
```

### Get Workflow Executions
```http
GET /api/workflows/:id/executions
Authorization: Bearer <token>
```

**Response:**
```json
{
  "executions": [
    {
      "id": "uuid",
      "workflow_id": "uuid",
      "status": "success",
      "started_at": "2025-12-19T09:00:00Z",
      "completed_at": "2025-12-19T09:00:15Z",
      "duration_ms": 15000,
      "execution_data": {
        "itemsProcessed": 150
      }
    }
  ]
}
```

---

## AI Endpoints

### Get AI Optimization Recommendations
```http
POST /api/ai/optimize
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "businessId": "uuid",
  "type": "email-marketing",
  "data": {
    "openRate": 0.18,
    "clickRate": 0.03,
    "subscribers": 5000
  }
}
```

**Response:**
```json
{
  "optimization": {
    "id": "uuid",
    "business_id": "uuid",
    "type": "email-marketing",
    "created_at": "2025-12-19T10:00:00Z"
  },
  "recommendations": [
    "📧 Send emails Tuesday-Thursday between 9-11 AM EST for 23% higher open rates",
    "🎯 Personalize subject lines with recipient name to increase engagement by 35%",
    "🇨🇦 A/B test bilingual content for Quebec market - can boost engagement by 40%"
  ]
}
```

### Analyze Business Metrics
```http
POST /api/ai/analyze
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "businessId": "uuid",
  "metrics": {
    "revenue": 125000,
    "customers": 450,
    "avgOrderValue": 278
  }
}
```

**Response:**
```json
{
  "analysis": {
    "summary": "Business Performance Analysis",
    "trends": [
      {
        "metric": "Revenue",
        "trend": "up",
        "change": "+12%",
        "insight": "Strong growth trajectory"
      }
    ],
    "recommendations": [
      "🎯 Focus on customer retention - 5x cheaper than acquisition",
      "⚡ Automate repetitive tasks to free up 20+ hours/week"
    ],
    "timestamp": "2025-12-19T10:00:00Z"
  }
}
```

### Get Optimization History
```http
GET /api/ai/optimizations/:businessId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "optimizations": [
    {
      "id": "uuid",
      "business_id": "uuid",
      "type": "email-marketing",
      "recommendations": [...],
      "applied": false,
      "created_at": "2025-12-19T10:00:00Z"
    }
  ]
}
```

---

## Workflow Types

- `email-marketing` - Email campaign automation
- `inventory` - Inventory management and alerts
- `customer-service` - Customer support automation
- `social-media` - Social media posting and engagement
- `reporting` - Automated reports and analytics
- `invoicing` - Billing and payment automation

---

## Cron Schedule Format

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, 0 and 7 = Sunday)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

**Examples:**
- `0 9 * * *` - Daily at 9 AM
- `0 */6 * * *` - Every 6 hours
- `0 9 * * 1` - Every Monday at 9 AM
- `0 0 1 * *` - First day of every month

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Email and password required"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Workflow not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create workflow"
}
```

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Headers:**
  - `X-RateLimit-Limit`: Maximum requests
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

---

## Webhooks (Coming Soon)

Subscribe to workflow events:
- `workflow.started`
- `workflow.completed`
- `workflow.failed`
- `optimization.generated`

---

## SDKs & Libraries

### JavaScript/Node.js
```javascript
const CanadaBiz = require('canadabiz-sdk');

const client = new CanadaBiz({
  apiKey: 'your-api-key',
  baseURL: 'https://api.canadabiz.io'
});

// Create workflow
const workflow = await client.workflows.create({
  name: 'Daily Report',
  type: 'reporting',
  schedule: '0 9 * * *'
});
```

### Python (Coming Soon)
### Ruby (Coming Soon)
### PHP (Coming Soon)

---

## Support

- **Documentation:** https://docs.canadabiz.io
- **API Status:** https://status.canadabiz.io
- **Support Email:** api@canadabiz.io