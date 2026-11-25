import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { getCustomBackendUrl, setCustomBackendUrl, DEFAULT_PYTHON_URL } from "../services/api";

export const AboutScreen: React.FC = () => {
  const [backendUrl, setBackendUrl] = useState(getCustomBackendUrl());
  const [testingHealth, setTestingHealth] = useState(false);

  const handleSaveUrl = () => {
    setCustomBackendUrl(backendUrl);
    Alert.alert("Settings Saved", `Active backend URL set to:\n${backendUrl}`);
  };

  const handleResetUrl = () => {
    if (DEFAULT_PYTHON_URL) {
      setBackendUrl(DEFAULT_PYTHON_URL);
      setCustomBackendUrl(DEFAULT_PYTHON_URL);
      Alert.alert("Reset Complete", `Default host set to:\n${DEFAULT_PYTHON_URL}`);
    }
  };

  const handleTestHealth = async () => {
    setTestingHealth(true);
    try {
      const res = await fetch(`${backendUrl}/health`, { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        Alert.alert(
          "Backend Online!",
          `Service: ${data.service || "Verivox ML"}\nAudio Model: ${data.audio_model_loaded ? "Loaded" : "Offline"}\nVideo Model: ${data.video_model_loaded ? "Loaded" : "Offline"}`
        );
      } else {
        Alert.alert("Connection Alert", `Server responded with status ${res.status}`);
      }
    } catch {
      Alert.alert(
        "Backend Offline",
        `Could not reach ${backendUrl}. Ensure the Python FastAPI microservice is running (port 8000) or check network permissions.`
      );
    } finally {
      setTestingHealth(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Developer Card */}
      <Card style={styles.devCard}>
        <View style={styles.devHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NG</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.devName}>Naman Garg</Text>
            <Text style={styles.devReg}>REG NO: 26BCON1989</Text>
            <Badge label="LEAD DEVELOPER & RESEARCHER" variant="primary" />
          </View>
        </View>

        <Text style={styles.devBio}>
          Architected the Verivox AI multimodal deepfake defense engine, integrating Wav2Vec2
          acoustic analysis, Vision Transformer facial artifact verification, and Gemini social
          engineering detection.
        </Text>
      </Card>

      {/* Project Specs */}
      <Card style={styles.specCard}>
        <Text style={styles.specTitle}>SYSTEM ARCHITECTURE</Text>

        <View style={styles.specRow}>
          <Ionicons name="mic-outline" size={16} color={Colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.specLabel}>Audio Deepfake Classifier</Text>
            <Text style={styles.specValue}>Wav2Vec2 Base (Phase Discontinuity & Spectral Loss)</Text>
          </View>
        </View>

        <View style={styles.specRow}>
          <Ionicons name="videocam-outline" size={16} color={Colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.specLabel}>Video Artifact Engine</Text>
            <Text style={styles.specValue}>Dual Vision Transformer (ViT Base 224)</Text>
          </View>
        </View>

        <View style={styles.specRow}>
          <Ionicons name="sparkles-outline" size={16} color={Colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.specLabel}>Language Scam Intelligence</Text>
            <Text style={styles.specValue}>Google Gemini 2.5 Flash + Heuristic Rules</Text>
          </View>
        </View>

        <View style={styles.specRow}>
          <Ionicons name="shield-checkmark-outline" size={16} color={Colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.specLabel}>Assessment Bank</Text>
            <Text style={styles.specValue}>24 Multi-Category Awareness Evaluation Questions</Text>
          </View>
        </View>
      </Card>

      {/* Backend Configuration */}
      <Card style={styles.configCard}>
        <View style={styles.configHeader}>
          <Text style={styles.specTitle}>ML BACKEND CONFIGURATION</Text>
          <Badge label="NETWORK" variant="lavender" />
        </View>

        <Text style={styles.configDesc}>
          Set the address of your Python FastAPI server (port 8000) or cloud host (Hugging Face /
          Render).
        </Text>

        <TextInput
          style={styles.urlInput}
          value={backendUrl}
          onChangeText={setBackendUrl}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="http://10.0.2.2:8000"
          placeholderTextColor={Colors.textMuted}
        />

        <View style={styles.configBtnRow}>
          <Button
            title="Save URL"
            variant="primary"
            onPress={handleSaveUrl}
            style={{ flex: 1 }}
          />
          <Button
            title="Test Connection"
            variant="secondary"
            loading={testingHealth}
            onPress={handleTestHealth}
            style={{ flex: 1 }}
          />
        </View>

        <Button
          title="Reset to Default"
          variant="outline"
          onPress={handleResetUrl}
          style={{ width: "100%" }}
        />
      </Card>
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
  devCard: {
    gap: 14,
  },
  devHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  devName: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.text,
  },
  devReg: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  devBio: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  specCard: {
    gap: 14,
  },
  specTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textSecondary,
    letterSpacing: 0.8,
  },
  specRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  specLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.text,
  },
  specValue: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  configCard: {
    gap: 12,
  },
  configHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  configDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  urlInput: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderActive,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: Colors.text,
  },
  configBtnRow: {
    flexDirection: "row",
    gap: 10,
  },
});
