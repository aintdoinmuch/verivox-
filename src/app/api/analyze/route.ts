import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, GEMINI_CONFIG } from "@/lib/ai/gemini";
import { ScamAnalysisResult, ScamIndicator, ThreatLevel } from "@/types/analysis";

export const maxDuration = 60;

// Transparent rule-based heuristic analyzer for offline / fallback evaluation
function performHeuristicAnalysis(text: string): ScamAnalysisResult {
  const normalized = text.toLowerCase();
  const indicators: ScamIndicator[] = [];
  const identifiedTactics: string[] = [];
  let score = 10; // baseline benign

  // 1. Urgency Patterns
  const urgencyMatches = [
    { pattern: /(immediately|right now|urgent|asap|within \d+ minutes|hurry|emergency)/i, weight: 25, title: "Manufactured High Urgency", desc: "Explicit time pressure designed to bypass logical deliberation." },
    { pattern: /(arrest|jail|police|bail|hospital|accident|crash|hostage)/i, weight: 30, title: "High-Stakes Crisis Pretext", desc: "Severe emergency claims to induce panic and cognitive overwhelm." },
  ];

  urgencyMatches.forEach((m, idx) => {
    if (m.pattern.test(normalized)) {
      score += m.weight;
      indicators.push({
        id: `urgency-${idx}`,
        category: "urgency",
        title: m.title,
        description: m.desc,
        severity: "danger",
        confidenceScore: 92,
      });
      identifiedTactics.push("Artificial Urgency");
    }
  });

  // 2. Isolation Patterns
  const isolationMatches = [
    { pattern: /(don'?t tell|do not call|keep this between us|don'?t call (dad|mom|police)|secret|confidential)/i, weight: 30, title: "Target Isolation Directive", desc: "Instructs victim not to consult family, legal authorities, or coworkers." },
  ];

  isolationMatches.forEach((m, idx) => {
    if (m.pattern.test(normalized)) {
      score += m.weight;
      indicators.push({
        id: `isolation-${idx}`,
        category: "isolation",
        title: m.title,
        description: m.desc,
        severity: "danger",
        confidenceScore: 95,
      });
      identifiedTactics.push("Victim Isolation");
    }
  });

  // 3. Financial Extortion Patterns
  const financialMatches = [
    { pattern: /(wire|transfer|gift card|crypto|bitcoin|apple pay|zelle|cash|western union|deposit)/i, weight: 25, title: "Irreversible Payment Demand", desc: "Requests settlement through non-refundable, unrecoverable payment vectors." },
    { pattern: /(\$\d+|\b\d+\s*(dollars|bucks|cash|grand)\b)/i, weight: 15, title: "Specific Immediate Capital Demand", desc: "Explicit monetary amount specified for emergency release." },
  ];

  financialMatches.forEach((m, idx) => {
    if (m.pattern.test(normalized)) {
      score += m.weight;
      indicators.push({
        id: `financial-${idx}`,
        category: "financial",
        title: m.title,
        description: m.desc,
        severity: "warning",
        confidenceScore: 88,
      });
      identifiedTactics.push("Financial Extortion");
    }
  });

  // 4. Authority Coercion Patterns
  const authorityMatches = [
    { pattern: /(officer|clerk|detective|irs|fbi|customs|court|judge|legal action|warrant)/i, weight: 20, title: "False Authority Impersonation", desc: "Invokes official institutions to intimidate the victim into compliance." },
  ];

  authorityMatches.forEach((m, idx) => {
    if (m.pattern.test(normalized)) {
      score += m.weight;
      indicators.push({
        id: `authority-${idx}`,
        category: "authority",
        title: m.title,
        description: m.desc,
        severity: "warning",
        confidenceScore: 84,
      });
      identifiedTactics.push("Authority Intimidation");
    }
  });

  // Clamp overall score
  const finalScore = Math.min(100, Math.max(5, score));
  
  let threatLevel: ThreatLevel = "low";
  if (finalScore >= 70) threatLevel = "high";
  else if (finalScore >= 40) threatLevel = "medium";

  let summary = "";
  let recommendedAction = "";

  if (threatLevel === "high") {
    summary = "High probability of deceptive extortion or social engineering. The message contains multiple coercive markers including manufactured urgency, deliberate isolation, and financial demands.";
    recommendedAction = "DO NOT transfer funds. Disconnect immediately. Call the individual directly on a known, pre-saved phone number or verify your private family safe word.";
  } else if (threatLevel === "medium") {
    summary = "Moderate risk indicators detected. The text features urgency or requests for action that warrant caution, but lacks confirmed emergency coercion markers.";
    recommendedAction = "Verify the authenticity of the sender through a secondary channel before clicking links or disclosing sensitive information.";
  } else {
    summary = "Low threat probability. No critical coercive indicators, emergency pretexts, or isolation markers were detected in this message.";
    recommendedAction = "Standard vigilance recommended. Always confirm unexpected links or requests with the sender.";
  }

  return {
    id: `scan-${Date.now()}`,
    timestamp: new Date().toISOString(),
    inputType: "transcript",
    threatLevel,
    overallScore: finalScore,
    summary,
    identifiedTactics: Array.from(new Set(identifiedTactics)),
    indicators,
    recommendedAction,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Message text is required for analysis." },
        { status: 400 }
      );
    }

    if (text.trim().length < 10) {
      return NextResponse.json(
        { error: "Message is too short for meaningful analysis. Please provide at least 10 characters." },
        { status: 400 }
      );
    }

    // Check if Gemini API is available and configured
    if (process.env.GEMINI_API_KEY) {
      try {
        const client = getGeminiClient();
        const prompt = `You are VERIVOX AI, an academic cybersecurity analyzer specialized in social engineering, voice cloning extortion transcripts, and impersonation scams.
Analyze the following message text for coercive indicators, manufactured urgency, isolation directives, authority impersonation, and financial extortion.

Text to analyze:
"""
${text}
"""

Respond ONLY with a valid JSON object matching this schema:
{
  "threatLevel": "low" | "medium" | "high",
  "overallScore": number (0 to 100),
  "summary": "Brief 2-3 sentence technical assessment of the threat pattern",
  "identifiedTactics": ["string array of tactics"],
  "indicators": [
    {
      "id": "ind-1",
      "category": "urgency" | "financial" | "authority" | "isolation" | "anomaly",
      "title": "Short title",
      "description": "Specific observation from text",
      "severity": "info" | "warning" | "danger",
      "confidenceScore": number (0 to 100)
    }
  ],
  "recommendedAction": "Actionable defense steps for the user"
}`;

        const response = await client.models.generateContent({
          model: GEMINI_CONFIG.defaultModel,
          contents: prompt,
        });

        const rawText = response.text || "";
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({
            id: `ai-${Date.now()}`,
            timestamp: new Date().toISOString(),
            inputType: "transcript",
            threatLevel: parsed.threatLevel || "medium",
            overallScore: parsed.overallScore || 50,
            summary: parsed.summary || "",
            identifiedTactics: parsed.identifiedTactics || [],
            indicators: parsed.indicators || [],
            recommendedAction: parsed.recommendedAction || "Verify through independent channels.",
          });
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed or key was invalid. Falling back to heuristic engine:", geminiError);
        // Seamless fallback to transparent heuristic analysis
      }
    }

    // Perform transparent heuristic analysis
    const result = performHeuristicAnalysis(text);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal analysis error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
