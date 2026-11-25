import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, GEMINI_CONFIG } from "@/lib/ai/gemini";

export const maxDuration = 60;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Authoritative security protocols from Verivox Verified Knowledge Base
const VERIFIED_SAFETY_PROTOCOLS: Record<string, { title: string; response: string; tags: string[] }> = {
  voice_cloning: {
    title: "How Voice Cloning Technology Works & Potential Misuse",
    tags: ["Acoustic AI", "Neural Vocoders", "Timbre Synthesis"],
    response: `### How Voice Cloning Works

Voice cloning uses deep generative neural networks to replicate a person's unique vocal characteristics from a brief audio sample.

1. **Vocal Feature Extraction**: The AI extracts acoustic embeddings—pitch, timbre, cadence, vocal fold resonance, and micro-pauses—from as little as 3 to 10 seconds of clear speech (often harvested from social media videos, voicemail greetings, or recorded webinars).
2. **Neural Acoustic Modeling**: A generative model (such as a diffusion acoustic model or autoregressive transformer) maps the target voice's frequency profile against arbitrary text.
3. **Neural Vocoder Synthesis**: Systems like HiFi-GAN or WaveNet convert the spectrogram into a raw, natural-sounding audio waveform, complete with synthetic emotional inflections (urgency, panic, tears).

---

### Common Vectors of Misuse

* **Family Emergency Extortion**: Calling parents or grandparents claiming a son or daughter was arrested or injured, demanding immediate wire transfers.
* **Executive Impersonation (CEO Fraud)**: Calling accounting or vendor managers authorizing urgent out-of-cycle transfers.
* **Bank Voice Authentication Bypass**: Spoofing automated IVR voiceprint security systems.

---

### How to Protect Yourself

* **Establish a Family Safe Word**: An offline, unguessable verbal passphrase known only to immediate family members.
* **Insist on Out-of-Band Callbacks**: Disconnect the call immediately and dial the individual back on their pre-saved personal phone number.
* **Observe Acoustic Artifacts**: Listen for unnatural cadence, lack of natural breath pauses, or unusual metallic reverb.`,
  },

  verify_emergency: {
    title: "Immediate 3-Step Emergency Call Verification Protocol",
    tags: ["Emergency Triage", "Verification", "Incident Response"],
    response: `### The 3-Step Immediate Verification Protocol

If you receive a distressing call claiming a loved one is injured, jailed, or held hostage, follow this defensive protocol:

1. **Pause & Do Not Make Hasty Financial Commitments**
   * Scammers deliberately manufacture extreme emotional urgency to disable your critical faculties.
   * Take a slow breath. Demand to speak directly with your family member if an alleged "officer" or "doctor" is speaking.

2. **Execute an Out-of-Band Callback**
   * Say: *"I am going to hang up and call you right back on your private cell number."*
   * Disconnect the call immediately.
   * Call your loved one directly on their known, saved phone number. If they do not pick up, call their school, workplace, spouse, or roommate.

3. **Deploy the Analog Verification Safe Word**
   * If the caller claims they are on someone else's phone and cannot be reached normally, ask them a specific challenge question that cannot be found online:
     * *"What is our family secret safe word?"*
     * *"Where did we have dinner together on my birthday two years ago?"*
   * A voice clone or synthetic model will be unable to answer accurately and will typically respond with heightened aggression or vague excuses.`,
  },

  family_impersonation: {
    title: "Action Plan: Responding to Family Member Voice Impersonation",
    tags: ["Family Defense", "Extortion Prevention", "Safe Word Protocol"],
    response: `### What to Do If Someone Impersonates Your Family Member

Follow these immediate defensive steps if you suspect a voice or video impersonator:

1. **Never Settle Demands via Irreversible Payment Vectors**
   * Legitimate hospitals, law enforcement agencies, and bond clerks **never** demand settlement via cryptocurrency, wire transfers to personal accounts, payment apps (Zelle/Venmo/UPI), or retail gift cards.
   * Refuse all requests for immediate electronic transfers while on the call.

2. **Verify Physical Location Independently**
   * Check mutual location-sharing tools (Apple Find My, Google Family Link, or WhatsApp Live Location).
   * Contact colleagues, friends, or trusted contacts who might be physically co-located with them.

3. **Preserve Digital Evidence**
   * Record the incoming phone number, timestamps, and caller ID details.
   * If possible, use another phone to record the audio of the call or save voicemails without altering them.

4. **Alert Law Enforcement & Your Financial Institution**
   * If money was accidentally transferred, contact your bank's fraud department immediately to request a wire recall.
   * File an extortion and identity spoofing report with local cyber crime authorities.`,
  },

  report_scam_india: {
    title: "Official Procedure to Report Cyber Scams & Financial Fraud in India",
    tags: ["Cyber Crime Helpline 1930", "cybercrime.gov.in", "Chakshu Portal"],
    response: `### Official Indian Government Cyber Incident Response

If you are targeted by a cyber scam, deepfake extortion, or unauthorized transaction in India, act immediately:

1. **National Cyber Crime Helpline: Dial 1930**
   * **Toll-free 24/7 Helpline**: Dial **1930** immediately.
   * Operated by the **Indian Cyber Crime Coordination Centre (I4C)** under the Ministry of Home Affairs.
   * **The "Golden Hour" Protocol**: If reported within 2 to 4 hours of an unauthorized financial transaction, the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) can freeze the fraudulent money trail across participating banks and digital wallets before the funds are withdrawn by the mule network.

2. **National Cyber Crime Reporting Portal**
   * Official Website: **[cybercrime.gov.in](https://cybercrime.gov.in)**
   * File a formal complaint under the **"Report Financial Fraud"** or **"Report Other Cyber Crime"** category.
   * You will receive an official Acknowledgement Number to track police investigation status.

3. **Report Spoofed Numbers & SMS on Chakshu (Sanchar Saathi)**
   * Website: **[sancharsaathi.gov.in/sfc/](https://sancharsaathi.gov.in/sfc/)**
   * Chakshu enables citizens to report suspected fraud communications received over calls, SMS, or WhatsApp (e.g. fake KYC alerts, electricity bill threats, or impersonated officers).

4. **Evidence Checklist to Keep Ready**
   * Bank account details, transaction reference / UTR number, and SMS alerts.
   * Suspect's phone number, WhatsApp chat screenshots, and call logs.
   * Audio recordings or message text.`,
  },

  business_executive: {
    title: "Enterprise Defense: Preventing Executive Impersonation (CEO Fraud)",
    tags: ["Business Email Compromise", "Dual Authorization", "Enterprise Security"],
    response: `### Preventing Executive Impersonation (CEO Fraud & Deepfake Vishing)

Corporate finance departments are increasingly targeted by AI-synthesized executive voices ordering confidential, expedited acquisitions or supplier payments.

1. **Mandatory Dual-Authorization for Capital Movement**
   * Institute a hard rule in your banking platform requiring two independent authorized signers (e.g., CFO and Treasury Director) for any transaction exceeding a threshold (e.g., $10,000 / ₹5,00,000).
   * Explicitly forbid unilateral executive overrides of standard Accounts Payable procedures via phone or chat.

2. **Enforce Out-of-Band Verbal Verification**
   * If an executive calls or messages requesting an urgent wire, the receiving employee must disconnect and call back on a verified internal extension or secure corporate VoIP system—not the caller ID on the screen.

3. **Interactive Live Video Challenge on Virtual Calls**
   * For video-based instructions, instruct staff to request a physical interactive action:
     * Ask the executive to turn their head 90 degrees sideways or pass their hand across their face.
     * This immediately exposes facial warping and boundary artifacts common in real-time deepfake overlays.

4. **Domain Hardening (SPF, DKIM, DMARC)**
   * Enforce strict DMARC policies (\`p=reject\`) across all company domains to stop email spoofing that often precedes or accompanies deepfake voice calls.`,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "A message string is required." },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    const normalized = trimmedMessage.toLowerCase();

    // 1. Check if Gemini API is configured
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = getGeminiClient();

        const systemInstruction = `You are Verivox AI's Digital Safety Companion—an authoritative, calm, and protective digital safety copilot.
Your mission is to help individuals and businesses protect themselves from synthetic voice cloning, video deepfakes, emergency extortion scams, and cyber fraud.
Guidelines:
1. Provide structured, defensive, and immediately actionable advice. Use clear markdown with headings, checklists, and bullet points.
2. For emergency situations, prioritize physical safety, emotional grounding, out-of-band verification, and offline family safe words.
3. If the user asks about fraud or reporting in India, reference the 1930 National Cyber Crime Helpline, the golden hour financial freeze, and cybercrime.gov.in.
4. If the user asks about business fraud, emphasize dual-authorization and out-of-band callback protocols.
5. Never advise paying ransom or wiring funds under duress.
6. Keep the tone empathetic, reassuring, professional, and clear.`;

        // Format conversation history for Gemini
        const formattedHistory: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];
        if (Array.isArray(history)) {
          history.slice(-8).forEach((item: ChatMessage) => {
            formattedHistory.push({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.content }],
            });
          });
        }

        const chat = ai.chats.create({
          model: GEMINI_CONFIG.defaultModel,
          config: {
            systemInstruction,
            temperature: 0.2,
            maxOutputTokens: 1200,
          },
          history: formattedHistory,
        });

        const result = await chat.sendMessage({
          message: trimmedMessage,
        });

        const reply = result.text || "I am here to help you evaluate suspicious communications. Could you provide more details?";

        return NextResponse.json({
          response: reply,
          source: "gemini",
          model: GEMINI_CONFIG.defaultModel,
          timestamp: new Date().toISOString(),
        });
      } catch (geminiError: unknown) {
        console.warn("[Assistant API] Gemini generation failed, falling back to verified knowledge base:", geminiError);
      }
    }

    // 2. Verified Knowledge-Base Matching (Transparent Heuristic Safety Copilot)
    // Matches the 5 official suggested prompts or relevant security keywords
    let matchedProtocol: { title: string; response: string; tags: string[] } | null = null;

    if (
      normalized.includes("voice clone") ||
      normalized.includes("voice cloning") ||
      normalized.includes("clone voice") ||
      normalized.includes("synthetic voice") ||
      normalized.includes("how does voice")
    ) {
      matchedProtocol = VERIFIED_SAFETY_PROTOCOLS.voice_cloning;
    } else if (
      normalized.includes("business") ||
      normalized.includes("executive") ||
      normalized.includes("ceo") ||
      normalized.includes("cfo") ||
      normalized.includes("wire fraud") ||
      normalized.includes("vendor")
    ) {
      matchedProtocol = VERIFIED_SAFETY_PROTOCOLS.business_executive;
    } else if (
      normalized.includes("india") ||
      normalized.includes("1930") ||
      normalized.includes("cybercrime.gov.in") ||
      normalized.includes("report a cyber scam") ||
      normalized.includes("report a scam") ||
      normalized.includes("report fraud in india")
    ) {
      matchedProtocol = VERIFIED_SAFETY_PROTOCOLS.report_scam_india;
    } else if (
      normalized.includes("verify") ||
      normalized.includes("emergency call") ||
      normalized.includes("distress call") ||
      normalized.includes("accident call")
    ) {
      matchedProtocol = VERIFIED_SAFETY_PROTOCOLS.verify_emergency;
    } else if (
      normalized.includes("family") ||
      normalized.includes("parent") ||
      normalized.includes("relative") ||
      normalized.includes("daughter") ||
      /\bson\b/i.test(normalized) ||
      /\bmom\b/i.test(normalized) ||
      /\bdad\b/i.test(normalized) ||
      (normalized.includes("impersonat") && !normalized.includes("executive"))
    ) {
      matchedProtocol = VERIFIED_SAFETY_PROTOCOLS.family_impersonation;
    }

    if (matchedProtocol) {
      return NextResponse.json({
        response: matchedProtocol.response,
        source: "verified_knowledge_base",
        title: matchedProtocol.title,
        tags: matchedProtocol.tags,
        note: apiKey
          ? undefined
          : "Delivered via Verivox Verified Knowledge Base (Gemini API key is not currently configured).",
        timestamp: new Date().toISOString(),
      });
    }

    // General Digital Safety Guidance for unspecified queries when Gemini is unconfigured
    const generalSafetyGuidance = `### Digital Safety Guidance

Thank you for consulting the Verivox Safety Companion.

When evaluating an unexpected message, voice recording, or video call, remember the **Triple Verification Rule**:

1. **Verify the Channel**: Never trust caller ID alone; modern VoIP systems allow spoofing of legitimate phone numbers. Always hang up and dial back using an independently verified contact number.
2. **Require Offline Proof**: Use an analog verification safe word or request private historical information that is not documented anywhere on public social media.
3. **Refuse Irreversible Wires**: If someone creates urgent pressure to transfer funds via gift cards, cryptocurrency, or peer-to-peer wire apps without standard oversight, treat it as fraudulent.

---

*To explore specific scenarios, select any of the suggested safety prompts below, or configure \`GEMINI_API_KEY\` in your environment to enable real-time conversational triage.*`;

    return NextResponse.json({
      response: generalSafetyGuidance,
      source: "verified_knowledge_base",
      note: apiKey
        ? undefined
        : "Delivered via Verivox Verified Knowledge Base (Gemini API key is not currently configured).",
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal assistant processing error.";
    console.error("[Assistant API Error]:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
