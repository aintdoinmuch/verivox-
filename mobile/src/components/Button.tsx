import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import * as Haptics from "expo-haptics";
import { Colors } from "../theme/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Ignore if haptics unavailable on emulator
    }
    onPress();
  };

  const getStyle = () => {
    switch (variant) {
      case "secondary":
        return {
          btn: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderActive },
          txt: { color: Colors.text },
        };
      case "danger":
        return {
          btn: { backgroundColor: Colors.danger, borderWidth: 0, borderColor: "transparent" },
          txt: { color: "#FFFFFF" },
        };
      case "outline":
        return {
          btn: { backgroundColor: "transparent", borderWidth: 1, borderColor: Colors.borderActive },
          txt: { color: Colors.text },
        };
      default:
        return {
          btn: { backgroundColor: Colors.accent, borderWidth: 0, borderColor: "transparent" },
          txt: { color: "#FFFFFF" },
        };
    }
  };

  const current = getStyle();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled || loading}
      style={[
        styles.button,
        current.btn,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={current.txt.color} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, current.txt, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  disabled: {
    opacity: 0.5,
  },
});
