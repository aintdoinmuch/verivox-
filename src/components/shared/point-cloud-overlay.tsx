"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PointCloudOverlayProps {
  density?: "sparse" | "normal" | "dense";
  color?: "white" | "lavender" | "charcoal" | "dual";
  className?: string;
  children?: React.ReactNode;
}

export function PointCloudOverlay({
  density = "normal",
  color = "lavender",
  className,
  children,
}: PointCloudOverlayProps) {
  const densityStyles = {
    sparse: "bg-[radial-gradient(#B9A8E8_1px,transparent_1px)] [background-size:20px_20px]",
    normal: "bg-[radial-gradient(#B9A8E8_1.2px,transparent_1.2px)] [background-size:12px_12px]",
    dense: "bg-[radial-gradient(#B9A8E8_1.5px,transparent_1.5px)] [background-size:8px_8px]",
  };

  const colorStyles = {
    white: "bg-[radial-gradient(rgba(255,255,255,0.75)_1px,transparent_1px)]",
    lavender: "bg-[radial-gradient(rgba(185,168,232,0.65)_1.2px,transparent_1.2px)]",
    charcoal: "bg-[radial-gradient(rgba(23,23,25,0.18)_1.2px,transparent_1.2px)]",
    dual: "bg-[radial-gradient(rgba(185,168,232,0.5)_1px,transparent_1px),radial-gradient(rgba(71,123,255,0.3)_1px,transparent_1px)] [background-position:0_0,6px_6px]",
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      {/* Point-cloud matrix dot mask overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 mix-blend-multiply opacity-80",
          colorStyles[color],
          densityStyles[density]
        )}
        aria-hidden="true"
      />
    </div>
  );
}
