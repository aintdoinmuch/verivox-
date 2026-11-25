import { GoogleGenAI } from "@google/genai";

// Cache client instance on the server side
let genAIClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not defined in environment variables. Please check .env.local."
    );
  }

  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }

  return genAIClient;
}

export const GEMINI_CONFIG = {
  defaultModel: "gemini-3.5-flash-lite",
  fallbackModel: "gemini-3.8-flash",
  reasoningModel: "gemini-2.5-pro",
};
