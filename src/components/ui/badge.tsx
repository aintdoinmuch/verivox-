import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 transition-colors select-none font-medium",
  {
    variants: {
      variant: {
        // Dot pill badge: "• ORIGIN TYPES (03)" / "• ABOUT US"
        dotPill:
          "rounded-full bg-[#171719]/5 px-3 py-1 text-xs text-[#171719] border border-[#171719]/10",
        // Live status pill: "• New layer signed 2m ago"
        liveStatus:
          "rounded-full bg-white px-3 py-1 text-xs text-[#171719] border border-[#171719]/10 shadow-[0_2px_12px_rgba(23,23,25,0.04)]",
        // Editorial bracket index: "( 01 )" / "( EURONIUM )"
        bracket:
          "text-xs tracking-widest text-[#A6A6AC] font-mono",
        // Periwinkle soft highlight badge
        periwinkle:
          "rounded-full bg-[#D9D9F7] text-[#171719] px-3 py-1 text-xs font-semibold",
        // Lavender highlight badge
        lavender:
          "rounded-full bg-[#B9A8E8]/30 text-[#171719] border border-[#B9A8E8]/40 px-3 py-1 text-xs font-semibold",
        // Charcoal solid badge
        charcoal:
          "rounded-full bg-[#171719] text-[#F8F7F4] px-3 py-1 text-xs font-medium",
        // Light Cyan frequency badge
        cyan:
          "rounded-full bg-[#B9E8F2]/40 text-[#171719] border border-[#B9E8F2]/60 px-3 py-1 text-xs",
        // Outline minimalist
        outline:
          "rounded-full border border-[#171719]/15 text-[#171719] px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "dotPill",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dotColor?: "emerald" | "lavender" | "electric" | "charcoal" | "rose";
}

function Badge({ className, variant, dotColor, children, ...props }: BadgeProps) {
  const dotColorClasses = {
    emerald: "bg-emerald-500",
    lavender: "bg-[#B9A8E8]",
    electric: "bg-[#477BFF]",
    charcoal: "bg-[#171719]",
    rose: "bg-rose-500",
  };

  const showDot = variant === "dotPill" || variant === "liveStatus";

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {showDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full inline-block",
            dotColor ? dotColorClasses[dotColor] : "bg-[#171719]"
          )}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
