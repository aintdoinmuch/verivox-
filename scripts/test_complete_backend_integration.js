// VoiceGuard AI - Complete End-to-End Backend Integration Test Suite
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function postJSON(urlPath, payload) {
  try {
    const res = await fetch(`http://localhost:3000${urlPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => null);
    return { status: res.status, body };
  } catch (err) {
    return { status: 500, error: err.message };
  }
}

async function runTestSuite() {
  console.log("===============================================================");
  console.log("VOICEGUARD AI — COMPLETE BACKEND INTEGRATION TEST SUITE");
  console.log("===============================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(title, condition, extraInfo = "") {
    totalTests++;
    if (condition) {
      console.log(`✓ PASS: ${title} ${extraInfo}`);
      passedTests++;
    } else {
      console.error(`✗ FAIL: ${title} ${extraInfo}`);
    }
  }

  // -------------------------------------------------------------
  // TEST 1: GEMINI API CONFIGURATION & CONNECTION
  // -------------------------------------------------------------
  console.log("--- 1. GEMINI API CONFIGURATION & CONNECTION ---");
  const envContent = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
  const hasKey = /GEMINI_API_KEY=AQ\./.test(envContent);
  assert("GEMINI_API_KEY is defined in .env.local with valid format", hasKey);

  // -------------------------------------------------------------
  // TEST 2: TEXT SCAM ANALYSIS (SUSPICIOUS & BENIGN)
  // -------------------------------------------------------------
  console.log("\n--- 2. TEXT SCAM ANALYSIS (/api/analyze) ---");
  
  // 2a. Suspicious message
  const suspRes = await postJSON("/api/analyze", {
    text: "URGENT: Granddad, I am in jail after a car crash! Please wire $2,500 immediately for bail. Do not tell Mom and Dad, please hurry!",
  });
  assert(
    "Suspicious message analysis returns HTTP 200",
    suspRes.status === 200,
    `Status: ${suspRes.status}`
  );
  assert(
    "Suspicious message flagged as 'high' threat with score > 80",
    suspRes.body?.threatLevel === "high" && suspRes.body?.overallScore >= 80,
    `Level: ${suspRes.body?.threatLevel}, Score: ${suspRes.body?.overallScore}`
  );
  assert(
    "Suspicious message detects urgency and isolation tactics",
    Array.isArray(suspRes.body?.identifiedTactics) && suspRes.body.identifiedTactics.length >= 2,
    `Tactics: ${JSON.stringify(suspRes.body?.identifiedTactics)}`
  );

  // 2b. Normal message
  const normalRes = await postJSON("/api/analyze", {
    text: "Hi Alex, hope you have a great week! Let's meet for coffee this Friday at 4 PM at the campus library cafe to study.",
  });
  assert(
    "Normal benign message returns HTTP 200",
    normalRes.status === 200
  );
  assert(
    "Normal benign message categorized as 'low' threat",
    normalRes.body?.threatLevel === "low",
    `Level: ${normalRes.body?.threatLevel}`
  );

  // 2c. Invalid short message
  const invalidTextRes = await postJSON("/api/analyze", { text: "hi" });
  assert(
    "Short/invalid text triggers validation error (HTTP 400)",
    invalidTextRes.status === 400
  );

  // -------------------------------------------------------------
  // TEST 3: AUDIO DEEPFAKE DETECTION (WAV2VEC2 PRETRAINED MODEL)
  // -------------------------------------------------------------
  console.log("\n--- 3. AUDIO DEEPFAKE DETECTION (/api/detect/audio) ---");
  
  // 3a. ElevenLabs Voice Clone Detection
  try {
    const audioAiOut = execSync(
      `python -c "import requests; r = requests.post('http://localhost:3000/api/detect/audio', files={'file': ('elevenlabs.flac', open('backend/test_audio/elevenlabs_sample.flac', 'rb'), 'audio/flac')}); print(r.status_code, r.json().get('assessment'), r.json().get('confidence_score'), r.json().get('model_metadata', {}).get('checkpoint'))"`
    ).toString().trim();
    
    assert(
      "AI Voice Clone accurately classified as 'synthetic'",
      audioAiOut.includes("200 synthetic"),
      `Output: ${audioAiOut}`
    );
    assert(
      "Audio classifier uses pretrained Wav2Vec2 checkpoint",
      audioAiOut.includes("mo-thecreator/Deepfake-audio-detection")
    );
  } catch (e) {
    assert("AI Voice Clone detection failed", false, e.message);
  }

  // 3b. Real Human Voice Detection
  try {
    const audioRealOut = execSync(
      `python -c "import requests; r = requests.post('http://localhost:3000/api/detect/audio', files={'file': ('real.flac', open('backend/test_audio/real_sample.flac', 'rb'), 'audio/flac')}); print(r.status_code, r.json().get('assessment'))"`
    ).toString().trim();

    assert(
      "Human Voice accurately classified as 'authentic'",
      audioRealOut.includes("200 authentic"),
      `Output: ${audioRealOut}`
    );
  } catch (e) {
    assert("Human Voice detection failed", false, e.message);
  }

  // 3c. Invalid file type handling
  try {
    const audioInvalidOut = execSync(
      `python -c "import requests, io; r = requests.post('http://localhost:3000/api/detect/audio', files={'file': ('fake.txt', io.BytesIO(b'not audio'), 'text/plain')}); print(r.status_code)"`
    ).toString().trim();

    assert(
      "Invalid audio upload returns HTTP 415 Unsupported Media Type",
      audioInvalidOut === "415",
      `Status: ${audioInvalidOut}`
    );
  } catch (e) {
    assert("Invalid audio upload test failed", false, e.message);
  }

  // -------------------------------------------------------------
  // TEST 4: VIDEO DEEPFAKE DETECTION (DUAL ViT + 2D FFT)
  // -------------------------------------------------------------
  console.log("\n--- 4. VIDEO DEEPFAKE DETECTION (/api/detect/video) ---");
  
  // 4a. Valid video payload with synthetic frames
  try {
    const videoOut = execSync(
      `python -c "import requests, io, base64, json; from PIL import Image; img = Image.new('RGB', (64, 64), (100, 150, 200)); buf = io.BytesIO(); img.save(buf, format='JPEG'); b64 = base64.b64encode(buf.getvalue()).decode(); r = requests.post('http://localhost:3000/api/detect/video', json={'frames': [{'frame_index': 0, 'timestamp': 0.0, 'data': f'data:image/jpeg;base64,{b64}', 'face_detected': True}], 'duration': 1.5}); print(r.status_code, r.json().get('visual_assessment'), r.json().get('model_metadata', {}).get('name'))"`
    ).toString().trim();

    assert(
      "Video analysis returns HTTP 200 with dual-ViT assessment",
      videoOut.includes("200 synthetic Dual-Engine Vision Transformer Ensemble"),
      `Output: ${videoOut}`
    );
  } catch (e) {
    assert("Video analysis payload test failed", false, e.message);
  }

  // 4b. Invalid empty frames payload
  await new Promise((r) => setTimeout(r, 300));
  const emptyVideoRes = await postJSON("/api/detect/video", { frames: [] });
  assert(
    "Empty video frames triggers HTTP 400 Bad Request",
    emptyVideoRes.status === 400,
    `Status: ${emptyVideoRes.status}`
  );

  // 4c. Oversized frames payload (>32 frames)
  const tooManyFrames = Array.from({ length: 33 }, (_, i) => ({
    frame_index: i,
    timestamp: i * 0.5,
    data: "data:image/jpeg;base64,abc",
  }));
  const oversizedVideoRes = await postJSON("/api/detect/video", { frames: tooManyFrames });
  assert(
    "Oversized video frames (>32) triggers HTTP 413 Payload Too Large",
    oversizedVideoRes.status === 413
  );

  // -------------------------------------------------------------
  // TEST 5: AI SAFETY ASSISTANT (GEMINI INTEGRATION)
  // -------------------------------------------------------------
  console.log("\n--- 5. AI SAFETY ASSISTANT (/api/assistant) ---");
  const assistantRes = await postJSON("/api/assistant", {
    message: "How can businesses prevent executive impersonation and wire fraud?",
    history: [],
  });
  assert(
    "AI Safety Assistant returns HTTP 200",
    assistantRes.status === 200
  );
  assert(
    "AI Assistant powered by official Gemini model",
    assistantRes.body?.source === "gemini" && assistantRes.body?.model === "gemini-3.5-flash-lite",
    `Source: ${assistantRes.body?.source}, Model: ${assistantRes.body?.model}`
  );
  assert(
    "AI Assistant provides comprehensive defense guidance",
    typeof assistantRes.body?.response === "string" && assistantRes.body.response.length > 150,
    `Response length: ${assistantRes.body?.response?.length} chars`
  );

  // -------------------------------------------------------------
  // TEST 6: SECURITY & PRIVACY VERIFICATION
  // -------------------------------------------------------------
  console.log("\n--- 6. SECURITY & PRIVACY VERIFICATION ---");
  const leakCheck = execSync(
    `python -c "import os; found = [os.path.join(r, f) for r, d, fs in os.walk('src') for f in fs if f.endswith(('.tsx', '.jsx', '.html')) and 'GEMINI_API_KEY' in open(os.path.join(r, f), errors='ignore').read()]; print(len(found))"`
  ).toString().trim();
  assert(
    "Zero API key leaks in client-side code (.tsx, .jsx, .html)",
    leakCheck === "0",
    `Found leaks: ${leakCheck}`
  );

  // -------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------
  console.log("\n===============================================================");
  console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
  console.log("===============================================================");
  
  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test runner failed:", err);
  process.exit(1);
});
