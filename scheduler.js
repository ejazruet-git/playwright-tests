//import cron from 'node-cron';
//import { exec } from 'child_process';

const cron = require('node-cron');
const { exec } = require('child_process');

// Ensure correct working directory (important)
process.chdir('E:/Projects/Playwright_Automation_VSCodeExt');
console.log('📂 Working directory set to:', process.cwd());

// Function to run specific Playwright test
function runPlaywrightTests() {
  console.log(`🚀 Running Playwright test at ${new Date().toLocaleTimeString()}`);

  // Path to your test file
  const testFile = 'tests/CreateAccount.spec.js';

  exec(`npx playwright test ${testFile}`, (error, stdout, stderr) => {
    console.log('🧾 STDOUT:', stdout);
    console.log('⚠️ STDERR:', stderr);
    if (error) {
      console.error(`❌ Command failed: ${error.message}`);
      return;
    }
    console.log('✅ Playwright test completed successfully.');
  });
}

// ───────────────────────────────────────────────
// CRON format: minute hour * * *
// Example: 0 13 * * *  →  Run at 1:00 PM every day
//          0 14 * * *  →  Run at 2:00 PM every day
//          */30 * * * * → Run after every 30 mins
//          12 19 * * * → Run at 7:12 PM daily
//          0 14,16 * * * → Run at 2:00PM and 4:00PM
// ───────────────────────────────────────────────

// Schedule at 11schedu:17 PM daily
cron.schedule('25 12 * * *', runPlaywrightTests);

// Display below message in console once schedular started running
console.log('🕐 Scheduler started — waiting for next 11:15 PM run...');

// schedular run command : node scheduler.js