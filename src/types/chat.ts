/**
 * AI Assistant / Copilot Chat Types
 */

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  threatAssessment?: {
    flagged: boolean;
    urgentActionNeeded: boolean;
  };
}

export interface QuickPrompt {
  id: string;
  title: string;
  prompt: string;
  category: "triage" | "verification" | "emergency";
}
