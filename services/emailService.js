const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(to, subject, html, text) {
    try {
      const info = await this.transporter.sendMail({
        from: `"CanadaBiz Automation" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html
      });

      console.log('✉️ Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendWelcomeEmail(user) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #667eea;">Welcome to CanadaBiz Automation! 🍁</h1>
        <p>Hi ${user.fullName || 'there'},</p>
        <p>Thank you for joining CanadaBiz Automation Platform. We're excited to help you automate and optimize your business!</p>
        
        <h2>Getting Started:</h2>
        <ol>
          <li>Create your first workflow automation</li>
          <li>Get AI-powered recommendations</li>
          <li>Connect your business tools</li>
          <li>Track your time savings and ROI</li>
        </ol>
        
        <p>Need help? Reply to this email or visit our support center.</p>
        
        <p>Best regards,<br>The CanadaBiz Team</p>
      </div>
    `;

    return this.sendEmail(
      user.email,
      'Welcome to CanadaBiz Automation! 🚀',
      html,
      'Welcome to CanadaBiz Automation Platform!'
    );
  }

  async sendReport(recipients, reportData) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #667eea;">Business Performance Report 📊</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleString('en-CA')}</p>
        
        <h2>Summary</h2>
        <p>${reportData.summary}</p>
        
        ${reportData.trends ? `
          <h2>Key Trends</h2>
          <ul>
            ${reportData.trends.map(t => `
              <li><strong>${t.metric}:</strong> ${t.change} - ${t.insight}</li>
            `).join('')}
          </ul>
        ` : ''}
        
        ${reportData.recommendations ? `
          <h2>Recommendations</h2>
          <ul>
            ${reportData.recommendations.map(r => `<li>${r}</li>`).join('')}
          </ul>
        ` : ''}
        
        <p style="margin-top: 30px; color: #666;">
          This is an automated report from CanadaBiz Automation Platform.
        </p>
      </div>
    `;

    const recipientList = Array.isArray(recipients) ? recipients.join(',') : recipients;

    return this.sendEmail(
      recipientList,
      `Business Report - ${new Date().toLocaleDateString('en-CA')}`,
      html,
      'Your business performance report is ready.'
    );
  }

  async sendWorkflowAlert(user, workflow, status, message) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: ${status === 'success' ? '#48bb78' : '#f56565'};">
          Workflow ${status === 'success' ? 'Completed' : 'Failed'} ${status === 'success' ? '✅' : '❌'}
        </h1>
        <p><strong>Workflow:</strong> ${workflow.name}</p>
        <p><strong>Type:</strong> ${workflow.type}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-CA')}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;

    return this.sendEmail(
      user.email,
      `Workflow ${status}: ${workflow.name}`,
      html,
      `Workflow ${workflow.name} ${status}`
    );
  }
}

module.exports = new EmailService();