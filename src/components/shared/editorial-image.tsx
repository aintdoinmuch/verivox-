"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface EditorialImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  withPointMatrix?: boolean;
  matrixVariant?: "lavender" | "white" | "dual";
}

export function EditorialImage({
  src,
  alt,
  width = 800,
  height = 900,
  className,
  containerClassName,
  priority = false,
  withPointMatrix = false,
  matrixVariant = "lavender",
}: EditorialImageProps) {
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const matrixClasses = {
    lavender: "bg-[radial-gradient(rgba(185,168,232,0.65)_1.2px,transparent_1.2px)] [background-size:12px_12px]",
    white: "bg-[radial-gradient(rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:10px_10px]",
    dual: "bg-[radial-gradient(rgba(185,168,232,0.5)_1px,transparent_1px),radial-gradient(rgba(71,123,255,0.3)_1px,transparent_1px)] [background-size:14px_14px]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-[#EFEFEA] select-none",
        containerClassName
      )}
    >
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-700",
            !isLoaded && "scale-105 blur-sm opacity-60",
            isLoaded && "scale-100 blur-0 opacity-100",
            className
          )}
        />
      ) : (
        /* Fallback Graphic Pattern if offline */
        <div className="flex h-full w-full min-h-[300px] flex-col items-center justify-center bg-gradient-to-tr from-[#D9D9F7]/40 via-[#B9A8E8]/20 to-[#B9E8F2]/30 p-8 text-center">
          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-[#171719]/10">
            <span className="font-display font-bold text-lg text-[#171719]">VG</span>
          </div>
          <span className="font-display font-semibold text-sm text-[#171719] max-w-xs">
            {alt}
          </span>
          <span className="font-mono text-[10px] text-[#A6A6AC] mt-1">
            BIO-ACOUSTIC PROVENANCE ARCHIVE
          </span>
        </div>
      )}

      {/* Signature Point Cloud Matrix Overlay */}
      {withPointMatrix && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 mix-blend-screen opacity-70",
            matrixClasses[matrixVariant]
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
