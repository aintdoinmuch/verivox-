// Automated Quality Verification Script for About Project Page (/about)
const http = require("http");

console.log("=================================================");
console.log("AUDITING ABOUT PROJECT PAGE (/about)");
console.log("=================================================");

http.get("http://localhost:3000/about", (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    console.log(`✓ HTTP status /about: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      console.error(`FAIL: Expected 200, got ${res.statusCode}`);
      process.exit(1);
    }

    const checks = [
      {
        name: "Project Title: Understanding, Detecting and Preventing Deepfake and Voice-Cloning Scams.",
        pattern: /Understanding,\s*Detecting\s*and\s*Preventing\s*Deepfake\s*and\s*Voice-Cloning\s*Scams\./i,
      },
      { name: "1. Project overview", pattern: /Project Overview/i },
      { name: "2. Problem statement", pattern: /Problem Statement/i },
      { name: "3. Project objectives", pattern: /Project Objectives/i },
      { name: "4. Proposed solution", pattern: /Proposed Solution/i },
      { name: "5. Technologies used", pattern: /Technologies Used/i },
      { name: "6. Project team details", pattern: /Project Team Details/i },
      { name: "Team: Student 1 placeholder", pattern: /Student Name 1/i },
      { name: "Team: Reg No 1 placeholder", pattern: /21BCON001/i },
      { name: "Team: Student 2 placeholder", pattern: /Student Name 2/i },
      { name: "Team: Reg No 2 placeholder", pattern: /21BCON002/i },
      { name: "Team: Student 3 placeholder", pattern: /Student Name 3/i },
      { name: "Team: Reg No 3 placeholder", pattern: /21BCON003/i },
      { name: "7. Faculty guide: Mr. Amit Sain", pattern: /Mr\.\s*Amit\s*Sain/i },
      { name: "Guide designation: FIAT Trainer", pattern: /FIAT Trainer/i },
      { name: "Institution: JECRC University, Jaipur", pattern: /JECRC University,\s*Jaipur/i },
      { name: "8. Project limitations", pattern: /Project Limitations/i },
      {
        name: "Educational prototype disclaimer: does not guarantee detection",
        pattern: /VoiceGuard AI is an educational prototype and does not guarantee detection of synthetic audio or video/i,
      },
    ];

    let passed = 0;
    checks.forEach(({ name, pattern }) => {
      const match = pattern.test(body);
      if (match) {
        console.log(`✓ ${name}`);
        passed++;
      } else {
        console.error(`✗ FAILED: ${name}`);
      }
    });

    console.log(`\nAudit Score: ${passed} / ${checks.length} checks passed.`);
    if (passed === checks.length) {
      console.log("ALL ABOUT PROJECT PAGE AUDITS PASSED 100%!");
    } else {
      process.exit(1);
    }
  });
}).on("error", (err) => {
  console.error("Connection failed:", err.message);
  process.exit(1);
});
