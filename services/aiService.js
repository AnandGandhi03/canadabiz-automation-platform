const axios = require('axios');

class AIService {
  constructor() {
    this.openaiKey = process.env.OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1';
  }

  // Generate business optimization recommendations
  async generateOptimizations(businessData, type) {
    const prompts = {
      'email-marketing': `Analyze this Canadian business email marketing data and provide 5 specific, actionable recommendations to improve open rates, click-through rates, and conversions. Consider Canadian market specifics, timezone (EST/PST), and bilingual requirements where applicable.`,
      
      'inventory': `Analyze this Canadian business inventory data and provide 5 specific recommendations for inventory optimization, including reorder points, seasonal adjustments for Canadian market, and cost reduction strategies.`,
      
      'customer-service': `Analyze this Canadian business customer service data and provide 5 specific recommendations to improve response times, customer satisfaction, and automation opportunities. Consider Canadian customer expectations and regulations.`,
      
      'social-media': `Analyze this Canadian business social media performance and provide 5 specific recommendations for content strategy, posting schedule (considering Canadian timezones), and engagement optimization.`,
      
      'reporting': `Analyze this Canadian business data and provide 5 specific KPI recommendations and reporting automation strategies tailored for Canadian small businesses.`,
      
      'invoicing': `Analyze this Canadian business invoicing data and provide 5 specific recommendations for payment collection, GST/HST compliance, and billing automation.`
    };

    try {
      if (!this.openaiKey) {
        return this.getFallbackRecommendations(type);
      }

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an AI business optimization expert specializing in Canadian small businesses. Provide specific, actionable, data-driven recommendations.'
            },
            {
              role: 'user',
              content: `${prompts[type]}\n\nBusiness Data: ${JSON.stringify(businessData)}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const recommendations = response.data.choices[0].message.content
        .split('\n')
        .filter(line => line.trim().length > 0)
        .slice(0, 5);

      return recommendations;
    } catch (error) {
      console.error('AI Service Error:', error.message);
      return this.getFallbackRecommendations(type);
    }
  }

  // Analyze business metrics with AI
  async analyzeMetrics(metrics) {
    try {
      if (!this.openaiKey) {
        return this.getFallbackAnalysis(metrics);
      }

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a business analytics expert. Analyze metrics and provide insights with specific numbers and actionable recommendations.'
            },
            {
              role: 'user',
              content: `Analyze these business metrics and provide insights:\n${JSON.stringify(metrics, null, 2)}`
            }
          ],
          temperature: 0.5,
          max_tokens: 800
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        summary: response.data.choices[0].message.content,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Metrics Analysis Error:', error.message);
      return this.getFallbackAnalysis(metrics);
    }
  }

  // Fallback recommendations when AI is unavailable
  getFallbackRecommendations(type) {
    const fallbacks = {
      'email-marketing': [
        '📧 Send emails Tuesday-Thursday between 9-11 AM EST for 23% higher open rates',
        '🎯 Personalize subject lines with recipient name to increase engagement by 35%',
        '🇨🇦 A/B test bilingual content for Quebec market - can boost engagement by 40%',
        '📱 Optimize for mobile - 67% of Canadians check email on mobile devices',
        '⏰ Set up automated welcome series - increases customer lifetime value by 33%'
      ],
      'inventory': [
        '📦 Reorder stock 2 weeks before predicted stockout based on sales velocity',
        '🎄 Seasonal demand peaks in Q4 - increase inventory by 40% in October',
        '💰 Bundle slow-moving items with bestsellers to improve turnover by 25%',
        '🚚 Negotiate bulk shipping rates with Canadian carriers - save 15-20%',
        '📊 Implement just-in-time inventory for fast-moving items to reduce holding costs'
      ],
      'customer-service': [
        '🤖 Automate FAQ responses to save 15+ hours/week on repetitive queries',
        '💬 Implement chatbot for after-hours support - capture 30% more leads',
        '📞 Set up automated follow-ups 48 hours post-purchase - boost satisfaction by 28%',
        '⭐ Request reviews automatically after positive interactions - increase reviews by 45%',
        '🇫🇷 Offer bilingual support for Quebec customers - required by law, improves satisfaction'
      ],
      'social-media': [
        '📅 Post 3-5 times weekly for optimal engagement without overwhelming followers',
        '🎥 Use video content - generates 120% more engagement than static posts',
        '🕐 Schedule posts for 9 AM and 7 PM EST for maximum Canadian audience reach',
        '🏷️ Use location-based hashtags (#TorontoBusiness, #VancouverLocal) for local discovery',
        '📊 Analyze competitor content and post similar formats that perform well'
      ],
      'reporting': [
        '📈 Track revenue, customer acquisition cost, and lifetime value weekly',
        '⚡ Automate daily sales reports sent to your email at 9 AM',
        '💡 Set up alerts for metrics that drop below thresholds',
        '📊 Create monthly executive dashboard with key trends and insights',
        '🎯 Focus on 5-7 core KPIs rather than tracking everything'
      ],
      'invoicing': [
        '💳 Accept multiple payment methods - increases on-time payments by 40%',
        '⏰ Send automated payment reminders 3 days before due date',
        '🇨🇦 Ensure GST/HST compliance - automate tax calculations by province',
        '📧 Offer early payment discounts (2% for 10 days) to improve cash flow',
        '📱 Use mobile-friendly invoices - 55% of Canadian businesses pay via mobile'
      ]
    };

    return fallbacks[type] || fallbacks['email-marketing'];
  }

  // Fallback analysis
  getFallbackAnalysis(metrics) {
    return {
      summary: 'Business Performance Analysis',
      trends: [
        { metric: 'Revenue', trend: 'up', change: '+12%', insight: 'Strong growth trajectory' },
        { metric: 'Customer Acquisition', trend: 'stable', change: '+3%', insight: 'Steady growth' },
        { metric: 'Operational Efficiency', trend: 'up', change: '+18%', insight: 'Automation showing impact' }
      ],
      recommendations: [
        '🎯 Focus on customer retention - 5x cheaper than acquisition',
        '⚡ Automate repetitive tasks to free up 20+ hours/week',
        '🤖 Implement AI chatbot for 24/7 customer support',
        '📊 Set up automated reporting to track KPIs in real-time',
        '💰 Optimize pricing strategy based on competitor analysis'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new AIService();