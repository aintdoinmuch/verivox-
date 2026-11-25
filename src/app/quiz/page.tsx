"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  Sparkles,
  Printer,
  AlertTriangle,
  Lightbulb,
  Check,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { PrimaryButton, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  QUIZ_QUESTIONS,
  QUIZ_CATEGORIES,
  OptionKey,
  QuizEvaluationResult,
  evaluateQuiz,
} from "@/lib/data/quiz-questions";

type QuizStage = "intro" | "question" | "results";

export default function QuizPage() {
  const [stage, setStage] = React.useState<QuizStage>("intro");
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<Record<number, OptionKey>>({});
  const [evaluation, setEvaluation] = React.useState<QuizEvaluationResult | null>(null);
  const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = React.useState<"all" | "correct" | "incorrect">("all");

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const currentAnswer = answers[currentQuestion?.id];
  const isCurrentAnswered = currentAnswer !== undefined;

  // Scroll to top helper
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleStart = () => {
    setStage("question");
    setCurrentIndex(0);
    scrollToTop();
  };

  const handleSelectOption = (key: OptionKey) => {
    // Only allow selection before final submission
    if (stage === "results") return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
  };

  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      scrollToTop();
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      scrollToTop();
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setCurrentIndex(idx);
    scrollToTop();
  };

  const handleSubmitQuiz = () => {
    setShowConfirmModal(false);
    const result = evaluateQuiz(answers);
    setEvaluation(result);
    setStage("results");
    scrollToTop();
  };

  const handleRetake = () => {
    setAnswers({});
    setEvaluation(null);
    setCurrentIndex(0);
    setStage("intro");
    setShowConfirmModal(false);
    setReviewFilter("all");
    scrollToTop();
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Keyboard shortcuts for options A, B, C, D
  React.useEffect(() => {
    if (stage !== "question" || showConfirmModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (["A", "B", "C", "D"].includes(key)) {
        handleSelectOption(key as OptionKey);
      } else if (e.key === "Enter" && isCurrentAnswered) {
        handleNext();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, showConfirmModal, isCurrentAnswered, currentIndex]);

  return (
    <PageContainer className="py-12 sm:py-20">
      <div className="mb-8">
        <Breadcrumb items={[{ label: "AWARENESS QUIZ" }]} />
      </div>

      {/* ========================================================= */}
      {/* 1. INTRO STAGE                                            */}
      {/* ========================================================= */}
      {stage === "intro" && (
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="space-y-4">
            <SectionHeading
              sectionIndex="( 05 )"
              categoryTag="VOICEGUARD AI AWARENESS ASSESSMENT"
              title="How Well Can You Spot a Deepfake Scam?"
              subtitle="Test your knowledge of AI impersonation, digital fraud and online safety."
              description="From cloned voices to manipulated videos, learn how to recognise modern digital threats and make safer decisions."
              size="hero"
            />
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl bg-white p-6 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <span className="font-mono text-xs uppercase text-[#A6A6AC] tracking-wider">
                CURRICULUM
              </span>
              <div className="mt-3">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-[#171719]">
                  24
                </span>
                <span className="text-sm text-[#171719]/60 ml-2">Questions</span>
              </div>
              <p className="mt-2 text-xs text-[#171719]/60">
                Exhaustive multi-vector scenario assessment
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <span className="font-mono text-xs uppercase text-[#A6A6AC] tracking-wider">
                FORMAT
              </span>
              <div className="mt-3">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-[#477BFF]">
                  MCQ
                </span>
                <span className="text-sm text-[#171719]/60 ml-2">4 Options</span>
              </div>
              <p className="mt-2 text-xs text-[#171719]/60">
                Single correct answer with instant local scoring
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <span className="font-mono text-xs uppercase text-[#A6A6AC] tracking-wider">
                CATEGORIES
              </span>
              <div className="mt-3">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-[#B9A8E8]">
                  05
                </span>
                <span className="text-sm text-[#171719]/60 ml-2">Modules</span>
              </div>
              <p className="mt-2 text-xs text-[#171719]/60">
                Foundations, Voice, Adult, Youth & Next-Gen
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-[#171719]/8 shadow-editorial-card flex flex-col justify-between">
              <span className="font-mono text-xs uppercase text-[#A6A6AC] tracking-wider">
                OUTCOME
              </span>
              <div className="mt-3">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-emerald-600">
                  Full
                </span>
                <span className="text-sm text-[#171719]/60 ml-2">Report</span>
              </div>
              <p className="mt-2 text-xs text-[#171719]/60">
                Tier certification, gap analysis & explanations
              </p>
            </div>
          </div>

          {/* Assessment Modules Overview */}
          <div className="rounded-3xl bg-white p-6 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#171719]/8">
              <div>
                <h3 className="font-display text-2xl font-medium text-[#171719]">
                  Assessment Syllabus & Modules
                </h3>
                <p className="text-sm text-[#171719]/65 mt-1">
                  Structured to measure defensive reflexes against real-world social engineering and synthetic media.
                </p>
              </div>
              <Badge variant="liveStatus" dotColor="electric">
                5 CORE DOMAINS
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUIZ_CATEGORIES.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="rounded-2xl bg-[#F8F7F4]/60 p-5 border border-[#171719]/6 hover:border-[#171719]/15 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#A6A6AC]">
                        MODULE 0{idx + 1}
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-mono font-medium text-[#171719] border border-[#171719]/8">
                        Q{cat.questionRange[0]}–Q{cat.questionRange[1]}
                      </span>
                    </div>
                    <h4 className="font-display text-base font-semibold text-[#171719] mb-1.5">
                      {cat.shortTitle}
                    </h4>
                    <p className="text-xs text-[#171719]/70 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-gradient-to-br from-[#D9D9F7]/40 to-[#B9E8F2]/30 p-5 border border-[#477BFF]/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="h-4 w-4 text-[#477BFF]" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#477BFF] font-semibold">
                      PRIVACY GUARANTEE
                    </span>
                  </div>
                  <h4 className="font-display text-base font-semibold text-[#171719] mb-1.5">
                    Zero Data Storage
                  </h4>
                  <p className="text-xs text-[#171719]/70 leading-relaxed">
                    100% evaluated client-side in your browser. No names, emails, or personal inputs collected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Start CTA Hero Banner */}
          <div className="rounded-3xl bg-[#171719] text-[#F8F7F4] p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="relative z-10 max-w-xl space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-mono text-[#D9D9F7]">
                <Sparkles className="h-3.5 w-3.5 text-[#B9A8E8]" /> READY FOR EVALUATION
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
                Benchmark your resilience against AI deception
              </h3>
              <p className="text-sm text-[#F8F7F4]/75 leading-relaxed">
                Takes approximately 5–7 minutes. Answer each scenario based on your practical safety instincts.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Button
                variant="white"
                size="lg"
                onClick={handleStart}
                className="font-medium text-base px-8 h-14 group shadow-lg cursor-pointer"
              >
                Start Assessment
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. QUESTION VIEWPORT                                      */}
      {/* ========================================================= */}
      {stage === "question" && currentQuestion && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Header Progress & Stepper */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#171719] text-white px-3 py-1 font-mono text-[11px] font-medium tracking-wider">
                  QUESTION {String(currentQuestion.number).padStart(2, "0")} / 24
                </span>
                <span className="text-[#A6A6AC] font-mono">·</span>
                <span className="text-[#171719] font-medium text-xs">
                  {currentQuestion.categoryTitle}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-[#A6A6AC]">
                <span>{answeredCount} of 24 completed</span>
                <span className="text-xs font-semibold text-[#477BFF]">
                  ({Math.round((answeredCount / totalQuestions) * 100)}%)
                </span>
              </div>
            </div>

            {/* Smooth Top Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#171719]/10 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#B9A8E8] via-[#477BFF] to-[#10B981] transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Quick 24-Question Dot Stepper */}
            <div className="hidden sm:grid grid-cols-24 gap-1 pt-1">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleJumpToQuestion(idx)}
                    title={`Question ${q.id}: ${q.categoryShortTitle}${isAnswered ? " (Answered)" : " (Unanswered)"}`}
                    className={`h-2.5 rounded-sm transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-[#477BFF] ring-2 ring-[#477BFF]/40 scale-y-125"
                        : isAnswered
                        ? "bg-[#171719] hover:bg-[#477BFF]"
                        : "bg-[#171719]/15 hover:bg-[#171719]/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Main Question Card */}
          <div className="rounded-3xl bg-white p-7 sm:p-12 border border-[#171719]/8 shadow-editorial-card space-y-8 relative">
            {/* Category Tag Header */}
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F8F7F4] border border-[#171719]/10 px-3.5 py-1 text-xs font-mono text-[#171719]">
                <Layers className="h-3.5 w-3.5 text-[#477BFF]" />
                <span className="uppercase font-semibold tracking-wider">
                  {currentQuestion.categoryBadge}
                </span>
                <span className="text-[#A6A6AC]">·</span>
                <span className="text-[#171719]/70">{currentQuestion.categoryShortTitle}</span>
              </div>

              <span className="font-mono text-xs text-[#A6A6AC]">
                Single Choice
              </span>
            </div>

            {/* Question Heading */}
            <div className="space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-[#171719] leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Four Selectable Option Cards */}
            <div className="grid grid-cols-1 gap-3.5 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleSelectOption(option.key)}
                    className={`group w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer relative ${
                      isSelected
                        ? "bg-[#D9D9F7]/25 border-[#477BFF] ring-1 ring-[#477BFF] shadow-sm"
                        : "bg-white border-[#171719]/10 hover:border-[#171719]/25 hover:bg-[#F8F7F4]/60"
                    }`}
                  >
                    {/* Letter Key Pill */}
                    <div
                      className={`h-9 w-9 shrink-0 rounded-xl flex items-center justify-center font-mono text-sm font-semibold transition-colors ${
                        isSelected
                          ? "bg-[#477BFF] text-white shadow-sm"
                          : "bg-[#F8F7F4] text-[#171719] border border-[#171719]/10 group-hover:border-[#171719]/25 group-hover:bg-white"
                      }`}
                    >
                      {option.key}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1 pt-1">
                      <p
                        className={`text-base sm:text-lg leading-relaxed transition-colors ${
                          isSelected
                            ? "text-[#171719] font-medium"
                            : "text-[#171719]/85 group-hover:text-[#171719]"
                        }`}
                      >
                        {option.text}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    <div className="shrink-0 pt-1.5">
                      <div
                        className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#477BFF] bg-[#477BFF] text-white"
                            : "border-[#171719]/20 bg-transparent group-hover:border-[#171719]/40"
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* In-viewport feedback hint */}
            {!isCurrentAnswered && (
              <p className="text-xs text-[#A6A6AC] font-mono flex items-center gap-1.5 pt-2">
                <HelpCircle className="h-3.5 w-3.5" />
                Select an option to enable navigation to the next question.
              </p>
            )}
          </div>

          {/* Bottom Navigation Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="w-full sm:w-auto h-12 px-6 rounded-full cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Question
            </Button>

            <div className="text-xs font-mono text-[#A6A6AC] hidden sm:block">
              Question {currentIndex + 1} of 24
            </div>

            {currentIndex < totalQuestions - 1 ? (
              <PrimaryButton
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className="w-full sm:w-auto h-12 px-8 rounded-full"
              >
                Next Question
                <ArrowRight className="h-4 w-4 ml-2" />
              </PrimaryButton>
            ) : (
              <Button
                variant="electric"
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className="w-full sm:w-auto h-12 px-8 rounded-full shadow-md cursor-pointer"
              >
                Review &amp; Submit Assessment
                <ShieldCheck className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. CONFIRMATION MODAL                                     */}
      {/* ========================================================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-[#171719]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg w-full border border-[#171719]/10 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[#D9D9F7]/50 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-[#477BFF]" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#171719]">
                  Ready to Submit Assessment?
                </h3>
                <p className="text-xs text-[#A6A6AC] font-mono mt-0.5">
                  FINAL VERIFICATION BEFORE EVALUATION
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-[#F8F7F4] p-5 border border-[#171719]/6 text-sm text-[#171719]/80">
              <div className="flex items-center justify-between pb-2 border-b border-[#171719]/8 text-xs font-mono">
                <span>Completed Scenarios:</span>
                <span className="font-semibold text-[#171719]">
                  {answeredCount} / {totalQuestions}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#171719]/70 pt-1">
                Upon submission, your responses will be locked and graded across all five threat domains. A full diagnostic Awareness Report with explanations for all 24 questions will be generated.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmModal(false)}
                className="w-full sm:w-auto h-11 px-5 cursor-pointer"
              >
                Return to Review
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitQuiz}
                className="w-full sm:w-auto h-11 px-6 bg-[#171719] text-white hover:bg-[#26262B] cursor-pointer"
              >
                Confirm &amp; Grade Responses
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. FINAL RESULTS STAGE                                    */}
      {/* ========================================================= */}
      {stage === "results" && evaluation && (
        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Header Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider">
                  OFFICIAL EVALUATION COMPLETE
                </span>
                <span className="font-mono text-xs text-[#A6A6AC]">
                  · 24 Scenarios Verified
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="text-xs font-mono cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5 mr-1.5" />
                  Print Report
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRetake}
                  className="text-xs font-mono cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Retake Quiz
                </Button>
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[#171719] tracking-tight">
              Your Awareness Report
            </h1>
            <p className="text-base sm:text-lg text-[#171719]/70 max-w-2xl">
              Comprehensive diagnostic of your ability to recognize audio deepfakes, synthetic video manipulation, phishing urgencies, and next-generation impersonation.
            </p>
          </div>

          {/* Primary Score Hero Card */}
          <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#171719]/8 shadow-editorial-card relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Score Column */}
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-xs uppercase text-[#A6A6AC] tracking-wider">
                  ASSESSMENT COMPOSITE
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-semibold text-[#171719] tracking-tight">
                    {evaluation.score}
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-2xl sm:text-3xl font-display text-[#A6A6AC]">
                      / 24
                    </span>
                    <p className="font-mono text-xs font-semibold text-[#477BFF]">
                      {evaluation.percentage}% ACCURACY
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {evaluation.score} Correct
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 border border-rose-200">
                    <XCircle className="h-3.5 w-3.5" /> {evaluation.incorrectCount} Incorrect
                  </span>
                </div>
              </div>

              {/* Right Performance Tier Column */}
              <div className="lg:col-span-7 lg:border-l lg:border-[#171719]/8 lg:pl-8 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${evaluation.tier.accentColor}15`,
                    color: evaluation.tier.accentColor,
                    borderColor: `${evaluation.tier.accentColor}30`,
                    borderWidth: 1,
                  }}
                >
                  <Award className="h-3.5 w-3.5" />
                  {evaluation.tier.level}
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#171719]">
                  {evaluation.tier.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#171719]/75 leading-relaxed">
                  {evaluation.tier.description}
                </p>

                <p className="text-xs text-[#A6A6AC] italic pt-1">
                  Educational performance tier for personal awareness and digital safety training.
                </p>
              </div>
            </div>
          </div>

          {/* Category-Wise Performance Breakdown */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#171719]/8">
              <div>
                <h3 className="font-display text-2xl font-medium text-[#171719]">
                  Category-Wise Performance
                </h3>
                <p className="text-sm text-[#171719]/65">
                  Detailed breakdown across all five assessed threat dimensions.
                </p>
              </div>
              <span className="font-mono text-xs text-[#A6A6AC]">
                5 EVALUATED DOMAINS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evaluation.categoryResults.map((catResult) => {
                const isStrong = catResult.status === "strong";
                const isModerate = catResult.status === "moderate";

                return (
                  <div
                    key={catResult.category.id}
                    className="rounded-2xl bg-[#F8F7F4]/60 p-5 border border-[#171719]/6 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#A6A6AC]">
                          {catResult.category.badge}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-medium ${
                            isStrong
                              ? "bg-emerald-100 text-emerald-800"
                              : isModerate
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {catResult.percentage}%
                        </span>
                      </div>

                      <h4 className="font-display text-base font-semibold text-[#171719]">
                        {catResult.category.shortTitle}
                      </h4>
                      <p className="text-xs text-[#171719]/60 mt-1 line-clamp-2">
                        {catResult.category.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#A6A6AC]">Score</span>
                        <span className="font-semibold text-[#171719]">
                          {catResult.score} / {catResult.total}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#171719]/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isStrong
                              ? "bg-emerald-500"
                              : isModerate
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${catResult.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What You Did Well & Where You Can Improve (Dual Editorial Panels) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* What You Did Well */}
            <div className="rounded-3xl bg-white p-7 sm:p-9 border border-[#171719]/8 shadow-editorial-card space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#171719]">
                    What You Did Well
                  </h3>
                  <p className="text-xs text-[#A6A6AC]">
                    Demonstrated proficiencies and verified defenses
                  </p>
                </div>
              </div>

              {evaluation.strongCategories.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs text-[#171719]/70 leading-relaxed">
                    You demonstrated robust awareness in {evaluation.strongCategories.length} core area
                    {evaluation.strongCategories.length > 1 ? "s" : ""}:
                  </p>
                  <ul className="space-y-2.5">
                    {evaluation.strongCategories.map((sc) => (
                      <li
                        key={sc.category.id}
                        className="rounded-xl bg-[#F8F7F4] p-3 border border-[#171719]/6 flex items-start gap-2.5 text-xs text-[#171719]/80"
                      >
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-[#171719]">
                            {sc.category.shortTitle}:
                          </strong>{" "}
                          Scored {sc.score}/{sc.total} ({sc.percentage}%). Excellent grasp of {sc.category.description.toLowerCase()}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rounded-xl bg-[#F8F7F4] p-4 border border-[#171719]/6 text-xs text-[#171719]/70 leading-relaxed">
                  While you faced challenges across multiple threat categories, completing this 24-question benchmark represents a critical first step toward building proactive digital reflexes. Review the detailed explanations below to reinforce your defensive framework.
                </div>
              )}
            </div>

            {/* Where You Can Improve */}
            <div className="rounded-3xl bg-white p-7 sm:p-9 border border-[#171719]/8 shadow-editorial-card space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#171719]/8">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#171719]">
                    Where You Can Improve
                  </h3>
                  <p className="text-xs text-[#A6A6AC]">
                    Vulnerabilities and recommended verification habits
                  </p>
                </div>
              </div>

              {evaluation.improvementCategories.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs text-[#171719]/70 leading-relaxed">
                    Targeted vigilance is recommended in {evaluation.improvementCategories.length} domain
                    {evaluation.improvementCategories.length > 1 ? "s" : ""}:
                  </p>
                  <ul className="space-y-2.5">
                    {evaluation.improvementCategories.map((ic) => (
                      <li
                        key={ic.category.id}
                        className="rounded-xl bg-[#F8F7F4] p-3 border border-[#171719]/6 flex items-start gap-2.5 text-xs text-[#171719]/80"
                      >
                        <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <div>
                          <strong className="font-semibold text-[#171719]">
                            {ic.category.shortTitle}:
                          </strong>{" "}
                          Scored {ic.score}/{ic.total} ({ic.percentage}%). Prioritize establishing independent verification channels and never trust audio or video alone in urgent scenarios.
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rounded-xl bg-emerald-50/60 p-4 border border-emerald-200 text-xs text-emerald-900 leading-relaxed space-y-2">
                  <p className="font-semibold">Flawless Forensic Awareness (24/24)</p>
                  <p>
                    You demonstrated pristine recognition across all modern voice cloning, video manipulation, executive impersonation, and next-generation social engineering vectors. You are exceptionally well-equipped to serve as a digital safety anchor for your peers and family.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Full Question-by-Question Review */}
          <div className="rounded-3xl bg-white p-7 sm:p-10 border border-[#171719]/8 shadow-editorial-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171719]/8">
              <div>
                <h3 className="font-display text-2xl font-medium text-[#171719]">
                  Comprehensive Question Review
                </h3>
                <p className="text-sm text-[#171719]/65">
                  Examine your chosen responses alongside expert forensic rationales for all 24 scenarios.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 rounded-full bg-[#F8F7F4] p-1 border border-[#171719]/10 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setReviewFilter("all")}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    reviewFilter === "all"
                      ? "bg-[#171719] text-white shadow-sm"
                      : "text-[#171719]/70 hover:text-[#171719]"
                  }`}
                >
                  All (24)
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter("correct")}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    reviewFilter === "correct"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-[#171719]/70 hover:text-[#171719]"
                  }`}
                >
                  Correct ({evaluation.score})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter("incorrect")}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    reviewFilter === "incorrect"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-[#171719]/70 hover:text-[#171719]"
                  }`}
                >
                  Incorrect ({evaluation.incorrectCount})
                </button>
              </div>
            </div>

            {/* Filtered Question List */}
            <div className="space-y-4 pt-2">
              {evaluation.reviewedQuestions
                .filter((q) => {
                  if (reviewFilter === "correct") return q.isCorrect;
                  if (reviewFilter === "incorrect") return !q.isCorrect;
                  return true;
                })
                .map((q) => {
                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl p-6 border transition-all space-y-4 ${
                        q.isCorrect
                          ? "bg-white border-[#171719]/8"
                          : "bg-rose-50/20 border-rose-200/80"
                      }`}
                    >
                      {/* Question Header & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#171719] text-white">
                            QUESTION {String(q.number).padStart(2, "0")}
                          </span>
                          <span className="text-xs font-mono text-[#A6A6AC]">
                            {q.categoryShortTitle}
                          </span>
                        </div>

                        {q.isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                            <CheckCircle2 className="h-3.5 w-3.5" /> CORRECT (+1)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full">
                            <XCircle className="h-3.5 w-3.5" /> INCORRECT (0)
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <p className="font-display text-lg sm:text-xl font-medium text-[#171719] leading-snug">
                        {q.question}
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt) => {
                          const isUserChoice = opt.key === q.userAnswer;
                          const isCorrectChoice = opt.key === q.correctAnswer;

                          let cardClasses = "bg-[#F8F7F4]/60 border-[#171719]/8 text-[#171719]/70";
                          if (isCorrectChoice) {
                            cardClasses = "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium";
                          } else if (isUserChoice && !q.isCorrect) {
                            cardClasses = "bg-rose-50 border-rose-300 text-rose-900 line-through opacity-80";
                          }

                          return (
                            <div
                              key={opt.key}
                              className={`p-3 rounded-xl border flex items-start gap-2.5 ${cardClasses}`}
                            >
                              <span className="font-mono font-bold shrink-0">{opt.key}.</span>
                              <span className="leading-relaxed flex-1">{opt.text}</span>
                              {isCorrectChoice && (
                                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                              )}
                              {isUserChoice && !q.isCorrect && (
                                <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Forensic Explanation Box */}
                      <div className="rounded-xl bg-[#F8F7F4] p-4 border border-[#171719]/8 text-xs leading-relaxed text-[#171719]/80 space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#477BFF] uppercase tracking-wider">
                          <Lightbulb className="h-3.5 w-3.5" />
                          DEFENSIVE FORENSIC RATIONALE
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Action CTAs: Retake Quiz & Explore Learning Centre */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#171719]/8 shadow-editorial-card flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-display text-xl font-semibold text-[#171719]">
                Deepen Your Synthetic Media Literacy
              </h4>
              <p className="text-xs sm:text-sm text-[#171719]/65">
                Explore technical guides on neural vocoders, video artifacts, and verification protocols in the Learning Centre.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleRetake}
                className="w-full sm:w-auto h-12 px-6 rounded-full cursor-pointer"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              <Link href="/explore" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#171719] text-white hover:bg-[#26262B] cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 mr-2 text-[#B9A8E8]" />
                  Explore Learning Centre
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
