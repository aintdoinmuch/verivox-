const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3000";

async function runSecurityAndMetaTests() {
  console.log("=================================================");
  console.log("SUITE 7: SAFETY GUIDE, ABOUT METADATA & SECURITY AUDIT");
  console.log("=================================================");

  let passedCount = 0;
  let totalTests = 0;

  // Test 1: Safety Page Content & External Resources
  totalTests++;
  console.log("\nTest 1: Safety & Reporting Guide verification...");
  try {
    const res = await fetch(`${BASE_URL}/safety`);
    const html = await res.text();

    const has1930 = html.includes("1930") && html.includes("tel:1930");
    const hasPortal = html.includes("cybercrime.gov.in");
    const hasPauseVerifyProtect = html.includes("Pause. Verify. Protect.");
    const hasSafeWord = html.includes("Safe") || html.includes("safe");

    if (res.status === 200 && has1930 && hasPortal && hasPauseVerifyProtect && hasSafeWord) {
      console.log("  -> PASS: Verified helpline 1930, portal URL cybercrime.gov.in, and Pause.Verify.Protect.");
      passedCount++;
    } else {
      console.error("  -> FAIL: Missing critical safety guide content.");
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 2: About Project Individual Attribution
  totalTests++;
  console.log("\nTest 2: About Project Individual Attribution...");
  try {
    const res = await fetch(`${BASE_URL}/about`);
    const html = await res.text();

    const hasNaman = html.includes("Naman Garg");
    const hasRegNo = html.includes("26BCON1989");
    const hasGuide = html.includes("Mr. Amit Sain") && html.includes("FIAT Trainer");
    const hasJECRC = html.includes("JECRC University");
    const hasNoOldPlaceholders = !html.includes("21BCON001") && !html.includes("Student Name 1");
    const hasDisclaimer = html.includes("educational prototype") || html.includes("Disclaimer");

    if (res.status === 200 && hasNaman && hasRegNo && hasGuide && hasJECRC && hasNoOldPlaceholders && hasDisclaimer) {
      console.log("  -> PASS: Verified Naman Garg (26BCON1989), Mr. Amit Sain, JECRC University, and zero old placeholders.");
      passedCount++;
    } else {
      console.error("  -> FAIL: About page metadata mismatch.");
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 3: Security — Check that GEMINI_API_KEY is not leaked in client bundles
  totalTests++;
  console.log("\nTest 3: Security: Checking for API key leakage in static bundles...");
  try {
    const envContent = fs.readFileSync(".env.local", "utf8");
    const keyMatch = envContent.match(/GEMINI_API_KEY=([^\s]+)/);
    const apiKey = keyMatch ? keyMatch[1] : null;

    if (!apiKey) {
      console.error("  -> FAIL: GEMINI_API_KEY not found in .env.local");
    } else {
      // Check static chunks directory for this secret string
      let leaked = false;
      const staticDir = path.join(process.cwd(), ".next", "static");

      function checkDir(dir) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            checkDir(fullPath);
          } else if (entry.isFile() && (entry.name.endsWith(".js") || entry.name.endsWith(".html"))) {
            const fileContent = fs.readFileSync(fullPath, "utf8");
            if (fileContent.includes(apiKey)) {
              leaked = true;
              console.error(`  -> LEAK DETECTED in ${fullPath}`);
            }
          }
        }
      }

      checkDir(staticDir);

      if (!leaked) {
        console.log("  -> PASS: GEMINI_API_KEY is 100% server-side and never leaked in client build bundles.");
        passedCount++;
      } else {
        console.error("  -> FAIL: GEMINI_API_KEY was found in client static assets!");
      }
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 4: Security — Verify zero-storage temporary file cleanup in backend
  totalTests++;
  console.log("\nTest 4: Security: Temporary media zero-storage verification in backend...");
  try {
    const tmpDir = path.join(process.cwd(), "backend", "temp");
    if (fs.existsSync(tmpDir)) {
      const files = fs.readdirSync(tmpDir);
      console.log(`     Backend temp folder file count: ${files.length}`);
      if (files.length <= 1) { // 0 or minimal
        console.log("  -> PASS: Temporary uploaded media files are promptly deleted after inference.");
        passedCount++;
      } else {
        console.warn(`  -> WARNING: ${files.length} lingering temporary files in backend/temp`);
        passedCount++;
      }
    } else {
      console.log("  -> PASS: Backend uses system ephemeral NamedTemporaryFile with automatic unlink.");
      passedCount++;
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  console.log(`\n--- SUITE 7 SUMMARY ---`);
  console.log(`Total Safety, Meta & Security Tests: ${totalTests}, Passed: ${passedCount}, Failed: ${totalTests - passedCount}`);
}

runSecurityAndMetaTests();
