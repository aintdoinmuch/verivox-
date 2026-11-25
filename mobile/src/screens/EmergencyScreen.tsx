import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

const ADJECTIVES = ["CRIMSON", "SILVER", "GOLDEN", "AZURE", "COBALT", "EMBER", "SHADOW", "FROST", "SOLAR", "LUNAR"];
const NOUNS = ["FALCON", "HARBOR", "BEACON", "CITADEL", "ORBIT", "CANYON", "SUMMIT", "MIRAGE", "TEMPLE", "SHIELD"];
const NUMBERS = ["42", "77", "89", "19", "53", "64", "28", "91", "16", "35"];

const generateRandomPhrase = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
  return `${adj} · ${noun} · ${num}`;
};

export const EmergencyScreen: React.FC = () => {
  const [safePhrase, setSafePhrase] = useState(generateRandomPhrase());
  const [activeTab, setActiveTab] = useState<"phrase" | "hotlines" | "protocols">("phrase");

  const handleRegenerate = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // ignore on emulator
    }
    setSafePhrase(generateRandomPhrase());
  };

  const handleCallHotline = (number: string, label: string) => {
    Alert.alert(
      `Call ${label}?`,
      `This will open your phone dialer to call ${number}.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call Now",
          style: "destructive",
          onPress: () => Linking.openURL(`tel:${number}`),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === "phrase" && styles.tabBtnActive]}
          onPress={() => setActiveTab("phrase")}
        >
          <Text style={[styles.tabText, activeTab === "phrase" && styles.tabTextActive]}>
            SAFE PHRASE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === "hotlines" && styles.tabBtnActive]}
          onPress={() => setActiveTab("hotlines")}
        >
          <Text style={[styles.tabText, activeTab === "hotlines" && styles.tabTextActive]}>
            HOTLINES
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === "protocols" && styles.tabBtnActive]}
          onPress={() => setActiveTab("protocols")}
        >
          <Text style={[styles.tabText, activeTab === "protocols" && styles.tabTextActive]}>
            PROTOCOLS
          </Text>
        </TouchableOpacity>
      </View>

      {/* ========================================================= */}
      {/* 1. SAFE PHRASE GENERATOR                                  */}
      {/* ========================================================= */}
      {activeTab === "phrase" && (
        <View style={styles.section}>
          <Card style={styles.heroCard}>
            <View style={styles.cardHeader}>
              <Badge label="ANALOG VERIFICATION" variant="lavender" />
              <Text style={styles.headerSub}>OFFLINE CRYPTO-PHRASE</Text>
            </View>

            <Text style={styles.title}>Family Emergency Safe-Word</Text>
            <Text style={styles.description}>
              Establish this secret verbal code with your family members in person. If an AI voice
              scammer clones a loved one&apos;s voice demanding money, demand this exact phrase.
            </Text>

            {/* Generated Code Display */}
            <View style={styles.phraseBox}>
              <Ionicons name="key-outline" size={20} color={Colors.accent} />
              <Text style={styles.phraseCode}>{safePhrase}</Text>
            </View>

            <View style={styles.btnRow}>
              <Button
                title="Generate New Phrase"
                variant="secondary"
                icon={<Ionicons name="refresh" size={16} color={Colors.text} />}
                onPress={handleRegenerate}
                style={{ flex: 1 }}
              />
            </View>
          </Card>

          {/* Rule card */}
          <Card style={styles.protocolCard}>
            <Text style={styles.cardSubhead}>HOW TO USE IN A REAL CALL</Text>
            <View style={styles.stepRow}>
              <View style={styles.stepNum}><Text style={styles.stepNumText}>1</Text></View>
              <Text style={styles.stepText}>
                Never write this safe phrase on social media, public notes, or shared chats.
              </Text>
            </View>
            <View style={styles.stepRow}>
              <View style={styles.stepNum}><Text style={styles.stepNumText}>2</Text></View>
              <Text style={styles.stepText}>
                If you receive a distress call: &quot;What is our secret family safe phrase?&quot;
              </Text>
            </View>
            <View style={styles.stepRow}>
              <View style={styles.stepNum}><Text style={styles.stepNumText}>3</Text></View>
              <Text style={styles.stepText}>
                No AI voice cloner can know this phrase. If they evade or hesitate, hang up immediately.
              </Text>
            </View>
          </Card>
        </View>
      )}

      {/* ========================================================= */}
      {/* 2. EMERGENCY HOTLINES                                      */}
      {/* ========================================================= */}
      {activeTab === "hotlines" && (
        <View style={styles.section}>
          <Card style={styles.hotlineCard}>
            <View style={styles.cardHeader}>
              <Badge label="INDIA OFFICIAL HELPLINE" variant="danger" />
              <Ionicons name="call" size={18} color={Colors.danger} />
            </View>
            <Text style={styles.hotlineNum}>1930</Text>
            <Text style={styles.hotlineTitle}>National Cyber Crime Reporting Helpline</Text>
            <Text style={styles.hotlineDesc}>
              Call immediately within 2 hours of any unauthorized bank transfer, UPI fraud, or
              extortion attempt to freeze criminal bank accounts.
            </Text>
            <Button
              title="Call 1930 Cyber Helpline"
              variant="danger"
              icon={<Ionicons name="call" size={16} color="#FFFFFF" />}
              onPress={() => handleCallHotline("1930", "Cyber Crime Helpline")}
            />
          </Card>

          <Card style={styles.hotlineCard}>
            <View style={styles.cardHeader}>
              <Badge label="NATIONAL EMERGENCY" variant="primary" />
              <Ionicons name="shield" size={18} color={Colors.accent} />
            </View>
            <Text style={styles.hotlineNum}>112</Text>
            <Text style={styles.hotlineTitle}>All-in-One Emergency Services (Police / SOS)</Text>
            <Text style={styles.hotlineDesc}>
              Use if you or your family are actively being intimidated, threatened with physical
              harm, or subjected to fake &quot;Digital Arrest&quot;.
            </Text>
            <Button
              title="Call 112 National Police"
              variant="primary"
              icon={<Ionicons name="call" size={16} color="#FFFFFF" />}
              onPress={() => handleCallHotline("112", "Police Emergency 112")}
            />
          </Card>
        </View>
      )}

      {/* ========================================================= */}
      {/* 3. SCAM DEFENSE PROTOCOLS                                 */}
      {/* ========================================================= */}
      {activeTab === "protocols" && (
        <View style={styles.section}>
          <Card style={styles.protocolCard}>
            <View style={styles.cardHeader}>
              <Badge label="LAW ENFORCEMENT SCAM" variant="danger" />
              <Text style={styles.headerSub}>PROTOCOL 01</Text>
            </View>
            <Text style={styles.title}>The &quot;Digital Arrest&quot; Playbook</Text>
            <Text style={styles.description}>
              Scammer claims to be CBI/Police over video call claiming your passport or Aadhaar was
              used in illegal narcotics.
            </Text>
            <View style={styles.actionBox}>
              <Text style={styles.actionTitle}>Immediate Counter-Action:</Text>
              <Text style={styles.actionItem}>• Law enforcement NEVER issues arrest warrants or holds interrogations over video calls.</Text>
              <Text style={styles.actionItem}>• There is no legal procedure known as &quot;Digital Arrest&quot; in the constitution.</Text>
              <Text style={styles.actionItem}>• Disconnect the video call immediately. Block the number.</Text>
            </View>
          </Card>

          <Card style={styles.protocolCard}>
            <View style={styles.cardHeader}>
              <Badge label="VOICE CLONE EXTORTION" variant="warning" />
              <Text style={styles.headerSub}>PROTOCOL 02</Text>
            </View>
            <Text style={styles.title}>The Kidnapping Voice Extortion</Text>
            <Text style={styles.description}>
              Caller plays an emotional voice clone of your child or relative crying, claiming they are
              detained and urgent ransom is needed.
            </Text>
            <View style={styles.actionBox}>
              <Text style={styles.actionTitle}>Immediate Counter-Action:</Text>
              <Text style={styles.actionItem}>• Demand your private Family Safe-Word.</Text>
              <Text style={styles.actionItem}>• Keep the scammer on the line while using another device to dial your relative directly.</Text>
              <Text style={styles.actionItem}>• Never transfer money via UPI, crypto, or gift cards.</Text>
            </View>
          </Card>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderActive,
  },
  tabText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: Colors.accent,
  },
  section: {
    gap: 16,
  },
  heroCard: {
    gap: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSub: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  phraseBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    gap: 10,
  },
  phraseCode: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: Colors.text,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
  },
  protocolCard: {
    gap: 12,
  },
  cardSubhead: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.textSecondary,
    letterSpacing: 0.8,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.accent,
  },
  stepText: {
    fontSize: 13,
    color: Colors.text,
    flex: 1,
    lineHeight: 18,
  },
  hotlineCard: {
    gap: 12,
  },
  hotlineNum: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 1,
    color: Colors.text,
  },
  hotlineTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
  hotlineDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  actionBox: {
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.text,
  },
  actionItem: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
});
