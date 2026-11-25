import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const PYTHON_BACKEND_URL =
  process.env.PYTHON_BACKEND_URL ||
  process.env.AUDIO_DETECTOR_URL ||
  "http://127.0.0.1:8000";
const MAX_UPLOAD_SIZE = 25 * 1024 * 1024; // 25 MB

const ALLOWED_EXTENSIONS = [".wav", ".mp3", ".m4a", ".aac", ".flac", ".ogg", ".webm"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided in request." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        {
          error: `Audio file exceeds maximum size limit of ${MAX_UPLOAD_SIZE / (1024 * 1024)}MB.`,
        },
        { status: 413 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "Audio file payload is empty (0 bytes)." },
        { status: 400 }
      );
    }

    // Validate file format extension or MIME
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    const isAudioMime = file.type.startsWith("audio/") || file.type === "application/octet-stream";

    if (!hasValidExtension && !isAudioMime) {
      return NextResponse.json(
        {
          error: `Unsupported file format. Supported formats: ${ALLOWED_EXTENSIONS.join(", ").toUpperCase()}`,
        },
        { status: 415 }
      );
    }

    // Forward the file payload to the decoupled Python FastAPI microservice
    const backendFormData = new FormData();
    backendFormData.append("file", file, file.name);

    let backendResponse: Response;
    try {
      backendResponse = await fetch(`${PYTHON_BACKEND_URL}/detect`, {
        method: "POST",
        body: backendFormData,
        // @ts-expect-error duplex required in Node 18+ fetch when streaming FormData
        duplex: "half",
      });
    } catch (networkErr: unknown) {
      const errMessage = networkErr instanceof Error ? networkErr.message : String(networkErr);
      console.error("[Audio Gateway] Failed to reach Python detection microservice:", errMessage);

      return NextResponse.json(
        {
          error: "VoiceGuard neural audio detection microservice is currently unreachable.",
          status: "BACKEND_UNAVAILABLE",
          details:
            "The decoupled Python deepfake classifier service (port 8000) is offline or initializing. Start the service with 'python backend/server.py'.",
        },
        { status: 503 }
      );
    }

    if (!backendResponse.ok) {
      const errorJson = await backendResponse.json().catch(() => ({}));
      const errorMsg = errorJson.detail || `Backend detection failed with status ${backendResponse.status}`;
      return NextResponse.json(
        { error: errorMsg, status: "INFERENCE_ERROR" },
        { status: backendResponse.status }
      );
    }

    const detectionData = await backendResponse.json();
    return NextResponse.json(detectionData, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal audio processing error";
    console.error("[Audio Gateway Error]:", err);
    return NextResponse.json(
      { error: message, status: "GATEWAY_ERROR" },
      { status: 500 }
    );
  }
}
