import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";

interface HeaderProps {
  onSettingsPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <View style={styles.logoBadge}>
          <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
        </View>
        <View>
          <Text style={styles.brandTitle}>VOICEGUARD<Text style={styles.brandAccent}>.AI</Text></Text>
          <Text style={styles.brandSub}>DEEPFAKE DEFENSE & CALL SHIELD</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>ACTIVE</Text>
        </View>
        {onSettingsPress && (
          <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
            <Ionicons name="settings-outline" size={20} color={Colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: Colors.text,
  },
  brandAccent: {
    color: Colors.accent,
  },
  brandSub: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.safeLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.safeBorder,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.safe,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.safe,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
