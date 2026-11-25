import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

interface BadgeProps {
  label: string;
  variant?: "primary" | "safe" | "warning" | "danger" | "muted" | "lavender";
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = "primary" }) => {
  const getColors = () => {
    switch (variant) {
      case "safe":
        return { bg: Colors.safeLight, text: Colors.safe, border: Colors.safeBorder };
      case "warning":
        return { bg: Colors.warningLight, text: Colors.warning, border: Colors.warningBorder };
      case "danger":
        return { bg: Colors.dangerLight, text: Colors.danger, border: Colors.dangerBorder };
      case "lavender":
        return { bg: Colors.lavenderLight, text: Colors.lavender, border: "rgba(143, 117, 216, 0.2)" };
      case "muted":
        return { bg: Colors.surfaceMuted, text: Colors.textSecondary, border: Colors.border };
      default:
        return { bg: Colors.accentLight, text: Colors.accent, border: "rgba(71, 123, 255, 0.2)" };
    }
  };

  const styleColors = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: styleColors.bg, borderColor: styleColors.border }]}>
      <Text style={[styles.text, { color: styleColors.text }]}>{label.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
