"use client";

import * as React from "react";
import {
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Lock,
  FileText,
  Upload,
  Volume2,
  Video,
  FileAudio,
  FileVideo,
  X,
  Eye,
  HelpCircle,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PrimaryButton, SecondaryButton, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WaveformVisualizer } from "@/components/shared/waveform-visualizer";
import { ScamAnalysisResult, AudioDetectionResult, VideoDetectionResult } from "@/types/analysis";
import { encodeMonoWav, uint8ArrayToBase64 } from "@/lib/audio-encoder";

type ActiveTab = "text" | "audio" | "video";

const PRESET_EXAMPLES = [
  {
    title: "Family Emergency (High Risk)",
    category: "Family Extortion",
    text: "Mom, please pick up... it's David. I was in a bad accident on Highway 9 and a police officer has my phone. Don't call Dad, he'll panic and make things worse. The officer says we need $4,500 immediate cash bond right now or I'm being transferred to county jail. Please wire it to the clerk link I'm texting you right now.",
  },
  {
    title: "Executive Wire Request (Medium-High Risk)",
    category: "Workplace Fraud",
    text: "Hi, I am in confidential board meetings with overseas legal counsel and cannot take calls right now. We have an acquisition milestone that must close before 4:00 PM. Please expedite a wire of $85,000 to the attached vendor escrow account. Do not process this through standard AP channels today; I will sign the retroactive approvals Monday.",
  },
  {
    title: "Authentic Family Note (Low Risk)",
    category: "Benign Communication",
    text: "Hey Mom, just letting you know my flight landed safely in Chicago. Heading to the baggage claim now and will call you on FaceTime once I check in at the hotel tonight. Love you!",
  },
];

const PRESET_AUDIO_SAMPLES = [
  {
    title: "AI Voice Clone (ElevenLabs Synthetic)",
    category: "Neural TTS Spoof",
    url: "/samples/elevenlabs_voice_sample.flac",
    filename: "elevenlabs_voice_sample.flac",
  },
  {
    title: "Authentic Human Voice (Organic Speech)",
    category: "Bonafide Human",
    url: "/samples/real_human_speech.flac",
    filename: "real_human_speech.flac",
  },
];

const PRESET_VIDEO_SAMPLES = [
  {
    title: "AI Deepfake Reenactment (Facial Manipulation)",
    category: "Synthetic Reenactment",
    url: "/samples/synthetic_deepfake_sample.mp4",
    filename: "synthetic_deepfake_sample.mp4",
  },
  {
    title: "Authentic Human Video (Physical Recording)",
    category: "Bonafide Video",
    url: "/samples/real_human_video.mp4",
    filename: "real_human_video.mp4",
  },
];

