import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={cn("flex items-center space-x-2 text-xs font-mono select-none", className)}
    >
      <Link
        href="/"
        className="text-[#A6A6AC] hover:text-[#171719] transition-colors uppercase tracking-wider"
      >
        INDEX
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <span className="text-[#A6A6AC]/60">/</span>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[#A6A6AC] hover:text-[#171719] transition-colors uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#171719] font-semibold uppercase tracking-wider">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
