import * as React from "react";
import Link from "next/link";
import { PROJECT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface BrandMarkProps {
  className?: string;
  showSubtitle?: boolean;
}

export function BrandMark({ className, showSubtitle = true }: BrandMarkProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 select-none",
        className
      )}
    >
      {/* Abstract Soundwave/Shield Brand Icon */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#171719] text-white shadow-sm transition-transform duration-300 group-hover:scale-105 border border-[#171719]">
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          aria-hidden="true"
        >
          {/* Shield Outline Path */}
          <path
            d="M14 2.5C9.5 5 5 5 5 8.5C5 15.5 8.5 21.5 14 25.5C19.5 21.5 23 15.5 23 8.5C23 5 18.5 5 14 2.5Z"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />
          {/* Soundwave Bars forming the inner shield resonance */}
          <rect
            x="8"
            y="10.5"
            width="2"
            height="7"
            rx="1"
            fill="#B9E8F2"
            className="transition-all duration-300 group-hover:h-9 group-hover:y-9.5"
          />
          <rect
            x="11"
            y="7.5"
            width="2"
            height="13"
            rx="1"
            fill="#B9A8E8"
          />
          <rect
            x="14"
            y="5"
            width="2"
            height="18"
            rx="1"
            fill="#FFFFFF"
          />
          <rect
            x="17"
            y="7.5"
            width="2"
            height="13"
            rx="1"
            fill="#477BFF"
          />
          <rect
            x="20"
            y="10.5"
            width="2"
            height="7"
            rx="1"
            fill="#B9E8F2"
            className="transition-all duration-300 group-hover:h-9 group-hover:y-9.5"
          />
        </svg>

        {/* Small Ambient Glow underneath icon */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#477BFF]/30 to-[#B9A8E8]/30 blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-lg font-bold tracking-tight text-[#171719]">
            {PROJECT_INFO.name}
          </span>
          <span className="rounded-full bg-[#171719] px-1.5 py-0.2 font-mono text-[9px] font-semibold text-[#F8F7F4] uppercase tracking-wider">
            DEFENSE
          </span>
        </div>
        {showSubtitle && (
          <span className="font-mono text-[10px] text-[#A6A6AC] tracking-wider uppercase">
            DEEPFAKE &amp; VOICE DEFENSE
          </span>
        )}
      </div>
    </Link>
  );
}
