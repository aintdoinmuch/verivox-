import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const PYTHON_BACKEND_URL =
  process.env.PYTHON_BACKEND_URL ||
  process.env.VIDEO_DETECTOR_URL ||
  process.env.AUDIO_DETECTOR_URL ||
  "http://127.0.0.1:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { frames, duration, audio_base64, audio_filename } = body;

    if (!frames || !Array.isArray(frames) || frames.length === 0) {
      return NextResponse.json(
        { error: "No video frames provided for deepfake analysis." },
        { status: 400 }
      );
    }

    if (frames.length > 32) {
      return NextResponse.json(
        { error: "Too many keyframes submitted. Maximum limit is 32 frames per video inspection." },
        { status: 413 }
      );
    }

    // Forward to decoupled Python microservice on port 8000
    let backendResponse: Response;
    try {
      backendResponse = await fetch(`${PYTHON_BACKEND_URL}/detect/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frames,
          duration: Number(duration) || 0.0,
          audio_base64: audio_base64 || null,
          audio_filename: audio_filename || "audio.wav",
        }),
      });
    } catch (networkErr: unknown) {
      const errMessage = networkErr instanceof Error ? networkErr.message : String(networkErr);
      console.error("[Video Gateway] Failed to reach Python vision microservice:", errMessage);

      return NextResponse.json(
        {
          error: "VoiceGuard neural video detection microservice is currently unreachable.",
          status: "BACKEND_UNAVAILABLE",
          details:
            "The decoupled Python deepfake classifier service (port 8000) is offline or initializing. Start the service with 'python backend/server.py'.",
        },
        { status: 503 }
      );
    }

    if (!backendResponse.ok) {
      const errorJson = await backendResponse.json().catch(() => ({}));
      const errorMsg = errorJson.detail || `Backend video detection failed with status ${backendResponse.status}`;
      return NextResponse.json(
        { error: errorMsg, status: "INFERENCE_ERROR" },
        { status: backendResponse.status }
      );
    }

    const detectionData = await backendResponse.json();
    return NextResponse.json(detectionData, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal video processing error";
    console.error("[Video Gateway Error]:", err);
    return NextResponse.json(
      { error: message, status: "GATEWAY_ERROR" },
      { status: 500 }
    );
  }
}
