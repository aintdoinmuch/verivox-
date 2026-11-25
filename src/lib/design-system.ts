/**
 * VERIVOX AI - Editorial Technology Design System
 * Inspired by high-fashion editorial digital registries (Soft Ivory, Pure White, Charcoal, Lavender, Electric Blue)
 */

export const DESIGN_TOKENS = {
  colors: {
    ivory: "#F8F7F4", // Soft Ivory (primary canvas)
    white: "#FFFFFF", // Pure White (cards, pills, elevated panels)
    charcoal: "#171719", // Deep Charcoal (headings, dark contrast, pill buttons)
    lavender: "#B9A8E8", // Signature Lavender (subtle highlights, point cloud dots)
    electricBlue: "#477BFF", // Electric Blue (primary interactions, radiant glows)
    periwinkle: "#D9D9F7", // Soft Periwinkle (tinted surfaces, badges)
    lightCyan: "#B9E8F2", // Light Cyan (spectrogram waveforms, audio frequency)
    mutedGrey: "#A6A6AC", // Muted Grey (editorial metadata, secondary phrases)
  },
  typography: {
    fontDisplay: "var(--font-display)",
    fontSans: "var(--font-sans)",
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  editorial: {
    registryTag: "PUBLIC DEFENSE ARCHIVE · EST. 2026",
    codeMarker: "[ VRVX-BIO.SEC ]",
    systemStatus: "ACTIVE PROTOCOL",
  },
} as const;

export type DesignTokenColors = typeof DESIGN_TOKENS.colors;
