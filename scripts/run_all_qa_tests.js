const { execSync } = require("child_process");

const suites = [
  { name: "Suite 1: Pages, Navigation & Links", cmd: "node scripts/test_pages_and_links.js" },
  { name: "Suite 2: Text Scam Analysis (Gemini API)", cmd: "node scripts/test_text_analysis_suite.js" },
  { name: "Suite 3: Audio Deepfake Detection (Wav2Vec2)", cmd: "node scripts/test_audio_detection_suite.js" },
  { name: "Suite 4: Video Deepfake Detection (Dual ViT)", cmd: "node scripts/test_video_detection_suite.js" },
  { name: "Suite 5: AI Safety Assistant (Gemini Copilot)", cmd: "node scripts/test_assistant_suite.js" },
  { name: "Suite 6: Awareness Quiz Engine (24 Questions)", cmd: "node scripts/setup_quiz_test.js && node scripts/.tmp_runner.js" },
  { name: "Suite 7: Safety, Attribution & Security Audit", cmd: "node scripts/test_security_and_meta.js" },
];

console.log("=================================================================");
console.log("VOICEGUARD AI — COMPLETE QUALITY ASSURANCE MASTER TEST RUNNER");
console.log("=================================================================\n");

let masterPassed = 0;
let masterFailed = 0;
const suiteResults = [];

for (const suite of suites) {
  console.log(`>>> EXECUTING: ${suite.name}...`);
  const start = Date.now();
  try {
    const output = execSync(suite.cmd, { encoding: "utf8", timeout: 45000 });
    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.log(output);
    console.log(`[COMPLETED] ${suite.name} in ${duration}s\n`);
    masterPassed++;
    suiteResults.push({ name: suite.name, status: "PASSED", duration: `${duration}s` });
  } catch (err) {
    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.error(`[FAILED] ${suite.name} in ${duration}s:`, err.stdout || err.message);
    masterFailed++;
    suiteResults.push({ name: suite.name, status: "FAILED", duration: `${duration}s`, error: err.message });
  }
}

console.log("=================================================================");
console.log("MASTER QUALITY ASSURANCE SUMMARY");
console.log("=================================================================");
console.log(`Total Suites: ${suites.length}`);
console.log(`Suites Passed: ${masterPassed}`);
console.log(`Suites Failed: ${masterFailed}`);
console.log("Detailed Results:");
suiteResults.forEach(r => console.log(`  - [${r.status}] ${r.name} (${r.duration})`));
console.log("=================================================================");
