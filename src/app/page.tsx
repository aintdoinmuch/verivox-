import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ShieldAlert,
  Bot,
  BookOpen,
  Award,
  CheckCircle2,
  Play,
  Volume2,
  Sparkles,
  Lock,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PrimaryButton, SecondaryButton, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingSpecCard } from "@/components/shared/floating-spec-card";
import { StatCapsule } from "@/components/shared/stat-capsule";
import { WaveformVisualizer } from "@/components/shared/waveform-visualizer";
import { EditorialImage } from "@/components/shared/editorial-image";

export const metadata = {
  title: "VERIVOX AI | Voice-Cloning & Deepfake Defense",
  description:
    "An academic cybersecurity initiative engineered to demystify generative voice synthesis, detect social engineering exploitation, and empower proactive human defense.",
};

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden bg-[#F8F7F4]">
      {/* =========================================================================
          SECTION 1 — HERO
          Full-width editorial hero with large realistic portrait transitioning
          into synthetic digital imagery, waveforms, and floating biometric card
          ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-32 lg:pb-36 overflow-hidden">
        {/* Soft Ambient Radial Gradient Halos */}
        <div className="pointer-events-none absolute -top-24 right-0 h-[650px] w-[650px] rounded-full bg-gradient-to-bl from-[#B9A8E8]/25 via-[#D9D9F7]/30 to-[#B9E8F2]/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-48 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#D9D9F7]/20 to-[#B9E8F2]/25 blur-3xl" />

        <PageContainer>
          {/* Top Micro Metadata Tag */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#171719]/8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#171719] font-medium">
                PUBLIC DEFENSE REGISTRY · VERIVOX-BIO.01
              </span>
            </div>
            <span className="font-mono text-xs text-[#A6A6AC] tracking-widest hidden sm:inline">
              ( 2026 EDITION )
            </span>
          </div>

          {/* Asymmetrical Hero Grid: Text on Left, Transition Visual on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Expressive Headline, Supporting Text & CTAs */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <Badge variant="dotPill" dotColor="charcoal">
                  • SYNTHETIC VOICE &amp; DEEPFAKE DEFENSE
                </Badge>

                <h1 className="font-display text-5xl sm:text-7xl xl:text-[84px] font-semibold tracking-tight text-[#171719] leading-[1.02]">
                  Can You Trust{" "}
                  <span className="block text-[#171719]">
                    What You Hear?
                  </span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-[#171719]/75 font-sans leading-relaxed max-w-xl">
                AI can recreate a voice, manipulate a face and imitate someone
                you trust. Learn to recognise the signals before it&apos;s too late.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <PrimaryButton
                  asChild
                  size="lg"
                  className="gap-2 px-8 py-3.5 rounded-full font-medium text-sm shadow-md hover:shadow-lg"
                >
                  <Link href="/explore">
                    <span>Explore the Technology</span>
                    <ArrowUpRight className="h-4 w-4 opacity-80" />
                  </Link>
                </PrimaryButton>

                <SecondaryButton
                  asChild
                  size="lg"
                  className="gap-2 px-8 py-3.5 rounded-full font-medium text-sm"
                >
                  <Link href="/checker">
                    <span>Check a Suspicious Message</span>
                    <ArrowUpRight className="h-4 w-4 text-[#A6A6AC]" />
                  </Link>
                </SecondaryButton>
              </div>

              {/* Minimalist Live Acoustic Indicator */}
              <div className="pt-6 border-t border-[#171719]/8 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171719] text-[#B9A8E8]">
                  <Volume2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-xs text-[#171719]">
                      Acoustic Cadence Monitor
                    </span>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-[#D9D9F7] text-[#171719]">
                      48kHz High-Res
                    </span>
                  </div>
                  <WaveformVisualizer
                    barCount={28}
                    height={22}
                    variant="gradient"
                    className="mt-1 p-0"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Large Realistic Portrait Transitioning into Digital Mesh */}
            <div className="lg:col-span-5 relative">
              {/* Decorative Subtle Background Frame Ring */}
              <div className="absolute -inset-4 rounded-[40px] border border-[#171719]/8 -rotate-1 pointer-events-none" />

              {/* Human Portrait with Biometric Digital Transition */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#EFEFEA] aspect-[4/5] max-w-md mx-auto">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Human portrait transitioning into synthetic biometric analysis"
                  width={900}
                  height={1100}
                  priority
                  containerClassName="h-full w-full rounded-3xl"
                  withPointMatrix
                  matrixVariant="lavender"
                />

                {/* Transition Divider Graphic (Real vs Synthetic Scanline) */}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#477BFF] to-transparent opacity-75" />

                {/* Biometric Point-Cloud Coordinates Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 border border-white/60 shadow-sm flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[10px] text-[#171719] font-medium">
                      ORGANIC SPEECH · 98.6%
                    </span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <div className="rounded-full bg-[#171719]/80 backdrop-blur-md px-3 py-1 border border-white/20 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#B9A8E8]" />
                    <span className="font-mono text-[10px] text-white font-medium">
                      NEURAL DIFFUSION
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 inset-x-4 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white/70 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-semibold text-[#171719]">
                      Biological Timbre vs. Synthesizer
                    </span>
                    <span className="font-mono text-[10px] text-[#477BFF]">
                      0.2s LATENCY
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#A6A6AC]">
                    <span>Glottal pulse consistency</span>
                    <span className="font-mono text-[#171719]">VERIFIED MATCH</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Floating Specimen Card (Signature Reference Component) */}
              <div className="hidden sm:block absolute sm:-bottom-8 sm:-left-4 lg:-bottom-10 lg:-left-6 xl:-left-10 z-20 w-80">
                <FloatingSpecCard
                  idCode="VG-0918"
                  category="Live Audio Specimen"
                  title="Synthetic Cadence Match"
                  subtitle="Recorded Audio · 48kHz Spectrogram"
                  metadata={[
                    { label: "Vector type", value: "Generative Neural TTS" },
                    { label: "Confidence", value: "94.2% Synthetic" },
                    { label: "Acoustic gap", value: "Found at 0:04s" },
                  ]}
                  verifiedBadge="Anomalies Found"
                  actionText="Inspect Analysis"
                  footerNote="Biometric voice specimen authenticated."
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 2 — THE PROBLEM
          "Seeing is no longer believing."
          Editorial image-and-text composition detailing the modern threat landscape
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-white border-y border-[#171719]/8">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Column: Large Editorial Heading and Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                sectionIndex="( 02 )"
                categoryTag="THE MODERN CRISIS"
                title="Seeing is no longer believing."
                subtitle="And hearing is no longer proof of life."
                description="The computational barrier to cloning human identity has collapsed. Generative AI diffusion vocoders can now extract vocal timbre, pitch cadences, and inflection nuances from a three-second social media recording."
                size="default"
              />

              <div className="space-y-4 pt-4 text-sm text-[#171719]/80 leading-relaxed font-sans">
                <p>
                  Today, malicious actors no longer need technical expertise or
                  studio-grade audio equipment. With open-source zero-shot voice
                  models, extortionists synthesize believable family emergencies,
                  urgent executive wire requests, and manipulated phone calls in
                  real time.
                </p>
                <p>
                  Because human beings are evolutionary hardwired to trust the
                  intimate acoustics of familiar voices, emotional adrenaline
                  overrides analytical skepticism. Defense requires a proactive
                  scientific methodology.
                </p>
              </div>

              <div className="pt-4">
                <PrimaryButton asChild className="rounded-full px-6">
                  <Link href="/explore">
                    <span>Understand the Threat Vectors</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                  </Link>
                </PrimaryButton>
              </div>
            </div>

            {/* Right Column: Asymmetrical Editorial Visual + Stat Capsule */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#171719]/8 shadow-editorial-card">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
                  alt="Man listening to phone call with audio spectrogram analysis"
                  width={900}
                  height={650}
                  containerClassName="h-72 sm:h-96 w-full"
                  withPointMatrix
                  matrixVariant="dual"
                />

                {/* Overlaid Editorial Note */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#171719]">
                    <span>Social Engineering Exploitation</span>
                    <span className="font-mono text-[#A6A6AC] text-[10px]">THREAT #02</span>
                  </div>
                  <p className="text-xs text-[#A6A6AC] mt-1">
                    Speech synthesis weaponizes urgency to circumvent two-factor security and analog trust.
                  </p>
                </div>
              </div>

              {/* Large Stat Capsule (Inspired by 12B Capsule in Reference Screenshot) */}
              <StatCapsule
                statNumber="98.2%"
                statLabel="BELIEVABILITY BENCHMARK"
                headline="Human listeners deceived by voice clones."
                description="In blinded psychological evaluations, untrained participants failed to distinguish zero-shot synthetic audio from organic family speech."
                tagline="VERIVOX · RESEARCH THESIS"
              />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 3 — UNDERSTANDING THE TECHNOLOGY
          Deepfake videos, voice cloning, and digital impersonation
          Visually differentiated layouts rather than repetitive cards
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-[#F8F7F4]">
        <PageContainer>
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              sectionIndex="( 03 )"
              categoryTag="ANATOMY OF SYNTHESIS"
              title="How synthetic deception is engineered."
              subtitle="Three primary technological vectors."
              description="A systematic breakdown of generative media mechanics—from generative neural vocoders to multi-modal impersonation architecture."
              size="default"
            />
          </div>

          <div className="space-y-12">
            {/* Technology 1: Deepfake Videos (Wide Asymmetric Split) */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#A6A6AC] font-semibold">
                    VECTOR 01
                  </span>
                  <Badge variant="periwinkle">Visual Synthesis</Badge>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#171719]">
                  Deepfake Videos &amp; Facial Reenactment
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Generative Adversarial Networks (GANs) and spatial diffusion
                  models map 468 facial landmark coordinates onto source video
                  streams. By synchronizing mouth phonemes with synthetic audio,
                  adversaries construct realistic video feeds for emergency calls
                  and identity bypass.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-[#A6A6AC]">
                  <span className="rounded-full bg-[#F8F7F4] px-3 py-1 border border-[#171719]/6 text-[#171719]">
                    • 3D Facial Landmark Mesh
                  </span>
                  <span className="rounded-full bg-[#F8F7F4] px-3 py-1 border border-[#171719]/6 text-[#171719]">
                    • Latent Diffusion Warping
                  </span>
                  <span className="rounded-full bg-[#F8F7F4] px-3 py-1 border border-[#171719]/6 text-[#171719]">
                    • Micro-Expression Glitches
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-[#F8F7F4] p-6 border border-[#171719]/6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#A6A6AC]">
                  <span>NEURAL LANDMARK MATRIX</span>
                  <span className="text-[#477BFF]">468 POINTS</span>
                </div>
                {/* Visual Landmark Simulation Graphic */}
                <div className="h-40 rounded-xl bg-gradient-to-tr from-[#171719] to-[#26262B] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-point-matrix-lavender opacity-30" />
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#B9A8E8] relative z-10">
                    <span>X: 142.92 Y: 89.14</span>
                    <span>CONFIDENCE: 98.4%</span>
                  </div>
                  <div className="flex items-center justify-center my-auto relative z-10">
                    <div className="h-16 w-16 rounded-full border border-dashed border-[#B9A8E8] flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-[#477BFF]/50 animate-ping" />
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-[#A6A6AC] text-center relative z-10">
                    Synthetic Eye-Blink &amp; Boundary Anomaly Detected
                  </div>
                </div>
              </div>
            </div>

            {/* Technology 2: Voice Cloning (Spectrogram Dissection) */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 rounded-2xl bg-[#F8F7F4] p-6 border border-[#171719]/6 space-y-4 order-2 lg:order-1">
                <div className="flex items-center justify-between text-xs font-mono text-[#A6A6AC]">
                  <span>FREQUENCY SPECTRUM HARMONICS</span>
                  <span className="text-emerald-600 font-semibold">• ACTIVE</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#171719]/6 shadow-sm">
                  <WaveformVisualizer barCount={38} height={52} variant="gradient" />
                  <div className="flex justify-between text-[10px] font-mono text-[#A6A6AC] mt-2">
                    <span>20 Hz (Glottal)</span>
                    <span>2.4 kHz (Formants)</span>
                    <span>20 kHz</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#A6A6AC] leading-relaxed">
                  Synthesizers often display unnaturally uniform harmonic
                  decay between 4kHz–8kHz frequencies.
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#A6A6AC] font-semibold">
                    VECTOR 02
                  </span>
                  <Badge variant="lavender">Acoustic Cloning</Badge>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#171719]">
                  Zero-Shot Neural Voice Cloning
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Modern neural audio synthesis uses conditional diffusion
                  and flow-matching models to extrapolate vocal tone, dialect,
                  and respiratory pauses from micro-recordings. The system
                  generates expressive new speech never spoken by the real human.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-[#A6A6AC]">
                  <span className="rounded-full bg-[#F8F7F4] px-3 py-1 border border-[#171719]/6 text-[#171719]">
                    • Zero-Shot Audio Timbre Matching
                  </span>
                  <span className="rounded-full bg-[#F8F7F4] px-3 py-1 border border-[#171719]/6 text-[#171719]">
                    • Neural Vocoder (HiFi-GAN)
                  </span>
                  <span className="rounded-full bg-[#F8F7F4] px-3 py-1 border border-[#171719]/6 text-[#171719]">
                    • Prosody &amp; Cadence Glitches
                  </span>
                </div>
              </div>
            </div>

            {/* Technology 3: Digital Impersonation (Multi-Vector Attack Chain) */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs text-[#A6A6AC] font-semibold">
                  VECTOR 03
                </span>
                <Badge variant="cyan">Social Engineering</Badge>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#171719] mb-4">
                Multi-Modal Digital Impersonation
              </h3>
              <p className="text-sm text-[#171719]/75 leading-relaxed max-w-2xl mb-8">
                Cloned audio is rarely used in isolation. Adversaries combine
                spoofed caller IDs, synthetic audio messages, and personal
                dossiers scraped from social media to mount targeted pretexting.
              </p>

              {/* Sequential Process Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#171719]/8">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#477BFF] font-semibold">
                    PHASE 01 · HARVESTING
                  </span>
                  <h4 className="font-display font-semibold text-base text-[#171719]">
                    Vocal Extraction
                  </h4>
                  <p className="text-xs text-[#A6A6AC] leading-relaxed">
                    Social video clips, conference talks, or voicemail greetings
                    provide the 3-to-10 second acoustic seed.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#B9A8E8] font-semibold">
                    PHASE 02 · ORCHESTRATION
                  </span>
                  <h4 className="font-display font-semibold text-base text-[#171719]">
                    Caller ID Spoofing
                  </h4>
                  <p className="text-xs text-[#A6A6AC] leading-relaxed">
                    VoIP software masks the outbound phone number so caller ID
                    displays the genuine contact name on the victim&apos;s phone.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-rose-500 font-semibold">
                    PHASE 03 · EXECUTION
                  </span>
                  <h4 className="font-display font-semibold text-base text-[#171719]">
                    High-Stress Extortion
                  </h4>
                  <p className="text-xs text-[#A6A6AC] leading-relaxed">
                    Adrenaline-fueled scripts (arrests, car accidents, hostage
                    claims) pressure victims to wire untraceable funds immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 4 — THE HUMAN IMPACT
          Heading: "When a familiar voice becomes a weapon of deception."
          Three realistic scenarios: Family Emergency, Workplace Fraud, Identity Usurpation
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-white border-y border-[#171719]/8">
        <PageContainer>
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              sectionIndex="( 04 )"
              categoryTag="REAL-WORLD EXPLOITATION"
              title="When a familiar voice becomes a weapon of deception."
              subtitle="Three primary human vulnerability scenarios."
              description="Scammers do not attack cryptographic systems—they attack the biological instinct of love, responsibility, and professional duty."
              size="default"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Scenario 1: Fake Family Emergency Calls */}
            <div className="group rounded-3xl bg-[#F8F7F4] p-8 border border-[#171719]/8 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#A6A6AC]">SCENARIO 01</span>
                  <Badge variant="dotPill" dotColor="rose">EMOTIONAL BAIT</Badge>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#171719] leading-snug">
                  Fake Family Emergency &amp; Kidnap Scams
                </h3>
                <p className="text-xs text-[#171719]/75 leading-relaxed">
                  Parents or grandparents receive a frantic call. In the
                  background, a cloned voice of their son or daughter screams
                  for help following a purported automobile crash or criminal
                  detention, demanding immediate bail.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#171719]/6 text-xs space-y-2">
                <div className="flex justify-between text-[#A6A6AC]">
                  <span>Vulnerability Vector</span>
                  <span className="font-mono text-[#171719]">Parental Panic</span>
                </div>
                <div className="flex justify-between text-[#A6A6AC]">
                  <span>Typical Demand</span>
                  <span className="font-mono text-rose-600 font-semibold">$3,000–$10,000</span>
                </div>
              </div>
            </div>

            {/* Scenario 2: Fraudulent Workplace Instructions */}
            <div className="group rounded-3xl bg-[#F8F7F4] p-8 border border-[#171719]/8 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#A6A6AC]">SCENARIO 02</span>
                  <Badge variant="dotPill" dotColor="charcoal">CORPORATE PRETEXT</Badge>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#171719] leading-snug">
                  Impersonated Executive Wire Fraud
                </h3>
                <p className="text-xs text-[#171719]/75 leading-relaxed">
                  A finance director receives an urgent audio call from the
                  company CEO instructing an off-schedule wire transfer for a
                  confidential acquisition. The synthetic voice mimics executive
                  intonation with flawless authenticity.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#171719]/6 text-xs space-y-2">
                <div className="flex justify-between text-[#A6A6AC]">
                  <span>Vulnerability Vector</span>
                  <span className="font-mono text-[#171719]">Authority Pressure</span>
                </div>
                <div className="flex justify-between text-[#A6A6AC]">
                  <span>Institutional Risk</span>
                  <span className="font-mono text-[#477BFF] font-semibold">High Capital Loss</span>
                </div>
              </div>
            </div>

            {/* Scenario 3: Manipulated Digital Identities */}
            <div className="group rounded-3xl bg-[#F8F7F4] p-8 border border-[#171719]/8 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#A6A6AC]">SCENARIO 03</span>
                  <Badge variant="dotPill" dotColor="lavender">REPUTATIONAL THEFT</Badge>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#171719] leading-snug">
                  Targeted Social Media Extortion
                </h3>
                <p className="text-xs text-[#171719]/75 leading-relaxed">
                  Audio tracks from podcasts, webinars, or Instagram reels are
                  harvested to synthesize fabricated compromising statements or
                  illicit confessions, weaponized to blackmail the creator or
                  manipulate community trust.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#171719]/6 text-xs space-y-2">
                <div className="flex justify-between text-[#A6A6AC]">
                  <span>Vulnerability Vector</span>
                  <span className="font-mono text-[#171719]">Reputational Fear</span>
                </div>
                <div className="flex justify-between text-[#A6A6AC]">
                  <span>Audio Sample Needed</span>
                  <span className="font-mono text-[#B9A8E8] font-semibold">&lt; 10 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 5 — INTRODUCING VERIVOX AI
          Showcase: AI Scam Checker, AI Safety Assistant, Learning Centre, Quiz
          Elegant feature presentation with clear navigation
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-[#F8F7F4]">
        <PageContainer>
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              sectionIndex="( 05 )"
              categoryTag="VERIVOX DEFENSE ENGINE"
              title="Engineered to protect human trust."
              subtitle="Four comprehensive defense pillars."
              description="A multi-layered cybersecurity toolkit built to detect, triage, educate, and empower individuals against generative voice manipulation."
              size="default"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tool 1: Multimodal Detection Centre */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between transition-all hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B9A8E8]/30 text-[#171719]">
                    <ShieldAlert className="h-6 w-6 text-[#171719]" />
                  </div>
                  <Badge variant="periwinkle">MULTIMODAL SUITE</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719] mb-2">
                  Detection Centre
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Three forensic verification vectors in one suite: Gemini-assisted
                  text scam reasoning, pretrained Wav2Vec2 acoustic voice clone
                  classification, and Vision Transformer facial deepfake artifact detection.
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-[#171719]/6 flex items-center justify-between">
                <span className="font-mono text-xs text-[#A6A6AC]">
                  TEXT · AUDIO · VIDEO
                </span>
                <PrimaryButton asChild size="sm" className="rounded-full">
                  <Link href="/checker">
                    <span>Launch Detection Centre</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                  </Link>
                </PrimaryButton>
              </div>
            </div>

            {/* Tool 2: AI Safety Assistant */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between transition-all hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9D9F7] text-[#171719]">
                    <Bot className="h-6 w-6 text-[#477BFF]" />
                  </div>
                  <Badge variant="cyan">24/7 COPILOT</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719] mb-2">
                  AI Safety Assistant
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Real-time conversational copilot to evaluate live phone calls.
                  Ask immediate questions, verify caller pretexts, and receive
                  instant step-by-step guidance during an ongoing threat.
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-[#171719]/6 flex items-center justify-between">
                <span className="font-mono text-xs text-[#A6A6AC]">
                  CONVERSATIONAL DEFENSE
                </span>
                <PrimaryButton asChild size="sm" className="rounded-full">
                  <Link href="/assistant">
                    <span>Consult Assistant</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                  </Link>
                </PrimaryButton>
              </div>
            </div>

            {/* Tool 3: Deepfake Learning Centre */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between transition-all hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B9E8F2]/60 text-[#171719]">
                    <BookOpen className="h-6 w-6 text-[#171719]" />
                  </div>
                  <Badge variant="dotPill" dotColor="charcoal">CURRICULUM</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719] mb-2">
                  Deepfake Learning Centre
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  An academic exploration of generative acoustic algorithms,
                  vocoders, speech synthesis mechanics, and acoustic forensic
                  techniques for technical and non-technical readers alike.
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-[#171719]/6 flex items-center justify-between">
                <span className="font-mono text-xs text-[#A6A6AC]">
                  ACADEMIC RESEARCH
                </span>
                <PrimaryButton asChild size="sm" className="rounded-full">
                  <Link href="/explore">
                    <span>Explore Modules</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                  </Link>
                </PrimaryButton>
              </div>
            </div>

            {/* Tool 4: Awareness Assessment */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between transition-all hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFEFEA] text-[#171719]">
                    <Award className="h-6 w-6 text-[#477BFF]" />
                  </div>
                  <Badge variant="liveStatus" dotColor="emerald">24 QUESTIONS</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719] mb-2">
                  Awareness Assessment
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Test your cybersecurity discernment across 24 realistic scenarios
                  spanning general digital safety, voice cloning, adult-focused
                  extortion, teen risks, and future multimodal AI deception.
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-[#171719]/6 flex items-center justify-between">
                <span className="font-mono text-xs text-[#A6A6AC]">
                  5 SCENARIO CATEGORIES
                </span>
                <PrimaryButton asChild size="sm" className="rounded-full">
                  <Link href="/quiz">
                    <span>Take the Assessment</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                  </Link>
                </PrimaryButton>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 6 — INTERACTIVE AWARENESS
          Heading: "Would you recognise a scam?"
          Fictional suspicious message showcase with breakdown & button to Scam Checker
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-white border-y border-[#171719]/8">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading and Context */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                sectionIndex="( 06 )"
                categoryTag="TACTICAL RECOGNITION"
                title="Would you recognise a scam?"
                subtitle="Examine real-world deceptive anatomy."
                description="Study how extortion scripts weaponize artificial urgency, isolation instructions, and synthetic distress to induce financial compliance."
                size="default"
              />

              <div className="space-y-3 pt-2 text-xs text-[#171719]/80 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#477BFF] shrink-0 mt-0.5" />
                  <span>
                    <strong>Isolation tactic:</strong> Ordering the victim not to
                    consult spouses or law enforcement prevents out-of-band reality checks.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#477BFF] shrink-0 mt-0.5" />
                  <span>
                    <strong>Artificial timeline:</strong> Imposing a 15-minute
                    deadline prevents rational cognitive deliberation.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#477BFF] shrink-0 mt-0.5" />
                  <span>
                    <strong>Voice cadence glitch:</strong> Unnatural pauses and
                    flat robotic breathing patterns betray neural synthesizers.
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <PrimaryButton asChild size="lg" className="rounded-full px-8">
                  <Link href="/checker">
                    <span>Test Your Own Audio in Scam Checker</span>
                    <ArrowUpRight className="h-4 w-4 opacity-80" />
                  </Link>
                </PrimaryButton>
              </div>
            </div>

            {/* Right Column: Fictional Audio Transcript Breakdown Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#F8F7F4] p-6 sm:p-8 border border-[#171719]/8 shadow-editorial-card space-y-6">
                {/* Simulated Audio Voicemail Player Bar */}
                <div className="rounded-2xl bg-white p-4 border border-[#171719]/8 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171719] text-white">
                        <Play className="h-3.5 w-3.5 ml-0.5" />
                      </span>
                      <div>
                        <span className="font-semibold text-[#171719] block">
                          Suspicious Voicemail · Rec: 14:02 Today
                        </span>
                        <span className="text-[10px] text-[#A6A6AC] font-mono">
                          Duration: 0:24 · Bitrate: 48kHz
                        </span>
                      </div>
                    </div>
                    <Badge variant="dotPill" dotColor="rose">HIGH RISK</Badge>
                  </div>

                  {/* Waveform Player */}
                  <div className="py-2 px-3 rounded-xl bg-[#F8F7F4] border border-[#171719]/6">
                    <WaveformVisualizer barCount={40} height={36} variant="gradient" />
                  </div>
                </div>

                {/* Transcript with Detected Threat Markers */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#A6A6AC] block">
                    VOICEMAIL TRANSCRIPT WITH DETECTED THREAT TAGS
                  </span>

                  <div className="rounded-2xl bg-white p-5 border border-[#171719]/8 text-xs sm:text-sm font-sans leading-relaxed text-[#171719] space-y-3">
                    <p>
                      &quot;Mom, please pick up... it&apos;s David.{" "}
                      <span className="bg-rose-100 text-rose-900 px-1.5 py-0.5 rounded font-medium border border-rose-300">
                        [SYNTHETIC VOCAL GLITCH AT 0:03s]
                      </span>{" "}
                      I was in a bad car accident on Highway 9. A police officer has
                      my phone.{" "}
                      <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-medium border border-amber-300">
                        [ISOLATION: &quot;DON&apos;T CALL DAD&quot;]
                      </span>{" "}
                      Don&apos;t call Dad, he&apos;ll panic and make things worse. The
                      officer says we need{" "}
                      <span className="bg-rose-100 text-rose-900 px-1.5 py-0.5 rounded font-medium border border-rose-300">
                        [$4,500 IMMEDIATE CASH BOND]
                      </span>{" "}
                      right now or I&apos;m being transferred to county jail... please wire
                      it to the clerk link I&apos;m texting...&quot;
                    </p>
                  </div>
                </div>

                {/* Threat Diagnostics Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center">
                  <div className="p-3 rounded-xl bg-white border border-[#171719]/8">
                    <span className="font-mono text-base font-bold text-rose-600 block">
                      98%
                    </span>
                    <span className="text-[10px] text-[#A6A6AC] uppercase font-mono">
                      Artificial Urgency
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#171719]/8">
                    <span className="font-mono text-base font-bold text-rose-600 block">
                      94%
                    </span>
                    <span className="text-[10px] text-[#A6A6AC] uppercase font-mono">
                      Isolation Tactic
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#171719]/8">
                    <span className="font-mono text-base font-bold text-amber-600 block">
                      89%
                    </span>
                    <span className="text-[10px] text-[#A6A6AC] uppercase font-mono">
                      Voice Clone Prob.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#171719]/8">
                    <span className="font-mono text-base font-bold text-[#171719] block">
                      EXTORTION
                    </span>
                    <span className="text-[10px] text-[#A6A6AC] uppercase font-mono">
                      Classification
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 7 — PREVENTION
          Heading: "Pause. Verify. Protect."
          Explain three practical prevention principles using a clean editorial layout
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-[#F8F7F4]">
        <PageContainer>
          <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto">
            <SectionHeading
              sectionIndex="( 07 )"
              categoryTag="ANALOG DEFENSE PROTOCOLS"
              title="Pause. Verify. Protect."
              subtitle="Three non-negotiable rules of engagement."
              description="Technology can manipulate digital signals, but simple analog verification protocols neutralize synthetic social engineering instantly."
              align="center"
              size="default"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Principle 1: Pause */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-4xl text-[#171719]">
                    01
                  </span>
                  <Badge variant="dotPill" dotColor="charcoal">EMOTIONAL RESET</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Pause the Urgency
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Extortionists fabricate extreme emotional stakes (arrest,
                  hostage, critical accident) to overwhelm rational cognitive
                  filters. Take ten seconds of conscious breathing. Recognize
                  that manufactured urgency is the primary indicator of an attack.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                RULE: Never transfer funds while adrenaline is active.
              </div>
            </div>

            {/* Principle 2: Verify */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-4xl text-[#477BFF]">
                    02
                  </span>
                  <Badge variant="periwinkle">ANALOG PROVENANCE</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Verify Out-of-Band
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Hang up immediately. Do not call back the incoming number. Dial
                  the loved one or executive directly on their verified pre-saved
                  phone number or message them on an alternative channel. Ask
                  for your private agreed family code word.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                RULE: A genuine family member will always verify the safe word.
              </div>
            </div>

            {/* Principle 3: Protect */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-4xl text-[#B9A8E8]">
                    03
                  </span>
                  <Badge variant="cyan">INCIDENT ACTION</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Protect &amp; Report
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Notify family circles immediately so attackers cannot reuse
                  the same script against relatives. Report spoofed calls and
                  demands directly to national cybercrime authorities (1930 in
                  India, FTC / IC3 in the United States, Action Fraud in the UK).
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                RULE: Swift reporting helps authorities blacklist spoofed trunks.
              </div>
            </div>
          </div>

          {/* Quick Safe Word Guide Callout */}
          <div className="mt-12 rounded-2xl bg-white p-6 border border-[#171719]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-[#477BFF]" />
              <span className="text-xs sm:text-sm text-[#171719] font-medium">
                Need an incident response checklist or family safe-word protocol?
              </span>
            </div>
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/safety">
                <span>View Emergency Safety Guide</span>
                <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 8 — FINAL CTA
          Heading: "Trust should be verified, not assumed."
          Deep charcoal contrast section with button linking to the learning centre
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-[#171719] text-[#F8F7F4] overflow-hidden select-none">
        {/* Ambient Radial Glowing Halo */}
        <div className="pointer-events-none absolute -bottom-36 -right-36 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-[#477BFF]/30 via-[#B9A8E8]/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -top-36 -left-36 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#B9A8E8]/20 to-transparent blur-3xl" />

        <PageContainer>
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-[#B9A8E8]">
              <Sparkles className="h-3.5 w-3.5 text-[#B9A8E8]" />
              <span>COMMENCE DEFENSIVE EDUCATION · 2026 ARCHIVE</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
              Trust should be verified,{" "}
              <span className="text-white">not assumed.</span>
            </h2>

            <p className="text-base sm:text-xl text-[#A6A6AC] max-w-2xl mx-auto font-sans leading-relaxed">
              As speech synthesis technology becomes indistinguishable from
              organic human biology, understanding how algorithms work is your
              most resilient firewall.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                asChild
                variant="lavender"
                size="lg"
                className="w-full sm:w-auto px-8 rounded-full font-semibold shadow-lg hover:shadow-xl"
              >
                <Link href="/explore">
                  <span>Explore the Learning Centre</span>
                  <ArrowUpRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 rounded-full border-white/20 text-white hover:bg-white/10"
              >
                <Link href="/checker">
                  <span>Check a Suspicious Message</span>
                  <ArrowUpRight className="h-4 w-4 ml-1.5 opacity-70" />
                </Link>
              </Button>
            </div>

            <div className="pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#A6A6AC]">
              <span>VERIVOX AI CYBERSECURITY RESEARCH</span>
              <span>•</span>
              <span>ZERO TRACKING · PRIVACY FIRST</span>
              <span>•</span>
              <span>OPEN ACADEMIC DEFENSE</span>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
