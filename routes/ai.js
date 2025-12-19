const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const aiService = require('../services/aiService');
const db = require('../config/database');

const router = express.Router();

// Get AI optimization recommendations
router.post('/optimize', authenticateToken, async (req, res) => {
  try {
    const { businessId, type, data } = req.body;

    // Verify business ownership
    const businessCheck = await db.query(
      'SELECT id FROM businesses WHERE id = $1 AND user_id = $2',
      [businessId, req.user.id]
    );

    if (businessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const recommendations = await aiService.generateOptimizations(data, type);

    // Save optimization
    const result = await db.query(
      `INSERT INTO ai_optimizations (business_id, type, recommendations)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [businessId, type, JSON.stringify(recommendations)]
    );

    res.json({
      optimization: result.rows[0],
      recommendations
    });
  } catch (error) {
    console.error('AI optimization error:', error);
    res.status(500).json({ error: 'Failed to generate optimizations' });
  }
});

// Analyze business metrics
router.post('/analyze', authenticateToken, async (req, res) => {
  try {
    const { businessId, metrics } = req.body;

    // Verify business ownership
    const businessCheck = await db.query(
      'SELECT id FROM businesses WHERE id = $1 AND user_id = $2',
      [businessId, req.user.id]
    );

    if (businessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const analysis = await aiService.analyzeMetrics(metrics);

    res.json({ analysis });
  } catch (error) {
    console.error('AI analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze metrics' });
  }
});

// Get optimization history
router.get('/optimizations/:businessId', authenticateToken, async (req, res) => {
  try {
    // Verify ownership
    const businessCheck = await db.query(
      'SELECT id FROM businesses WHERE id = $1 AND user_id = $2',
      [req.params.businessId, req.user.id]
    );

    if (businessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await db.query(
      `SELECT * FROM ai_optimizations 
       WHERE business_id = $1 
       ORDER BY created_at DESC 
       LIMIT 20`,
      [req.params.businessId]
    );

    res.json({ optimizations: result.rows });
  } catch (error) {
    console.error('Get optimizations error:', error);
    res.status(500).json({ error: 'Failed to fetch optimizations' });
  }
});

module.exports = router;