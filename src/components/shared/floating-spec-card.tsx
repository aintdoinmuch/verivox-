import * as React from "react";
import { ArrowUpRight, ShieldCheck, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface FloatingSpecCardProps {
  idCode?: string;
  category?: string;
  title?: string;
  subtitle?: string;
  metadata?: Array<{ label: string; value: string }>;
  verifiedBadge?: string;
  footerNote?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function FloatingSpecCard({
  idCode = "VRVX-0918",
  category = "Voice Sample · Deepfake Analysis",
  title = "Synthetic Cadence Match",
  subtitle = "Recorded Audio · 48kHz Spectrogram",
  metadata = [
    { label: "Vector type", value: "Generative Neural TTS" },
    { label: "Acoustic layers", value: "8 - anomalies present" },
    { label: "Confidence", value: "94.2% Synthetic" },
    { label: "Last verified", value: "2m ago" },
  ],
  verifiedBadge = "New signature verified",
  footerNote = "Each spectrogram layer is signed by neural verification. Immutable record.",
  actionText = "Inspect Record",
  onAction,
  className,
}: FloatingSpecCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full max-w-sm rounded-3xl bg-white p-5 sm:p-6 shadow-editorial-floating border border-[#171719]/8 transition-all duration-300 hover:shadow-2xl",
        className
      )}
    >
      {/* Top Header Row with Thumbnail & Status */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* Circular Spec Thumbnail */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#D9D9F7] via-[#B9A8E8] to-[#B9E8F2] p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[#171719]">
              <ShieldCheck className="h-5 w-5 text-[#477BFF]" />
            </div>
            {/* Small glowing dot */}
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display font-semibold text-sm text-[#171719] tracking-tight">
                {idCode}
              </h4>
            </div>
            <p className="text-[11px] text-[#A6A6AC] font-medium tracking-tight">
              {category}
            </p>
          </div>
        </div>

        {/* Live badge */}
        <Badge variant="liveStatus" dotColor="emerald" className="text-[10px] shrink-0">
          {verifiedBadge}
        </Badge>
      </div>

      {/* Main Feature Info */}
      <div className="mb-4">
        <h5 className="font-display text-base font-semibold text-[#171719] leading-snug">
          {title}
        </h5>
        <p className="text-xs text-[#A6A6AC] mt-0.5">{subtitle}</p>
      </div>

      {/* Key-Value Metadata Grid (Inspired by the Reference UI) */}
      <div className="space-y-1.5 py-3 border-y border-[#171719]/6 text-xs mb-4">
        {metadata.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-[#A6A6AC] font-medium">{item.label}</span>
            <span className="font-medium text-[#171719] font-mono text-[11px]">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-2 mb-3">
        <Button
          variant="charcoal"
          size="sm"
          className="flex-1 justify-between font-normal text-xs"
          onClick={onAction}
        >
          <span>{actionText}</span>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
        </Button>
        <Button
          variant="white"
          size="sm"
          className="px-3"
          aria-label="Share record"
        >
          <Share2 className="h-3.5 w-3.5 text-[#A6A6AC]" />
        </Button>
      </div>

      {/* Subtle Footer Note */}
      <p className="text-[10px] text-[#A6A6AC] leading-relaxed">
        {footerNote}
      </p>
    </div>
  );
}
