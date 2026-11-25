"use client";

import * as React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  Cpu,
  Layers,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  User,
  AlertTriangle,
  Edit3,
  Check,
  Sparkles,
  ArrowRight,
  Code2,
  Database,
  Lock,
  Workflow,
  Compass,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DeveloperProfile {
  name: string;
  regNo: string;
  role: string;
  department: string;
  institution: string;
  summary: string;
}

const DEFAULT_DEVELOPER: DeveloperProfile = {
  name: "Naman Garg",
  regNo: "26BCON1989",
  role: "Lead Developer & Researcher",
  department: "Department of Computer Science & Cybersecurity",
  institution: "JECRC University, Jaipur",
  summary:
    "Responsible for the complete end-to-end website development, multimodal AI detection architecture, conversational safety companion, and interactive defense systems across Verivox AI.",
};

export default function AboutProjectPage() {
  const [developer, setDeveloper] = React.useState<DeveloperProfile>(DEFAULT_DEVELOPER);
  const [isEditingDev, setIsEditingDev] = React.useState(false);
  const [tempDev, setTempDev] = React.useState<DeveloperProfile>(DEFAULT_DEVELOPER);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  // Load saved developer details from localStorage if present
  React.useEffect(() => {
    try {
      // Clear out obsolete 3-member team key if lingering from older sessions
      localStorage.removeItem("verivox_team_details");

      const stored = localStorage.getItem("verivox_developer_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name && parsed.regNo) {
          setTimeout(() => {
            setDeveloper((prev) => ({ ...prev, ...parsed }));
            setTempDev((prev) => ({ ...prev, ...parsed }));
          }, 0);
        }
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const handleOpenEdit = () => {
    setTempDev({ ...developer });
    setIsEditingDev(true);
  };

  const handleSaveDev = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempDev.name.trim() || !tempDev.regNo.trim()) return;
    setDeveloper({ ...tempDev });
    setIsEditingDev(false);
    setSavedSuccess(true);
    try {
      localStorage.setItem("verivox_developer_profile", JSON.stringify(tempDev));
    } catch {
      // Ignore
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDev = () => {
    setDeveloper(DEFAULT_DEVELOPER);
    setTempDev(DEFAULT_DEVELOPER);
    setIsEditingDev(false);
    try {
      localStorage.removeItem("verivox_developer_profile");
    } catch {
      // Ignore
    }
  };

  return (
    <PageContainer className="py-12 sm:py-20 space-y-16 sm:space-y-24">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Breadcrumb items={[{ label: "ABOUT PROJECT" }]} />
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#A6A6AC]">
              ACADEMIC YEAR 2025–2026
            </span>
            <Badge variant="liveStatus" dotColor="electric">
              CAPSTONE DISSERTATION
            </Badge>
          </div>
        </div>

        {/* Hero Section Heading */}
        <SectionHeading
          sectionIndex="( 07 )"
          categoryTag="ACADEMIC CAPSTONE PROJECT"
          title="Understanding, Detecting and Preventing Deepfake and Voice-Cloning Scams."
          subtitle="A comprehensive forensic research and engineering project at JECRC University, Jaipur."
          description="Investigating the socio-technical mechanics of zero-shot acoustic voice synthesis and diffusion video manipulation, engineered with practical heuristic detection models and sovereign incident response workflows."
          size="hero"
        />

        {/* Academic Meta Banner */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#171719]/8 shadow-editorial-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1 border-b md:border-b-0 md:border-r border-[#171719]/8 pb-4 md:pb-0 md:pr-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#A6A6AC]">
              INSTITUTION
            </span>
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              JECRC University
            </h4>
            <p className="text-xs text-[#171719]/65">
              Jaipur, Rajasthan · Faculty of Engineering
            </p>
          </div>

          <div className="space-y-1 border-b md:border-b-0 lg:border-r border-[#171719]/8 pb-4 md:pb-0 lg:pr-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#A6A6AC]">
              PROJECT SUPERVISOR
            </span>
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              Mr. Amit Sain
            </h4>
            <p className="text-xs text-[#171719]/65">
              FIAT Trainer · Project Guide
            </p>
          </div>

          <div className="space-y-1 border-b md:border-b-0 md:border-r border-[#171719]/8 pb-4 md:pb-0 md:pr-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#A6A6AC]">
              LEAD DEVELOPER
            </span>
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              {developer.name}
            </h4>
            <p className="text-xs text-[#477BFF] font-mono font-medium">
              Reg No: {developer.regNo}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#A6A6AC]">
              DISCIPLINE
            </span>
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              Computer Science
            </h4>
            <p className="text-xs text-[#171719]/65">
              Cybersecurity &amp; AI Forensics
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. PROJECT OVERVIEW                                       */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
          <div className="h-9 w-9 rounded-xl bg-[#D9D9F7] flex items-center justify-center text-[#171719]">
            <Compass className="h-4 w-4 text-[#477BFF]" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#477BFF] font-semibold block">
              SECTION 01
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
              Project Overview
            </h2>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6">
          <p className="text-base sm:text-lg text-[#171719]/85 leading-relaxed">
            <strong>Verivox AI</strong> is an academic capstone initiative engineered to address the rapid commoditization of generative artificial intelligence and its malicious exploitation in cyber fraud. Modern deep generative models can now clone a human voice with high fidelity from a mere 3-second audio recording and generate photorealistic face-swapped video feeds in real time.
          </p>

          <p className="text-sm sm:text-base text-[#171719]/75 leading-relaxed">
            The project bridges the gap between state-of-the-art academic media forensics and practical public defense. By combining pretrained acoustic deepfake classifiers (Wav2Vec2), dual-backbone vision transformers (ViT FaceForensics + GenAI Diffusion), conversational safety assistance, and an interactive 24-question awareness assessment, Verivox AI provides a complete defense continuum against modern synthetic extortion and digital impersonation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#171719]/8">
            <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-1">
              <span className="font-mono text-xs font-semibold text-[#171719] block">
                01. Technical Triage
              </span>
              <p className="text-xs text-[#171719]/65">
                Local microservice inference evaluating spectral glitches and facial manipulation markers.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-1">
              <span className="font-mono text-xs font-semibold text-[#171719] block">
                02. Human Inoculation
              </span>
              <p className="text-xs text-[#171719]/65">
                24-question interactive assessment training cognitive resistance against urgency manipulation.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-1">
              <span className="font-mono text-xs font-semibold text-[#171719] block">
                03. Sovereign Protocol
              </span>
              <p className="text-xs text-[#171719]/65">
                Direct integration with Indian statutory reporting portals and 24x7 Helpline 1930.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PROBLEM STATEMENT                                      */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
          <div className="h-9 w-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-rose-600 font-semibold block">
              SECTION 02
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
              Problem Statement
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171719]">
              The Asymmetry of Synthetic Deception
            </h3>
            <p className="text-sm sm:text-base text-[#171719]/80 leading-relaxed">
              Traditional cyber fraud relied on poorly phrased emails and obvious typographical anomalies. The democratization of zero-shot neural voice cloning, commercial text-to-speech vocoders, and diffusion-based video manipulation has lowered the technical and financial barrier for bad actors to weaponize trust.
            </p>
            <p className="text-sm text-[#171719]/70 leading-relaxed">
              When an adversary contacts a victim using the cloned voice of their grandchild, CEO, or law enforcement official, human psychological defenses are bypassed. Crucially:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#171719]/80 pt-1">
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  <strong>Acoustic Trust Exploitation:</strong> Family members cannot intuitively discern neural speech synthesis from genuine voice recordings during urgent phone calls.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  <strong>Lack of Public Triage Tools:</strong> Most forensic media tools are proprietary, cost-prohibitive enterprise solutions unavailable to regular citizens.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  <strong>Delayed Incident Response:</strong> Victims routinely miss the statutory &ldquo;Golden Hour&rdquo; to freeze fraudulent transactions due to uncertainty and lack of reporting knowledge.
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-[#171719] text-[#F8F7F4] p-8 sm:p-10 border border-[#171719]/10 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#B9E8F2]">
                CORE RESEARCH HYPOTHESIS
              </span>
              <h4 className="font-display text-xl font-medium text-white leading-snug">
                Can probabilistic neural heuristics paired with out-of-band behavioral protocols neutralize the threat of AI impersonation?
              </h4>
              <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                By acknowledging that no AI detector is 100% infallible and reinforcing forensic predictions with analog family safe words and zero-trust verification, digital fraud resilience increases exponentially.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D9D9F7]">
              <span>JECRC RESEARCH LABS</span>
              <span>2025–2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PROJECT OBJECTIVES                                     */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
          <div className="h-9 w-9 rounded-xl bg-[#B9A8E8]/30 flex items-center justify-center text-[#171719]">
            <Award className="h-4 w-4 text-[#171719]" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#477BFF] font-semibold block">
              SECTION 03
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
              Project Objectives
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-3xl bg-white p-7 border border-[#171719]/8 shadow-editorial-card space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#477BFF]">
                OBJECTIVE 01
              </span>
              <h4 className="font-display text-lg font-semibold text-[#171719]">
                Multimodal Forensic Detection
              </h4>
              <p className="text-xs text-[#171719]/70 leading-relaxed">
                Implement robust classification engines capable of analyzing incoming transcripts, acoustic speech waveforms, and video frame sequences.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-[#A6A6AC] border-t border-[#171719]/6">
              Wav2Vec2 + Dual ViT Vision
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-[#171719]/8 shadow-editorial-card space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#B9A8E8]">
                OBJECTIVE 02
              </span>
              <h4 className="font-display text-lg font-semibold text-[#171719]">
                Transparent Risk Explanations
              </h4>
              <p className="text-xs text-[#171719]/70 leading-relaxed">
                Provide clear, non-technical explanations alongside confidence scores, explicitly distinguishing model uncertainty from verified authenticity.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-[#A6A6AC] border-t border-[#171719]/6">
              Explainable AI (XAI)
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-[#171719]/8 shadow-editorial-card space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-600">
                OBJECTIVE 03
              </span>
              <h4 className="font-display text-lg font-semibold text-[#171719]">
                Interactive Human Inoculation
              </h4>
              <p className="text-xs text-[#171719]/70 leading-relaxed">
                Develop a 24-question benchmark assessment covering acoustic cloning, romance fraud, business email compromise, and youth digital habits.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-[#A6A6AC] border-t border-[#171719]/6">
              24-Scenario Quiz Engine
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-[#171719]/8 shadow-editorial-card space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#171719]">
                OBJECTIVE 04
              </span>
              <h4 className="font-display text-lg font-semibold text-[#171719]">
                Sovereign Crisis Response
              </h4>
              <p className="text-xs text-[#171719]/70 leading-relaxed">
                Integrate statutory reporting pathways with direct links to cybercrime.gov.in and operational triage for Helpline 1930.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-[#A6A6AC] border-t border-[#171719]/6">
              I4C Helpline 1930 Triage
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PROPOSED SOLUTION                                      */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
          <div className="h-9 w-9 rounded-xl bg-[#B9E8F2]/60 flex items-center justify-center text-[#171719]">
            <Workflow className="h-4 w-4 text-[#171719]" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#477BFF] font-semibold block">
              SECTION 04
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
              Proposed Solution
            </h2>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card space-y-8">
          <div className="max-w-3xl space-y-3">
            <h3 className="font-display text-2xl font-medium text-[#171719]">
              The Verivox AI Ecosystem Architecture
            </h3>
            <p className="text-sm sm:text-base text-[#171719]/75 leading-relaxed">
              Rather than presenting a monolithic, opaque &ldquo;AI black-box&rdquo;, Verivox AI provides an integrated four-part defense architecture that addresses every phase of a social engineering encounter:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#477BFF]">PILLAR 01</span>
                <span className="text-[11px] font-mono text-[#A6A6AC]">/checker</span>
              </div>
              <h4 className="font-display text-lg font-semibold text-[#171719]">
                Multimodal AI Detection Centre
              </h4>
              <p className="text-xs text-[#171719]/70 leading-relaxed">
                A unified editorial interface with dedicated tabs for Text Message Scrutiny, Audio Deepfake Waveform Analysis (Wav2Vec2), and Video Deepfake Frame Inspection (dual ViTs + 2D FFT spectral analysis).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#B9A8E8]">PILLAR 02</span>
                <span className="text-[11px] font-mono text-[#A6A6AC]">/assistant</span>
              </div>
              <h4 className="font-display text-lg font-semibold text-[#171719]">
                AI Safety Assistant
              </h4>
              <p className="text-xs text-[#171719]/70 leading-relaxed">
                An intelligent conversational companion running dual engines (Gemini 2.5 Flash + Verified Knowledge Base) to answer critical citizen queries on emergency verification, family safe words, and reporting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-600">PILLAR 03</span>
                <span className="text-[11px] font-mono text-[#A6A6AC]">/quiz</span>
              </div>
              <h4 className="font-display text-lg font-semibold text-[#171719]">
                Awareness Assessment Engine
              </h4>
              <p className="text-xs text-[#171719]/70 leading-relaxed">
                A 24-question multiple-choice interactive benchmark assessing defensive vigilance across 5 distinct domains with immediate local evaluation, category analytics, and actionable gap recommendations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#171719]">PILLAR 04</span>
                <span className="text-[11px] font-mono text-[#A6A6AC]">/safety</span>
              </div>
              <h4 className="font-display text-lg font-semibold text-[#171719]">
                Incident Defense &amp; Reporting Playbook
              </h4>
              <p className="text-xs text-[#171719]/70 leading-relaxed">
                A step-by-step crisis containment guide covering the &ldquo;Pause. Verify. Protect.&rdquo; methodology, family code words, bank freeze procedures, and direct statutory reporting for India (Helpline 1930 &amp; cybercrime.gov.in).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. TECHNOLOGIES USED                                      */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
          <div className="h-9 w-9 rounded-xl bg-[#D9D9F7] flex items-center justify-center text-[#171719]">
            <Code2 className="h-4 w-4 text-[#477BFF]" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#477BFF] font-semibold block">
              SECTION 05
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
              Technologies Used
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stack 1 */}
          <div className="rounded-3xl bg-white p-7 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#477BFF] flex items-center justify-center border border-blue-100">
              <Layers className="h-4 w-4" />
            </div>
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              Frontend &amp; UX
            </h4>
            <ul className="space-y-2 text-xs text-[#171719]/80 font-mono">
              <li>• Next.js 16 (App Router)</li>
              <li>• React 19 (Server + Client Components)</li>
              <li>• Tailwind CSS (v4 Editorial Token System)</li>
              <li>• TypeScript 5 (Strict Mode)</li>
              <li>• Lucide React Icons</li>
            </ul>
          </div>

          {/* Stack 2 */}
          <div className="rounded-3xl bg-white p-7 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-[#B9A8E8] flex items-center justify-center border border-purple-100">
              <Cpu className="h-4 w-4" />
            </div>
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              Audio Deepfake AI
            </h4>
            <ul className="space-y-2 text-xs text-[#171719]/80 font-mono">
              <li>• PyTorch &amp; Torchaudio</li>
              <li>• Hugging Face Transformers</li>
              <li>• Wav2Vec2 Feature Extractor</li>
              <li>• Model: mo-thecreator/Deepfake-audio-detection</li>
              <li>• Librosa &amp; SoundFile Signal Processing</li>
            </ul>
          </div>

          {/* Stack 3 */}
          <div className="rounded-3xl bg-white p-7 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-9 w-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-100">
              <Database className="h-4 w-4" />
            </div>
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              Video Deepfake AI
            </h4>
            <ul className="space-y-2 text-xs text-[#171719]/80 font-mono">
              <li>• Dual Vision Transformers (ViT)</li>
              <li>• dima806/deepfake_vs_real_image</li>
              <li>• dima806/ai_vs_real_image (Diffusion)</li>
              <li>• 2D FFT Spectral Frequency Analysis</li>
              <li>• OpenCV Video Frame Extraction</li>
            </ul>
          </div>

          {/* Stack 4 */}
          <div className="rounded-3xl bg-white p-7 border border-[#171719]/8 shadow-editorial-card space-y-4">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Lock className="h-4 w-4" />
            </div>
            <h4 className="font-display text-lg font-semibold text-[#171719]">
              Backend Microservices
            </h4>
            <ul className="space-y-2 text-xs text-[#171719]/80 font-mono">
              <li>• Python FastAPI REST Service</li>
              <li>• Uvicorn ASGI Server</li>
              <li>• Google Gemini 2.5 Flash API</li>
              <li>• Zero-Storage Temp File Lifecycle</li>
              <li>• Client-Side Local Evaluation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. PROJECT LEAD & DEVELOPER                               */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#171719]/8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#D9D9F7] flex items-center justify-center text-[#171719]">
              <User className="h-4 w-4 text-[#477BFF]" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#477BFF] font-semibold block">
                SECTION 06
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
                Project Lead &amp; Developer
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Check className="h-3 w-3" /> Details Saved
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenEdit}
              className="text-xs font-mono cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5 mr-1.5" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Individual Developer Card */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card space-y-8">
          {/* Header row: Name, Reg No, Candidate Badge */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-[#171719]/8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="dotPill" dotColor="charcoal">
                  LEAD DEVELOPER &amp; RESEARCHER
                </Badge>
                <span className="rounded-full bg-[#D9D9F7]/70 px-3 py-1 text-xs font-mono text-[#171719] font-medium border border-[#B9A8E8]/40">
                  ACADEMIC CAPSTONE
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171719]">
                  {developer.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm font-mono">
                  <div className="inline-flex items-center gap-1.5 bg-[#477BFF]/10 text-[#477BFF] px-3 py-1 rounded-full border border-[#477BFF]/20 font-semibold">
                    <span>Reg No:</span>
                    <span className="font-bold tracking-wide">{developer.regNo}</span>
                  </div>
                  <span className="text-[#A6A6AC]">·</span>
                  <span className="text-[#171719]/80 font-sans">
                    {developer.department}
                  </span>
                  <span className="text-[#A6A6AC]">·</span>
                  <span className="text-[#171719]/80 font-sans">
                    {developer.institution}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#171719]/75 font-sans leading-relaxed max-w-3xl pt-2">
                {developer.summary}
              </p>
            </div>

            <div className="shrink-0 flex lg:flex-col items-center lg:items-end gap-2 text-right">
              <span className="font-mono text-xs text-[#A6A6AC]">
                DEGREE PROGRAM
              </span>
              <span className="font-display font-semibold text-sm text-[#171719]">
                B.Tech Computer Science &amp; Engineering
              </span>
              <span className="font-mono text-[11px] text-[#477BFF]">
                Class of 2026
              </span>
            </div>
          </div>

          {/* Project Contributions & Scope Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#A6A6AC] font-semibold">
                SYSTEMS ARCHITECTURE &amp; FULL-STACK CONTRIBUTIONS
              </span>
              <span className="font-mono text-xs text-[#477BFF]">
                6 CORE MODULES COMPLETED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#477BFF] border border-blue-100">
                    <Layers className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="font-display font-semibold text-sm text-[#171719]">
                    Website Development &amp; UX
                  </h4>
                </div>
                <p className="text-xs text-[#171719]/70 leading-relaxed">
                  End-to-end full-stack frontend architecture with Next.js 16, React 19, TypeScript, and Tailwind CSS. Built the editorial technology design system with responsive layouts and WCAG AAA compliance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-[#B9A8E8] border border-purple-100">
                    <ShieldAlert className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="font-display font-semibold text-sm text-[#171719]">
                    Multimodal Detection Centre
                  </h4>
                </div>
                <p className="text-xs text-[#171719]/70 leading-relaxed">
                  Engineered the 3-tab verification suite: Gemini text scam reasoning, Wav2Vec2 acoustic voice clone classification, and dual Vision Transformer video deepfake artifact inspection.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-100">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="font-display font-semibold text-sm text-[#171719]">
                    AI Safety Companion
                  </h4>
                </div>
                <p className="text-xs text-[#171719]/70 leading-relaxed">
                  Implemented the conversational defense copilot running dual engines (Gemini 2.5 Flash + verified offline safety knowledge base) for emergency call triage and scam interrogation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <Award className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="font-display font-semibold text-sm text-[#171719]">
                    24-Scenario Quiz Engine
                  </h4>
                </div>
                <p className="text-xs text-[#171719]/70 leading-relaxed">
                  Constructed the comprehensive 24-question awareness benchmark across 5 threat categories with keyboard shortcuts, persistent state, review modal, and printable diagnostic scorecard.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="font-display font-semibold text-sm text-[#171719]">
                    Safety &amp; Incident Protocols
                  </h4>
                </div>
                <p className="text-xs text-[#171719]/70 leading-relaxed">
                  Formulated tactical crisis procedures: &ldquo;Pause. Verify. Protect.&rdquo;, dynamic family safe-phrase generator, and statutory reporting pathways for India (Helpline 1930 &amp; cybercrime.gov.in).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F7F4]/70 border border-[#171719]/6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-700 border border-rose-100">
                    <Code2 className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="font-display font-semibold text-sm text-[#171719]">
                    FastAPI Microservices
                  </h4>
                </div>
                <p className="text-xs text-[#171719]/70 leading-relaxed">
                  Built the Python backend service orchestrating PyTorch neural model inference, video frame extraction, audio spectrogram processing, and zero-storage privacy policies.
                </p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-[#171719]/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#A6A6AC]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Project Author &amp; Sole Developer: Naman Garg (26BCON1989)</span>
            </div>
            <span>Department of Computer Science &amp; Engineering</span>
          </div>
        </div>

        {/* Modal for Editing Developer Details */}
        {isEditingDev && (
          <div className="fixed inset-0 z-50 bg-[#171719]/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#171719]/10 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#171719]/8">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#171719]">
                    Edit Developer Details
                  </h3>
                  <p className="text-xs text-[#A6A6AC] font-mono mt-0.5">
                    UPDATE NAME &amp; REGISTRATION NUMBER
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingDev(false)}
                  className="text-xs font-mono cursor-pointer"
                >
                  Cancel
                </Button>
              </div>

              <form onSubmit={handleSaveDev} className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#A6A6AC] font-mono">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={tempDev.name}
                      onChange={(e) =>
                        setTempDev((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full h-9 px-3 rounded-xl bg-white border border-[#171719]/15 text-xs text-[#171719] focus:outline-none focus:ring-1 focus:ring-[#477BFF]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#A6A6AC] font-mono">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      value={tempDev.regNo}
                      onChange={(e) =>
                        setTempDev((prev) => ({ ...prev, regNo: e.target.value }))
                      }
                      className="w-full h-9 px-3 rounded-xl bg-white border border-[#171719]/15 text-xs text-[#171719] focus:outline-none focus:ring-1 focus:ring-[#477BFF]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#A6A6AC] font-mono">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={tempDev.role}
                      onChange={(e) =>
                        setTempDev((prev) => ({ ...prev, role: e.target.value }))
                      }
                      className="w-full h-9 px-3 rounded-xl bg-white border border-[#171719]/15 text-xs text-[#171719] focus:outline-none focus:ring-1 focus:ring-[#477BFF]"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResetDev}
                    className="text-xs font-mono text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    Reset to Default
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsEditingDev(false)}
                      className="text-xs h-9 px-4 cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="text-xs h-9 px-5 bg-[#171719] text-white cursor-pointer"
                    >
                      Save Details
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 7. FACULTY GUIDE & INSTITUTION                            */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
          <div className="h-9 w-9 rounded-xl bg-[#D9D9F7] flex items-center justify-center text-[#171719]">
            <GraduationCap className="h-4 w-4 text-[#477BFF]" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#477BFF] font-semibold block">
              SECTION 07
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
              Faculty Guide &amp; Institution
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Guide Card */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#477BFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  PROJECT GUIDE
                </span>
                <span className="text-xs font-mono text-[#A6A6AC]">FACULTY MENTOR</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#171719]">
                  Mr. Amit Sain
                </h3>
                <p className="text-sm font-mono text-[#477BFF] font-semibold">
                  FIAT Trainer
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#171719]/75 leading-relaxed pt-2">
                Under whose continuous academic guidance, architectural supervision, and technical mentorship this deepfake and voice-cloning scam detection research capstone was conceptualized and completed.
              </p>
            </div>

            <div className="pt-4 border-t border-[#171719]/8 flex items-center gap-2 text-xs font-mono text-[#171719]/60">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Project Review &amp; Dissertation Verified</span>
            </div>
          </div>

          {/* Institution Card */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#171719] bg-[#171719]/5 px-3 py-1 rounded-full border border-[#171719]/10">
                  HOST INSTITUTION
                </span>
                <span className="text-xs font-mono text-[#A6A6AC]">ESTABLISHED 2012</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#171719]">
                  JECRC University, Jaipur
                </h3>
                <p className="text-xs font-mono text-[#A6A6AC]">
                  FACULTY OF ENGINEERING &amp; TECHNOLOGY
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#171719]/75 leading-relaxed pt-2">
                A premier higher education institution in Rajasthan, recognized for excellence in computer science engineering, cybersecurity research, and industry-aligned artificial intelligence curriculum.
              </p>
            </div>

            <div className="pt-4 border-t border-[#171719]/8 flex items-center justify-between text-xs font-mono text-[#A6A6AC]">
              <span>Jaipur, Rajasthan, India</span>
              <span>jecrcuniversity.edu.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. PROJECT LIMITATIONS                                    */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
          <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-amber-700 font-semibold block">
              SECTION 08
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
              Project Limitations
            </h2>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6">
          <p className="text-sm sm:text-base text-[#171719]/80 leading-relaxed">
            In accordance with rigorous academic integrity standards, the detection and forensic capabilities of Verivox AI are bounded by several technical constraints inherent to state-of-the-art media classifiers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#171719]/80">
            <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-2">
              <span className="font-mono font-bold text-[#171719] block">
                01. Lossy Acoustic Compression (Codec Degeneracy)
              </span>
              <p>
                Telephony channels (8kHz narrow-band) and messaging app codecs (e.g., Opus at 16kbps) strip out the high-frequency spectral bands where neural vocoder glitch markers typically reside, dampening acoustic confidence.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-2">
              <span className="font-mono font-bold text-[#171719] block">
                02. Zero-Day Generator Generalization
              </span>
              <p>
                Pretrained models generalize well against known vocoders (HiFi-GAN, WaveGlow, Diffusion-TTS), but novel generative architectures or fine-tuned voice synthesizers may produce acoustic distributions outside training domains.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-2">
              <span className="font-mono font-bold text-[#171719] block">
                03. Video Artifact Washing &amp; Face Resolution
              </span>
              <p>
                Low-resolution video or extreme digital compression (re-encoded TikTok / WhatsApp video) washes away micro-edge artifacts, blending facial seams that Vision Transformers rely upon for spatial anomaly detection.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#171719]/6 space-y-2">
              <span className="font-mono font-bold text-[#171719] block">
                04. Text Semantics vs. Provenance
              </span>
              <p>
                Text-based analysis detects psychological persuasion markers (urgency, isolation, financial demands) but cannot definitively determine whether text was drafted by a human scammer or an autonomous LLM agent without external metadata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. PROMINENT EDUCATIONAL DISCLAIMER                       */}
      {/* ========================================================= */}
      <section className="rounded-3xl bg-[#171719] text-[#F8F7F4] p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#171719]/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold block">
              LEGAL &amp; ACADEMIC DISCLAIMER
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-white">
              Educational Prototype Notice
            </h3>
          </div>
        </div>

        <div className="space-y-3 text-sm text-[#F8F7F4]/80 leading-relaxed max-w-4xl">
          <p>
            <strong>Verivox AI is an educational prototype and does not guarantee detection of synthetic audio or video.</strong>
          </p>
          <p className="text-xs text-[#F8F7F4]/65">
            Automated machine learning classifications, confidence scores, and heuristic evaluations are probabilistic approximations intended solely for academic research, educational demonstrations, and triage guidance. They do not constitute legally binding forensic certifications. Users must always verify critical or emergency communications through independent out-of-band channels before initiating financial transfers or sharing sensitive personal data.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#D9D9F7]">
          <span>JECRC UNIVERSITY · DEPARTMENT OF COMPUTER SCIENCE</span>
          <Link href="/checker" className="text-white hover:underline flex items-center gap-1">
            Explore Multimodal Detection Centre <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
