"use client";

import * as React from "react";
import {
  ShieldCheck,
  Bot,
  Send,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  PhoneCall,
  Lock,
  AlertTriangle,
  ExternalLink,
  Volume2,
  Users,
  Building2,
  X,
  Info,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { PrimaryButton, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  source?: "gemini" | "verified_knowledge_base";
  title?: string;
  tags?: string[];
  note?: string;
}

const SUGGESTED_QUESTIONS = [
  {
    id: "voice-cloning",
    title: "Voice Cloning Mechanics",
    query: "How does voice cloning work?",
    icon: Volume2,
    badge: "ACOUSTIC AI",
    description: "Understand acoustic embeddings, neural vocoders, and potential misuse vectors.",
  },
  {
    id: "verify-emergency",
    title: "Verify Emergency Calls",
    query: "How can I verify an emergency call?",
    icon: PhoneCall,
    badge: "CRISIS TRIAGE",
    description: "A defensive 3-step action protocol to verify high-stakes distress calls.",
  },
  {
    id: "family-impersonation",
    title: "Family Member Impersonation",
    query: "What should I do if someone impersonates my family member?",
    icon: Users,
    badge: "FAMILY DEFENSE",
    description: "Immediate defensive steps, analog safe words, and location checks.",
  },
  {
    id: "report-india",
    title: "Report Cyber Scams in India",
    query: "How can I report a cyber scam in India?",
    icon: AlertTriangle,
    badge: "HELPLINE 1930",
    description: "National Cyber Crime Portal, the golden hour financial freeze, and Sanchar Saathi.",
  },
  {
    id: "business-executive",
    title: "Executive Impersonation (CEO Fraud)",
    query: "How can businesses prevent executive impersonation?",
    icon: Building2,
    badge: "ENTERPRISE",
    description: "Dual-authorization protocols, out-of-band callbacks, and DMARC enforcement.",
  },
];

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-1",
  role: "assistant",
  timestamp: "Just now",
  source: "verified_knowledge_base",
  title: "Welcome to Your Digital Safety Companion",
  content: `### Welcome to VoiceGuard AI Safety Companion

I am your dedicated digital safety companion. I am engineered to assist you with recognizing deepfake voices, verifying suspicious emergency calls, protecting family members, and responding authoritatively to extortion or impersonation attempts.

**How can I help you stay secure today?**
* **Analyze a suspicious call or message**: Paste message text or describe an incoming call.
* **Emergency verification protocols**: Learn how to confirm caller authenticity before wiring capital.
* **Family safety strategy**: Establish analog verification phrases and out-of-band callback procedures.
* **Official cyber incident reporting**: Access verified reporting channels like India's **1930** helpline.

Select a suggested topic below or type your situation into the conversation field to begin.`,
};

