import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric)] disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Signature primary dark charcoal editorial pill button
        primary:
          "bg-[#171719] text-[#F8F7F4] rounded-full hover:bg-[#26262B] active:scale-[0.98] shadow-sm",
        charcoal:
          "bg-[#171719] text-[#F8F7F4] rounded-full hover:bg-[#26262B] active:scale-[0.98] shadow-sm",
        // Secondary soft white elevated pill button with subtle border
        secondary:
          "bg-[#FFFFFF] text-[#171719] border border-[#171719]/10 rounded-full hover:bg-[#F8F7F4] active:scale-[0.98] shadow-[0_4px_20px_rgba(23,23,25,0.04)]",
        white:
          "bg-[#FFFFFF] text-[#171719] border border-[#171719]/10 rounded-full hover:bg-[#F8F7F4] active:scale-[0.98] shadow-[0_4px_20px_rgba(23,23,25,0.04)]",
        // Lavender accent pill
        lavender:
          "bg-[#B9A8E8] text-[#171719] font-semibold rounded-full hover:bg-[#A996DC] active:scale-[0.98]",
        // Electric blue pill
        electric:
          "bg-[#477BFF] text-white font-medium rounded-full hover:bg-[#3B6AE0] active:scale-[0.98] shadow-sm",
        // Minimalist circular navigation arrow button (like in reference gallery)
        circle:
          "rounded-full border border-[#171719]/15 bg-white text-[#171719] hover:bg-[#171719] hover:text-[#F8F7F4] active:scale-95 transition-colors",
        // Outline pill
        outline:
          "border border-[#171719]/15 text-[#171719] rounded-full hover:bg-[#171719]/5",
        // Ghost
        ghost:
          "text-[#171719] hover:bg-[#171719]/5 rounded-full",
        // Link
        link:
          "text-[#171719] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs tracking-wide",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11 p-0 rounded-full",
        iconSm: "h-8 w-8 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Explicit Reusable Primary Button
export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <Button ref={ref} variant={variant} className={className} {...props} />
  )
);
PrimaryButton.displayName = "PrimaryButton";

// Explicit Reusable Secondary Button
export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", ...props }, ref) => (
    <Button ref={ref} variant={variant} className={className} {...props} />
  )
);
SecondaryButton.displayName = "SecondaryButton";

export { Button, buttonVariants };
