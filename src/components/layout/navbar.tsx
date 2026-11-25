"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/button";
import { BrandMark } from "@/components/layout/brand-mark";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // All 7 primary routes accessible in center navigation
  const centerNavItems = NAV_ITEMS;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#171719]/6 transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Left: VoiceGuard AI Logo & Abstract Soundwave/Shield Brand Mark */}
          <div className="flex items-center">
            <BrandMark />
          </div>

          {/* Centre: Main Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5">
            {centerNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 rounded-full select-none",
                    isActive
                      ? "text-[#171719] bg-[#171719]/8 font-semibold shadow-xs"
                      : "text-[#171719]/75 hover:text-[#171719] hover:bg-[#171719]/5"
                  )}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-1.5 rounded-full bg-[#D9D9F7] px-1.5 py-0.5 text-[9px] font-semibold text-[#171719]">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#477BFF]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Detection Centre button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <PrimaryButton
                asChild
                size="sm"
                className="gap-2 px-5 py-2.5 rounded-full font-medium tracking-wide text-xs shadow-sm hover:shadow-md transition-all"
              >
                <Link href="/checker">
                  <span>Detection Centre</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                </Link>
              </PrimaryButton>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-[#171719]/15 bg-white text-[#171719] shadow-sm hover:bg-[#171719] hover:text-[#F8F7F4] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
