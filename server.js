const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/auth');
const workflowRoutes = require('./routes/workflows');
const aiRoutes = require('./routes/ai');

// Import services
const workflowEngine = require('./services/workflowEngine');

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'CanadaBiz Automation Platform API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/ai', aiRoutes);

// Legacy in-memory endpoints for demo (backward compatibility)
let demoWorkflows = [];
let demoBusinesses = [];

app.post('/api/businesses', (req, res) => {
  const business = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  demoBusinesses.push(business);
  res.status(201).json(business);
});

app.get('/api/businesses', (req, res) => {
  res.json(demoBusinesses);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize workflow engine
async function initialize() {
  try {
    await workflowEngine.initialize();
    console.log('✅ Workflow engine initialized');
  } catch (error) {
    console.error('❌ Workflow engine initialization failed:', error);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🍁 CanadaBiz Automation Platform                       ║
║                                                           ║
║   🚀 Server running on port ${PORT}                         ║
║   📊 API: http://localhost:${PORT}/api/health              ║
║   🌐 Dashboard: http://localhost:${PORT}                   ║
║                                                           ║
║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);

  // Initialize services
  await initialize();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

module.exports = app;