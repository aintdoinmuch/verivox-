const BASE_URL = "http://localhost:3000";

async function runAssistantTests() {
  console.log("=================================================");
  console.log("SUITE 5: AI SAFETY ASSISTANT & GEMINI CONVERSATION");
  console.log("=================================================");

  let passedCount = 0;
  let totalTests = 0;

  // Test 1: Empty message validation
  totalTests++;
  console.log("\nTest 1: Empty message validation...");
  try {
    const res = await fetch(`${BASE_URL}/api/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "   " }),
    });
    const data = await res.json();
    if (res.status === 400 && data.error) {
      console.log(`  -> PASS (${res.status}): ${data.error}`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 2: Safety question on Voice Cloning Mechanics
  totalTests++;
  console.log("\nTest 2: Conversational Inquiry: 'How does voice cloning work?'...");
  try {
    const startTime = Date.now();
    const res = await fetch(`${BASE_URL}/api/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "How does voice cloning work?",
        history: [],
      }),
    });
    const data = await res.json();
    const durationMs = Date.now() - startTime;

    if (
      res.status === 200 &&
      data.response &&
      data.response.length > 50 &&
      (data.source === "gemini" || data.source === "verified_knowledge_base")
    ) {
      console.log(`  -> PASS (${res.status} in ${durationMs}ms)`);
      console.log(`     Source: ${data.source} (Model: ${data.model || "Gemini"})`);
      console.log(`     Response Sample: ${data.response.slice(0, 100).replace(/\n/g, " ")}...`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 3: Emergency Crisis Triage (Impersonation Call)
  totalTests++;
  console.log("\nTest 3: High-Stakes Crisis Triage: 'Someone called claiming my daughter was in an accident and wants $2,000 immediately'...");
  try {
    const startTime = Date.now();
    const res = await fetch(`${BASE_URL}/api/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Someone called claiming my daughter was in a car crash and wants $2,000 wired right now. What should I do?",
        history: [],
      }),
    });
    const data = await res.json();
    const durationMs = Date.now() - startTime;

    const contentLower = (data.response || "").toLowerCase();
    const hasEmergencyAdvice =
      contentLower.includes("do not wire") ||
      contentLower.includes("hang up") ||
      contentLower.includes("verify") ||
      contentLower.includes("call") ||
      contentLower.includes("safe word");

    if (res.status === 200 && data.response && hasEmergencyAdvice) {
      console.log(`  -> PASS (${res.status} in ${durationMs}ms)`);
      console.log(`     Source: ${data.source} (Model: ${data.model || "Gemini"})`);
      console.log(`     Emergency Guidance Identified: true`);
      console.log(`     Response Sample: ${data.response.slice(0, 110).replace(/\n/g, " ")}...`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 4: Multi-Turn Conversation Continuity
  totalTests++;
  console.log("\nTest 4: Multi-Turn Conversation Continuity...");
  try {
    const startTime = Date.now();
    const res = await fetch(`${BASE_URL}/api/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Can you give me the exact phone number to report this in India?",
        history: [
          { role: "user", content: "I received a fake police call demanding money." },
          { role: "assistant", content: "This is an impersonation extortion scam. Do not pay." },
        ],
      }),
    });
    const data = await res.json();
    const durationMs = Date.now() - startTime;

    const hasIndia1930 = (data.response || "").includes("1930") || (data.response || "").toLowerCase().includes("cybercrime.gov.in");

    if (res.status === 200 && data.response && hasIndia1930) {
      console.log(`  -> PASS (${res.status} in ${durationMs}ms)`);
      console.log(`     Source: ${data.source} (Model: ${data.model || "Gemini"})`);
      console.log(`     Successfully provided official reporting line (1930): true`);
      console.log(`     Response Sample: ${data.response.slice(0, 110).replace(/\n/g, " ")}...`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  console.log(`\n--- SUITE 5 SUMMARY ---`);
  console.log(`Total AI Assistant Tests: ${totalTests}, Passed: ${passedCount}, Failed: ${totalTests - passedCount}`);
}

runAssistantTests();
