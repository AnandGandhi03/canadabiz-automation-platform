const cron = require('node-cron');
const db = require('../config/database');
const emailService = require('./emailService');
const aiService = require('./aiService');

class WorkflowEngine {
  constructor() {
    this.scheduledTasks = new Map();
    this.executionQueue = [];
  }

  // Initialize and load all active workflows
  async initialize() {
    try {
      const result = await db.query(
        `SELECT * FROM workflows WHERE status = 'active' AND schedule IS NOT NULL`
      );

      for (const workflow of result.rows) {
        this.scheduleWorkflow(workflow);
      }

      console.log(`✅ Initialized ${result.rows.length} scheduled workflows`);
    } catch (error) {
      console.error('Workflow initialization error:', error);
    }
  }

  // Schedule a workflow
  scheduleWorkflow(workflow) {
    if (!workflow.schedule || !cron.validate(workflow.schedule)) {
      console.error(`Invalid cron schedule for workflow ${workflow.id}`);
      return;
    }

    // Stop existing task if any
    this.unscheduleWorkflow(workflow.id);

    const task = cron.schedule(workflow.schedule, async () => {
      await this.executeWorkflow(workflow);
    });

    this.scheduledTasks.set(workflow.id, task);
    console.log(`📅 Scheduled workflow: ${workflow.name} (${workflow.schedule})`);
  }

  // Unschedule a workflow
  unscheduleWorkflow(workflowId) {
    const task = this.scheduledTasks.get(workflowId);
    if (task) {
      task.stop();
      this.scheduledTasks.delete(workflowId);
      console.log(`⏹️ Unscheduled workflow: ${workflowId}`);
    }
  }

  // Execute a workflow
  async executeWorkflow(workflow) {
    const startTime = Date.now();
    let executionStatus = 'success';
    let errorMessage = null;
    let executionData = {};

    try {
      console.log(`▶️ Executing workflow: ${workflow.name}`);

      // Create execution record
      const execResult = await db.query(
        `INSERT INTO workflow_executions (workflow_id, status, started_at) 
         VALUES ($1, $2, NOW()) 
         RETURNING id`,
        [workflow.id, 'running']
      );

      const executionId = execResult.rows[0].id;

      // Execute based on workflow type
      switch (workflow.type) {
        case 'email-marketing':
          executionData = await this.executeEmailMarketing(workflow);
          break;
        case 'inventory':
          executionData = await this.executeInventoryCheck(workflow);
          break;
        case 'customer-service':
          executionData = await this.executeCustomerService(workflow);
          break;
        case 'social-media':
          executionData = await this.executeSocialMedia(workflow);
          break;
        case 'reporting':
          executionData = await this.executeReporting(workflow);
          break;
        case 'invoicing':
          executionData = await this.executeInvoicing(workflow);
          break;
        default:
          throw new Error(`Unknown workflow type: ${workflow.type}`);
      }

      // Update execution record
      const duration = Date.now() - startTime;
      await db.query(
        `UPDATE workflow_executions 
         SET status = $1, completed_at = NOW(), execution_data = $2, duration_ms = $3
         WHERE id = $4`,
        [executionStatus, JSON.stringify(executionData), duration, executionId]
      );

      // Update workflow stats
      await db.query(
        `UPDATE workflows 
         SET last_run = NOW(), execution_count = execution_count + 1
         WHERE id = $1`,
        [workflow.id]
      );

      console.log(`✅ Workflow completed: ${workflow.name} (${duration}ms)`);
    } catch (error) {
      executionStatus = 'failed';
      errorMessage = error.message;
      console.error(`❌ Workflow failed: ${workflow.name}`, error);

      // Log error
      await db.query(
        `UPDATE workflow_executions 
         SET status = 'failed', error_message = $1, completed_at = NOW()
         WHERE workflow_id = $2 AND status = 'running'`,
        [errorMessage, workflow.id]
      );
    }
  }

  // Workflow type executors
  async executeEmailMarketing(workflow) {
    const config = workflow.config;
    // Implement email campaign logic
    return { sent: 0, opened: 0, clicked: 0 };
  }

  async executeInventoryCheck(workflow) {
    // Implement inventory checking logic
    return { itemsChecked: 0, lowStock: [], reorderNeeded: [] };
  }

  async executeCustomerService(workflow) {
    // Implement customer service automation
    return { ticketsProcessed: 0, autoResponded: 0 };
  }

  async executeSocialMedia(workflow) {
    // Implement social media posting
    return { postsScheduled: 0, platforms: [] };
  }

  async executeReporting(workflow) {
    const config = workflow.config;
    
    // Generate report
    const metrics = await this.getBusinessMetrics(workflow.business_id);
    const analysis = await aiService.analyzeMetrics(metrics);
    
    // Send report via email
    if (config.emailRecipients) {
      await emailService.sendReport(config.emailRecipients, analysis);
    }
    
    return { reportGenerated: true, metricCount: Object.keys(metrics).length };
  }

  async executeInvoicing(workflow) {
    // Implement invoicing automation
    return { invoicesSent: 0, remindersSent: 0 };
  }

  async getBusinessMetrics(businessId) {
    const result = await db.query(
      `SELECT metric_type, metric_value, recorded_at 
       FROM analytics 
       WHERE business_id = $1 
       ORDER BY recorded_at DESC 
       LIMIT 100`,
      [businessId]
    );

    return result.rows;
  }
}

module.exports = new WorkflowEngine();