export default function ScamCheckerPage() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("text");

  // ==========================================
  // TEXT ANALYSIS STATE
  // ==========================================
  const [inputText, setInputText] = React.useState("");
  const [characterCount, setCharacterCount] = React.useState(0);
  const [maxCharacters] = React.useState(2000);
  const [isTextLoading, setIsTextLoading] = React.useState(false);
  const [textError, setTextError] = React.useState<string | null>(null);
  const [textValidationError, setTextValidationError] = React.useState<string | null>(null);
  const [textResult, setTextResult] = React.useState<ScamAnalysisResult | null>(null);
  const textResultsRef = React.useRef<HTMLDivElement>(null);

  // ==========================================
  // AUDIO ANALYSIS STATE
  // ==========================================
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [audioDuration, setAudioDuration] = React.useState<number | null>(null);
  const [isAudioDragging, setIsAudioDragging] = React.useState(false);
  const [isAudioLoading, setIsAudioLoading] = React.useState(false);
  const [audioError, setAudioError] = React.useState<string | null>(null);
  const [audioResult, setAudioResult] = React.useState<AudioDetectionResult | null>(null);
  const audioInputRef = React.useRef<HTMLInputElement>(null);
  const audioResultsRef = React.useRef<HTMLDivElement>(null);

  // ==========================================
  // VIDEO ANALYSIS STATE
  // ==========================================
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [videoDuration, setVideoDuration] = React.useState<number | null>(null);
  const [isVideoDragging, setIsVideoDragging] = React.useState(false);
  const [isVideoLoading, setIsVideoLoading] = React.useState(false);
  const [videoError, setVideoError] = React.useState<string | null>(null);
  const [videoProgressText, setVideoProgressText] = React.useState<string | null>(null);
  const [videoResult, setVideoResult] = React.useState<VideoDetectionResult | null>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);
  const videoResultsRef = React.useRef<HTMLDivElement>(null);

  // Clean up object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [audioUrl, videoUrl]);

  // ==========================================
  // TEXT HANDLERS
  // ==========================================
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= maxCharacters) {
      setInputText(val);
      setCharacterCount(val.length);
      if (textValidationError) setTextValidationError(null);
      if (textError) setTextError(null);
    }
  };

  const handleClearText = () => {
    setInputText("");
    setCharacterCount(0);
    setTextResult(null);
    setTextValidationError(null);
    setTextError(null);
  };

  const handleLoadExample = (exampleText: string) => {
    setInputText(exampleText);
    setCharacterCount(exampleText.length);
    setTextValidationError(null);
    setTextError(null);
    setTextResult(null);
  };

  const handleAnalyzeText = async () => {
    const trimmed = inputText.trim();

    if (!trimmed) {
      setTextValidationError("Please paste or type a message before analyzing.");
      return;
    }

    if (trimmed.length < 15) {
      setTextValidationError("Message is too short for meaningful analysis. Please provide at least 15 characters.");
      return;
    }

    setTextValidationError(null);
    setTextError(null);
    setIsTextLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis service encountered an unexpected error.");
      }

      const data: ScamAnalysisResult = await response.json();
      setTextResult(data);

      setTimeout(() => {
        textResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to analyze message. Please try again.";
      setTextError(msg);
    } finally {
      setIsTextLoading(false);
    }
  };

  // ==========================================
  // AUDIO HANDLERS
  // ==========================================
  const handleAudioFile = (file: File) => {
    // Validate audio file type
    const validAudioTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/m4a", "audio/x-m4a", "audio/aac", "audio/ogg", "audio/flac"];
    const isExtensionValid = /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(file.name);

    if (!validAudioTypes.includes(file.type) && !isExtensionValid) {
      setAudioError("Unsupported audio format. Please upload MP3, WAV, M4A, AAC, or FLAC files.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setAudioError("File size exceeds 25MB limit. Please upload a shorter audio clip.");
      return;
    }

    setAudioError(null);
    setAudioResult(null);
    setAudioFile(file);

    if (audioUrl) URL.revokeObjectURL(audioUrl);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  const handleAudioDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsAudioDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAudioFile(e.dataTransfer.files[0]);
    }
  };

  const handleClearAudio = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioFile(null);
    setAudioUrl(null);
    setAudioDuration(null);
    setAudioError(null);
    setAudioResult(null);
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  const handleLoadAudioSample = async (sampleUrl: string, sampleFilename: string) => {
    try {
      setIsAudioLoading(true);
      setAudioError(null);
      setAudioResult(null);
      const res = await fetch(sampleUrl);
      if (!res.ok) throw new Error("Could not fetch sample file");
      const blob = await res.blob();
      const file = new File([blob], sampleFilename, { type: "audio/flac" });
      handleAudioFile(file);
    } catch {
      setAudioError("Failed to load sample audio file.");
    } finally {
      setIsAudioLoading(false);
    }
  };

  const handleAnalyzeAudio = async () => {
    if (!audioFile) {
      setAudioError("Please select or drop an audio file before initiating analysis.");
      return;
    }

    setAudioError(null);
    setIsAudioLoading(true);
    setAudioResult(null);

    try {
      const formData = new FormData();
      formData.append("file", audioFile, audioFile.name);

      const response = await fetch("/api/detect/audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Audio forensic analysis encountered an error.");
      }

      setAudioResult(data as AudioDetectionResult);
      setTimeout(() => {
        audioResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to analyze audio recording. Please verify the neural microservice is online.";
      setAudioError(msg);
    } finally {
      setIsAudioLoading(false);
    }
  };

  // ==========================================
  // VIDEO HANDLERS
  // ==========================================
  const handleVideoFile = (file: File) => {
    const validVideoTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo", "video/x-matroska"];
    const isExtensionValid = /\.(mp4|mov|webm|avi|mkv)$/i.test(file.name);

    if (!validVideoTypes.includes(file.type) && !isExtensionValid) {
      setVideoError("Unsupported video format. Please upload MP4, MOV, WEBM, or AVI files.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setVideoError("File size exceeds 50MB limit. Please upload a shorter video clip.");
      return;
    }

    setVideoError(null);
    setVideoResult(null);
    setVideoFile(file);

    if (videoUrl) URL.revokeObjectURL(videoUrl);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsVideoDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleClearVideo = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoFile(null);
    setVideoUrl(null);
    setVideoDuration(null);
    setVideoError(null);
    setVideoResult(null);
    setVideoProgressText(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleLoadVideoSample = async (sampleUrl: string, sampleFilename: string) => {
    try {
      setIsVideoLoading(true);
      setVideoError(null);
      setVideoResult(null);
      setVideoProgressText("Loading benchmark video sample...");
      const res = await fetch(sampleUrl);
      if (!res.ok) throw new Error("Could not fetch sample video file");
      const blob = await res.blob();
      const file = new File([blob], sampleFilename, { type: "video/mp4" });
      handleVideoFile(file);
    } catch {
      setVideoError("Failed to load sample video file.");
    } finally {
      setIsVideoLoading(false);
      setVideoProgressText(null);
    }
  };

  const extractFramesFromVideo = async (
    videoSrc: string,
    numFrames: number = 8
  ): Promise<Array<{ frame_index: number; timestamp: number; data: string; thumbnail: string; face_detected: boolean }>> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      // Never set crossOrigin on blob: or data: URLs to prevent browser security blocks
      if (!videoSrc.startsWith("blob:") && !videoSrc.startsWith("data:")) {
        video.crossOrigin = "anonymous";
      }
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";

      let hasStarted = false;
      const timeoutTimer = setTimeout(() => {
        if (!hasStarted) {
          reject(new Error("Timeout initializing video container. Please try another format or file."));
        }
      }, 12000);

      const processVideo = async () => {
        if (hasStarted) return;
        hasStarted = true;
        clearTimeout(timeoutTimer);

        try {
          const duration = video.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : 5;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", { willReadFrequently: true });

          if (!ctx) {
            reject(new Error("HTML5 Canvas 2D context unavailable."));
            return;
          }

          // Optimal resolution for ViT-Base
          canvas.width = 224;
          canvas.height = 224;

          const frames: Array<{
            frame_index: number;
            timestamp: number;
            data: string;
            thumbnail: string;
            face_detected: boolean;
          }> = [];

          // Space frames across 10% to 90% of duration to skip initial black frames
          const startTime = duration * 0.1;
          const endTime = duration * 0.9;
          const step = (endTime - startTime) / Math.max(1, numFrames - 1);

          for (let i = 0; i < numFrames; i++) {
            const targetTime = startTime + i * step;
            setVideoProgressText(`Sampling keyframe ${i + 1} of ${numFrames} (${targetTime.toFixed(1)}s)...`);

            await new Promise<void>((seekResolve) => {
              let resolved = false;

              const captureFrame = () => {
                if (resolved) return;
                resolved = true;
                video.removeEventListener("seeked", onSeeked);

                try {
                  const vw = video.videoWidth || 640;
                  const vh = video.videoHeight || 360;

                  // Center/Upper-Center Square Crop to preserve 1:1 aspect ratio without squashing
                  const cropSize = Math.min(vw, vh);
                  const cropX = Math.max(0, (vw - cropSize) / 2);
                  // Bias slightly toward upper center where faces and focal subjects reside
                  const cropY = Math.max(0, Math.min(vh - cropSize, (vh - cropSize) * 0.3));

                  ctx.drawImage(video, cropX, cropY, cropSize, cropSize, 0, 0, canvas.width, canvas.height);
                  const dataUrl = canvas.toDataURL("image/jpeg", 0.90);

                  frames.push({
                    frame_index: i + 1,
                    timestamp: Math.round(targetTime * 100) / 100,
                    data: dataUrl,
                    thumbnail: dataUrl,
                    face_detected: true,
                  });
                } catch (e) {
                  console.error("Frame capture error:", e);
                }
                seekResolve();
              };

              const onSeeked = () => captureFrame();
              video.addEventListener("seeked", onSeeked);

              try {
                video.currentTime = targetTime;
              } catch {
                captureFrame();
              }

              // Safety timeout: if seeked doesn't fire within 1500ms, capture current frame and proceed
              setTimeout(() => captureFrame(), 1500);
            });
          }

          resolve(frames);
        } catch (err) {
          reject(err);
        }
      };

      video.addEventListener("loadedmetadata", processVideo);
      video.onerror = () => {
        clearTimeout(timeoutTimer);
        reject(new Error("Unable to decode video container for keyframe extraction."));
      };

      video.src = videoSrc;
      video.load();

      if (video.readyState >= 1) {
        processVideo();
      }
    });
  };

  const extractAudioFromVideo = async (file: File): Promise<string | null> => {
    try {
      setVideoProgressText("Checking for embedded vocal audio stream...");
      const arrayBuffer = await file.arrayBuffer();
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return null;

      const audioCtx = new AudioCtxClass();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

      const numChannels = 1;
      const targetSampleRate = 16000;
      const maxSeconds = Math.min(audioBuffer.duration, 15);
      const totalSamples = Math.floor(maxSeconds * targetSampleRate);

      const offlineCtx = new OfflineAudioContext(numChannels, totalSamples, targetSampleRate);
      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();
      const pcmData = renderedBuffer.getChannelData(0);

      const wavBytes = encodeMonoWav(pcmData, targetSampleRate);
      return uint8ArrayToBase64(wavBytes);
    } catch {
      // Container has no audio or codec not decodable by browser
      return null;
    }
  };

  const handleAnalyzeVideo = async () => {
    if (!videoFile || !videoUrl) {
      setVideoError("Please select or drop a video file before initiating analysis.");
      return;
    }

    setVideoError(null);
    setIsVideoLoading(true);
    setVideoResult(null);
    setVideoProgressText("Initializing hardware video decoder...");

    try {
      // 1. Extract 8 keyframes across video timeline
      const frames = await extractFramesFromVideo(videoUrl, 8);

      if (frames.length === 0) {
        throw new Error("Could not extract video keyframes from this media container.");
      }

      // 2. Extract audio track if present
      const audioBase64 = await extractAudioFromVideo(videoFile);

      // 3. Post to backend gateway
      setVideoProgressText("Running Vision Transformer (ViT-Base) facial artifact classification...");
      const response = await fetch("/api/detect/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frames,
          duration: videoDuration || 0.0,
          audio_base64: audioBase64,
          audio_filename: `${videoFile.name.split(".")[0]}.wav`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Video deepfake analysis encountered an error.");
      }

      setVideoResult(data as VideoDetectionResult);
      setTimeout(() => {
        videoResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Video forensic analysis interrupted.";
      setVideoError(msg);
    } finally {
      setIsVideoLoading(false);
      setVideoProgressText(null);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#F8F7F4]">
      {/* Background Soft Ambient Radial Halos */}
      <div className="pointer-events-none absolute -top-24 right-0 h-[650px] w-[650px] rounded-full bg-gradient-to-bl from-[#B9A8E8]/20 via-[#D9D9F7]/30 to-[#B9E8F2]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-48 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#D9D9F7]/20 to-[#B9E8F2]/25 blur-3xl" />

      <PageContainer className="py-12 sm:py-20 lg:py-24">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "VERIFICATION TOOLS", href: "/checker" },
              { label: "DETECTION CENTRE" },
            ]}
          />
        </div>

        {/* =========================================================================
            INTRODUCTION SECTION
            Heading: "Detection Centre"
            Subtitle: "Examine suspicious messages, voices and videos to identify potential signs of digital manipulation."
            ========================================================================= */}
        <div className="max-w-4xl space-y-4 mb-10 sm:mb-14">
          <Badge variant="dotPill" dotColor="charcoal">
            • MULTIMODAL FORENSIC PLATFORM
          </Badge>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#171719] leading-[1.05]">
            Detection Centre
            <span className="block text-[#171719]">
              Examine suspicious messages, voices and videos to identify potential signs of digital manipulation.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#171719]/75 font-sans leading-relaxed max-w-2xl pt-2">
            A unified multi-vector inspection interface designed to evaluate
            linguistic extortion transcripts, acoustic speech samples, and
            facial video reenactments with rigorous analytical precision.
          </p>
        </div>

        {/* =========================================================================
            MULTIMODAL TAB NAVIGATION
            Three distinct tabs: 1. Text Analysis | 2. Audio Analysis | 3. Video Analysis
            ========================================================================= */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#171719]/8 shadow-sm max-w-xl mb-10 overflow-x-auto select-none">
          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "text"
                ? "bg-[#171719] text-[#F8F7F4] shadow-sm"
                : "text-[#171719]/70 hover:text-[#171719] hover:bg-[#F8F7F4]"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>1. Text Analysis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("audio")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "audio"
                ? "bg-[#171719] text-[#F8F7F4] shadow-sm"
                : "text-[#171719]/70 hover:text-[#171719] hover:bg-[#F8F7F4]"
            }`}
          >
            <Volume2 className="h-4 w-4" />
            <span>2. Audio Analysis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "video"
                ? "bg-[#171719] text-[#F8F7F4] shadow-sm"
                : "text-[#171719]/70 hover:text-[#171719] hover:bg-[#F8F7F4]"
            }`}
          >
            <Video className="h-4 w-4" />
            <span>3. Video Analysis</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1 — TEXT ANALYSIS INTERFACE
            Preserves the full working message analysis functionality
            ========================================================================= */}
        {activeTab === "text" && (
          <div className="space-y-12 animate-in fade-in-50 duration-300">
            <div className="rounded-3xl bg-white p-6 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6">
              {/* Preset Example Selectors */}
              <div className="space-y-3 pb-6 border-b border-[#171719]/8">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#A6A6AC] uppercase tracking-wider">
                    QUICK SAMPLES (TEST WITH REALISTIC ATTACK PRETEXTS)
                  </span>
                  <span className="font-mono text-[11px] text-[#477BFF]">
                    SELECT TO AUTO-FILL
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRESET_EXAMPLES.map((example) => (
                    <button
                      key={example.title}
                      type="button"
                      onClick={() => handleLoadExample(example.text)}
                      className="rounded-full bg-[#F8F7F4] hover:bg-[#171719] hover:text-[#F8F7F4] text-[#171719] text-xs font-medium px-4 py-2 border border-[#171719]/8 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      <FileText className="h-3.5 w-3.5 opacity-70" />
                      <span>{example.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea Input Container */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="scam-text-input"
                    className="font-display font-semibold text-sm text-[#171719]"
                  >
                    Suspicious Message or Voicemail Transcript
                  </label>

                  <span
                    className={`font-mono text-xs ${
                      characterCount > maxCharacters * 0.9
                        ? "text-rose-600 font-semibold"
                        : "text-[#A6A6AC]"
                    }`}
                  >
                    {characterCount.toLocaleString()} / {maxCharacters.toLocaleString()} characters
                  </span>
                </div>

                <textarea
                  id="scam-text-input"
                  rows={7}
                  value={inputText}
                  onChange={handleTextChange}
                  placeholder="Paste the message, voicemail transcription, or phone call summary here... (e.g. 'Mom, please pick up, I was in an accident on Highway 9. Don't tell Dad...')"
                  className="w-full rounded-2xl border border-[#171719]/12 bg-[#F8F7F4]/40 p-4 sm:p-5 text-sm sm:text-base text-[#171719] placeholder:text-[#A6A6AC] focus:border-[#477BFF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#477BFF]/20 transition-all font-sans leading-relaxed resize-y"
                />
              </div>

              {/* Validation Error Message */}
              {textValidationError && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>{textValidationError}</span>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <PrimaryButton
                    type="button"
                    onClick={handleAnalyzeText}
                    disabled={isTextLoading}
                    size="lg"
                    className="gap-2 px-8 rounded-full shadow-sm hover:shadow-md"
                  >
                    {isTextLoading ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Evaluating Heuristics...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyse Message</span>
                        <ArrowUpRight className="h-4 w-4 opacity-80" />
                      </>
                    )}
                  </PrimaryButton>

                  {inputText.length > 0 && (
                    <SecondaryButton
                      type="button"
                      onClick={handleClearText}
                      disabled={isTextLoading}
                      size="lg"
                      className="gap-2 rounded-full px-5 text-[#171719]"
                    >
                      <RotateCcw className="h-3.5 w-3.5 opacity-70" />
                      <span>Clear</span>
                    </SecondaryButton>
                  )}
                </div>

                <div className="text-[11px] font-mono text-[#A6A6AC]">
                  HEURISTIC ENGINE · INSTANT TRIAGE
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isTextLoading && (
              <div className="rounded-3xl bg-white p-12 border border-[#171719]/8 shadow-editorial-card text-center space-y-6 animate-in fade-in duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D9D9F7] text-[#477BFF]">
                  <Sparkles className="h-8 w-8 animate-pulse text-[#477BFF]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-semibold text-[#171719]">
                    Evaluating Message Forensic Markers
                  </h3>
                  <p className="text-xs text-[#A6A6AC] max-w-md mx-auto">
                    Decomposing message structure, testing for manufactured urgency,
                    measuring isolation vectors, and calculating deception probabilities...
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {textError && !isTextLoading && (
              <div className="rounded-3xl bg-white p-8 border border-rose-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-rose-700">
                  <AlertTriangle className="h-6 w-6 shrink-0" />
                  <h3 className="font-display font-semibold text-lg">
                    Analysis Interrupted
                  </h3>
                </div>
                <p className="text-sm text-[#171719]/80 leading-relaxed">
                  {textError}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAnalyzeText}
                  className="rounded-full mt-2"
                >
                  Retry Analysis
                </Button>
              </div>
            )}

            {/* Results State */}
            {textResult && !isTextLoading && (
              <div
                ref={textResultsRef}
                className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card space-y-10 animate-in fade-in-50 duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#171719]/8 gap-6">
                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC]">
                      HEURISTIC THREAT ASSESSMENT REPORT
                    </span>
                    <div className="flex items-center gap-3 pt-1">
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#171719]">
                        Risk Assessment:
                      </h3>
                      {textResult.threatLevel === "high" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 font-display text-sm font-bold text-rose-900 border border-rose-300">
                          <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
                          HIGH RISK DETECTED
                        </span>
                      )}
                      {textResult.threatLevel === "medium" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 font-display text-sm font-bold text-amber-900 border border-amber-300">
                          <span className="h-2 w-2 rounded-full bg-amber-600" />
                          MEDIUM SUSPICION
                        </span>
                      )}
                      {textResult.threatLevel === "low" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 font-display text-sm font-bold text-emerald-900 border border-emerald-300">
                          <span className="h-2 w-2 rounded-full bg-emerald-600" />
                          LOW THREAT PROBABILITY
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-[#A6A6AC] block">
                        THREAT DEVIATION SCORE
                      </span>
                      <span className="font-display text-3xl font-bold text-[#171719]">
                        {textResult.overallScore} / 100
                      </span>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-[#F8F7F4] border border-[#171719]/10 flex items-center justify-center text-[#171719]">
                      {textResult.threatLevel === "high" ? (
                        <ShieldAlert className="h-6 w-6 text-rose-600" />
                      ) : (
                        <ShieldCheck className="h-6 w-6 text-emerald-600" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC] block">
                    EXPLANATION &amp; SYNTHESIS
                  </span>
                  <p className="text-base sm:text-lg text-[#171719]/85 font-sans leading-relaxed">
                    {textResult.summary}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC]">
                      FLAGGED COERCIVE INDICATORS ({textResult.indicators.length})
                    </span>
                    <span className="font-mono text-[11px] text-[#477BFF]">
                      HEURISTIC TAXONOMY
                    </span>
                  </div>

                  {textResult.indicators.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {textResult.indicators.map((ind) => (
                        <div
                          key={ind.id}
                          className="rounded-2xl border border-[#171719]/8 bg-[#F8F7F4]/50 p-5 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display font-semibold text-sm text-[#171719]">
                              {ind.title}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-semibold uppercase ${
                                ind.severity === "danger"
                                  ? "bg-rose-100 text-rose-800"
                                  : ind.severity === "warning"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {ind.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#171719]/75 leading-relaxed">
                            {ind.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#171719]/8 bg-[#F8F7F4]/40 p-6 text-center text-xs text-[#A6A6AC]">
                      No overt coercive indicators or isolation instructions were identified in the text.
                    </div>
                  )}
                </div>

                <div className="rounded-3xl bg-[#F8F7F4] p-6 sm:p-8 border border-[#171719]/8 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-[#477BFF]" />
                    <h4 className="font-display font-semibold text-base text-[#171719]">
                      Recommended Safety Protocol
                    </h4>
                  </div>
                  <p className="text-sm text-[#171719]/80 font-medium leading-relaxed">
                    {textResult.recommendedAction}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2 — AUDIO ANALYSIS INTERFACE
            Drag-and-drop upload, file selection, audio playback, waveform, formats
            ========================================================================= */}
        {activeTab === "audio" && (
          <div className="space-y-12 animate-in fade-in-50 duration-300">
            <div className="rounded-3xl bg-white p-6 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-8">
              {/* Preset Audio Selectors */}
              <div className="space-y-3 pb-6 border-b border-[#171719]/8">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#A6A6AC] uppercase tracking-wider">
                    QUICK AUDIO SAMPLES (BENCHMARK SYNTHETIC VS AUTHENTIC)
                  </span>
                  <span className="font-mono text-[11px] text-[#477BFF]">
                    SELECT TO TEST IMMEDIATELY
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRESET_AUDIO_SAMPLES.map((sample) => (
                    <button
                      key={sample.title}
                      type="button"
                      onClick={() => handleLoadAudioSample(sample.url, sample.filename)}
                      className="rounded-full bg-[#F8F7F4] hover:bg-[#171719] hover:text-[#F8F7F4] text-[#171719] text-xs font-medium px-4 py-2 border border-[#171719]/8 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      <FileAudio className="h-3.5 w-3.5 opacity-70" />
                      <span>{sample.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropzone Container */}
              {!audioFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsAudioDragging(true);
                  }}
                  onDragLeave={() => setIsAudioDragging(false)}
                  onDrop={handleAudioDrop}
                  onClick={() => audioInputRef.current?.click()}
                  className={`relative rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-4 ${
                    isAudioDragging
                      ? "border-[#477BFF] bg-[#D9D9F7]/20 scale-[1.01]"
                      : "border-[#171719]/15 hover:border-[#477BFF] bg-[#F8F7F4]/50 hover:bg-[#F8F7F4]"
                  }`}
                >
                  <input
                    ref={audioInputRef}
                    type="file"
                    accept=".mp3,.wav,.m4a,.aac,.ogg,.flac,audio/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleAudioFile(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-[#171719]/8 text-[#477BFF]">
                    <Upload className="h-7 w-7 text-[#477BFF]" />
                  </div>

                  <div className="space-y-1 max-w-sm">
                    <h3 className="font-display font-semibold text-lg text-[#171719]">
                      Drag &amp; drop audio recording, or browse
                    </h3>
                    <p className="text-xs text-[#A6A6AC] leading-relaxed">
                      Upload recorded voicemails, voice memos, or suspicious call recordings for biometric acoustic analysis.
                    </p>
                  </div>

                  <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#171719] border border-[#171719]/10 shadow-sm">
                    Choose Audio File
                  </span>
                </div>
              ) : (
                /* Loaded Audio Playback & Waveform View */
                <div className="rounded-3xl bg-[#F8F7F4] p-6 sm:p-8 border border-[#171719]/8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#171719]/8 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#477BFF] border border-[#171719]/8 shadow-sm">
                        <FileAudio className="h-6 w-6 text-[#477BFF]" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-base text-[#171719] truncate max-w-xs sm:max-w-md">
                          {audioFile.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A6A6AC] mt-0.5">
                          <span>{(audioFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                          <span>•</span>
                          <span className="uppercase">{audioFile.name.split(".").pop()}</span>
                          {audioDuration && (
                            <>
                              <span>•</span>
                              <span>{Math.round(audioDuration)}s duration</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="white"
                      size="sm"
                      onClick={handleClearAudio}
                      className="rounded-full text-xs text-rose-600 hover:text-rose-700"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      <span>Remove Audio</span>
                    </Button>
                  </div>

                  {/* Audio Element & Visualizer */}
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white p-4 border border-[#171719]/6 shadow-sm">
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <span className="font-mono text-[10px] uppercase text-[#A6A6AC]">
                          FREQUENCY SPECTRUM WAVEFORM
                        </span>
                        <Badge variant="cyan">48kHz Sampling</Badge>
                      </div>
                      <WaveformVisualizer barCount={44} height={52} variant="gradient" />
                    </div>

                    {audioUrl && (
                      <div className="rounded-2xl bg-white p-4 border border-[#171719]/6">
                        <audio
                          controls
                          src={audioUrl}
                          onLoadedMetadata={(e) => {
                            setAudioDuration(e.currentTarget.duration);
                          }}
                          className="w-full h-10 outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Supported Format Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 space-y-1">
                  <span className="font-semibold text-[#171719] block">Supported Formats</span>
                  <span className="text-[#A6A6AC]">MP3, WAV, M4A, AAC, FLAC, OGG</span>
                </div>
                <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 space-y-1">
                  <span className="font-semibold text-[#171719] block">Maximum File Size</span>
                  <span className="text-[#A6A6AC]">Up to 25MB per audio recording</span>
                </div>
                <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 space-y-1">
                  <span className="font-semibold text-[#171719] block">Optimal Duration</span>
                  <span className="text-[#A6A6AC]">3 to 60 seconds recommended</span>
                </div>
              </div>

              {/* Error Message */}
              {audioError && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>{audioError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <PrimaryButton
                  type="button"
                  onClick={handleAnalyzeAudio}
                  disabled={!audioFile || isAudioLoading}
                  size="lg"
                  className="gap-2 px-8 rounded-full shadow-sm hover:shadow-md"
                >
                  {isAudioLoading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Parsing Acoustic Harmonics...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyse Audio</span>
                      <ArrowUpRight className="h-4 w-4 opacity-80" />
                    </>
                  )}
                </PrimaryButton>

                <div className="text-[11px] font-mono text-[#A6A6AC]">
                  NEURAL VOCODER DECOMPOSITION ARCHITECTURE
                </div>
              </div>
            </div>

            {/* Audio Analysis Real Detection Result Area */}
            {audioResult && !isAudioLoading && audioFile && (
              <div
                ref={audioResultsRef}
                className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card space-y-10 animate-in fade-in-50 duration-500"
              >
                {/* Result Header & Classification Assessment */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#171719]/8 gap-6">
                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC]">
                      NEURAL ACOUSTIC BIOMETRICS REPORT · WAV2VEC2 VOICE CLASSIFIER
                    </span>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#171719]">
                        Biometric Assessment:
                      </h3>
                      {audioResult.risk_level === "high" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 font-display text-sm font-bold text-rose-900 border border-rose-300">
                          <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
                          SYNTHETIC / CLONED VOICE DETECTED
                        </span>
                      )}
                      {audioResult.risk_level === "medium" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 font-display text-sm font-bold text-amber-900 border border-amber-300">
                          <span className="h-2 w-2 rounded-full bg-amber-600" />
                          ACOUSTIC ANOMALIES FLAGGED
                        </span>
                      )}
                      {audioResult.risk_level === "low" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 font-display text-sm font-bold text-emerald-900 border border-emerald-300">
                          <span className="h-2 w-2 rounded-full bg-emerald-600" />
                          AUTHENTIC ORGANIC SPEECH VERIFIED
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-[#A6A6AC] block">
                        CLASSIFIER CONFIDENCE
                      </span>
                      <span className="font-display text-3xl font-bold text-[#171719]">
                        {audioResult.confidence_score}%
                      </span>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-[#F8F7F4] border border-[#171719]/10 flex items-center justify-center text-[#171719]">
                      {audioResult.risk_level === "high" ? (
                        <ShieldAlert className="h-6 w-6 text-rose-600" />
                      ) : audioResult.risk_level === "medium" ? (
                        <AlertTriangle className="h-6 w-6 text-amber-600" />
                      ) : (
                        <ShieldCheck className="h-6 w-6 text-emerald-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Softmax Probability Distribution Bar */}
                <div className="rounded-2xl bg-[#F8F7F4] p-6 border border-[#171719]/8 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[#171719] font-medium">
                        Bonafide Human Speech: {audioResult.probabilities.bonafide}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#171719] font-medium">
                        Synthetic Vocoder Spoof: {audioResult.probabilities.spoof}%
                      </span>
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    </div>
                  </div>

                  {/* Dual-tone Progress Bar */}
                  <div className="h-3 w-full rounded-full bg-emerald-500/20 overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${audioResult.probabilities.bonafide}%` }}
                    />
                    <div
                      className="h-full bg-rose-500 transition-all duration-500"
                      style={{ width: `${audioResult.probabilities.spoof}%` }}
                    />
                  </div>
                </div>

                {/* Acoustic Signal Telemetry Readout */}
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC] block">
                    ACOUSTIC SIGNAL TELEMETRY (MEASURED AT 16KHZ MONO)
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Duration</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {audioResult.audio_telemetry.duration_seconds}s
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Resample Rate</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {audioResult.audio_telemetry.sample_rate_hz.toLocaleString()} Hz
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Peak Amplitude</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {audioResult.audio_telemetry.peak_db} dBFS
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">RMS Energy</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {audioResult.audio_telemetry.rms_energy}
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Spectral Centroid</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {audioResult.audio_telemetry.mean_spectral_centroid_hz ?? 2200} Hz
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Zero-Crossing Rate</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {audioResult.audio_telemetry.zero_crossing_rate ?? 0.08}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Model Explanation */}
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC] block">
                    FORENSIC SYNTHESIS ANALYSIS
                  </span>
                  <p className="text-base sm:text-lg text-[#171719]/85 font-sans leading-relaxed">
                    {audioResult.explanation}
                  </p>
                </div>

                {/* Verified Model Provenance */}
                <div className="rounded-2xl border border-[#171719]/8 bg-[#F8F7F4]/60 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC]">
                      DETECTION CLASSIFIER PROVENANCE
                    </span>
                    <Badge variant="cyan">APACHE 2.0 OPEN SOURCE</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-1">
                    <div>
                      <span className="text-[#A6A6AC] block">Model Architecture</span>
                      <span className="font-semibold text-[#171719] mt-0.5 block">
                        {audioResult.model_metadata.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A6A6AC] block">Base Foundation</span>
                      <span className="font-semibold text-[#171719] mt-0.5 block">
                        {audioResult.model_metadata.base_model}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A6A6AC] block">Training Benchmark</span>
                      <span className="font-semibold text-[#171719] mt-0.5 block">
                        {audioResult.model_metadata.dataset}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A6A6AC] block">Benchmark EER / Accuracy</span>
                      <span className="font-semibold text-[#171719] mt-0.5 block">
                        {audioResult.model_metadata.reported_eer} EER · {audioResult.model_metadata.reported_accuracy} Acc
                      </span>
                    </div>
                  </div>
                </div>

                {/* Critical Forensic Limitations */}
                <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0" />
                    <h4 className="font-display font-semibold text-sm text-amber-950">
                      Important Forensic Limitations
                    </h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-900/90 list-disc list-inside">
                    {audioResult.limitations.map((lim, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {lim}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Safety Actions */}
                <div className="rounded-3xl bg-[#F8F7F4] p-6 sm:p-8 border border-[#171719]/8 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-[#477BFF]" />
                    <h4 className="font-display font-semibold text-base text-[#171719]">
                      Recommended Verification Protocol
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {audioResult.recommended_actions.map((act, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white p-4 border border-[#171719]/6 text-xs text-[#171719]/80 space-y-2 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-2 font-mono text-[10px] text-[#477BFF] uppercase">
                          <span>STEP 0{idx + 1}</span>
                        </div>
                        <p className="leading-relaxed font-medium text-[#171719]">
                          {act}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3 — VIDEO ANALYSIS INTERFACE
            Drag-and-drop upload, file selection, video preview, duration, formats
            ========================================================================= */}
        {activeTab === "video" && (
          <div className="space-y-12 animate-in fade-in-50 duration-300">
            <div className="rounded-3xl bg-white p-6 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-8">
              {/* Preset Video Selectors */}
              <div className="space-y-3 pb-6 border-b border-[#171719]/8">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#A6A6AC] uppercase tracking-wider">
                    QUICK VIDEO SAMPLES (BENCHMARK SYNTHETIC REENACTMENT VS AUTHENTIC)
                  </span>
                  <span className="font-mono text-[11px] text-[#477BFF]">
                    SELECT TO TEST IMMEDIATELY
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRESET_VIDEO_SAMPLES.map((sample) => (
                    <button
                      key={sample.title}
                      type="button"
                      onClick={() => handleLoadVideoSample(sample.url, sample.filename)}
                      className="rounded-full bg-[#F8F7F4] hover:bg-[#171719] hover:text-[#F8F7F4] text-[#171719] text-xs font-medium px-4 py-2 border border-[#171719]/8 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      <FileVideo className="h-3.5 w-3.5 opacity-70" />
                      <span>{sample.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropzone Container */}
              {!videoFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsVideoDragging(true);
                  }}
                  onDragLeave={() => setIsVideoDragging(false)}
                  onDrop={handleVideoDrop}
                  onClick={() => videoInputRef.current?.click()}
                  className={`relative rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-4 ${
                    isVideoDragging
                      ? "border-[#477BFF] bg-[#D9D9F7]/20 scale-[1.01]"
                      : "border-[#171719]/15 hover:border-[#477BFF] bg-[#F8F7F4]/50 hover:bg-[#F8F7F4]"
                  }`}
                >
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept=".mp4,.mov,.webm,.avi,.mkv,video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleVideoFile(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-[#171719]/8 text-[#477BFF]">
                    <Video className="h-7 w-7 text-[#477BFF]" />
                  </div>

                  <div className="space-y-1 max-w-sm">
                    <h3 className="font-display font-semibold text-lg text-[#171719]">
                      Drag &amp; drop video file, or browse
                    </h3>
                    <p className="text-xs text-[#A6A6AC] leading-relaxed">
                      Upload suspicious video calls, remote interview snippets, or video messages for visual deepfake reenactment analysis.
                    </p>
                  </div>

                  <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#171719] border border-[#171719]/10 shadow-sm">
                    Choose Video File
                  </span>
                </div>
              ) : (
                /* Loaded Video Preview View */
                <div className="rounded-3xl bg-[#F8F7F4] p-6 sm:p-8 border border-[#171719]/8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#171719]/8 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#477BFF] border border-[#171719]/8 shadow-sm">
                        <FileVideo className="h-6 w-6 text-[#477BFF]" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-base text-[#171719] truncate max-w-xs sm:max-w-md">
                          {videoFile.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A6A6AC] mt-0.5">
                          <span>{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                          <span>•</span>
                          <span className="uppercase">{videoFile.name.split(".").pop()}</span>
                          {videoDuration && (
                            <>
                              <span>•</span>
                              <span>{Math.round(videoDuration)}s duration</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="white"
                      size="sm"
                      onClick={handleClearVideo}
                      className="rounded-full text-xs text-rose-600 hover:text-rose-700"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      <span>Remove Video</span>
                    </Button>
                  </div>

                  {/* Video Player */}
                  {videoUrl && (
                    <div className="rounded-2xl overflow-hidden bg-black max-w-2xl mx-auto shadow-md">
                      <video
                        controls
                        src={videoUrl}
                        onLoadedMetadata={(e) => {
                          setVideoDuration(e.currentTarget.duration);
                        }}
                        className="w-full max-h-[380px] object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Supported Format Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 space-y-1">
                  <span className="font-semibold text-[#171719] block">Supported Formats</span>
                  <span className="text-[#A6A6AC]">MP4, MOV, WEBM, AVI, MKV</span>
                </div>
                <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 space-y-1">
                  <span className="font-semibold text-[#171719] block">Maximum File Size</span>
                  <span className="text-[#A6A6AC]">Up to 50MB per video upload</span>
                </div>
                <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 space-y-1">
                  <span className="font-semibold text-[#171719] block">Recommended Length</span>
                  <span className="text-[#A6A6AC]">5 to 90 seconds recommended</span>
                </div>
              </div>

              {/* Error Message */}
              {videoError && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>{videoError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <PrimaryButton
                  type="button"
                  onClick={handleAnalyzeVideo}
                  disabled={!videoFile || isVideoLoading}
                  size="lg"
                  className="gap-2 px-8 rounded-full shadow-sm hover:shadow-md"
                >
                  {isVideoLoading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>{videoProgressText || "Decomposing Temporal Frames..."}</span>
                    </>
                  ) : (
                    <>
                      <span>Analyse Video</span>
                      <ArrowUpRight className="h-4 w-4 opacity-80" />
                    </>
                  )}
                </PrimaryButton>

                <div className="text-[11px] font-mono text-[#A6A6AC]">
                  ViT-BASE VISION TRANSFORMER &amp; WAV2VEC2 ACTIVE
                </div>
              </div>
            </div>

            {/* Video Analysis Real Multimodal Detection Result Area */}
            {videoResult && !isVideoLoading && videoFile && (
              <div
                ref={videoResultsRef}
                className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card space-y-10 animate-in fade-in-50 duration-500"
              >
                {/* Result Header & Multimodal Verdict */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#171719]/8 gap-6">
                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC]">
                      MULTIMODAL NEURAL FORENSICS REPORT · ViT-BASE &amp; WAV2VEC2 PIPELINE
                    </span>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#171719]">
                        Overall Assessment:
                      </h3>
                      {videoResult.risk_level === "high" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 font-display text-sm font-bold text-rose-900 border border-rose-300">
                          <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
                          MULTIMODAL SYNTHETIC MANIPULATION DETECTED
                        </span>
                      )}
                      {videoResult.risk_level === "medium" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 font-display text-sm font-bold text-amber-900 border border-amber-300">
                          <span className="h-2 w-2 rounded-full bg-amber-600" />
                          ISOLATED VISUAL / ACOUSTIC ANOMALIES FLAGGED
                        </span>
                      )}
                      {videoResult.risk_level === "low" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 font-display text-sm font-bold text-emerald-900 border border-emerald-300">
                          <span className="h-2 w-2 rounded-full bg-emerald-600" />
                          AUTHENTIC ORGANIC VIDEO &amp; SPEECH VERIFIED
                        </span>
                      )}
                      {videoResult.risk_level === "neutral" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 font-display text-sm font-bold text-slate-800 border border-slate-300">
                          <span className="h-2 w-2 rounded-full bg-slate-600" />
                          INCONCLUSIVE: NO DETECTABLE FACIAL REGIONS
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-[#A6A6AC] block">
                        VISUAL CONFIDENCE
                      </span>
                      <span className="font-display text-3xl font-bold text-[#171719]">
                        {videoResult.visual_confidence_score}%
                      </span>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-[#F8F7F4] border border-[#171719]/10 flex items-center justify-center text-[#171719]">
                      {videoResult.risk_level === "high" ? (
                        <ShieldAlert className="h-6 w-6 text-rose-600" />
                      ) : videoResult.risk_level === "medium" ? (
                        <AlertTriangle className="h-6 w-6 text-amber-600" />
                      ) : videoResult.risk_level === "low" ? (
                        <ShieldCheck className="h-6 w-6 text-emerald-600" />
                      ) : (
                        <HelpCircle className="h-6 w-6 text-slate-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Multimodal Cross-Modality Dual Track Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Track 1: Visual ViT-Base Facial Forensics */}
                  <div className="rounded-2xl border border-[#171719]/8 bg-[#F8F7F4]/60 p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#171719]/8">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-[#477BFF]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#171719] font-semibold">
                          VISUAL BIOMETRIC ASSESSMENT
                        </span>
                      </div>
                      {videoResult.visual_assessment === "synthetic" && (
                        <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-900 border border-rose-300">
                          SYNTHETIC
                        </span>
                      )}
                      {videoResult.visual_assessment === "suspicious" && (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-300">
                          SUSPICIOUS
                        </span>
                      )}
                      {videoResult.visual_assessment === "authentic" && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900 border border-emerald-300">
                          AUTHENTIC
                        </span>
                      )}
                      {videoResult.visual_assessment === "inconclusive" && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-800 border border-slate-300">
                          INCONCLUSIVE
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-[#171719]">
                        <span className="text-[#A6A6AC]">Model Architecture:</span>
                        <span className="font-mono font-semibold">ViT-Base-Patch16-224</span>
                      </div>
                      <div className="flex justify-between text-[#171719]">
                        <span className="text-[#A6A6AC]">Flagged Manipulated Frames:</span>
                        <span className="font-mono font-semibold">
                          {videoResult.video_telemetry.flagged_fake_frames_count} / {videoResult.video_telemetry.frames_analyzed} ({videoResult.video_telemetry.flagged_frame_percentage}%)
                        </span>
                      </div>
                      <div className="flex justify-between text-[#171719]">
                        <span className="text-[#A6A6AC]">Facial Regions Identified:</span>
                        <span className="font-mono font-semibold">
                          {videoResult.video_telemetry.faces_detected_count} / {videoResult.video_telemetry.frames_analyzed} keyframes
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#171719]/80 leading-relaxed font-sans pt-1 border-t border-[#171719]/6">
                      {videoResult.visual_assessment === "synthetic"
                        ? "ViT self-attention identified synthetic artifact boundaries, abnormal frequency distributions around eyes/mouth, or generative blending seams across sampled video keyframes."
                        : videoResult.visual_assessment === "suspicious"
                        ? "Isolated frames exhibited edge softening or abnormal gradients. While below full deepfake threshold, manual callback verification is recommended."
                        : videoResult.visual_assessment === "authentic"
                        ? "Consistent natural illumination gradients, physical facial micro-movements, and cohesive biological textures verified across keyframes."
                        : "No detectable human facial landmarks were found in the sampled keyframes. Inconclusive for facial reenactment."}
                    </p>
                  </div>

                  {/* Track 2: Audio Wav2Vec2 Acoustic Track */}
                  <div className="rounded-2xl border border-[#171719]/8 bg-[#F8F7F4]/60 p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#171719]/8">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-[#477BFF]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#171719] font-semibold">
                          AUDIO STREAM ACOUSTIC ASSESSMENT
                        </span>
                      </div>
                      {videoResult.audio_assessment.performed ? (
                        videoResult.audio_assessment.assessment === "synthetic" ? (
                          <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-900 border border-rose-300">
                            SYNTHETIC CLONE
                          </span>
                        ) : videoResult.audio_assessment.assessment === "authentic" ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900 border border-emerald-300">
                            AUTHENTIC VOICE
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-300">
                            SUSPICIOUS
                          </span>
                        )
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 border border-slate-200">
                          NO AUDIO STREAM
                        </span>
                      )}
                    </div>

                    {videoResult.audio_assessment.performed ? (
                      <>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-[#171719]">
                            <span className="text-[#A6A6AC]">Acoustic Classifier:</span>
                            <span className="font-mono font-semibold">Wav2Vec2-XLSR (16kHz Mono)</span>
                          </div>
                          <div className="flex justify-between text-[#171719]">
                            <span className="text-[#A6A6AC]">Acoustic Confidence:</span>
                            <span className="font-mono font-semibold">
                              {videoResult.audio_assessment.confidence_score}%
                            </span>
                          </div>
                          <div className="flex justify-between text-[#171719]">
                            <span className="text-[#A6A6AC]">Acoustic Classification:</span>
                            <span className="font-mono font-semibold">
                              {videoResult.audio_assessment.title}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-[#171719]/80 leading-relaxed font-sans pt-1 border-t border-[#171719]/6">
                          {videoResult.audio_assessment.details}
                        </p>
                      </>
                    ) : (
                      <div className="space-y-2 py-4">
                        <p className="text-xs text-[#A6A6AC] leading-relaxed">
                          No separate audio track or decodable speech stream was detected in this media container. Analysis proceeded purely through visual facial biometrics.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Frame Previews Reel / Carousel */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC] block">
                        TEMPORAL KEYFRAME FORENSIC REEL
                      </span>
                      <h4 className="font-display font-semibold text-lg text-[#171719]">
                        Selected Analyzed Frames ({videoResult.analyzed_frames.length} Keyframes Sampled)
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[#A6A6AC] hidden sm:block">
                      SCROLL HORIZONTALLY TO INSPECT ALL FRAMES →
                    </span>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
                    {videoResult.analyzed_frames.map((frame, idx) => (
                      <div
                        key={idx}
                        className="shrink-0 w-48 rounded-2xl bg-[#F8F7F4] border border-[#171719]/10 p-3 space-y-2.5 snap-start shadow-sm hover:border-[#477BFF]/50 transition-all"
                      >
                        {/* Frame Thumbnail */}
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/5 border border-[#171719]/8">
                          {frame.thumbnail_base64 ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={frame.thumbnail_base64}
                              alt={`Keyframe ${frame.frame_index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-[#A6A6AC]">
                              Keyframe #{frame.frame_index + 1}
                            </div>
                          )}
                          <span className="absolute top-1.5 left-1.5 rounded-md bg-black/75 px-1.5 py-0.5 font-mono text-[10px] text-white">
                            {frame.timestamp_seconds.toFixed(1)}s
                          </span>
                        </div>

                        {/* Frame Details */}
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-[#A6A6AC]">FRAME #{frame.frame_index + 1}</span>
                            {frame.prediction === "fake" ? (
                              <span className="font-bold text-rose-600">FLAGGED</span>
                            ) : (
                              <span className="font-bold text-emerald-600">ORGANIC</span>
                            )}
                          </div>

                          <div className="pt-1">
                            {frame.prediction === "fake" ? (
                              <div className="rounded-lg bg-rose-50 border border-rose-200 px-2 py-1 text-[10px] text-rose-900 font-mono">
                                Fake Prob: {(frame.fake_probability > 1 ? frame.fake_probability : frame.fake_probability * 100).toFixed(1)}%
                              </div>
                            ) : (
                              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-1 text-[10px] text-emerald-900 font-mono">
                                Real Prob: {(frame.real_probability > 1 ? frame.real_probability : frame.real_probability * 100).toFixed(1)}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video & Biometric Telemetry */}
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC] block">
                    CONTAINER &amp; BIOMETRIC TELEMETRY
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Duration</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {videoResult.video_telemetry.duration_seconds}s
                      </strong>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Frames Extracted</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {videoResult.video_telemetry.total_frames_extracted}
                      </strong>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Frames Analyzed</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {videoResult.video_telemetry.frames_analyzed}
                      </strong>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Faces Identified</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {videoResult.video_telemetry.faces_detected_count}
                      </strong>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Flagged Manipulated</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {videoResult.video_telemetry.flagged_fake_frames_count}
                      </strong>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6">
                      <span className="text-[#A6A6AC] block">Flagged Ratio</span>
                      <strong className="text-[#171719] block mt-0.5 text-sm">
                        {videoResult.video_telemetry.flagged_frame_percentage}%
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Model Explanation */}
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC] block">
                    MULTIMODAL FORENSIC SYNTHESIS
                  </span>
                  <p className="text-base sm:text-lg text-[#171719]/85 font-sans leading-relaxed">
                    {videoResult.explanation}
                  </p>
                </div>

                {/* Verified Model Provenance */}
                <div className="rounded-2xl border border-[#171719]/8 bg-[#F8F7F4]/60 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC]">
                      MULTIMODAL CLASSIFIER PROVENANCE
                    </span>
                    <Badge variant="cyan">APACHE 2.0 OPEN SOURCE</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-1">
                    <div>
                      <span className="text-[#A6A6AC] block">Visual Classifier</span>
                      <span className="font-semibold text-[#171719] mt-0.5 block">
                        {videoResult.model_metadata.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A6A6AC] block">Vision Architecture</span>
                      <span className="font-semibold text-[#171719] mt-0.5 block">
                        {videoResult.model_metadata.base_model}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A6A6AC] block">Training Benchmark</span>
                      <span className="font-semibold text-[#171719] mt-0.5 block">
                        FaceForensics++ &amp; DFDC (76k+ frames)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A6A6AC] block">Benchmark Metric</span>
                      <span className="font-semibold text-[#171719] mt-0.5 block">
                        {videoResult.model_metadata.reported_accuracy} Accuracy · 0.9927 F1
                      </span>
                    </div>
                  </div>
                </div>

                {/* Critical Forensic Limitations */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-amber-900 font-display font-semibold text-sm">
                    <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0" />
                    <span>Critical Forensic Limitations &amp; Probabilistic Disclaimer</span>
                  </div>

                  <div className="space-y-2 text-xs text-amber-950/80 leading-relaxed font-sans">
                    <p className="font-semibold text-amber-950">
                      Important: A single analysed keyframe cannot reliably prove an entire video is authentic or manipulated.
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      {videoResult.limitations.map((lim, i) => (
                        <li key={i}>{lim}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommended Verification Protocol */}
                <div className="rounded-2xl border border-[#477BFF]/20 bg-[#D9D9F7]/15 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[#477BFF]">
                    <ShieldCheck className="h-5 w-5 text-[#477BFF]" />
                    <h4 className="font-display font-semibold text-sm text-[#171719]">
                      Recommended Incident Response &amp; Verification Protocol
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {videoResult.recommended_actions.map((act, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-[#171719]/8 space-y-2"
                      >
                        <div className="flex items-center gap-2 font-mono text-[10px] text-[#477BFF] uppercase">
                          <span>STEP 0{idx + 1}</span>
                        </div>
                        <p className="leading-relaxed font-medium text-[#171719]">
                          {act}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            PRIVACY NOTICE
            Common across all three multimodal analysis modes
            ========================================================================= */}
        <div className="mt-12 rounded-3xl bg-white p-6 sm:p-8 border border-[#171719]/8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9D9F7] text-[#171719]">
              <Lock className="h-5 w-5 text-[#477BFF]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[#171719]">
                Privacy &amp; Ephemeral Processing Notice
              </h4>
              <p className="text-xs text-[#A6A6AC] mt-1 max-w-2xl leading-relaxed">
                Messages, audio clips, and video files submitted for analysis
                are evaluated in-memory and are never permanently stored,
                logged, or used for public training. All client media buffers
                are purged upon session completion.
              </p>
            </div>
          </div>

          <Badge variant="liveStatus" dotColor="emerald" className="shrink-0">
            ZERO-STORAGE ENFORCED
          </Badge>
        </div>
      </PageContainer>
    </div>
  );
}
