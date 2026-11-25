// VoiceGuard AI - Mobile Type Definitions

export type ThreatLevel = "SAFE" | "SUSPICIOUS" | "CRITICAL_THREAT";

export interface ScamIndicator {
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
}

export interface ScamAnalysisResult {
  threat_level: ThreatLevel;
  scam_probability: number; // 0 - 100
  summary: string;
  identified_tactics: string[];
  indicators: ScamIndicator[];
  safety_recommendations: string[];
  analyzed_at: string;
  is_fallback?: boolean;
}

export interface AudioDetectionResult {
  model_name: string;
  verdict: "REAL_HUMAN_VOICE" | "SYNTHETIC_OR_MANIPULATED";
  confidence_percentage: number;
  synthetic_probability: number;
  raw_scores?: Record<string, number>;
  metrics?: {
    duration_seconds?: number;
    sample_rate_hz?: number;
  };
  key_indicators?: string[];
  recommended_actions?: string[];
  is_fallback?: boolean;
}

export interface VideoDetectionResult {
  model_name: string;
  verdict: "AUTHENTIC_FOOTAGE" | "DEEPFAKE_OR_SYNTHETIC";
  confidence_percentage: number;
  deepfake_probability: number;
  frames_analyzed: number;
  key_indicators?: string[];
  recommended_actions?: string[];
  is_fallback?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export type OptionKey = "A" | "B" | "C" | "D";

export interface QuizOption {
  key: OptionKey;
  text: string;
}

export interface QuizQuestion {
  id: number;
  number: number;
  categoryId: string;
  categoryKey: string;
  categoryTitle: string;
  categoryShortTitle: string;
  categoryBadge: string;
  question: string;
  options: QuizOption[];
  correctAnswer: OptionKey;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  key: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  questionRange: [number, number];
}
