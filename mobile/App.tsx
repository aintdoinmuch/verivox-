import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { Colors } from "./src/theme/colors";
import { Header } from "./src/components/Header";
import { DetectorScreen } from "./src/screens/DetectorScreen";
import { EmergencyScreen } from "./src/screens/EmergencyScreen";
import { AssistantScreen } from "./src/screens/AssistantScreen";
import { QuizScreen } from "./src/screens/QuizScreen";
import { AboutScreen } from "./src/screens/AboutScreen";

type TabKey = "detector" | "emergency" | "assistant" | "quiz" | "about";

interface TabItem {
  key: TabKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
  {
    key: "detector",
    label: "Detector",
    icon: "shield-outline",
    activeIcon: "shield-checkmark",
  },
  {
    key: "emergency",
    label: "Emergency",
    icon: "warning-outline",
    activeIcon: "warning",
  },
  {
    key: "assistant",
    label: "Assistant",
    icon: "chatbubble-ellipses-outline",
    activeIcon: "chatbubble-ellipses",
  },
  {
    key: "quiz",
    label: "Quiz",
    icon: "school-outline",
    activeIcon: "school",
  },
  {
    key: "about",
    label: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("detector");

  const handleTabPress = (key: TabKey) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    setActiveTab(key);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "detector":
        return <DetectorScreen />;
      case "emergency":
        return <EmergencyScreen />;
      case "assistant":
        return <AssistantScreen />;
      case "quiz":
        return <QuizScreen />;
      case "about":
        return <AboutScreen />;
      default:
        return <DetectorScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />

        {/* Global Header */}
        <Header onSettingsPress={() => setActiveTab("about")} />

        {/* Screen Body */}
        <View style={styles.screenContent}>{renderScreen()}</View>

        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                activeOpacity={0.7}
                onPress={() => handleTabPress(tab.key)}
                style={styles.tabBtn}
              >
                <View style={[styles.tabIconWrap, isActive && styles.tabIconWrapActive]}>
                  <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={20}
                    color={isActive ? Colors.accent : Colors.textSecondary}
                  />
                </View>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContent: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 22 : 10,
    paddingHorizontal: 8,
    justifyContent: "space-around",
  },
  tabBtn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 3,
  },
  tabIconWrap: {
    width: 36,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  tabIconWrapActive: {
    backgroundColor: Colors.accentLight,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.textSecondary,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: Colors.accent,
    fontWeight: "800",
  },
});
