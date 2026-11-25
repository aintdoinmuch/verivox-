/**
 * Scam & Deepfake Analysis Data Models
 */

export type ThreatLevel = "safe" | "low" | "medium" | "high" | "critical";

export type AnalysisInputType = "audio" | "transcript" | "metadata";

export interface ScamIndicator {
  id: string;
  category: "urgency" | "financial" | "authority" | "isolation" | "technical" | "anomaly";
  title: string;
  description: string;
  severity: "info" | "warning" | "danger";
  confidenceScore: number; // 0 - 100
}

export interface VoiceAnomalyMarker {
  type: "synthetic_pause" | "robotic_cadence" | "glitch_artifact" | "spectral_inconsistency";
  timestampSeconds?: number;
  description: string;
}

export interface ScamAnalysisResult {
  id: string;
  timestamp: string;
  inputType: AnalysisInputType;
  threatLevel: ThreatLevel;
  overallScore: number; // 0 (100% benign) to 100 (confirmed malicious)
  voiceCloneProbability?: number; // 0 - 100
  summary: string;
  identifiedTactics: string[];
  indicators: ScamIndicator[];
  anomalies?: VoiceAnomalyMarker[];
  recommendedAction: string;
}

export interface AudioTelemetry {
  duration_seconds: number;
  sample_rate_hz: number;
  channels: number;
  peak_db: number;
  rms_energy: number;
  mean_spectral_centroid_hz?: number;
  zero_crossing_rate?: number;
}

export interface ModelMetadata {
  name: string;
  base_model: string;
  checkpoint: string;
  dataset: string;
  reported_accuracy: string;
  reported_eer: string;
  license: string;
}

export interface AudioDetectionResult {
  status: "success" | "error";
  assessment: "synthetic" | "suspicious" | "authentic";
  risk_level: "high" | "medium" | "low";
  title: string;
  confidence_score: number;
  probabilities: {
    spoof: number;
    bonafide: number;
  };
  audio_telemetry: AudioTelemetry;
  model_metadata: ModelMetadata;
  explanation: string;
  limitations: string[];
  recommended_actions: string[];
}

export interface AnalyzedVideoFrame {
  frame_index: number;
  timestamp_seconds: number;
  face_detected: boolean;
  prediction: "fake" | "real" | "no_face";
  fake_probability: number;
  real_probability: number;
  thumbnail_base64?: string;
}

export interface VideoTelemetry {
  duration_seconds: number;
  total_frames_extracted: number;
  frames_analyzed: number;
  faces_detected_count: number;
  flagged_fake_frames_count: number;
  flagged_frame_percentage: number;
}

export interface VideoAudioAssessment {
  performed: boolean;
  assessment?: "synthetic" | "authentic" | "inconclusive";
  risk_level?: "high" | "medium" | "low";
  title?: string;
  confidence_score?: number;
  spoof_probability?: number;
  bonafide_probability?: number;
  details?: string;
  reason?: string;
}

export interface VideoDetectionResult {
  status: "success" | "inconclusive" | "error";
  overall_verdict: "synthetic" | "suspicious" | "authentic" | "inconclusive";
  risk_level: "high" | "medium" | "low" | "neutral";
  title: string;
  visual_confidence_score: number;
  visual_assessment: "synthetic" | "suspicious" | "authentic" | "inconclusive";
  audio_assessment: VideoAudioAssessment;
  video_telemetry: VideoTelemetry;
  model_metadata: ModelMetadata;
  analyzed_frames: AnalyzedVideoFrame[];
  explanation: string;
  limitations: string[];
  recommended_actions: string[];
}


