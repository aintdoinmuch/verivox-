"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface WaveformVisualizerProps {
  barCount?: number;
  height?: number;
  interactive?: boolean;
  active?: boolean;
  className?: string;
  variant?: "lavender" | "electric" | "cyan" | "gradient";
}

// Pre-defined deterministic integer heights (0-100%) to guarantee 100% SSR-client hydration match
const DETERMINISTIC_HEIGHTS = [
  32, 48, 65, 82, 94, 88, 72, 54, 40, 58, 76, 92, 85, 68, 50, 36, 48, 64,
  80, 96, 84, 70, 52, 38, 46, 62, 78, 90, 82, 66, 48, 34, 44, 60, 75, 88,
  95, 82, 68, 50, 36, 45, 62, 78, 86, 72, 55, 40, 50, 65, 80, 92, 85, 70
];

export function WaveformVisualizer({
  barCount = 36,
  height = 48,
  active = true,
  className,
  variant = "gradient",
}: WaveformVisualizerProps) {
  const variantBarClasses = {
    lavender: "bg-[#B9A8E8]",
    electric: "bg-[#477BFF]",
    cyan: "bg-[#B9E8F2]",
    gradient: "bg-gradient-to-t from-[#B9A8E8] via-[#477BFF] to-[#B9E8F2]",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-[3px] sm:gap-1 px-2 py-1 select-none",
        className
      )}
      style={{ height: `${height}px` }}
      aria-label="Audio Spectrogram Waveform"
      suppressHydrationWarning
    >
      {Array.from({ length: barCount }, (_, i) => {
        const barHeight = DETERMINISTIC_HEIGHTS[i % DETERMINISTIC_HEIGHTS.length];
        const animDelay = (i % 8) * 120;
        const animDuration = 1400 + (i % 5) * 200;

        return (
          <span
            key={i}
            className={cn(
              "w-[3px] rounded-full transition-all duration-500",
              variantBarClasses[variant],
              active && "animate-pulse"
            )}
            style={{
              height: `${barHeight}%`,
              animationDelay: `${animDelay}ms`,
              animationDuration: `${animDuration}ms`,
            }}
            suppressHydrationWarning
          />
        );
      })}
    </div>
  );
}
