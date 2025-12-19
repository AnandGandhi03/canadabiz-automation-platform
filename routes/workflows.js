const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');
const workflowEngine = require('../services/workflowEngine');

const router = express.Router();

// Get all workflows for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT w.*, b.name as business_name 
       FROM workflows w
       JOIN businesses b ON w.business_id = b.id
       JOIN users u ON b.user_id = u.id
       WHERE u.id = $1
       ORDER BY w.created_at DESC`,
      [req.user.id]
    );

    res.json({ workflows: result.rows, count: result.rows.length });
  } catch (error) {
    console.error('Get workflows error:', error);
    res.status(500).json({ error: 'Failed to fetch workflows' });
  }
});

// Create new workflow
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { businessId, name, type, description, config, schedule } = req.body;

    // Verify business belongs to user
    const businessCheck = await db.query(
      'SELECT id FROM businesses WHERE id = $1 AND user_id = $2',
      [businessId, req.user.id]
    );

    if (businessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied to this business' });
    }

    const result = await db.query(
      `INSERT INTO workflows (business_id, name, type, description, config, schedule, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'active')
       RETURNING *`,
      [businessId, name, type, description, JSON.stringify(config || {}), schedule]
    );

    const workflow = result.rows[0];

    // Schedule if cron provided
    if (schedule) {
      workflowEngine.scheduleWorkflow(workflow);
    }

    res.status(201).json({ workflow, message: 'Workflow created successfully' });
  } catch (error) {
    console.error('Create workflow error:', error);
    res.status(500).json({ error: 'Failed to create workflow' });
  }
});

// Update workflow
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, description, config, schedule, status } = req.body;

    // Verify ownership
    const ownerCheck = await db.query(
      `SELECT w.id FROM workflows w
       JOIN businesses b ON w.business_id = b.id
       WHERE w.id = $1 AND b.user_id = $2`,
      [req.params.id, req.user.id]
    );

    if (ownerCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await db.query(
      `UPDATE workflows 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           config = COALESCE($3, config),
           schedule = COALESCE($4, schedule),
           status = COALESCE($5, status),
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, description, config ? JSON.stringify(config) : null, schedule, status, req.params.id]
    );

    const workflow = result.rows[0];

    // Reschedule if needed
    if (schedule) {
      workflowEngine.unscheduleWorkflow(workflow.id);
      workflowEngine.scheduleWorkflow(workflow);
    }

    res.json({ workflow, message: 'Workflow updated successfully' });
  } catch (error) {
    console.error('Update workflow error:', error);
    res.status(500).json({ error: 'Failed to update workflow' });
  }
});

// Delete workflow
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Verify ownership
    const ownerCheck = await db.query(
      `SELECT w.id FROM workflows w
       JOIN businesses b ON w.business_id = b.id
       WHERE w.id = $1 AND b.user_id = $2`,
      [req.params.id, req.user.id]
    );

    if (ownerCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Unschedule
    workflowEngine.unscheduleWorkflow(req.params.id);

    // Delete
    await db.query('DELETE FROM workflows WHERE id = $1', [req.params.id]);

    res.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    console.error('Delete workflow error:', error);
    res.status(500).json({ error: 'Failed to delete workflow' });
  }
});

// Get workflow executions
router.get('/:id/executions', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT we.* FROM workflow_executions we
       JOIN workflows w ON we.workflow_id = w.id
       JOIN businesses b ON w.business_id = b.id
       WHERE w.id = $1 AND b.user_id = $2
       ORDER BY we.started_at DESC
       LIMIT 50`,
      [req.params.id, req.user.id]
    );

    res.json({ executions: result.rows });
  } catch (error) {
    console.error('Get executions error:', error);
    res.status(500).json({ error: 'Failed to fetch executions' });
  }
});

module.exports = router;