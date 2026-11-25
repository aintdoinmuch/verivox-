import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, PhoneCall, ShieldCheck, HeartHandshake, FileText } from "lucide-react";
import { NAV_ITEMS, PROJECT_INFO, EMERGENCY_CONTACTS } from "@/lib/constants";
import { BrandMark } from "@/components/layout/brand-mark";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[#171719]/8 bg-[#F8F7F4] pt-20 pb-12 overflow-hidden select-none">
      {/* Background Soft Ambient Radial Wash */}
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-[#D9D9F7]/30 via-[#B9A8E8]/15 to-[#B9E8F2]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Top Header: VoiceGuard AI Branding & Description */}
        <div className="pb-16 border-b border-[#171719]/8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-xl">
              <BrandMark className="mb-4" />
              <p className="text-sm text-[#171719]/75 font-sans leading-relaxed">
                {PROJECT_INFO.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-mono text-xs text-[#171719] border border-[#171719]/8 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>PROTOCOL: {PROJECT_INFO.version}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9D9F7]/50 px-3.5 py-1.5 font-mono text-xs text-[#171719] border border-[#B9A8E8]/30">
                <ShieldCheck className="h-3.5 w-3.5 text-[#477BFF]" />
                <span>ACADEMIC DEFENSE INITIATIVE</span>
              </span>
            </div>
          </div>
        </div>

        {/* Middle Navigation, Safety & Emergency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-[#171719]/8">
          {/* Col 1: Platform Navigation */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#171719] mb-4 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-[#477BFF]" />
              <span>PLATFORM ROUTES</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#171719]/75 hover:text-[#171719] hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-1 rounded-full bg-[#171719]/5 px-1.5 py-0.2 text-[9px] font-mono text-[#A6A6AC]">
                        {item.badge}
                      </span>
                    )}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Safety & Reporting Hotline 1 */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#171719] mb-4 flex items-center gap-2">
              <PhoneCall className="h-3.5 w-3.5 text-rose-500" />
              <span>INCIDENT REPORTING</span>
            </h4>
            <div className="space-y-3">
              {EMERGENCY_CONTACTS.slice(0, 2).map((contact) => (
                <div
                  key={contact.region}
                  className="rounded-2xl border border-[#171719]/8 bg-white p-3.5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#171719]">
                    <span>{contact.region}</span>
                    <a
                      href={`tel:${contact.hotline.replace(/[^0-9]/g, "")}`}
                      className="font-mono text-[11px] text-[#477BFF] hover:underline"
                    >
                      {contact.hotline}
                    </a>
                  </div>
                  <p className="text-[10px] text-[#A6A6AC] mt-1 leading-normal truncate">
                    {contact.agency}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: International Cybercrime Portals */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#171719] mb-4 flex items-center gap-2">
              <HeartHandshake className="h-3.5 w-3.5 text-emerald-500" />
              <span>GLOBAL HOTLINES</span>
            </h4>
            <div className="space-y-3">
              {EMERGENCY_CONTACTS.slice(2).map((contact) => (
                <div
                  key={contact.region}
                  className="rounded-2xl border border-[#171719]/8 bg-white p-3.5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#171719]">
                    <span>{contact.region}</span>
                    <span className="font-mono text-[11px] text-[#477BFF]">
                      {contact.hotline}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#A6A6AC] mt-1 leading-normal truncate">
                    {contact.agency}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Institutional Attribution */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#171719] mb-4">
              RESEARCH ARCHIVE
            </h4>
            <div className="rounded-2xl border border-[#171719]/8 bg-white/70 p-4 space-y-2">
              <span className="font-mono text-[10px] uppercase text-[#A6A6AC] block">
                {PROJECT_INFO.academicYear} ACADEMIC INITIATIVE
              </span>
              <p className="font-display font-semibold text-xs text-[#171719] leading-snug">
                {PROJECT_INFO.institution}
              </p>
              <p className="text-[11px] text-[#A6A6AC] leading-relaxed">
                Thesis researching adversarial social engineering and synthetic audio heuristics.
              </p>
              <div className="pt-2">
                <Link
                  href="/api/health"
                  target="_blank"
                  className="font-mono text-[10px] text-[#477BFF] hover:underline inline-flex items-center gap-1"
                >
                  <span>Diagnostics JSON API</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Project Disclaimer Section */}
        <div className="py-8 border-b border-[#171719]/8">
          <p className="text-xs text-[#A6A6AC] leading-relaxed max-w-4xl">
            <strong className="text-[#171719] font-medium">Research Disclaimer: </strong>
            {PROJECT_INFO.disclaimer}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Security Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A6A6AC]">
          <div className="flex items-center gap-2">
            <span>© 2026 {PROJECT_INFO.fullBrand}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link href="/safety" className="hover:text-[#171719] transition-colors">
              Safety Protocols
            </Link>
            <span>·</span>
            <Link href="/about" className="hover:text-[#171719] transition-colors">
              Research Ethics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
