/**
 * Awareness Quiz Types
 */

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  audioSampleUrl?: string;
  context: string;
  options: QuizOption[];
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "voice_cloning" | "caller_id_spoofing" | "authority_impersonation" | "emergency_bait";
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  completedAt: string;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
}
