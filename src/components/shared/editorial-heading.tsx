import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface EditorialHeadingProps {
  sectionIndex?: string; // e.g. "( 01 )" or "( ORIGIN )"
  categoryTag?: string; // e.g. "ABOUT US" or "VOICE DEFENSE"
  primaryTitle: string; // e.g. "Every voice has an identity."
  secondaryTitle?: string; // e.g. "now verifiable everywhere." (rendered in soft muted grey/gradient)
  description?: string;
  align?: "left" | "center";
  size?: "default" | "hero" | "compact";
  className?: string;
}

export function EditorialHeading({
  sectionIndex,
  categoryTag,
  primaryTitle,
  secondaryTitle,
  description,
  align = "left",
  size = "default",
  className,
}: EditorialHeadingProps) {
  const isCenter = align === "center";

  const sizeClasses = {
    hero: "text-4xl sm:text-6xl lg:text-7xl leading-[1.05]",
    default: "text-3xl sm:text-5xl lg:text-6xl leading-[1.1]",
    compact: "text-2xl sm:text-3xl lg:text-4xl leading-[1.2]",
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-4xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {/* Top Metadata Row: Section Index & Category Tag */}
      {(sectionIndex || categoryTag) && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4 sm:mb-6",
            isCenter ? "justify-center" : "justify-between sm:justify-start"
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
      <h2
        className={cn(
          "font-display font-medium tracking-tight text-[#171719]",
          sizeClasses[size]
        )}
      >
        <span>{primaryTitle}</span>
        {secondaryTitle && (
          <span className="block text-[#171719]">
            {secondaryTitle}
          </span>
        )}
      </h2>

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
