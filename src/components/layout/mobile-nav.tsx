"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ShieldCheck, X } from "lucide-react";
import { NAV_ITEMS, PROJECT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/button";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Close when pathname changes
  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-[#171719]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-down Drawer Panel */}
      <div className="fixed inset-x-0 top-0 max-h-[90vh] overflow-y-auto bg-[#F8F7F4] border-b border-[#171719]/10 p-6 sm:p-8 shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between pb-6 border-b border-[#171719]/8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#A6A6AC]">
              VERIVOX NAVIGATION SYSTEM
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#171719]/15 bg-white text-[#171719] shadow-sm hover:bg-[#171719] hover:text-[#F8F7F4] transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Links List */}
        <nav className="py-6 space-y-1">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center justify-between py-3.5 px-4 rounded-2xl transition-all duration-200",
                  isActive
                    ? "bg-[#171719] text-[#F8F7F4] font-semibold"
                    : "text-[#171719] hover:bg-white hover:shadow-sm"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#A6A6AC] w-5">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-lg tracking-tight">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        isActive
                          ? "bg-white/20 text-[#F8F7F4]"
                          : "bg-[#D9D9F7] text-[#171719]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                      isActive ? "text-[#F8F7F4]" : "text-[#A6A6AC]"
                    )}
                  />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Primary CTA Button */}
        <div className="pt-4 pb-2 border-t border-[#171719]/8 space-y-3">
          <PrimaryButton asChild className="w-full justify-between h-12 px-6 rounded-full">
            <Link href="/checker" onClick={onClose}>
              <span className="font-medium text-sm">Detection Centre</span>
              <ArrowUpRight className="h-4 w-4 opacity-80" />
            </Link>
          </PrimaryButton>

          <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-[#A6A6AC] font-mono">
            <span>{PROJECT_INFO.fullBrand}</span>
            <span className="flex items-center gap-1 text-[#171719]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#477BFF]" />
              EST. 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
