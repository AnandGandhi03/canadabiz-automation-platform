const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage (replace with database in production)
let workflows = [];
let businesses = [];
let scheduledTasks = new Map();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'CanadaBiz Automation Platform API' });
});

// Business Management
app.post('/api/businesses', (req, res) => {
  const business = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  businesses.push(business);
  res.status(201).json(business);
});

app.get('/api/businesses', (req, res) => {
  res.json(businesses);
});

// Workflow Management
app.post('/api/workflows', (req, res) => {
  const workflow = {
    id: Date.now().toString(),
    ...req.body,
    status: 'active',
    createdAt: new Date().toISOString()
  };
  workflows.push(workflow);
  
  // Schedule if cron expression provided
  if (workflow.schedule) {
    scheduleWorkflow(workflow);
  }
  
  res.status(201).json(workflow);
});

app.get('/api/workflows', (req, res) => {
  const { businessId } = req.query;
  const filtered = businessId 
    ? workflows.filter(w => w.businessId === businessId)
    : workflows;
  res.json(filtered);
});

app.get('/api/workflows/:id', (req, res) => {
  const workflow = workflows.find(w => w.id === req.params.id);
  if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
  res.json(workflow);
});

app.put('/api/workflows/:id', (req, res) => {
  const index = workflows.findIndex(w => w.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Workflow not found' });
  
  workflows[index] = { ...workflows[index], ...req.body, updatedAt: new Date().toISOString() };
  
  // Reschedule if needed
  if (req.body.schedule) {
    unscheduleWorkflow(req.params.id);
    scheduleWorkflow(workflows[index]);
  }
  
  res.json(workflows[index]);
});

app.delete('/api/workflows/:id', (req, res) => {
  const index = workflows.findIndex(w => w.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Workflow not found' });
  
  unscheduleWorkflow(req.params.id);
  workflows.splice(index, 1);
  res.status(204).send();
});

// AI Optimization Endpoints
app.post('/api/ai/optimize', async (req, res) => {
  const { businessId, type, data } = req.body;
  
  // Placeholder for AI optimization logic
  const optimization = {
    id: Date.now().toString(),
    businessId,
    type,
    recommendations: generateRecommendations(type, data),
    createdAt: new Date().toISOString()
  };
  
  res.json(optimization);
});

app.post('/api/ai/analyze', async (req, res) => {
  const { businessId, metrics } = req.body;
  
  const analysis = {
    businessId,
    insights: analyzeMetrics(metrics),
    timestamp: new Date().toISOString()
  };
  
  res.json(analysis);
});

// Workflow Scheduling
function scheduleWorkflow(workflow) {
  if (!workflow.schedule) return;
  
  const task = cron.schedule(workflow.schedule, () => {
    console.log(`Executing workflow: ${workflow.name}`);
    executeWorkflow(workflow);
  });
  
  scheduledTasks.set(workflow.id, task);
}

function unscheduleWorkflow(workflowId) {
  const task = scheduledTasks.get(workflowId);
  if (task) {
    task.stop();
    scheduledTasks.delete(workflowId);
  }
}

function executeWorkflow(workflow) {
  // Workflow execution logic
  console.log(`Executing: ${workflow.name}`);
  // Add your automation logic here
}

// AI Helper Functions
function generateRecommendations(type, data) {
  const recommendations = {
    'email-marketing': [
      'Send emails on Tuesday-Thursday for 23% higher open rates',
      'Personalize subject lines to increase engagement by 35%',
      'A/B test send times for your Canadian audience'
    ],
    'inventory': [
      'Reorder stock 2 weeks before predicted stockout',
      'Seasonal demand peaks in Q4 - increase inventory by 40%',
      'Bundle slow-moving items with bestsellers'
    ],
    'customer-service': [
      'Automate FAQ responses to save 15 hours/week',
      'Implement chatbot for after-hours support',
      'Set up automated follow-ups 48 hours post-purchase'
    ],
    'social-media': [
      'Post 3-5 times weekly for optimal engagement',
      'Use video content for 120% more engagement',
      'Schedule posts for 9 AM and 7 PM EST for Canadian audience'
    ]
  };
  
  return recommendations[type] || ['Enable automation to save time', 'Use AI insights for better decisions'];
}

function analyzeMetrics(metrics) {
  return {
    summary: 'Business performance analysis',
    trends: [
      { metric: 'Revenue', trend: 'up', change: '+12%', insight: 'Strong growth trajectory' },
      { metric: 'Customer Acquisition', trend: 'stable', change: '+3%', insight: 'Steady growth' },
      { metric: 'Operational Efficiency', trend: 'up', change: '+18%', insight: 'Automation impact visible' }
    ],
    recommendations: [
      'Focus on customer retention - 5x cheaper than acquisition',
      'Automate repetitive tasks to free up 20+ hours/week',
      'Implement AI chatbot for 24/7 customer support'
    ]
  };
}

app.listen(PORT, () => {
  console.log(`🚀 CanadaBiz Automation Platform running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/health`);
});