"""
VoiceGuard AI — Unified Multimodal Deepfake Detection Microservice
FastAPI Application serving:
1. Audio Deepfake Detection (Wav2Vec2 Modern AI Voice Classifier)
2. Video Deepfake Detection (Vision Transformer ViT-Base Face Manipulation Classifier)
Runs on port 8000.
"""

import base64
import sys
import traceback
from contextlib import asynccontextmanager
from typing import Any
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from detector import AudioDeepfakeDetector
from video_detector import VideoDeepfakeDetector

MAX_FILE_BYTES = 50 * 1024 * 1024  # 50 MB

audio_detector: AudioDeepfakeDetector | None = None
video_detector: VideoDeepfakeDetector | None = None


class VideoFrameItem(BaseModel):
    frame_index: int
    timestamp: float
    data: str  # Base64 JPEG data or data URL
    thumbnail: str | None = None
    face_detected: bool = True


class VideoAnalysisRequest(BaseModel):
    frames: list[VideoFrameItem]
    duration: float = 0.0
    audio_base64: str | None = None
    audio_filename: str | None = "audio.wav"


@asynccontextmanager
async def lifespan(app: FastAPI):
    global audio_detector, video_detector
    try:
        print("[Server] Starting VoiceGuard AI Multimodal Microservice...")
        audio_detector = AudioDeepfakeDetector()
        print("[Server] Audio Deepfake Model loaded successfully.")

        video_detector = VideoDeepfakeDetector()
        print("[Server] Video Deepfake Model loaded successfully.")
    except Exception as e:
        print(f"[Server] Failed to load detector models on startup: {e}")
        traceback.print_exc()
    yield
    print("[Server] Shutting down VoiceGuard AI Multimodal Microservice.")


app = FastAPI(
    title="VoiceGuard AI - Multimodal Deepfake Detection API",
    description="Microservice providing real-time acoustic and visual neural media forensic triage",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "VoiceGuard Multimodal Deepfake Detector",
        "audio_model_loaded": audio_detector is not None,
        "video_model_loaded": video_detector is not None,
    }


# ==========================================
# AUDIO DETECTION ENDPOINT
# ==========================================
@app.post("/detect")
async def detect_audio(file: UploadFile = File(...)):
    if audio_detector is None:
        raise HTTPException(
            status_code=503,
            detail="The audio deepfake classification model is still initializing. Please retry in a few seconds.",
        )

    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if len(file_bytes) > MAX_FILE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File exceeds maximum allowed size of {MAX_FILE_BYTES // (1024 * 1024)}MB.",
        )

    filename = file.filename or "recording.wav"

    try:
        result = audio_detector.predict(file_bytes, filename=filename)
        print(
            f"[Server] Analyzed audio {filename}: assessment={result['assessment']}, "
            f"confidence={result['confidence_score']}%, spoof_prob={result['probabilities']['spoof']}%"
        )
        return JSONResponse(content=result)
    except ValueError as val_err:
        raise HTTPException(status_code=400, detail=str(val_err))
    except Exception as exc:
        print(f"[Server] Audio inference error on {filename}: {exc}")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Audio processing failure: {str(exc)}",
        )
    finally:
        del file_bytes


# ==========================================
# VIDEO DETECTION ENDPOINT (MULTIMODAL)
# ==========================================
@app.post("/detect/video")
async def detect_video(req: VideoAnalysisRequest):
    if video_detector is None:
        raise HTTPException(
            status_code=503,
            detail="The video deepfake classification model is still initializing. Please retry in a few seconds.",
        )

    frames_payload = [f.model_dump() for f in req.frames]
    if not frames_payload:
        raise HTTPException(status_code=400, detail="No video frames provided for analysis.")

    try:
        # 1. Run visual frame deepfake analysis
        result = video_detector.analyze_frames(
            frames_payload,
            duration_seconds=req.duration,
        )

        # 2. If audio track was extracted, cross-assess acoustic spoof likelihood
        audio_assessment = {
            "performed": False,
            "reason": "No audio track provided with video payload.",
        }

        if req.audio_base64 and audio_detector is not None:
            try:
                audio_raw = req.audio_base64
                if "," in audio_raw:
                    audio_raw = audio_raw.split(",", 1)[1]
                audio_bytes = base64.b64decode(audio_raw)

                if len(audio_bytes) > 2000:
                    audio_res = audio_detector.predict(
                        audio_bytes,
                        filename=req.audio_filename or "extracted_audio.wav"
                    )
                    audio_assessment = {
                        "performed": True,
                        "assessment": audio_res["assessment"],
                        "risk_level": audio_res["risk_level"],
                        "title": audio_res["title"],
                        "confidence_score": audio_res["confidence_score"],
                        "spoof_probability": audio_res["probabilities"]["spoof"],
                        "bonafide_probability": audio_res["probabilities"]["bonafide"],
                        "details": audio_res["explanation"],
                    }
            except Exception as audio_err:
                print(f"[Server] Optional video audio analysis error: {audio_err}")
                audio_assessment = {
                    "performed": False,
                    "reason": f"Audio track processing encountered an issue: {audio_err}",
                }

        result["audio_assessment"] = audio_assessment

        # 3. Overall Multimodal Verdict synthesis
        visual_ass = result["visual_assessment"]
        audio_ass = audio_assessment.get("assessment", "none")

        if visual_ass == "synthetic" or audio_ass == "synthetic":
            result["overall_verdict"] = "synthetic"
            result["risk_level"] = "high"
            result["title"] = "Multimodal Synthetic Manipulation Detected"
        elif visual_ass == "suspicious" or audio_ass == "suspicious":
            result["overall_verdict"] = "suspicious"
            result["risk_level"] = "medium"
            result["title"] = "Elevated Media Inconsistencies Flagged"
        elif visual_ass == "inconclusive":
            result["overall_verdict"] = "inconclusive"
            result["risk_level"] = "neutral"
            result["title"] = "Visual Biometrics Inconclusive"
        else:
            result["overall_verdict"] = "authentic"
            result["risk_level"] = "low"
            result["title"] = "Authentic Organic Video & Speech Verified"

        print(
            f"[Server] Analyzed video ({len(req.frames)} frames, {req.duration:.1f}s): "
            f"visual={visual_ass}, audio={audio_ass}, overall={result['overall_verdict']}"
        )
        return JSONResponse(content=result)
    except Exception as exc:
        print(f"[Server] Video inference error: {exc}")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Video analysis failure: {str(exc)}",
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=False)
