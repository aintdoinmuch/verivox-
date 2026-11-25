import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatCapsuleProps {
  statNumber?: string;
  statLabel?: string;
  headline?: string;
  description?: string;
  tagline?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

export function StatCapsule({
  statNumber = "99.8%",
  statLabel = "VOICE SYNTHESIS ACCURACY",
  headline = "Voice signatures analyzed.",
  description = "Zero false assurances in critical security triage.",
  tagline = "VERIVOX · NEURAL DEFENSE ENGINE",
  className,
}: StatCapsuleProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-editorial-floating border border-[#171719]/8 transition-all hover:shadow-2xl",
        className
      )}
    >
      {/* Background Soft Ambient Gradient Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#D9D9F7]/40 via-[#B9A8E8]/20 to-[#B9E8F2]/30 blur-3xl" />

      {/* Left Stat Ring & Number */}
      <div className="relative flex items-center gap-6">
        <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-full border-2 border-[#171719]/10 bg-[#F8F7F4]/60 p-2 shadow-inner">
          {/* Subtle Outer Gradient Accent Track */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#477BFF] border-r-[#B9A8E8] -rotate-45" />

          <div className="text-center">
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] block">
              {statNumber}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#A6A6AC] font-semibold block mt-0.5">
              {statLabel}
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-md">
          <h4 className="font-display text-lg sm:text-xl font-semibold text-[#171719] tracking-tight leading-snug">
            {headline}
          </h4>
          <p className="text-sm text-[#A6A6AC] mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Right Micro Tag */}
      <div className="self-end md:self-center shrink-0">
        <span className="inline-block rounded-full bg-[#171719]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#A6A6AC]">
          {tagline}
        </span>
      </div>
    </div>
  );
}
