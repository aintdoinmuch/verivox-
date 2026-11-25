import { NextResponse } from "next/server";
import { PROJECT_INFO } from "@/lib/constants";

export async function GET() {
  const pythonBackendUrl =
    process.env.PYTHON_BACKEND_URL ||
    process.env.AUDIO_DETECTOR_URL ||
    process.env.VIDEO_DETECTOR_URL ||
    "http://127.0.0.1:8000";

  return NextResponse.json({
    status: "healthy",
    project: PROJECT_INFO.name,
    version: PROJECT_INFO.version,
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    pythonBackendUrl,
    timestamp: new Date().toISOString(),
  });
}
