// sendEmail.js
//const nodemailer = require('nodemailer');
//const fs = require('fs');
//require('dotenv').config();
import nodemailer from 'nodemailer';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export default async function sendEmail() {
  // --- Step 1: Read JSON report ---
  const reportPath = './playwright-report/index.html';
  if (!fs.existsSync(reportPath)) {
    console.log('⚠️ No report.json found. Did you run tests first?');
    return;
  }

  //const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

  // --- Step 2: Extract summary data ---
  let total = 0, passed = 0, failed = 0;
  const failedTests = [];

  for (const suite of report.suites || []) {
    for (const spec of suite.specs || []) {
      total++;
      if (spec.ok) passed++;
      else {
        failed++;
        failedTests.push({
          name: spec.title,
          file: spec.file,
        });
      }
    }
  }

  // --- Step 3: Skip email if all passed ---
  if (failed === 0) {
    console.log('✅ All tests passed — no email sent.');
    return;
  }

  // --- Step 4: Build HTML email body ---
  const htmlBody = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #d9534f;">❌ Playwright Test Summary</h2>
    <p><strong>Total:</strong> ${total}</p>
    <p><strong>Passed:</strong> <span style="color: green;">${passed}</span></p>
    <p><strong>Failed:</strong> <span style="color: red;">${failed}</span></p>
    <hr/>
    <h3>Failed Test Cases:</h3>
    <ul>
      ${failedTests.map(t => `<li><b>${t.name}</b> <br/> <small>${t.file}</small></li>`).join('')}
    </ul>
    <hr/>
    <p>📎 The full HTML report is attached.<br/>
    📁 Location: <code>playwright-report/index.html</code></p>
  </div>
  `;

  // --- Step 5: Configure mail transporter ---
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  // --- Step 6: Compose email ---
  const mailOptions = {
    from: `"Playwright Reporter" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || 'qa-team@example.com',
    subject: `❌ ${failed} Playwright Test${failed > 1 ? 's' : ''} Failed`,
    html: htmlBody,
    attachments: [
      {
        filename: 'PlaywrightReport.html',
        path: reportPath,
      },
    ],
  };

  // --- Step 7: Send the email ---
  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Email with test summary sent successfully!');
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
}

sendEmail();
