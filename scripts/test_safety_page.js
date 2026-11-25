// Quality Audit Script for Safety and Reporting Guide Page
const http = require("http");

console.log("=================================================");
console.log("AUDITING SAFETY & REPORTING GUIDE PAGE (/safety)");
console.log("=================================================");

http.get("http://localhost:3000/safety", (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    console.log(`✓ HTTP status /safety: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      console.error(`FAIL: Expected 200, got ${res.statusCode}`);
      process.exit(1);
    }

    const checks = [
      { name: "Main Heading: Pause. Verify. Protect.", pattern: /Pause\.\s*Verify\.\s*Protect\./i },
      { name: "Section 1: Verify a Suspicious Call", pattern: /Verify a Suspicious Call/i },
      { name: "Section 1 Subpoint 1: Disconnect from suspicious interactions", pattern: /Disconnect from suspicious interactions/i },
      { name: "Section 1 Subpoint 2: Call the person using a trusted saved number", pattern: /Call the person using a trusted saved number/i },
      { name: "Section 1 Subpoint 3: Independently verify unexpected requests", pattern: /Independently verify unexpected requests/i },

      { name: "Section 2: Protect Your Digital Identity", pattern: /Protect Your Digital Identity/i },
      { name: "Section 2 Subpoint 1: Protect personal information", pattern: /Protect personal information/i },
      { name: "Section 2 Subpoint 2: Use strong authentication", pattern: /Use strong authentication/i },
      { name: "Section 2 Subpoint 3: Avoid sharing confidential information", pattern: /Avoid sharing confidential information/i },

      { name: "Section 3: Family Safety Protocol", pattern: /Family Safety Protocol/i },
      { name: "Section 3 Subpoint 1: Establish a family verification phrase", pattern: /Establish a family verification phrase/i },
      { name: "Section 3 Subpoint 2: Agree on trusted emergency contact methods", pattern: /Agree on trusted emergency contact methods/i },
      { name: "Section 3 Subpoint 3: Verify unusual financial requests", pattern: /Verify unusual financial requests/i },

      { name: "Section 4: What to Do After a Scam", pattern: /What to Do After a Scam/i },
      { name: "Section 4 Subpoint 1: Contact your bank if money is involved", pattern: /Contact your bank if money is involved/i },
      { name: "Section 4 Subpoint 2: Preserve relevant evidence", pattern: /Preserve relevant evidence/i },
      { name: "Section 4 Subpoint 3: Report suspected financial fraud promptly", pattern: /Report suspected financial fraud promptly/i },

      { name: "Section 5: Reporting in India", pattern: /Reporting in India/i },
      { name: "Section 5 Helpline: 1930", pattern: /1930/ },
      { name: "Section 5 Portal Name: National Cyber Crime Reporting Portal", pattern: /National Cyber Crime Reporting Portal/i },
      { name: "Section 5 Official Link: https://cybercrime.gov.in/", pattern: /https:\/\/cybercrime\.gov\.in\// },
      { name: "Helpline Dial Link: tel:1930", pattern: /href="tel:1930"/ },
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
      console.log("ALL SAFETY & REPORTING PAGE VERIFICATIONS PASSED 100%!");
    } else {
      process.exit(1);
    }
  });
}).on("error", (err) => {
  console.error("Connection failed:", err.message);
  process.exit(1);
});
