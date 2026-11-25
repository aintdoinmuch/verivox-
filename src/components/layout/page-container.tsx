import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
  padded?: boolean;
}

export function PageContainer({
  size = "default",
  padded = true,
  className,
  children,
  ...props
}: PageContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        padded && "px-6 sm:px-8 lg:px-12 xl:px-16",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
