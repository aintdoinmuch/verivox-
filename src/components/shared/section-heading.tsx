import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface SectionHeadingProps {
  sectionIndex?: string; // e.g. "( 01 )"
  categoryTag?: string; // e.g. "AI SCAM CHECKER"
  title: string; // First line / primary title
  subtitle?: string; // Second line / muted or gradient continuation
  description?: string;
  align?: "left" | "center";
  size?: "hero" | "default" | "compact";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  sectionIndex,
  categoryTag,
  title,
  subtitle,
  description,
  align = "left",
  size = "default",
  as,
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  const sizeClasses = {
    hero: "text-4xl sm:text-6xl lg:text-7xl leading-[1.05]",
    default: "text-3xl sm:text-5xl lg:text-6xl leading-[1.1]",
    compact: "text-2xl sm:text-3xl lg:text-4xl leading-[1.2]",
  };

  // Determine semantic heading tag: explicit 'as' prop, or 'h1' for hero size, else 'h2'
  const HeadingTag = as || (size === "hero" ? "h1" : "h2");

  return (
    <div
      className={cn(
        "relative w-full max-w-4xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {/* Top Metadata Row */}
      {(sectionIndex || categoryTag) && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4 sm:mb-6",
            isCenter ? "justify-center" : "justify-start"
          )}
        >
          {categoryTag && (
            <Badge variant="dotPill" dotColor="charcoal">
              {categoryTag}
            </Badge>
          )}
          {sectionIndex && (
            <span className="font-mono text-xs tracking-widest text-[#A6A6AC]">
              {sectionIndex}
            </span>
          )}
        </div>
      )}

      {/* Main Two-Tone Heading */}
      <HeadingTag
        className={cn(
          "font-display font-medium tracking-tight text-[#171719]",
          sizeClasses[size]
        )}
      >
        <span>{title}</span>
        {subtitle && (
          <span className="block text-[#171719]">
            {subtitle}
          </span>
        )}
      </HeadingTag>

      {/* Editorial Description Text */}
      {description && (
        <p
          className={cn(
            "mt-4 sm:mt-6 text-base sm:text-lg text-[#171719]/70 leading-relaxed font-sans max-w-2xl",
            isCenter && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
