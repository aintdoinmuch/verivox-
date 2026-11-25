import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Colors, Shadows } from "../theme/colors";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "surface" | "ivory" | "dark";
}

export const Card: React.FC<CardProps> = ({ children, style, variant = "surface" }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case "ivory":
        return Colors.background;
      case "dark":
        return Colors.darkCard;
      default:
        return Colors.surface;
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: getBackgroundColor() },
        variant === "dark" && styles.darkBorder,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  darkBorder: {
    borderColor: Colors.darkCardBorder,
  },
});
