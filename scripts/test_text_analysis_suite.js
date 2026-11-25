const BASE_URL = "http://localhost:3000";

async function runTextAnalysisTests() {
  console.log("=================================================");
  console.log("SUITE 2: DETECTION CENTRE – TEXT ANALYSIS & GEMINI API");
  console.log("=================================================");

  const testCases = [
    {
      name: "Empty Payload Validation",
      payload: {},
      expectedStatus: 400,
      validate: (data, status) => status === 400 && data.error && data.error.includes("required"),
    },
    {
      name: "Whitespace-Only Text Validation",
      payload: { text: "     \n\t   " },
      expectedStatus: 400,
      validate: (data, status) => status === 400 && data.error,
    },
    {
      name: "Very Short Text (< 5 chars) Validation",
      payload: { text: "hi" },
      expectedStatus: 400,
      validate: (data, status) => status === 400 && data.error,
    },
    {
      name: "Benign / Normal Message Analysis",
      payload: {
        text: "Hi Grandma, just checking in to see how your garden is doing. We are looking forward to visiting next Sunday for lunch. Love you!",
      },
      expectedStatus: 200,
      validate: (data, status) => {
        return (
          status === 200 &&
          typeof data.overallScore === "number" &&
          data.overallScore <= 50 &&
          (data.threatLevel === "safe" || data.threatLevel === "low") &&
          typeof data.summary === "string" &&
          typeof data.recommendedAction === "string" &&
          Array.isArray(data.indicators)
        );
      },
    },
    {
      name: "High-Risk Family Emergency Extortion Script",
      payload: {
        text: "Mom, please pick up... it's David. I was in a terrible car accident on Highway 9 and a police officer took my phone. Don't call Dad, he will panic and make things worse. The officer says we need $4,500 immediate cash bond right now or I'm being transferred to county jail. Please wire it to the clerk link I'm texting you right now.",
      },
      expectedStatus: 200,
      validate: (data, status) => {
        return (
          status === 200 &&
          typeof data.overallScore === "number" &&
          data.overallScore >= 70 &&
          (data.threatLevel === "high" || data.threatLevel === "critical") &&
          Array.isArray(data.identifiedTactics) &&
          data.identifiedTactics.length > 0 &&
          Array.isArray(data.indicators) &&
          data.indicators.length > 0 &&
          typeof data.recommendedAction === "string"
        );
      },
    },
    {
      name: "CEO / Executive Impersonation Financial Wire Scam",
      payload: {
        text: "Confidential: I am currently in a closed-door acquisition meeting with regulators. I need you to immediately execute an urgent wire transfer of $85,000 to the attached vendor escrow account before market close. Do not speak to anyone else in accounting as this is under strict NDA.",
      },
      expectedStatus: 200,
      validate: (data, status) => {
        return (
          status === 200 &&
          typeof data.overallScore === "number" &&
          data.overallScore >= 70 &&
          (data.threatLevel === "high" || data.threatLevel === "critical") &&
          Array.isArray(data.identifiedTactics) &&
          data.identifiedTactics.length > 0 &&
          Array.isArray(data.indicators) &&
          data.indicators.length > 0 &&
          typeof data.recommendedAction === "string"
        );
      },
    },
  ];

  let passedCount = 0;
  for (const tc of testCases) {
    try {
      console.log(`\nTesting: [${tc.name}]...`);
      const startTime = Date.now();
      const res = await fetch(`${BASE_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tc.payload),
      });
      const data = await res.json();
      const durationMs = Date.now() - startTime;

      const isValid = tc.validate(data, res.status);
      if (isValid) {
        console.log(`  -> PASS (${res.status} in ${durationMs}ms)`);
        if (data.overallScore !== undefined) {
          console.log(`     Score: ${data.overallScore}/100 | Level: ${data.threatLevel}`);
          console.log(`     Summary: ${data.summary.slice(0, 90)}...`);
          console.log(`     Identified Tactics: ${data.identifiedTactics ? data.identifiedTactics.join(", ") : "None"}`);
          console.log(`     Indicators Detected: ${data.indicators ? data.indicators.length : 0}`);
        }
        passedCount++;
      } else {
        console.error(`  -> FAIL (${res.status} in ${durationMs}ms)`);
        console.error("     Response:", JSON.stringify(data, null, 2));
      }
    } catch (err) {
      console.error(`  -> ERROR: ${err.message}`);
    }
  }

  console.log(`\n--- SUITE 2 SUMMARY ---`);
  console.log(`Total Text Analysis Tests: ${testCases.length}, Passed: ${passedCount}, Failed: ${testCases.length - passedCount}`);
}

runTextAnalysisTests();
