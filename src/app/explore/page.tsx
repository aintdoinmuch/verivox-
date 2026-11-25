import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Volume2,
  Cpu,
  AlertTriangle,
  Info,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WaveformVisualizer } from "@/components/shared/waveform-visualizer";
import { EditorialImage } from "@/components/shared/editorial-image";

export const metadata = {
  title: "Learn About Deepfakes & Synthetic Voice | VERIVOX AI",
  description:
    "An academic curriculum on generative voice synthesis, deepfake videos, social engineering exploitation, and practical analog defense protocols.",
};

export default function LearnPage() {
  const workflowSteps = [
    {
      step: "01",
      phase: "HARVESTING",
      title: "Source Media Acquisition",
      description:
        "Adversaries collect public voice notes, podcast clips, conference recordings, or social media reels. Modern zero-shot models require as little as three seconds of clean speech.",
      technicalNote: "Minimum seed: 3.2s clean acoustic sample (16kHz–48kHz)",
      accentColor: "border-[#477BFF] text-[#477BFF]",
    },
    {
      step: "02",
      phase: "ENCODING",
      title: "Neural Vector Extraction",
      description:
        "Deep learning encoders break down the audio into latent acoustic embeddings, isolating vocal tract resonance, glottal pulse timing, fundamental pitch (F0), and dialect inflections.",
      technicalNote: "Generates high-dimensional speaker embedding vector",
      accentColor: "border-[#B9A8E8] text-[#B9A8E8]",
    },
    {
      step: "03",
      phase: "SYNTHESIS",
      title: "Diffusion & Vocoder Generation",
      description:
        "The model feeds arbitrary extortion text through an acoustic diffusion synthesizer and neural vocoder (such as HiFi-GAN), generating realistic speech never uttered by the human.",
      technicalNote: "Synthesizes phoneme-accurate Mel-spectrogram in ~200ms",
      accentColor: "border-emerald-500 text-emerald-600",
    },
    {
      step: "04",
      phase: "DELIVERY",
      title: "Spoofed Transmission",
      description:
        "Adversaries route the synthesized audio through VoIP software with forged caller ID metadata, ensuring the victim's phone displays the authentic contact name of their relative or executive.",
      technicalNote: "SIP trunk header manipulation bypasses caller ID filters",
      accentColor: "border-rose-500 text-rose-600",
    },
  ];

  const targetGroups = [
    {
      role: "Senior Citizens & Grandparents",
      vulnerability: "Parental & Grandparental Instinct",
      primaryAttack: "Family Emergency & Bail Extortion",
      description:
        "Attackers simulate the voice of a panicked grandchild claiming an arrest, auto accident, or medical emergency in a foreign city, pleading for immediate cash wire transfers.",
      defenseAdvice:
        "Establish an in-person family code word and always verify via a pre-saved direct phone number.",
    },
    {
      role: "Working Professionals & Finance Staff",
      vulnerability: "Professional Hierarchy & Authority Pressure",
      primaryAttack: "Executive Impersonation (CEO Fraud)",
      description:
        "Finance controllers or executive assistants receive urgent voicemail memos or live audio calls from the company CEO instructing an off-schedule confidential acquisition payment.",
      defenseAdvice:
        "Mandate dual-party authorization for financial transactions, regardless of caller executive rank.",
    },
    {
      role: "Students & Young Adults",
      vulnerability: "Job Hunt Pressure & Social Digital Exposure",
      primaryAttack: "Fake Job Interviews & Synthetic Peer Blackmail",
      description:
        "Graduates are lured into remote video interviews where high-resolution facial video and voice are harvested to manufacture compromised media or defraud their contacts.",
      defenseAdvice:
        "Never participate in unscheduled video calls with unverified recruiters requesting biometric audio tests.",
    },
    {
      role: "Small Businesses & Enterprise Teams",
      vulnerability: "Vendor Trust & Invoicing Relationships",
      primaryAttack: "Vendor Impersonation & Supply Chain Fraud",
      description:
        "Suppliers and contracting partners are impersonated via synthetic phone confirmations instructing changes in bank account wiring details right before invoice settlement.",
      defenseAdvice:
        "Use out-of-band oral and analog verification before altering vendor banking coordinates.",
    },
    {
      role: "Public Figures & Creators",
      vulnerability: "Extensive Public Audio Archives",
      primaryAttack: "Reputational Sabotage & Disinformation",
      description:
        "Journalists, executives, and influencers with hours of public speech are cloned to produce fabricated policy statements, stock-market rumors, or false confessions.",
      defenseAdvice:
        "Cryptographically sign authentic announcements and educate audiences on official communication channels.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#F8F7F4]">
      {/* =========================================================================
          SECTION 1 — INTRODUCTION & EDITORIAL OVERVIEW
          Explain deepfakes, synthetic media, and the technological paradigm shift
          ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-32 overflow-hidden border-b border-[#171719]/8">
        {/* Soft Ambient Radial Gradient Halos */}
        <div className="pointer-events-none absolute -top-24 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-[#B9A8E8]/25 via-[#D9D9F7]/30 to-[#B9E8F2]/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-48 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#D9D9F7]/20 to-[#B9E8F2]/25 blur-3xl" />

        <PageContainer>
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "LEARNING CENTRE", href: "/explore" },
                { label: "SYNTHETIC MEDIA & DEEPFAKES" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading & Comprehensive Introduction Essay */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                sectionIndex="( 01 )"
                categoryTag="FOUNDATIONAL KNOWLEDGE"
                title="Demystifying synthetic media."
                subtitle="The science, mechanics, and human vulnerabilities."
                description="Synthetic media represents the algorithmic generation, alteration, or cloning of human audio, video, and text using deep artificial neural networks."
                size="hero"
              />

              <div className="space-y-4 pt-2 text-sm sm:text-base text-[#171719]/80 font-sans leading-relaxed">
                <p>
                  For over a century, human society operated under an implicit
                  sensory contract: what we saw on video and what we heard over a
                  telephone was grounded in physical reality. A telephone call
                  from a daughter carried immutable biometric proof of her
                  identity through the unique resonance of her vocal cords.
                </p>
                <p>
                  Today, generative diffusion models, neural vocoders, and
                  zero-shot speech synthesis have severed that link. Software
                  can now extrapolate a human voice from seconds of casual speech,
                  generating real-time interactive conversations that mimic timbre,
                  regional accents, cadence, and emotional distress.
                </p>
                <p>
                  Defending against synthetic deception requires understanding how
                  algorithms operate—not out of fear, but to build resilient,
                  proactive verification habits.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Badge variant="periwinkle">Zero-Shot Synthesis</Badge>
                <Badge variant="cyan">Acoustic Embeddings</Badge>
                <Badge variant="lavender">Latent Diffusion</Badge>
                <Badge variant="dotPill" dotColor="charcoal">Neural Vocoders</Badge>
              </div>
            </div>

            {/* Right Column: High-Fashion Editorial Imagery with Point-Cloud Matrix */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-[#171719]/8 aspect-[4/5] max-w-md mx-auto">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                  alt="Acoustic vocal recording and biometric frequency extraction"
                  width={900}
                  height={1100}
                  priority
                  containerClassName="h-full w-full rounded-3xl"
                  withPointMatrix
                  matrixVariant="dual"
                />

                {/* Overlaid Data Annotation Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 border border-white/60 shadow-sm flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[10px] text-[#171719] font-medium">
                      ACOUSTIC TIMBRE EXTRACTION
                    </span>
                  </div>
                </div>

                {/* Bottom Specimen Overlay Panel */}
                <div className="absolute bottom-4 inset-x-4 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/70 shadow-lg space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#171719]">
                    <span>Generative Media Inflection Point</span>
                    <span className="font-mono text-[10px] text-[#477BFF]">
                      EST. 2026
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A6A6AC] leading-relaxed">
                    Voice synthesis now operates in under 200ms latency, enabling
                    live, two-way conversational impersonation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 2 — VOICE CLONING IN SIMPLE LANGUAGE
          Explain voice cloning simply and describe potential misuse
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-white border-b border-[#171719]/8">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Visual Spectrogram & Waveform Anatomy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-[#F8F7F4] p-8 border border-[#171719]/8 shadow-editorial-card space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-[#477BFF]" />
                    <span className="font-display font-semibold text-sm text-[#171719]">
                      Acoustic Waveform Anatomy
                    </span>
                  </div>
                  <Badge variant="liveStatus" dotColor="emerald">48kHz High-Res</Badge>
                </div>

                {/* Waveform Visualizer */}
                <div className="p-4 rounded-2xl bg-white border border-[#171719]/6 shadow-sm">
                  <WaveformVisualizer barCount={36} height={60} variant="gradient" />
                  <div className="flex justify-between text-[10px] font-mono text-[#A6A6AC] mt-3">
                    <span>Glottal Source (0-500Hz)</span>
                    <span>Vowel Formants (1-3kHz)</span>
                    <span>Breath (8kHz+)</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono text-[#477BFF] font-semibold">01</span>
                    <div>
                      <strong className="text-[#171719] block">Timbre Embedding:</strong>
                      <span className="text-[#A6A6AC]">Captures unique throat and sinus cavity resonance.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono text-[#B9A8E8] font-semibold">02</span>
                    <div>
                      <strong className="text-[#171719] block">Prosody &amp; Cadence:</strong>
                      <span className="text-[#A6A6AC]">Simulates natural sentence rhythm, pauses, and pitch variations.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono text-emerald-600 font-semibold">03</span>
                    <div>
                      <strong className="text-[#171719] block">Neural Vocoding:</strong>
                      <span className="text-[#A6A6AC]">Reconstructs raw digital soundwaves from intermediate spectrograms.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Educational Narrative on Voice Cloning */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                sectionIndex="( 02 )"
                categoryTag="VOICE CLONING DYNAMICS"
                title="What is voice cloning?"
                subtitle="Understanding how digital acoustics imitate biological reality."
                description="Think of voice cloning as a digital chameleon for human speech. Instead of recording specific phrases, neural networks learn the mathematical fingerprint of how your vocal tract vibrates."
                size="default"
              />

              <div className="space-y-4 text-sm sm:text-base text-[#171719]/80 font-sans leading-relaxed">
                <p>
                  In traditional recording, speech is stored as a fixed audio file.
                  In voice cloning, an AI system analyzes a reference audio sample
                  and extracts two separate streams: <em>what</em> is being said
                  (linguistic phonemes) and <em>how</em> it sounds (speaker timbre
                  embeddings).
                </p>
                <p>
                  Once the model understands how a specific person shapes vowels,
                  breathes between sentences, and inflects emotional questions, it
                  can generate entirely new sentences in that identical voice. The
                  speaker never has to record the words themselves.
                </p>
                <div className="rounded-2xl bg-[#F8F7F4] p-5 border border-[#171719]/8 space-y-2">
                  <h4 className="font-display font-semibold text-sm text-[#171719]">
                    Why Voice Cloning is Disproportionately Dangerous
                  </h4>
                  <p className="text-xs text-[#171719]/75 leading-relaxed">
                    Unlike visual deepfakes—where abnormal lighting, boundary
                    blur, or unnatural blinking can often be observed—voice
                    calls lack visual context. Compressed telephone audio (8kHz
                    cellular bandwidth) naturally degrades fidelity, masking the
                    digital imperfections of speech synthesizers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 3 — HOW THE TECHNOLOGY WORKS (VISUAL WORKFLOW)
          Source Media → AI Processing → Synthetic Media → Distribution
          Defensive and high-level architectural diagram
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-[#F8F7F4] border-b border-[#171719]/8">
        <PageContainer>
          <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto">
            <SectionHeading
              sectionIndex="( 03 )"
              categoryTag="ARCHITECTURAL PIPELINE"
              title="How the technology works."
              subtitle="The four-stage lifecycle of synthetic deception."
              description="A high-level educational analysis of how adversaries weaponize generative pipelines from public data collection to high-stress social engineering."
              align="center"
              size="default"
            />
          </div>

          {/* Sequential Workflow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="group relative rounded-3xl bg-white p-6 sm:p-8 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#171719]/6">
                    <span className="font-display text-3xl font-bold text-[#171719]">
                      {step.step}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border bg-white ${step.accentColor}`}
                    >
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-[#171719] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#171719]/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#171719]/6">
                  <span className="font-mono text-[10px] text-[#A6A6AC] block leading-tight">
                    {step.technicalNote}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Educational Callout on Technological Countermeasures */}
          <div className="mt-12 rounded-3xl bg-white p-8 border border-[#171719]/8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D9D9F7] text-[#171719]">
                <Cpu className="h-6 w-6 text-[#477BFF]" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-base text-[#171719]">
                  Defensive Machine Learning Heuristics
                </h4>
                <p className="text-xs text-[#A6A6AC] mt-0.5">
                  VERIVOX AI analyzes residual phase inconsistencies, unnatural
                  prosodic pauses, and linguistic pressure markers to detect
                  synthetic manipulation.
                </p>
              </div>
            </div>

            <Button asChild variant="charcoal" size="sm" className="rounded-full shrink-0">
              <Link href="/checker">
                <span>Test Audio in Scam Checker</span>
                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 4 — COMMON SCAMS & THREAT SCENARIOS
          Family emergency, executive wire fraud, fake video identities, social media
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-white border-b border-[#171719]/8">
        <PageContainer>
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              sectionIndex="( 04 )"
              categoryTag="TACTICAL THREAT SCENARIOS"
              title="Common scam methodologies."
              subtitle="Four recurring attack vectors exploited across the globe."
              description="Understanding the behavioral scripts and contextual narratives deployed by social engineers to dismantle skepticism."
              size="default"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Scam 1: Family Emergency Pretexts */}
            <div className="rounded-3xl bg-[#F8F7F4] p-8 sm:p-10 border border-[#171719]/8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#A6A6AC]">SCENARIO 01</span>
                  <Badge variant="dotPill" dotColor="rose">EMOTIONAL EXTORTION</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Family Emergency &amp; Virtual Kidnapping
                </h3>
                <p className="text-sm text-[#171719]/80 leading-relaxed">
                  Parents or grandparents receive a frantic call from an unknown
                  or spoofed number. A cloned voice mimicking their son, daughter,
                  or grandchild screams in panic, stating they were arrested,
                  injured in an auto collision, or detained by armed actors.
                </p>
                <div className="rounded-2xl bg-white p-4 border border-[#171719]/6 text-xs space-y-2">
                  <span className="font-semibold text-rose-700 block">
                    Key Telltale Signal:
                  </span>
                  <p className="text-[#171719]/80">
                    &quot;Please don&apos;t call Dad, he will call the police and
                    they&apos;ll hurt me. You must wire \$4,500 cash to the bail
                    bondsman within fifteen minutes.&quot;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                DEFENSE: Request the family safe-word; hang up and call the child directly.
              </div>
            </div>

            {/* Scam 2: Executive Impersonation */}
            <div className="rounded-3xl bg-[#F8F7F4] p-8 sm:p-10 border border-[#171719]/8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#A6A6AC]">SCENARIO 02</span>
                  <Badge variant="dotPill" dotColor="charcoal">CORPORATE FRAUD</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Executive Impersonation (CEO Wire Fraud)
                </h3>
                <p className="text-sm text-[#171719]/80 leading-relaxed">
                  A finance manager receives an impromptu phone call or urgent voice
                  memo from their Chief Executive Officer or Managing Director. The
                  caller commands an off-schedule wire transfer for a confidential
                  merger or urgent supplier settlement.
                </p>
                <div className="rounded-2xl bg-white p-4 border border-[#171719]/6 text-xs space-y-2">
                  <span className="font-semibold text-[#477BFF] block">
                    Key Telltale Signal:
                  </span>
                  <p className="text-[#171719]/80">
                    &quot;I am in board meetings with regulators right now and
                    cannot take calls. This payment cannot wait until Monday morning.
                    Process the wire immediately.&quot;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                DEFENSE: Strictly require secondary oral sign-off via established channels.
              </div>
            </div>

            {/* Scam 3: Fake Video Identities */}
            <div className="rounded-3xl bg-[#F8F7F4] p-8 sm:p-10 border border-[#171719]/8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#A6A6AC]">SCENARIO 03</span>
                  <Badge variant="dotPill" dotColor="lavender">VISUAL DECEPTION</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Fake Video Interview &amp; Executive Calls
                </h3>
                <p className="text-sm text-[#171719]/80 leading-relaxed">
                  Adversaries deploy real-time facial reenactment software during
                  video conferences to pose as corporate recruiters, remote job
                  candidates, or investment advisors, conducting entire meetings
                  behind synthetic digital avatars.
                </p>
                <div className="rounded-2xl bg-white p-4 border border-[#171719]/6 text-xs space-y-2">
                  <span className="font-semibold text-[#171719] block">
                    Key Telltale Signal:
                  </span>
                  <p className="text-[#171719]/80">
                    Micro-jitters around the hairline and jaw, unnatural eye-contact
                    alignment, and audio that desynchronizes slightly during rapid
                    head movements.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                DEFENSE: Request the person turn their profile 90 degrees or wave hand in front of face.
              </div>
            </div>

            {/* Scam 4: Social Media Impersonation */}
            <div className="rounded-3xl bg-[#F8F7F4] p-8 sm:p-10 border border-[#171719]/8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#A6A6AC]">SCENARIO 04</span>
                  <Badge variant="dotPill" dotColor="electric">REPUTATIONAL THEFT</Badge>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Social Media Audio Extortion &amp; Phishing
                </h3>
                <p className="text-sm text-[#171719]/80 leading-relaxed">
                  Attackers harvest brief audio clips from Instagram stories or
                  TikTok posts to generate voice notes sent to friends and
                  followers, asking for small emergency wire transfers or sharing
                  malicious credential-stealing links.
                </p>
                <div className="rounded-2xl bg-white p-4 border border-[#171719]/6 text-xs space-y-2">
                  <span className="font-semibold text-emerald-700 block">
                    Key Telltale Signal:
                  </span>
                  <p className="text-[#171719]/80">
                    A familiar friend messages asking for a fast digital payment
                    accompanied by an audio note confirming their identity, yet
                    avoids answering direct reciprocal questions.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                DEFENSE: Always verify payment requests over standard cellular voice call.
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 5 — WHO GETS TARGETED?
          Students, Senior Citizens, Working Professionals, Businesses, Public Figures
          Asymmetrical structured dossier register (not repetitive cards)
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-[#F8F7F4] border-b border-[#171719]/8">
        <PageContainer>
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              sectionIndex="( 05 )"
              categoryTag="VULNERABILITY TAXONOMY"
              title="Who gets targeted?"
              subtitle="Threat profiles across demographics."
              description="Synthetic media is not reserved for geopolitics or high-net-worth celebrities. Exploitation is targeted systematically across distinct societal demographics."
              size="default"
            />
          </div>

          {/* Detailed Editorial Register */}
          <div className="rounded-3xl bg-white border border-[#171719]/8 shadow-editorial-card divide-y divide-[#171719]/8 overflow-hidden">
            {targetGroups.map((group, index) => (
              <div
                key={group.role}
                className="p-6 sm:p-10 transition-colors duration-200 hover:bg-[#F8F7F4]/50"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Role Title & Category */}
                  <div className="lg:col-span-4 space-y-2">
                    <span className="font-mono text-xs text-[#A6A6AC] uppercase">
                      TARGET 0{index + 1}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171719]">
                      {group.role}
                    </h3>
                    <div className="pt-1">
                      <span className="inline-block rounded-full bg-[#171719]/5 px-3 py-1 font-mono text-[10px] text-[#171719] border border-[#171719]/8">
                        Vulnerability: {group.vulnerability}
                      </span>
                    </div>
                  </div>

                  {/* Primary Attack Vector & Narrative */}
                  <div className="lg:col-span-5 space-y-2">
                    <span className="font-mono text-xs text-rose-600 font-semibold uppercase block">
                      Primary Attack: {group.primaryAttack}
                    </span>
                    <p className="text-xs sm:text-sm text-[#171719]/80 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  {/* Defense Takeaway */}
                  <div className="lg:col-span-3 rounded-2xl bg-[#F8F7F4] p-4 border border-[#171719]/6 text-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[#477BFF] font-semibold block">
                      PROTOCOL DEFENSE
                    </span>
                    <p className="text-[#171719]/80 leading-relaxed font-sans">
                      {group.defenseAdvice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 6 — WARNING SIGNS
          Contextual indicators vs technical audio anomalies
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-white border-b border-[#171719]/8">
        <PageContainer>
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              sectionIndex="( 06 )"
              categoryTag="FORENSIC INDICATORS"
              title="Recognising the warning signs."
              subtitle="Contextual red flags and subtle acoustic indicators."
              description="While neural audio models continue to evolve, behavioral manipulation tactics remain predictable. Train yourself to spot these critical cues."
              size="default"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Category A: Contextual & Behavioral Red Flags */}
            <div className="rounded-3xl bg-[#F8F7F4] p-8 sm:p-10 border border-[#171719]/8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#171719]/8">
                <div>
                  <span className="font-mono text-xs text-[#A6A6AC] uppercase">CATEGORY A</span>
                  <h3 className="font-display text-xl font-semibold text-[#171719]">
                    Contextual &amp; Behavioral Indicators
                  </h3>
                </div>
                <Badge variant="periwinkle">BEHAVIORAL</Badge>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171719] block">Manufactured High-Stakes Urgency:</strong>
                    <span className="text-[#171719]/75">
                      The caller creates extreme crisis adrenaline (&quot;If we
                      don&apos;t pay within 10 minutes, bail is revoked&quot;).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171719] block">Strict Isolation Directives:</strong>
                    <span className="text-[#171719]/75">
                      Explicit commands to keep the call secret (&quot;Do not tell
                      Mom or the police; it will only complicate matters&quot;).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171719] block">Refusal of Independent Callbacks:</strong>
                    <span className="text-[#171719]/75">
                      Hostile reluctance when asked to disconnect and call back on
                      their usual registered phone number.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171719] block">Untraceable Payment Methods:</strong>
                    <span className="text-[#171719]/75">
                      Demands for non-refundable settlement vectors (gift cards,
                      cryptocurrency wallets, direct P2P wire transfers).
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category B: Technical & Acoustic Artifacts */}
            <div className="rounded-3xl bg-[#F8F7F4] p-8 sm:p-10 border border-[#171719]/8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#171719]/8">
                <div>
                  <span className="font-mono text-xs text-[#A6A6AC] uppercase">CATEGORY B</span>
                  <h3 className="font-display text-xl font-semibold text-[#171719]">
                    Acoustic &amp; Forensic Anomalies
                  </h3>
                </div>
                <Badge variant="cyan">ACOUSTIC</Badge>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div className="flex items-start gap-3">
                  <Volume2 className="h-4 w-4 text-[#477BFF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171719] block">Synthetic Cadence &amp; Flat Rhythm:</strong>
                    <span className="text-[#171719]/75">
                      Unnaturally even syllable pacing without the organic micro-variations
                      inherent to human vocal physiology.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Volume2 className="h-4 w-4 text-[#477BFF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171719] block">Absence of Respiratory Inhalation:</strong>
                    <span className="text-[#171719]/75">
                      Long complex sentences spoken without audible diaphragm
                      inhalations, natural tongue clicks, or throat clearing.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Volume2 className="h-4 w-4 text-[#477BFF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171719] block">Metallic Phase Cancellation:</strong>
                    <span className="text-[#171719]/75">
                      Faint robotic &quot;flanging&quot; or high-frequency buzzing
                      produced by neural vocoders attempting to interpolate phoneme transitions.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Volume2 className="h-4 w-4 text-[#477BFF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171719] block">Desynchronized Environmental Noise:</strong>
                    <span className="text-[#171719]/75">
                      Audible studio background silence or looping sound effects
                      (fake siren loops) that do not match the alleged emergency context.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SECTION 7 — PREVENTION: INDEPENDENT VERIFICATION & SAFE WORDS
          Explain independent verification, trusted callbacks, and family safe-words
          ========================================================================= */}
      <section className="relative py-24 sm:py-36 bg-[#F8F7F4]">
        <PageContainer>
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              sectionIndex="( 07 )"
              categoryTag="ANALOG RESILIENCE"
              title="The three golden rules of defense."
              subtitle="Proactive procedures that neutralize synthetic manipulation."
              description="While generative models can synthesize human biometrics, they cannot forge private analog shared memories or bypass out-of-band communication channels."
              size="default"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Rule 1: Independent Verification */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-display text-4xl font-bold text-[#171719]">
                  01
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Independent Verification
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Never accept caller-provided contact numbers or follow links
                  sent during a high-stress call. Treat every incoming emergency
                  request as an unverified transmission until confirmed through a
                  separate, verified communication channel.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                TAKEAWAY: Disconnect immediately. Do not stay on the line.
              </div>
            </div>

            {/* Rule 2: Trusted Callbacks */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-display text-4xl font-bold text-[#477BFF]">
                  02
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Trusted Direct Callbacks
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Hang up the call. Manually open your address book and dial the
                  individual directly using their pre-saved contact number. If the
                  caller claims their phone is broken, message a known family
                  member or roommate to verify their physical location.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                TAKEAWAY: Spoofed caller IDs cannot receive inbound calls.
              </div>
            </div>

            {/* Rule 3: Family Verification Phrases */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-display text-4xl font-bold text-[#B9A8E8]">
                  03
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Family Safe-Word Passphrase
                </h3>
                <p className="text-sm text-[#171719]/75 leading-relaxed">
                  Establish a private, unwritten code word with your family,
                  spouse, or executive team. If an alleged emergency occurs,
                  request the safe word immediately. Attackers cannot guess a
                  unique shared memory word never spoken on social media.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#171719]/6 text-xs text-[#A6A6AC] font-mono">
                TAKEAWAY: An authentic relative will answer the safe word without hesitation.
              </div>
            </div>
          </div>

          {/* =========================================================================
              CRITICAL FORENSIC DISCLAIMER
              Visual and audio clues alone cannot reliably prove authenticity
              ========================================================================= */}
          <div className="rounded-3xl bg-white p-8 sm:p-12 border-2 border-[#171719]/10 shadow-editorial-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
                <Info className="h-5 w-5" />
              </div>
              <h4 className="font-display font-semibold text-lg sm:text-xl text-[#171719]">
                Critical Scientific Defense Disclaimer
              </h4>
            </div>

            <p className="text-sm text-[#171719]/80 font-sans leading-relaxed max-w-4xl">
              <strong>Human sensory perception alone cannot reliably prove authenticity. </strong>
              As generative neural vocoders advance, imperceptible artifacts (such as phase
              irregularities or metallic flanging) will continue to diminish. Untrained human
              ears cannot reliably distinguish state-of-the-art voice clones from organic
              speech, especially over degraded cellular telephone bandwidth. Therefore, you must
              never rely solely on &quot;listening for glitches.&quot; True defense relies on
              analog procedural verification: hanging up, calling back directly, and requesting
              your private family safe word.
            </p>
          </div>

          {/* Action Callout Section */}
          <div className="mt-12 rounded-3xl bg-[#171719] text-[#F8F7F4] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="max-w-xl space-y-2">
              <span className="font-mono text-xs text-[#B9A8E8] uppercase tracking-wider block">
                INTERACTIVE APPLICATION MODULES
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                Test your discernment or analyze audio
              </h3>
              <p className="text-xs sm:text-sm text-[#A6A6AC]">
                Ready to put your knowledge into practice? Take our Perceptual
                Awareness Quiz or upload a suspicious voicemail for neural triage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Button asChild variant="lavender" className="rounded-full px-6 font-semibold">
                <Link href="/quiz">
                  <span>Take Awareness Quiz</span>
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 border-white/20 text-white hover:bg-white/10"
              >
                <Link href="/checker">
                  <span>AI Scam Checker</span>
                  <ArrowUpRight className="h-4 w-4 ml-1 opacity-70" />
                </Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
