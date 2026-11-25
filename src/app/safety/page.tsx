"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  PhoneCall,
  PhoneOff,
  Lock,
  KeyRound,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Building2,
  Users,
  Eye,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Smartphone,
  ArrowRight,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample safe phrase combinations for generator
const SAFE_PHRASE_ADJECTIVES = [
  "Crimson",
  "Silent",
  "Copper",
  "Silver",
  "Golden",
  "Nordic",
  "Rustic",
  "Velvet",
  "Timber",
  "Cosmic",
];
const SAFE_PHRASE_NOUNS = [
  "Lantern",
  "Whistle",
  "Compass",
  "Kettle",
  "Horizon",
  "Sparrow",
  "Breeze",
  "Pecan",
  "Orchard",
  "Canyon",
];

export default function SafetyPage() {
  const [copied1930, setCopied1930] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [safePhrase, setSafePhrase] = React.useState("Copper Lantern 42");

  // Interactive Digital Identity Checklist State
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({
    totp: true,
    passphrase: true,
    socialAudio: false,
    zeroOtp: true,
    screenShare: false,
    remoteApp: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedChecklistCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecklistCount = Object.keys(checkedItems).length;
  const checklistPercentage = Math.round((completedChecklistCount / totalChecklistCount) * 100);

  const handleCopy1930 = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("1930");
      setCopied1930(true);
      setTimeout(() => setCopied1930(false), 2000);
    }
  };

  const handleCopyPortalLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("https://cybercrime.gov.in/");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const generateNewSafePhrase = () => {
    const adj = SAFE_PHRASE_ADJECTIVES[Math.floor(Math.random() * SAFE_PHRASE_ADJECTIVES.length)];
    const noun = SAFE_PHRASE_NOUNS[Math.floor(Math.random() * SAFE_PHRASE_NOUNS.length)];
    const num = Math.floor(Math.random() * 89) + 10;
    setSafePhrase(`${adj} ${noun} ${num}`);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <PageContainer className="py-12 sm:py-20 space-y-16 sm:space-y-24">
      {/* Top Header Row */}
      <div className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Breadcrumb items={[{ label: "SAFETY & REPORTING GUIDE" }]} />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-xs font-mono cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 mr-1.5" />
              Print Playbook
            </Button>
            <Badge variant="liveStatus" dotColor="emerald">
              VERIFIED PROTOCOLS
            </Badge>
          </div>
        </div>

        {/* Hero Section Heading */}
        <SectionHeading
          sectionIndex="( 06 )"
          categoryTag="DEFENSE & REPORTING PROTOCOLS"
          title="Pause. Verify. Protect."
          subtitle="A tactical playbook for disarming AI voice scams, securing identity, and initiating rapid crisis reporting."
          description="When synthetic media and artificial urgency collide, instinctive reactions become liabilities. Follow these structured, non-technical steps to authenticate calls, safeguard family members, and report financial fraud."
          size="hero"
        />

        {/* Immediate Emergency Action Bar */}
        <div className="rounded-3xl bg-[#171719] text-[#F8F7F4] p-6 sm:p-8 relative overflow-hidden shadow-xl border border-[#171719]/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-mono text-xs text-[#B9E8F2] tracking-wider uppercase font-semibold">
                  EMERGENCY FRAUD RESPONSE · INDIA
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-white">
                Under active extortion or unauthorized bank debits?
              </h3>
              <p className="text-xs sm:text-sm text-[#F8F7F4]/75 leading-relaxed">
                Report within the <strong>Golden Hour</strong> (first 2 hours) to maximize the probability that Indian Cyber Police can freeze stolen funds across recipient bank accounts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
              {/* Dial 1930 CTA */}
              <a
                href="tel:1930"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#477BFF] hover:bg-[#3B6AE0] text-white font-medium text-sm px-6 h-12 rounded-full transition-all shadow-md active:scale-95"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Helpline 1930</span>
              </a>

              {/* Portal External Link */}
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-[#F8F7F4] border border-white/15 font-medium text-sm px-5 h-12 rounded-full transition-all active:scale-95"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Jump Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none text-xs font-mono">
          <span className="text-[#A6A6AC] uppercase tracking-wider shrink-0 mr-1">
            JUMP TO:
          </span>
          <a
            href="#verify-call"
            className="rounded-full bg-white hover:bg-[#D9D9F7]/30 border border-[#171719]/10 px-3.5 py-1.5 text-[#171719] whitespace-nowrap transition-colors"
          >
            01. Verify Call
          </a>
          <a
            href="#digital-identity"
            className="rounded-full bg-white hover:bg-[#D9D9F7]/30 border border-[#171719]/10 px-3.5 py-1.5 text-[#171719] whitespace-nowrap transition-colors"
          >
            02. Digital Identity
          </a>
          <a
            href="#family-protocol"
            className="rounded-full bg-white hover:bg-[#D9D9F7]/30 border border-[#171719]/10 px-3.5 py-1.5 text-[#171719] whitespace-nowrap transition-colors"
          >
            03. Family Protocol
          </a>
          <a
            href="#after-scam"
            className="rounded-full bg-white hover:bg-[#D9D9F7]/30 border border-[#171719]/10 px-3.5 py-1.5 text-[#171719] whitespace-nowrap transition-colors"
          >
            04. After a Scam
          </a>
          <a
            href="#reporting-india"
            className="rounded-full bg-white hover:bg-[#D9D9F7]/30 border border-[#171719]/10 px-3.5 py-1.5 text-[#171719] whitespace-nowrap transition-colors"
          >
            05. Reporting in India
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: VERIFY A SUSPICIOUS CALL                       */}
      {/* ========================================================= */}
      <section id="verify-call" className="space-y-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#171719]/8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#477BFF] uppercase tracking-wider font-semibold mb-2">
              <PhoneCall className="h-3.5 w-3.5" />
              STAGE 01 · TACTICAL CALL VERIFICATION
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#171719]">
              Verify a Suspicious Call
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#171719]/65 max-w-md">
            When acoustic familiarity is synthetic, out-of-band verification is your only infallible anchor.
          </p>
        </div>

        {/* 3 Sequential Action Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between space-y-6 relative group hover:border-[#171719]/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#477BFF] bg-[#D9D9F7]/40 px-3 py-1 rounded-full border border-[#477BFF]/20">
                  STEP 01
                </span>
                <div className="h-9 w-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                  <PhoneOff className="h-4 w-4" />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171719] leading-tight">
                Disconnect from suspicious interactions.
              </h3>

              <p className="text-sm text-[#171719]/75 leading-relaxed">
                Never argue, negotiate, or attempt to interrogate the caller while remaining on their connection. If the caller pressures you with urgent arrest threats, kidnapped relatives, hospital bills, or immediate wire transfers, <strong>hang up immediately</strong>.
              </p>

              <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 text-xs text-[#171719]/80 space-y-1.5">
                <span className="font-mono text-[11px] font-semibold text-[#171719] block uppercase">
                  Tactical Insight:
                </span>
                <p className="leading-relaxed">
                  Silence terminates their cognitive overload loop. Scammers rely on sustained adrenaline to block logical reasoning. Severing the line restores your emotional control.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-[#A6A6AC] flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Disconnection breaks caller control
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between space-y-6 relative group hover:border-[#171719]/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#B9A8E8] bg-[#B9A8E8]/20 px-3 py-1 rounded-full border border-[#B9A8E8]/40">
                  STEP 02
                </span>
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#477BFF] flex items-center justify-center border border-blue-100">
                  <Smartphone className="h-4 w-4" />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171719] leading-tight">
                Call the person using a trusted saved number.
              </h3>

              <p className="text-sm text-[#171719]/75 leading-relaxed">
                <strong>Never redial the number displayed on your caller ID.</strong> Caller ID numbers are effortlessly spoofed via VoIP manipulation tools. Instead, open your phonebook contacts and initiate an outbound call to the person’s verified number.
              </p>

              <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 text-xs text-[#171719]/80 space-y-1.5">
                <span className="font-mono text-[11px] font-semibold text-[#171719] block uppercase">
                  Fallback Protocol:
                </span>
                <p className="leading-relaxed">
                  If the primary mobile line is busy or unanswered, contact their workplace desk phone, roommate, teacher, spouse, or building security before initiating any financial action.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-[#A6A6AC] flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Outbound calls bypass spoofing
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between space-y-6 relative group hover:border-[#171719]/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  STEP 03
                </span>
                <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <ShieldCheck className="h-4 w-4" />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171719] leading-tight">
                Independently verify unexpected requests.
              </h3>

              <p className="text-sm text-[#171719]/75 leading-relaxed">
                If the call purports to be from a bank, electricity department, courier, or court, open the official app or website directly in your browser. <strong>Never click links sent via SMS, WhatsApp, or Telegram.</strong>
              </p>

              <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 text-xs text-[#171719]/80 space-y-1.5">
                <span className="font-mono text-[11px] font-semibold text-[#171719] block uppercase">
                  Official Verification:
                </span>
                <p className="leading-relaxed">
                  Call the customer service number printed on the physical back of your debit card, or dial the public telephone switchboard listed on official government portals.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-[#A6A6AC] flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Out-of-band channels expose fraud
            </div>
          </div>
        </div>

        {/* Forensic Deep Dive: 3 Questions that Expose Synthetic Voice */}
        <div className="rounded-3xl bg-gradient-to-br from-white to-[#F8F7F4] p-8 border border-[#171719]/8 shadow-editorial-card space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#D9D9F7] flex items-center justify-center text-[#171719]">
              <Sparkles className="h-5 w-5 text-[#477BFF]" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-[#171719]">
                Live Diagnostic: Three Tests to Trip Up an AI Caller
              </h3>
              <p className="text-xs text-[#A6A6AC] font-mono">
                ACOUSTIC &amp; COGNITIVE FORENSIC TRAPS
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-[#171719]/80">
            <div className="p-4 rounded-2xl bg-white border border-[#171719]/6 space-y-2">
              <span className="font-mono font-bold text-[#477BFF] block">
                01. The Obscure Memory Test
              </span>
              <p>
                Ask a specific offline question that cannot be found on social media: <em>&ldquo;What color was Uncle David&rsquo;s old car?&rdquo;</em> or <em>&ldquo;Where did we have lunch two summers ago?&rdquo;</em> Real callers respond instantly; scammers stall or evade.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#171719]/6 space-y-2">
              <span className="font-mono font-bold text-[#B9A8E8] block">
                02. The Acoustic Noise Trap
              </span>
              <p>
                Ask the caller to take a deep breath or clap their hands. Generative TTS models struggle with dynamic non-verbal acoustics, breathing pauses, and sudden background frequency shifts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#171719]/6 space-y-2">
              <span className="font-mono font-bold text-emerald-600 block">
                03. The Latency Gap Observation
              </span>
              <p>
                Notice if there is an unnatural 1.5–3 second latency before every response. Real-time voice cloning software introduces processing latency as speech-to-text, LLM prompting, and vocoder generation execute in sequence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: PROTECT YOUR DIGITAL IDENTITY                  */}
      {/* ========================================================= */}
      <section id="digital-identity" className="space-y-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#171719]/8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B9A8E8] uppercase tracking-wider font-semibold mb-2">
              <Lock className="h-3.5 w-3.5 text-[#171719]" />
              STAGE 02 · ATTACK SURFACE REDUCTION
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#171719]">
              Protect Your Digital Identity
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#171719]/65 max-w-md">
            Minimizing public acoustic samples and adopting modern authentication prevents adversaries from cloning your identity.
          </p>
        </div>

        {/* Three Editorial Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#B9E8F2]/50 flex items-center justify-center text-[#171719]">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#171719]">
              Protect personal information.
            </h3>
            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Limit public video reels, podcast appearances, and voice notes. Modern zero-shot models require as little as 3 seconds of clean speech to build a convincing replica of your acoustic profile.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-[#171719]/80">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Set personal social media accounts to private.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Avoid participating in viral voice challenges or unvetted audio filters.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Never post boarding passes, utility bills, or IDs displaying bar codes or QR codes.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#D9D9F7] flex items-center justify-center text-[#171719]">
              <KeyRound className="h-5 w-5 text-[#477BFF]" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#171719]">
              Use strong authentication.
            </h3>
            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Upgrade from vulnerable SMS-based verification to phishing-resistant hardware keys or authenticator apps. SMS codes can be intercepted via SIM swapping or social engineering.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-[#171719]/80">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Use TOTP Authenticator apps (Google Authenticator, Microsoft, Aegis).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Implement FIDO2 / WebAuthn passkeys for email and banking.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Generate 16+ character unique passphrases stored in a password manager.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#171719]">
              Avoid sharing confidential information.
            </h3>
            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Maintain a zero-disclosure baseline for security credentials. Legitimate institutions have internal records and will never require your confidential authentication tokens.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-[#171719]/80">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero OTP Policy:</strong> Never share one-time passwords with any caller.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Never install remote desktop apps (AnyDesk, TeamViewer) at a caller&rsquo;s behest.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Never enter your UPI PIN to &ldquo;receive&rdquo; a prize or cashback.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Identity Readiness Checklist */}
        <div className="rounded-3xl bg-[#F8F7F4] p-8 border border-[#171719]/8 shadow-editorial-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171719]/8">
            <div>
              <h3 className="font-display text-xl font-semibold text-[#171719]">
                Personal Digital Hardening Audit
              </h3>
              <p className="text-xs text-[#171719]/65">
                Check off your defensive safeguards to evaluate your resilience against synthetic identity attacks.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#171719]">
                {completedChecklistCount} of {totalChecklistCount} Secured
              </span>
              <div className="w-24 h-2 rounded-full bg-[#171719]/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#B9A8E8] to-[#477BFF] transition-all duration-300"
                  style={{ width: `${checklistPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {[
              {
                id: "totp",
                label: "Hardware / Authenticator App enabled on primary email & banking",
                desc: "Prevents account takeover even if SMS is compromised.",
              },
              {
                id: "passphrase",
                label: "Unique 16+ character passphrases stored in a password manager",
                desc: "Guarantees that a breach on one service does not leak your other logins.",
              },
              {
                id: "socialAudio",
                label: "Public video and audio voice samples locked or pruned from social profiles",
                desc: "Limits seed audio available to prospective voice-cloning adversaries.",
              },
              {
                id: "zeroOtp",
                label: "Zero OTP disclosure rule practiced across all household members",
                desc: "Understands that no legitimate service ever requests your OTP for verification.",
              },
              {
                id: "screenShare",
                label: "Refusal to install remote desktop utilities (AnyDesk / QuickSupport) on demand",
                desc: "Protects device screens and banking overlays from remote viewing.",
              },
              {
                id: "remoteApp",
                label: "UPI PIN knowledge: PIN is exclusively used for debiting, never receiving funds",
                desc: "Immunizes against QR code cashback and refund collection traps.",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  checkedItems[item.id]
                    ? "bg-white border-[#477BFF]/40 shadow-sm"
                    : "bg-white/60 border-[#171719]/8 opacity-75 hover:opacity-100"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    checkedItems[item.id]
                      ? "bg-[#477BFF] border-[#477BFF] text-white"
                      : "border-[#171719]/25 bg-white"
                  }`}
                >
                  {checkedItems[item.id] && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
                <div className="space-y-0.5 flex-1">
                  <p className="font-medium text-[#171719] text-xs leading-snug">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-[#171719]/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: FAMILY SAFETY PROTOCOL                         */}
      {/* ========================================================= */}
      <section id="family-protocol" className="space-y-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#171719]/8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#477BFF] uppercase tracking-wider font-semibold mb-2">
              <Users className="h-3.5 w-3.5" />
              STAGE 03 · HOUSEHOLD AUTHENTICATION
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#171719]">
              Family Safety Protocol
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#171719]/65 max-w-md">
            Create an analog defense layer that no machine learning model or voice synthesizer can penetrate.
          </p>
        </div>

        {/* 3 Core Directives */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Directive 1 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#D9D9F7] flex items-center justify-center text-[#171719]">
              <KeyRound className="h-5 w-5 text-[#477BFF]" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#171719]">
              Establish a family verification phrase.
            </h3>
            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Agree in advance on a private code word or sentence known only to household members. In any emergency call involving distress, bail, or accidents, the caller must recite this phrase.
            </p>
            <div className="rounded-xl bg-[#F8F7F4] p-3 border border-[#171719]/6 text-xs text-[#171719]/75 space-y-1">
              <span className="font-mono font-semibold text-[#171719] block">Golden Rule:</span>
              <p>Never write this code in WhatsApp, email, or cloud notes. Treat it like a verbal vault combination.</p>
            </div>
          </div>

          {/* Directive 2 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#B9E8F2]/50 flex items-center justify-center text-[#171719]">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#171719]">
              Agree on trusted emergency contact methods.
            </h3>
            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Establish a predetermined contact tree. If a child or elderly relative cannot be reached on their primary mobile phone, agree on who to contact next before taking financial action.
            </p>
            <div className="rounded-xl bg-[#F8F7F4] p-3 border border-[#171719]/6 text-xs text-[#171719]/75 space-y-1">
              <span className="font-mono font-semibold text-[#171719] block">Pre-Agreed Fallbacks:</span>
              <p>Save numbers for dorm wardens, room partners, school administrative desks, and local neighbors.</p>
            </div>
          </div>

          {/* Directive 3 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#171719]">
              Verify unusual financial requests.
            </h3>
            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Enforce a strict <strong>Two-Person Verification Rule</strong>. No funds may be wired based on a single voice call or distressed video clip without speaking directly to a second trusted party.
            </p>
            <div className="rounded-xl bg-[#F8F7F4] p-3 border border-[#171719]/6 text-xs text-[#171719]/75 space-y-1">
              <span className="font-mono font-semibold text-[#171719] block">Video Call Test:</span>
              <p>Ask the caller to turn sideways or pass their hand over their face. AI neural renderers glitch at extreme profile angles.</p>
            </div>
          </div>
        </div>

        {/* Interactive Safe Word Generator Studio */}
        <div className="rounded-3xl bg-[#171719] text-[#F8F7F4] p-8 sm:p-10 border border-[#171719]/10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-mono text-[#D9D9F7]">
                <KeyRound className="h-3.5 w-3.5 text-[#B9A8E8]" /> ANALOG CODE-WORD GENERATOR
              </span>
              <h3 className="font-display text-2xl font-medium text-white">
                Generate an Uncrackable Family Safe Word
              </h3>
              <p className="text-xs sm:text-sm text-[#F8F7F4]/75 leading-relaxed">
                Strong safe words combine unrelated everyday words with a memorable number. Avoid pet names, birth years, or childhood addresses that could be scraped from public records.
              </p>
            </div>

            {/* Generated Safe Phrase Card */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/15 flex flex-col items-center justify-center gap-3 shrink-0 min-w-[280px]">
              <span className="font-mono text-[10px] text-[#A6A6AC] uppercase tracking-wider">
                SAMPLE VERIFICATION CODE
              </span>
              <div className="font-display text-2xl font-bold tracking-wide text-[#B9E8F2] text-center">
                &ldquo;{safePhrase}&rdquo;
              </div>
              <Button
                variant="white"
                size="sm"
                onClick={generateNewSafePhrase}
                className="text-xs font-mono cursor-pointer mt-1"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Generate Another
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: WHAT TO DO AFTER A SCAM                        */}
      {/* ========================================================= */}
      <section id="after-scam" className="space-y-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#171719]/8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-600 uppercase tracking-wider font-semibold mb-2">
              <AlertCircle className="h-3.5 w-3.5" />
              STAGE 04 · RAPID CONTAINMENT TIMELINE
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#171719]">
              What to Do After a Scam
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#171719]/65 max-w-md">
            Time is the critical variable. Systematic post-incident containment dramatically increases asset recovery rates.
          </p>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phase 1 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-rose-200/80 shadow-editorial-card space-y-5 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                0–15 MINUTES · CRITICAL
              </span>
              <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-mono text-xs font-bold">
                1
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171719] leading-tight">
              Contact your bank if money is involved.
            </h3>

            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Immediately call the bank fraud prevention number located on the back of your debit card or in your mobile banking app.
            </p>

            <div className="space-y-2 pt-1 text-xs text-[#171719]/80">
              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 space-y-1">
                <span className="font-semibold text-rose-900 block">Bank Actions to Demand:</span>
                <ul className="list-disc list-inside space-y-0.5 text-rose-800">
                  <li>Freeze compromised debit/credit cards immediately.</li>
                  <li>Block online net-banking and UPI payment handles.</li>
                  <li>Request an urgent recall / lien mark on outgoing NEFT/RTGS/IMPS transactions.</li>
                  <li>Record the official bank complaint ticket and UTR numbers.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-5 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#477BFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                15–60 MINUTES · FORENSIC
              </span>
              <div className="h-8 w-8 rounded-full bg-blue-100 text-[#477BFF] flex items-center justify-center font-mono text-xs font-bold">
                2
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171719] leading-tight">
              Preserve relevant evidence.
            </h3>

            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Digital evidence deteriorates quickly. Scammers frequently delete messages for everyone or revoke accounts once payments land.
            </p>

            <div className="space-y-2 pt-1 text-xs text-[#171719]/80">
              <div className="p-3 rounded-xl bg-[#F8F7F4] border border-[#171719]/8 space-y-1">
                <span className="font-semibold text-[#171719] block">Evidence Checklist to Capture:</span>
                <ul className="list-disc list-inside space-y-0.5 text-[#171719]/75">
                  <li>Screenshots of incoming caller ID, timestamps, and call durations.</li>
                  <li>Full chat export (WhatsApp / Telegram) with media attached.</li>
                  <li>Bank debit SMS notifications and transaction confirmation screens.</li>
                  <li>Audio recordings of suspicious calls or voicemail messages.</li>
                  <li>Raw email headers (download as <code>.eml</code>) for phishing messages.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-5 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                1–2 HOURS · STATUTORY
              </span>
              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-mono text-xs font-bold">
                3
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171719] leading-tight">
              Report suspected financial fraud promptly.
            </h3>

            <p className="text-sm text-[#171719]/75 leading-relaxed">
              Lodge a formal cybercrime report immediately. Filing within the statutory window triggers inter-bank beneficiary freezes.
            </p>

            <div className="space-y-2 pt-1 text-xs text-[#171719]/80">
              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <span className="font-semibold text-emerald-900 block">Immediate Statutory Steps:</span>
                <ul className="list-disc list-inside space-y-0.5 text-emerald-800">
                  <li>Dial <strong>1930</strong> (National Cyber Financial Fraud Helpline).</li>
                  <li>Submit complaint on <strong>cybercrime.gov.in</strong> with evidence.</li>
                  <li>Obtain the official 15-digit Acknowledgement Number.</li>
                  <li>Submit the acknowledgement to your bank branch within 24 hours.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: REPORTING IN INDIA                             */}
      {/* ========================================================= */}
      <section id="reporting-india" className="space-y-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#171719]/8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#477BFF] uppercase tracking-wider font-semibold mb-2">
              <Building2 className="h-3.5 w-3.5" />
              STAGE 05 · STATUTORY AUTHORITIES &amp; HELPLINES
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#171719]">
              Reporting in India
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#171719]/65 max-w-md">
            Direct channels and statutory portals established by the Ministry of Home Affairs (MHA) and Indian Cyber Crime Coordination Centre (I4C).
          </p>
        </div>

        {/* Dual Primary Hotspots: Helpline 1930 & National Portal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: 1930 Helpline */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  NATIONAL CYBER FRAUD HELPLINE
                </span>
                <span className="text-xs font-mono text-[#A6A6AC]">24x7 TOLL-FREE</span>
              </div>

              <div className="space-y-1">
                <div className="font-display text-5xl sm:text-6xl font-bold text-[#171719] tracking-tight">
                  1930
                </div>
                <p className="text-xs font-mono text-[#477BFF] font-semibold">
                  CITIZEN FINANCIAL CYBER FRAUD REPORTING SYSTEM
                </p>
              </div>

              <p className="text-sm text-[#171719]/75 leading-relaxed">
                Operated under the <strong>Indian Cyber Crime Coordination Centre (I4C)</strong>, Helpline 1930 directly bridges victims with law enforcement and over 250+ partner banks, payment aggregators, and fintech wallets.
              </p>

              <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 space-y-2 text-xs text-[#171719]/80">
                <span className="font-mono font-semibold text-[#171719] block uppercase">
                  How 1930 Freezes Stolen Funds:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-[#171719]/75 leading-relaxed">
                  <li>You dial 1930 and provide basic caller and incident details.</li>
                  <li>The operator logs an automated ticket on the National Portal.</li>
                  <li>Real-time alert pings the fraud desks of both sending and receiving banks.</li>
                  <li>If filed quickly, the receiving bank places an immediate lien freeze on the scammer&rsquo;s account before money is withdrawn at ATMs.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="tel:1930"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#171719] hover:bg-[#26262B] text-white font-medium text-sm px-6 h-12 rounded-full transition-all shadow-sm active:scale-95"
              >
                <PhoneCall className="h-4 w-4 text-[#B9A8E8]" />
                <span>Call 1930 Immediately</span>
              </a>

              <Button
                variant="secondary"
                size="default"
                onClick={handleCopy1930}
                className="w-full sm:w-auto h-12 px-5 rounded-full cursor-pointer"
              >
                {copied1930 ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1.5 text-[#171719]/70" />
                    <span>Copy 1930</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Card 2: cybercrime.gov.in Portal */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#477BFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  OFFICIAL NATIONAL PORTAL
                </span>
                <span className="text-xs font-mono text-[#A6A6AC]">MINISTRY OF HOME AFFAIRS</span>
              </div>

              <div className="space-y-1">
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#171719]">
                  National Cyber Crime Reporting Portal
                </div>
                <p className="text-xs font-mono text-emerald-700 font-semibold">
                  https://cybercrime.gov.in/
                </p>
              </div>

              <p className="text-sm text-[#171719]/75 leading-relaxed">
                The centralized statutory portal for lodging complaints regarding financial cyber frauds, deepfake videos, online extortion, identity theft, and synthetic audio manipulation.
              </p>

              <div className="rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 space-y-2 text-xs text-[#171719]/80">
                <span className="font-mono font-semibold text-[#171719] block uppercase">
                  Step-by-Step Portal Filing Guide:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-[#171719]/75 leading-relaxed">
                  <li>Navigate to <strong>cybercrime.gov.in</strong> and select &ldquo;Report Other Cyber Crimes&rdquo; or &ldquo;Financial Fraud&rdquo;.</li>
                  <li>Register with your mobile number to receive OTP authentication.</li>
                  <li>Enter transaction identifiers (Bank Name, Account Number, UTR / Reference ID, Date &amp; Time).</li>
                  <li>Upload your preserved evidence (screenshots, voice clips, email headers).</li>
                  <li>Download and save the <strong>15-digit Acknowledgement Number</strong>.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#477BFF] hover:bg-[#3B6AE0] text-white font-medium text-sm px-6 h-12 rounded-full transition-all shadow-sm active:scale-95"
              >
                <span>Open cybercrime.gov.in</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <Button
                variant="secondary"
                size="default"
                onClick={handleCopyPortalLink}
                className="w-full sm:w-auto h-12 px-5 rounded-full cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1.5 text-[#171719]/70" />
                    <span>Copy URL</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Supplementary National Telecommunication Protection Portals */}
        <div className="rounded-3xl bg-white p-8 border border-[#171719]/8 shadow-editorial-card space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#477BFF]" />
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              Additional Statutory Consumer Safeguards in India
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-2">
              <div className="flex items-center justify-between font-mono font-bold text-[#171719]">
                <span>Chakshu Facility</span>
                <span className="text-[10px] text-[#A6A6AC]">DoT PORTAL</span>
              </div>
              <p className="text-[#171719]/70 leading-relaxed">
                Report suspected fraudulent calls, fake WhatsApp lottery messages, or impersonation SMS before financial damage occurs.
              </p>
              <a
                href="https://sancharsaathi.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#477BFF] hover:underline font-mono text-[11px] pt-1"
              >
                sancharsaathi.gov.in <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-2">
              <div className="flex items-center justify-between font-mono font-bold text-[#171719]">
                <span>TAFCOP</span>
                <span className="text-[10px] text-[#A6A6AC]">SIM AUDIT</span>
              </div>
              <p className="text-[#171719]/70 leading-relaxed">
                Check all mobile connections registered against your Aadhaar identity and immediately request disconnection of unauthorized numbers.
              </p>
              <a
                href="https://tafcop.sancharsaathi.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#477BFF] hover:underline font-mono text-[11px] pt-1"
              >
                tafcop.sancharsaathi.gov.in <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-2">
              <div className="flex items-center justify-between font-mono font-bold text-[#171719]">
                <span>CEIR Portal</span>
                <span className="text-[10px] text-[#A6A6AC]">DEVICE BLOCK</span>
              </div>
              <p className="text-[#171719]/70 leading-relaxed">
                Central Equipment Identity Register to track and block the IMEI of lost or stolen smartphones across all telecom networks in India.
              </p>
              <a
                href="https://ceir.sancharsaathi.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#477BFF] hover:underline font-mono text-[11px] pt-1"
              >
                ceir.sancharsaathi.gov.in <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Navigation Back to Detection & Learning */}
        <div className="rounded-3xl bg-gradient-to-r from-[#D9D9F7]/40 via-[#B9E8F2]/30 to-[#F8F7F4] p-8 border border-[#171719]/8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-xl font-semibold text-[#171719]">
              Suspect a message, voice note, or video right now?
            </h4>
            <p className="text-xs sm:text-sm text-[#171719]/65">
              Submit media to our Multimodal Detection Centre or consult the AI Safety Assistant.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link href="/checker" className="flex-1 sm:flex-none">
              <Button
                variant="primary"
                size="default"
                className="w-full sm:w-auto h-12 px-6 rounded-full bg-[#171719] text-white hover:bg-[#26262B]"
              >
                Detection Centre
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/assistant" className="flex-1 sm:flex-none">
              <Button
                variant="secondary"
                size="default"
                className="w-full sm:w-auto h-12 px-6 rounded-full"
              >
                Safety Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
