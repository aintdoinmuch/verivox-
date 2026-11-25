const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3000";

async function runVideoDetectionTests() {
  console.log("=================================================");
  console.log("SUITE 4: DETECTION CENTRE – VIDEO DEEPFAKE DETECTION");
  console.log("=================================================");

  let passedCount = 0;
  let totalTests = 0;

  // Test 1: Empty frames validation
  totalTests++;
  console.log("\nTest 1: Empty frames validation...");
  try {
    const res = await fetch(`${BASE_URL}/api/detect/video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frames: [], duration: 0 }),
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

  // Test 2: Maximum keyframe count limit (> 32 frames)...
  totalTests++;
  console.log("\nTest 2: Maximum keyframe count limit (> 32 frames)...");
  try {
    const dummyFrames = Array.from({ length: 35 }, (_, i) => ({
      frame_index: i + 1,
      timestamp: i * 0.5,
      data: "data:image/jpeg;base64,/9j/4AAQSkZJRg==",
    }));
    const res = await fetch(`${BASE_URL}/api/detect/video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frames: dummyFrames, duration: 17.5 }),
    });
    const data = await res.json();
    if (res.status === 413 && data.error) {
      console.log(`  -> PASS (${res.status}): ${data.error}`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Load pre-generated test frames
  const framesPath = path.join(process.cwd(), "scripts", "test_frames.json");
  const testFrames = JSON.parse(fs.readFileSync(framesPath, "utf8"));
  console.log(`\nLoaded ${testFrames.length} valid JPEG keyframes from ${framesPath}`);

  // Test 3: Actual Dual-Engine ViT Video Inference (Visual Only)
  totalTests++;
  console.log("\nTest 3: Dual-Engine Vision Transformer (ViT-Base) Video Inference (4 keyframes)...");
  try {
    const startTime = Date.now();
    const res = await fetch(`${BASE_URL}/api/detect/video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        frames: testFrames,
        duration: 6.0,
        audio_base64: null,
      }),
    });
    const data = await res.json();
    const durationMs = Date.now() - startTime;

    if (
      res.status === 200 &&
      data.status === "success" &&
      (data.visual_assessment === "authentic" || data.visual_assessment === "synthetic" || data.visual_assessment === "suspicious") &&
      typeof data.visual_confidence_score === "number" &&
      Array.isArray(data.analyzed_frames) &&
      data.analyzed_frames.length === 4 &&
      data.model_metadata &&
      data.model_metadata.name.includes("Vision Transformer")
    ) {
      console.log(`  -> PASS (${res.status} in ${durationMs}ms)`);
      console.log(`     Visual Assessment: ${data.visual_assessment.toUpperCase()} (Confidence: ${data.visual_confidence_score}%)`);
      console.log(`     Overall Verdict: ${data.overall_verdict.toUpperCase()} | Risk: ${data.risk_level}`);
      console.log(`     Keyframes Analyzed: ${data.analyzed_frames.length} frames`);
      console.log(`     Model: ${data.model_metadata.name}`);
      console.log(`     Audio Track Assessment: ${data.audio_assessment.reason || data.audio_assessment.assessment}`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 4: Multimodal Video + Extracted Audio Track Inference
  totalTests++;
  console.log("\nTest 4: Multimodal Video Inference with Extracted Audio Track (ViT + Wav2Vec2)...");
  try {
    const synthAudioPath = path.join(process.cwd(), "public", "samples", "elevenlabs_voice_sample.flac");
    const audioBytes = fs.readFileSync(synthAudioPath);
    const audioBase64 = "data:audio/flac;base64," + audioBytes.toString("base64");

    const startTime = Date.now();
    const res = await fetch(`${BASE_URL}/api/detect/video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        frames: testFrames,
        duration: 6.0,
        audio_base64: audioBase64,
        audio_filename: "sample_speech.flac",
      }),
    });
    const data = await res.json();
    const durationMs = Date.now() - startTime;

    if (
      res.status === 200 &&
      data.status === "success" &&
      data.audio_assessment &&
      data.audio_assessment.performed === true &&
      data.audio_assessment.assessment === "synthetic" &&
      data.overall_verdict === "synthetic"
    ) {
      console.log(`  -> PASS (${res.status} in ${durationMs}ms)`);
      console.log(`     Visual Assessment: ${data.visual_assessment}`);
      console.log(`     Audio Track Assessment: ${data.audio_assessment.assessment.toUpperCase()} (Spoof Prob: ${data.audio_assessment.spoof_probability}%)`);
      console.log(`     Multimodal Overall Verdict: ${data.overall_verdict.toUpperCase()} | Risk: ${data.risk_level}`);
      console.log(`     Title: "${data.title}"`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  console.log(`\n--- SUITE 4 SUMMARY ---`);
  console.log(`Total Video Deepfake Tests: ${totalTests}, Passed: ${passedCount}, Failed: ${totalTests - passedCount}`);
}

runVideoDetectionTests();
