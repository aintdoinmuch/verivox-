const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3000";

async function runAudioDetectionTests() {
  console.log("=================================================");
  console.log("SUITE 3: DETECTION CENTRE – AUDIO DEEPFAKE DETECTION");
  console.log("=================================================");

  let passedCount = 0;
  let totalTests = 0;

  // Test 1: Empty file upload validation
  totalTests++;
  console.log("\nTest 1: Empty file upload validation...");
  try {
    const formData = new FormData();
    const res = await fetch(`${BASE_URL}/api/detect/audio`, {
      method: "POST",
      body: formData,
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

  // Test 2: Unsupported file format rejection
  totalTests++;
  console.log("\nTest 2: Unsupported file format rejection (e.g. text file as audio)...");
  try {
    const fakeBlob = new Blob(["This is a plain text file pretending to be audio"], { type: "text/plain" });
    const formData = new FormData();
    formData.append("file", fakeBlob, "document.txt");

    const res = await fetch(`${BASE_URL}/api/detect/audio`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if ((res.status === 400 || res.status === 415) && data.error && (data.error.includes("Unsupported") || data.error.includes("format"))) {
      console.log(`  -> PASS (${res.status}): ${data.error}`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 3: Actual Pretrained Model Inference on Real Human Speech
  totalTests++;
  console.log("\nTest 3: Model Inference on Real Human Speech (real_human_speech.flac)...");
  try {
    const realFilePath = path.join(process.cwd(), "public", "samples", "real_human_speech.flac");
    const fileBytes = fs.readFileSync(realFilePath);
    const blob = new Blob([fileBytes], { type: "audio/flac" });

    const formData = new FormData();
    formData.append("file", blob, "real_human_speech.flac");

    const startTime = Date.now();
    const res = await fetch(`${BASE_URL}/api/detect/audio`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const durationMs = Date.now() - startTime;

    if (
      res.status === 200 &&
      data.status === "success" &&
      data.assessment === "authentic" &&
      typeof data.confidence_score === "number" &&
      data.probabilities &&
      typeof data.probabilities.bonafide === "number" &&
      data.audio_telemetry &&
      typeof data.audio_telemetry.duration_seconds === "number" &&
      data.model_metadata &&
      data.model_metadata.name.includes("Wav2Vec2")
    ) {
      console.log(`  -> PASS (${res.status} in ${durationMs}ms)`);
      console.log(`     Model: ${data.model_metadata.name} (${data.model_metadata.checkpoint})`);
      console.log(`     Assessment: ${data.assessment.toUpperCase()} | Risk Level: ${data.risk_level}`);
      console.log(`     Confidence Score: ${data.confidence_score}% (Bonafide: ${data.probabilities.bonafide}%, Spoof: ${data.probabilities.spoof}%)`);
      console.log(`     Duration: ${data.audio_telemetry.duration_seconds}s | Sample Rate: ${data.audio_telemetry.sample_rate_hz}Hz`);
      console.log(`     Explanation: ${data.explanation.slice(0, 90)}...`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 4: Actual Pretrained Model Inference on ElevenLabs Synthetic Audio
  totalTests++;
  console.log("\nTest 4: Model Inference on ElevenLabs Synthetic Audio (elevenlabs_voice_sample.flac)...");
  try {
    const synthFilePath = path.join(process.cwd(), "public", "samples", "elevenlabs_voice_sample.flac");
    const fileBytes = fs.readFileSync(synthFilePath);
    const blob = new Blob([fileBytes], { type: "audio/flac" });

    const formData = new FormData();
    formData.append("file", blob, "elevenlabs_voice_sample.flac");

    const startTime = Date.now();
    const res = await fetch(`${BASE_URL}/api/detect/audio`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const durationMs = Date.now() - startTime;

    if (
      res.status === 200 &&
      data.status === "success" &&
      data.assessment === "synthetic" &&
      typeof data.confidence_score === "number" &&
      data.probabilities &&
      typeof data.probabilities.spoof === "number" &&
      data.audio_telemetry &&
      Array.isArray(data.limitations) &&
      Array.isArray(data.recommended_actions)
    ) {
      console.log(`  -> PASS (${res.status} in ${durationMs}ms)`);
      console.log(`     Model: ${data.model_metadata.name} (${data.model_metadata.checkpoint})`);
      console.log(`     Assessment: ${data.assessment.toUpperCase()} | Risk Level: ${data.risk_level}`);
      console.log(`     Confidence Score: ${data.confidence_score}% (Spoof: ${data.probabilities.spoof}%, Bonafide: ${data.probabilities.bonafide}%)`);
      console.log(`     Duration: ${data.audio_telemetry.duration_seconds}s | Sample Rate: ${data.audio_telemetry.sample_rate_hz}Hz`);
      console.log(`     Explanation: ${data.explanation.slice(0, 90)}...`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  // Test 5: Corrupt audio file handling
  totalTests++;
  console.log("\nTest 5: Corrupt audio file handling (random garbage bytes with .wav extension)...");
  try {
    const corruptBytes = Buffer.from("RIFF\x24\x00\x00\x00WAVEfmt \x10\x00\x00\x00GARBAGE_DATA_CORRUPT");
    const blob = new Blob([corruptBytes], { type: "audio/wav" });

    const formData = new FormData();
    formData.append("file", blob, "corrupt.wav");

    const res = await fetch(`${BASE_URL}/api/detect/audio`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.status >= 400 && data.error) {
      console.log(`  -> PASS (${res.status}): Caught corrupted audio error: ${data.error.slice(0, 80)}...`);
      passedCount++;
    } else {
      console.error(`  -> FAIL (${res.status}):`, data);
    }
  } catch (err) {
    console.error("  -> ERROR:", err.message);
  }

  console.log(`\n--- SUITE 3 SUMMARY ---`);
  console.log(`Total Audio Deepfake Tests: ${totalTests}, Passed: ${passedCount}, Failed: ${totalTests - passedCount}`);
}

runAudioDetectionTests();
