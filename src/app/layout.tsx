import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { PROJECT_INFO } from "@/lib/constants";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${PROJECT_INFO.name} | Voice-Cloning & Deepfake Defense`,
    template: `%s | ${PROJECT_INFO.name}`,
  },
  description: PROJECT_INFO.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F4] text-[#171719] font-sans selection:bg-[#B9A8E8]/30 selection:text-[#171719]">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />

        {/* Botpress Chatbot Integration */}
        <Script
          src="https://cdn.botpress.cloud/webchat/v5.0/inject.js"
          strategy="afterInteractive"
        />

        <Script
          src="https://files.bpcontent.cloud/2026/11/24/11/20261124110236-5YNSVRCA.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
