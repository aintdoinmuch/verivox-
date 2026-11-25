// Verivox AI - Mobile Editorial Design Tokens

export const Colors = {
  background: "#F8F7F4", // Soft Ivory
  surface: "#FFFFFF",    // Pure White Card
  surfaceHover: "#F0EFEA",
  surfaceMuted: "#ECEAE4",
  border: "rgba(23, 23, 25, 0.08)",
  borderActive: "rgba(23, 23, 25, 0.2)",
  
  // Text
  text: "#171719",       // Deep Charcoal
  textSecondary: "#66666E",
  textMuted: "#8E8E93",
  textInverse: "#FFFFFF",
  
  // Brand Accents
  accent: "#477BFF",     // Electric Blue
  accentLight: "#EEF3FF",
  accentDark: "#2654D9",
  
  lavender: "#8F75D8",   // Editorial Lavender
  lavenderLight: "#F5F2FC",
  
  // Status & Threat Levels
  safe: "#10B981",       // Emerald Green
  safeLight: "#ECFDF5",
  safeBorder: "rgba(16, 185, 129, 0.3)",
  
  warning: "#D97706",    // Amber
  warningLight: "#FFFBEB",
  warningBorder: "rgba(217, 119, 6, 0.3)",
  
  danger: "#DC2626",     // Crimson Red
  dangerLight: "#FEF2F2",
  dangerBorder: "rgba(220, 38, 38, 0.3)",
  
  darkCard: "#171719",
  darkCardBorder: "#2E2E33",
};

export const Shadows = {
  sm: {
    shadowColor: "#171719",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#171719",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
};