// Clean, lightweight Markdown parser for structured security advice
function FormattedMessageContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-3 font-sans text-sm sm:text-base leading-relaxed text-[#171719]/90">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Horizontal divider
        if (trimmed === "---") {
          return <hr key={idx} className="border-[#171719]/10 my-3" />;
        }

        // Level 3 Heading
        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={idx}
              className="font-display font-semibold text-base sm:text-lg text-[#171719] mt-3 pt-1 border-b border-[#171719]/6 pb-1"
            >
              {renderFormattedInline(trimmed.replace(/^###\s+/, ""))}
            </h4>
          );
        }

        // Bullet point
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#477BFF]" />
              <div className="flex-1">
                {renderFormattedInline(trimmed.replace(/^(\*|-)\s+/, ""))}
              </div>
            </div>
          );
        }

        // Numbered item
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-3 pl-1">
              <span className="font-mono text-xs font-bold text-[#477BFF] bg-[#D9D9F7]/40 px-1.5 py-0.5 rounded-md mt-0.5 shrink-0">
                0{numberedMatch[1]}
              </span>
              <div className="flex-1">
                {renderFormattedInline(numberedMatch[2])}
              </div>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="leading-relaxed">
            {renderFormattedInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Inline formatter for bold, links, and inline code
function renderFormattedInline(text: string) {
  const parts = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-semibold text-[#171719]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="font-mono text-xs bg-[#171719]/6 text-[#171719] px-1.5 py-0.5 rounded"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#477BFF] font-medium underline underline-offset-2 hover:opacity-80 inline-flex items-center gap-0.5"
          >
            <span>{linkMatch[1]}</span>
            <ExternalLink className="h-3 w-3 inline" />
          </a>
        );
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

let messageCounter = 0;
function createMessageId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

export default function AssistantPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  React.useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, isLoading]);

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend ?? inputMessage).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: createMessageId("user"),
      role: "user",
      content: text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setError(null);
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Assistant communication interrupted.");
      }

      const assistantMessage: ChatMessage = {
        id: createMessageId("assistant"),
        role: "assistant",
        content: data.response,
        source: data.source,
        title: data.title,
        tags: data.tags,
        note: data.note,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Safety assistant encountered an issue.";
      setError(msg);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  const handleClearConversation = () => {
    setMessages([
      {
        ...INITIAL_WELCOME_MESSAGE,
        id: `welcome-${Date.now()}`,
      },
    ]);
    setInputMessage("");
    setError(null);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isConversationEmpty = messages.length <= 1;

  return (
    <div className="relative w-full overflow-hidden bg-[#F8F7F4]">
      {/* Background Soft Ambient Halos */}
      <div className="pointer-events-none absolute -top-24 right-0 h-[650px] w-[650px] rounded-full bg-gradient-to-bl from-[#B9A8E8]/20 via-[#D9D9F7]/30 to-[#B9E8F2]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-48 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#D9D9F7]/20 to-[#B9E8F2]/25 blur-3xl" />

      <PageContainer className="py-12 sm:py-20 lg:py-24">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "DEFENSE TOOLS", href: "/checker" },
              { label: "SAFETY ASSISTANT" },
            ]}
          />
        </div>

        {/* Section Heading */}
        <div className="mb-12">
          <SectionHeading
            sectionIndex="( 04 )"
            categoryTag="AI SAFETY ASSISTANT"
            title="Your Digital Safety Companion."
            subtitle="Ask questions. Understand risks. Make safer decisions."
            description="An intelligent digital defense companion designed to help you verify urgent calls, dissect suspicious messages, and navigate AI voice and video impersonation threats with confidence."
            size="hero"
          />
        </div>

        {/* =========================================================================
            MAIN CONVERSATION SURFACE (Clean White Card)
            ========================================================================= */}
        <div className="rounded-3xl bg-white border border-[#171719]/8 shadow-editorial-card overflow-hidden flex flex-col transition-all">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-5 border-b border-[#171719]/8 bg-white gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D9D9F7] text-[#477BFF] border border-[#B9A8E8]/40 shadow-xs">
                <Bot className="h-6 w-6 text-[#477BFF]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-base text-[#171719]">
                    VoiceGuard Safety Companion
                  </h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </div>
                <p className="text-xs text-[#A6A6AC] font-mono mt-0.5">
                  DEFENSIVE INTELLIGENCE COPILOT · ZERO LOGGING
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="white"
                size="sm"
                onClick={handleClearConversation}
                disabled={isConversationEmpty && !inputMessage}
                className="rounded-full text-xs text-[#171719]/70 hover:text-[#171719] border-[#171719]/10"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                <span>Clear Conversation</span>
              </Button>

              <Badge variant="liveStatus" dotColor="emerald" className="hidden sm:inline-flex text-[11px]">
                SECURE SESSION
              </Badge>
            </div>
          </div>

          {/* Messages Viewport */}
          <div className="min-h-[460px] max-h-[640px] overflow-y-auto p-6 sm:p-10 space-y-6 bg-gradient-to-b from-[#F8F7F4]/30 via-white to-white scrollbar-thin">
            {/* Opening Welcome & Suggested Starter Questions (when fresh) */}
            {isConversationEmpty && (
              <div className="mb-8 space-y-6 animate-in fade-in-50 duration-500">
                <div className="rounded-2xl border border-[#477BFF]/20 bg-[#D9D9F7]/15 p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#477BFF]">
                    <Sparkles className="h-4 w-4" />
                    <span>SUGGESTED DEFENSE SCENARIOS</span>
                  </div>
                  <h4 className="font-display font-semibold text-lg text-[#171719]">
                    Select a high-stakes scenario to review verified protocols:
                  </h4>
                  <p className="text-xs text-[#171719]/75 leading-relaxed">
                    Tap any of the common emergency situations below to immediately review actionable, defensive response procedures.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {SUGGESTED_QUESTIONS.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSend(item.query)}
                          className="text-left rounded-2xl bg-white p-4 border border-[#171719]/8 hover:border-[#477BFF] hover:shadow-md transition-all group flex items-start gap-3.5 cursor-pointer"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8F7F4] group-hover:bg-[#D9D9F7] text-[#477BFF] transition-colors">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-display font-semibold text-sm text-[#171719] group-hover:text-[#477BFF] transition-colors">
                                {item.title}
                              </span>
                              <span className="font-mono text-[9px] uppercase tracking-wider text-[#A6A6AC] bg-[#F8F7F4] px-1.5 py-0.5 rounded">
                                {item.badge}
                              </span>
                            </div>
                            <p className="text-xs text-[#A6A6AC] leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Conversation Flow */}
            {messages.map((message) => {
              const isUser = message.role === "user";

              if (isUser) {
                return (
                  <div
                    key={message.id}
                    className="flex justify-end animate-in fade-in-50 duration-300"
                  >
                    <div className="max-w-xl space-y-1.5">
                      <div className="text-right text-[11px] font-mono text-[#A6A6AC] uppercase tracking-wider pr-1">
                        YOU
                      </div>
                      <div className="rounded-2xl rounded-tr-none bg-[#171719] text-[#F8F7F4] p-4 sm:p-5 shadow-sm text-sm sm:text-base leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  </div>
                );
              }

              // Assistant Message Bubble
              return (
                <div
                  key={message.id}
                  className="flex justify-start gap-3.5 max-w-3xl animate-in fade-in-50 duration-300"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#D9D9F7] text-[#477BFF] border border-[#B9A8E8]/40 shadow-xs mt-1">
                    <ShieldCheck className="h-5 w-5 text-[#477BFF]" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#171719]">
                        SAFETY COMPANION
                      </span>
                      {message.source === "gemini" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#D9D9F7] px-2 py-0.5 text-[10px] font-mono font-medium text-[#171719]">
                          <Sparkles className="h-3 w-3 text-[#477BFF]" />
                          GEMINI FLASH COPILOT
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-900 border border-emerald-300">
                          VERIFIED PROTOCOL
                        </span>
                      )}
                    </div>

                    {/* Content Box */}
                    <div className="rounded-2xl rounded-tl-none bg-[#F8F7F4] border border-[#171719]/8 p-5 sm:p-7 shadow-xs space-y-4">
                      {message.title && (
                        <div className="pb-2 border-b border-[#171719]/8">
                          <h4 className="font-display font-semibold text-lg text-[#171719]">
                            {message.title}
                          </h4>
                          {message.tags && message.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {message.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="font-mono text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#171719]/8 text-[#171719]/80"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <FormattedMessageContent content={message.content} />

                      {message.note && (
                        <div className="pt-2 border-t border-[#171719]/8 flex items-center gap-1.5 text-[11px] font-mono text-[#A6A6AC]">
                          <Info className="h-3.5 w-3.5 text-[#477BFF] shrink-0" />
                          <span>{message.note}</span>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="pt-2 flex items-center justify-between border-t border-[#171719]/8 text-xs text-[#A6A6AC]">
                        <span className="font-mono text-[10px]">
                          EPHEMERAL GUIDANCE · VERIFY INDEPENDENTLY
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopy(message.id, message.content)}
                          className="inline-flex items-center gap-1.5 text-xs text-[#171719] hover:text-[#477BFF] transition-colors py-1 px-2.5 rounded-md hover:bg-white"
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-medium">Copied Advice</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 opacity-70" />
                              <span>Copy Protocol</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator Bubble */}
            {isLoading && (
              <div className="flex justify-start gap-3.5 max-w-xl animate-in fade-in-50 duration-300">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#D9D9F7] text-[#477BFF] border border-[#B9A8E8]/40 shadow-xs mt-1">
                  <ShieldCheck className="h-5 w-5 text-[#477BFF]" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[#F8F7F4] border border-[#171719]/8 p-4 px-6 shadow-xs flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#477BFF] animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 rounded-full bg-[#B9A8E8] animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 rounded-full bg-[#477BFF] animate-bounce" />
                  </div>
                  <span className="text-xs font-mono text-[#A6A6AC] tracking-wider uppercase">
                    Synthesizing digital safety guidance...
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>{error}</span>
                </div>
                <Button
                  type="button"
                  variant="white"
                  size="sm"
                  onClick={() => handleSend()}
                  className="rounded-full text-xs text-amber-900 border-amber-300"
                >
                  Retry
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompt Pills (always visible above input for quick tap) */}
          <div className="px-6 sm:px-8 py-3 border-t border-[#171719]/8 bg-[#F8F7F4]/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-mono text-[#A6A6AC] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#477BFF]" />
              SUGGESTED:
            </span>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSend(q.query)}
                disabled={isLoading}
                className="shrink-0 text-xs rounded-full bg-white px-3.5 py-1.5 border border-[#171719]/8 hover:border-[#477BFF] hover:bg-[#171719] hover:text-[#F8F7F4] text-[#171719] font-medium transition-all select-none shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {q.query}
              </button>
            ))}
          </div>

          {/* Message Input Section */}
          <div className="p-6 sm:p-8 bg-white border-t border-[#171719]/8 space-y-3">
            <div className="relative rounded-2xl bg-[#F8F7F4] border border-[#171719]/12 focus-within:border-[#477BFF] focus-within:ring-2 focus-within:ring-[#477BFF]/15 transition-all p-3 sm:p-4">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about a suspicious call, message, voice recording, or incident triage..."
                rows={3}
                maxLength={1000}
                className="w-full resize-none bg-transparent font-sans text-sm sm:text-base text-[#171719] placeholder:text-[#A6A6AC] focus:outline-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2 border-t border-[#171719]/6 text-xs text-[#A6A6AC]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px]">
                    {inputMessage.length} / 1000
                  </span>
                  <span className="hidden sm:inline text-[11px]">
                    Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#171719]/10">Enter ↵</kbd> to send, <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#171719]/10">Shift + Enter</kbd> for newline
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {inputMessage && (
                    <button
                      type="button"
                      onClick={() => setInputMessage("")}
                      className="p-1.5 rounded-lg text-[#A6A6AC] hover:text-[#171719] hover:bg-white transition-colors"
                      title="Clear message"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  <PrimaryButton
                    type="button"
                    onClick={() => handleSend()}
                    disabled={!inputMessage.trim() || isLoading}
                    size="sm"
                    className="rounded-full px-5 gap-1.5 font-medium shadow-sm hover:shadow"
                  >
                    <span>Send</span>
                    <Send className="h-3.5 w-3.5" />
                  </PrimaryButton>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#A6A6AC] px-1 font-mono">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-emerald-600" />
                <span>EPHEMERAL SESSION · ZERO MESSAGES STORED ON SERVERS</span>
              </div>
              <span>PREPARED FOR GEMINI MULTIMODAL INTELLIGENCE</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            OFFICIAL EMERGENCY & CYBER CRIME HELPLINE BANNER
            ========================================================================= */}
        <div className="mt-12 rounded-3xl bg-white p-6 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#171719]/8 gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC]">
                INSTITUTIONAL CYBER INCIDENT HELPLINES
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#171719]">
                Active Financial Extortion or Immediate Danger?
              </h3>
            </div>

            <Badge variant="liveStatus" dotColor="rose">
              24/7 HELPLINE ACTIVE
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#171719]/8 space-y-2">
              <div className="flex items-center gap-2 text-[#477BFF] font-semibold text-sm">
                <PhoneCall className="h-4 w-4" />
                <span>National Cyber Helpline (India)</span>
              </div>
              <p className="text-xl font-display font-bold text-[#171719]">
                Dial 1930
              </p>
              <p className="text-[#171719]/75 leading-relaxed">
                Toll-free 24/7 Citizen Financial Cyber Fraud Reporting System. Report within 2-4 hours to trigger the inter-bank golden hour account freeze.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#171719]/8 space-y-2">
              <div className="flex items-center gap-2 text-[#477BFF] font-semibold text-sm">
                <ExternalLink className="h-4 w-4" />
                <span>National Cyber Crime Portal</span>
              </div>
              <p className="text-sm font-display font-semibold text-[#171719]">
                cybercrime.gov.in
              </p>
              <p className="text-[#171719]/75 leading-relaxed">
                File formal police complaints for identity theft, deepfake extortion, and online fraud. Track investigation status with official acknowledgment IDs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#171719]/8 space-y-2">
              <div className="flex items-center gap-2 text-[#477BFF] font-semibold text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Sanchar Saathi (Chakshu)</span>
              </div>
              <p className="text-sm font-display font-semibold text-[#171719]">
                sancharsaathi.gov.in
              </p>
              <p className="text-[#171719]/75 leading-relaxed">
                Report suspected fraudulent callers, spoofed WhatsApp numbers, and fake KYC text messages directly to the Department of Telecommunications.
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
