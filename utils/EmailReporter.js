// utils/EmailReporter.js
import nodemailer from 'nodemailer';
import path from 'path';

class EmailReporter {
  constructor(options) {
    this.options = options;
    this.stats = { passed: 0, failed: 0, skipped: 0, total: 0 };
    this.failedTests = []; // ✅ Always initialize
    this.skippedTests = [];// ✅ Always initialize
  }
  // Count test results and track failed tests
  onTestEnd(test, result) {
    this.stats.total++;

    switch (result.status) {
      case 'passed':
        this.stats.passed++;
        break;
      case 'failed':
      case 'timedOut':
      case 'interrupted':
        this.stats.failed++;
        // ✅ Push failed test details safely
        this.failedTests.push({
          name: test.title,
          file: test.location?.file || 'Unknown file',
        });
        break;
      case 'skipped':
        this.stats.skipped++;
        // ✅ Push failed test details safely
        this.skippedTests.push({
        name: test.title,
        file: test.location?.file || 'Unknown file',
      });
        break;
      default:
        this.stats.skipped++;
    }
  }

  async onEnd(result) {

    const total = this.stats.total;
    const passed = this.stats.passed;
    const failed = this.stats.failed;
    const skipped = this.stats.skipped;

    const htmlReportPath = path.resolve('playwright-report', 'index.html');

    // --- Step 4: Build HTML email body ---
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h3 style="color: ${failed > 0 ? '#1F4E79' : '#5cb85c'};">Here is your Daily Test Execution Report Summary — [Project Name]</h3>
      <p><strong>Total:</strong> ${total}</p>
      <p><strong>Passed:</strong> <span style="color: green;">${passed}</span></p>
      <p><strong>Failed:</strong> <span style="color: red;">${failed}</span></p>
      <p><strong>Skipped:</strong> <span style="color: black;">${skipped}</span></p>
      <hr/>
      <h3>🚫Failed Test Cases:</h3>
      <ul>
        ${this.failedTests.map(t => `<li><b>${t.name}</b> <br/> <small>${t.file}</small></li>`).join('')}
      </ul>
      <hr/>
      <p>📎 The full HTML report is attached.<br/>
      📁 Location: <code>playwright-report/index.html</code></p>

      <p style="margin-top: 20px; font-size: 13px; color: gray;">
      Please do not reply.This is a system-generated email.
      </p>
    </div>
    `;

    try {
      const transporter = nodemailer.createTransport({
        //service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'Playwright Test Execution Report',
        //text: `Here is your Playwright Test Execution Summary — [Project Name]:\n\n${summary}`,
        html: htmlBody,
        attachments: [{ filename: 'PlaywrightReport.html', path: htmlReportPath }],
      });

      console.log('✅ Email sent successfully');
    } catch (err) {
      console.error('❌ Failed to send email:', err);
    }
  }
}

export default EmailReporter;
