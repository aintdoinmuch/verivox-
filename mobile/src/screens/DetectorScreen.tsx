import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Waveform } from "../components/Waveform";
import {
  analyzeText,
  detectAudio,
  detectVideo,
} from "../services/api";
import {
  ScamAnalysisResult,
  AudioDetectionResult,
  VideoDetectionResult,
} from "../types";

type Mode = "audio" | "text" | "video";

const PRESET_MESSAGES = [
  {
    title: "CBI Digital Arrest",
    text: "URGENT NOTICE FROM CENTRAL BUREAU OF INVESTIGATION: Your Aadhaar ID is linked to illegal narcotics consignment seized at Mumbai airport. A non-bailable warrant is issued. Do not disconnect this call or you will be arrested in 2 hours. Transfer security deposit of Rs 50,000 to RBI escrow account for verification.",
  },
  {
    title: "Family Kidnap Clone",
    text: "MOM PLEASE HELP ME!! I got into a terrible car accident and the police have detained me. The other driver is threatening to kill me. Please send Rs 75,000 immediately to this phone number via UPI. Do not tell dad or call my normal phone, police took it!",
  },
  {
    title: "Bank KYC Alert",
    text: "Dear Customer, your HDFC net banking access is suspended today due to missing PAN card KYC. Click immediately http://hdfc-kyc-update.online to submit your OTP and avoid account freeze within 24 hours.",
  },
];

export const DetectorScreen: React.FC = () => {
  const [mode, setMode] = useState<Mode>("audio");

  // Audio State
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioResult, setAudioResult] = useState<AudioDetectionResult | null>(null);
  const [isAnalyzingAudio, setIsAnalyzingAudio] = useState(false);

  // Text State
  const [inputText, setInputText] = useState("");
  const [textResult, setTextResult] = useState<ScamAnalysisResult | null>(null);
  const [isAnalyzingText, setIsAnalyzingText] = useState(false);

  // Video State
  const [selectedVideoUri, setSelectedVideoUri] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState<VideoDetectionResult | null>(null);
  const [isAnalyzingVideo, setIsAnalyzingVideo] = useState(false);

  // Audio Duration Timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // Request Permissions on mount
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        await Audio.requestPermissionsAsync();
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
    })();
  }, []);

  // -----------------------------------------------------------------
  // AUDIO RECORDING HANDLERS
  // -----------------------------------------------------------------
  const startRecording = async () => {
    try {
      setAudioResult(null);
      setRecordedUri(null);

      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "Microphone access is needed to record voice audio.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
      Alert.alert("Recording Error", "Unable to initialize audio recorder.");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedUri(uri);
      setRecording(null);

      if (uri) {
        handleAnalyzeAudio(uri);
      }
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  const handleAnalyzeAudio = async (uri: string) => {
    setIsAnalyzingAudio(true);
    try {
      const result = await detectAudio(uri);
      setAudioResult(result);
    } catch (err) {
      console.error("Audio analysis failed:", err);
      Alert.alert("Analysis Failed", "Could not analyze the audio sample.");
    } finally {
      setIsAnalyzingAudio(false);
    }
  };

  // -----------------------------------------------------------------
  // TEXT ANALYSIS HANDLER
  // -----------------------------------------------------------------
  const handleAnalyzeText = async () => {
    if (!inputText.trim()) {
      Alert.alert("Input Required", "Please enter or paste a suspicious message to analyze.");
      return;
    }

    setIsAnalyzingText(true);
    setTextResult(null);
    try {
      const result = await analyzeText(inputText);
      setTextResult(result);
    } catch (err) {
      console.error("Text analysis error:", err);
      Alert.alert("Analysis Error", "Failed to analyze message content.");
    } finally {
      setIsAnalyzingText(false);
    }
  };

  // -----------------------------------------------------------------
  // VIDEO PICKER HANDLER
  // -----------------------------------------------------------------
  const handlePickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setSelectedVideoUri(uri);
        handleAnalyzeVideo(uri);
      }
    } catch (err) {
      console.error("Failed to pick video:", err);
    }
  };

  const handleAnalyzeVideo = async (uri: string) => {
    setIsAnalyzingVideo(true);
    setVideoResult(null);
    try {
      const result = await detectVideo(uri);
      setVideoResult(result);
    } catch (err) {
      console.error("Video analysis failed:", err);
      Alert.alert("Analysis Error", "Could not analyze video footage.");
    } finally {
      setIsAnalyzingVideo(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Mode Selector Tabs */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[styles.segmentBtn, mode === "audio" && styles.segmentBtnActive]}
          onPress={() => setMode("audio")}
        >
          <Ionicons
            name="mic"
            size={16}
            color={mode === "audio" ? Colors.accent : Colors.textSecondary}
          />
          <Text style={[styles.segmentText, mode === "audio" && styles.segmentTextActive]}>
            VOICE CALL
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segmentBtn, mode === "text" && styles.segmentBtnActive]}
          onPress={() => setMode("text")}
        >
          <Ionicons
            name="chatbubble-ellipses"
            size={16}
            color={mode === "text" ? Colors.accent : Colors.textSecondary}
          />
          <Text style={[styles.segmentText, mode === "text" && styles.segmentTextActive]}>
            TEXT / SMS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segmentBtn, mode === "video" && styles.segmentBtnActive]}
          onPress={() => setMode("video")}
        >
          <Ionicons
            name="videocam"
            size={16}
            color={mode === "video" ? Colors.accent : Colors.textSecondary}
          />
          <Text style={[styles.segmentText, mode === "video" && styles.segmentTextActive]}>
            VIDEO
          </Text>
        </TouchableOpacity>
      </View>

      {/* ========================================================= */}
      {/* 1. AUDIO DETECTION MODE                                    */}
      {/* ========================================================= */}
      {mode === "audio" && (
        <View style={styles.section}>
          <Card style={styles.heroCard}>
            <View style={styles.cardHeader}>
              <Badge label="WAV2VEC2 NEURAL CLASSIFIER" variant="primary" />
              <Text style={styles.cardSubtitle}>REAL-TIME CALL SCREENING</Text>
            </View>

            <Text style={styles.sectionTitle}>
              Screen Suspicious Voice Calls for AI Synthesis
            </Text>
            <Text style={styles.sectionDesc}>
              Record a snippet of incoming audio (family distress, urgent demands, banking calls)
              to scan for synthetic acoustic signatures.
            </Text>

            {/* Waveform Visualization */}
            <View style={styles.waveformContainer}>
              <Waveform isRecording={isRecording} color={isRecording ? Colors.danger : Colors.accent} />
              <Text style={styles.timerText}>
                {isRecording
                  ? `RECORDING: 00:${recordingDuration < 10 ? `0${recordingDuration}` : recordingDuration}`
                  : recordedUri
                  ? "AUDIO CAPTURED — ANALYSIS READY"
                  : "TAP MICROPHONE TO BEGIN SCREENING"}
              </Text>
            </View>

            {/* Record Controls */}
            <View style={styles.actionRow}>
              {!isRecording ? (
                <Button
                  title="Start Voice Screening"
                  icon={<Ionicons name="mic" size={18} color="#FFFFFF" />}
                  onPress={startRecording}
                  style={styles.fullButton}
                />
              ) : (
                <Button
                  title="Stop & Analyze Call"
                  variant="danger"
                  icon={<Ionicons name="stop" size={18} color="#FFFFFF" />}
                  onPress={stopRecording}
                  style={styles.fullButton}
                />
              )}
            </View>
          </Card>

          {/* Audio Detection Results */}
          {isAnalyzingAudio && (
            <Card style={styles.loadingCard}>
              <Text style={styles.loadingText}>Running Wav2Vec2 Acoustic Model...</Text>
            </Card>
          )}

          {audioResult && (
            <Card
              style={[
                styles.resultCard,
                audioResult.verdict === "SYNTHETIC_OR_MANIPULATED"
                  ? styles.borderDanger
                  : styles.borderSafe,
              ]}
            >
              <View style={styles.resultHeader}>
                <Badge
                  label={audioResult.verdict === "SYNTHETIC_OR_MANIPULATED" ? "SYNTHETIC VOICE DETECTED" : "NATURAL HUMAN SPEECH"}
                  variant={audioResult.verdict === "SYNTHETIC_OR_MANIPULATED" ? "danger" : "safe"}
                />
                <Text style={styles.probabilityText}>
                  {audioResult.confidence_percentage}% CONFIDENCE
                </Text>
              </View>

              <Text style={styles.resultVerdictTitle}>
                {audioResult.verdict === "SYNTHETIC_OR_MANIPULATED"
                  ? "HIGH PROBABILITY OF VOICE CLONING"
                  : "NO SYNTHETIC ARTIFACTS DETECTED"}
              </Text>

              {/* Key Indicators */}
              {audioResult.key_indicators && (
                <View style={styles.indicatorsList}>
                  <Text style={styles.subhead}>Acoustic Telemetry Indicators:</Text>
                  {audioResult.key_indicators.map((ind, i) => (
                    <View key={i} style={styles.indicatorRow}>
                      <Ionicons name="alert-circle" size={14} color={Colors.warning} />
                      <Text style={styles.indicatorText}>{ind}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Recommendations */}
              {audioResult.recommended_actions && (
                <View style={styles.actionsBox}>
                  <Text style={styles.subhead}>Immediate Defense Protocol:</Text>
                  {audioResult.recommended_actions.map((act, i) => (
                    <Text key={i} style={styles.actionItem}>
                      • {act}
                    </Text>
                  ))}
                </View>
              )}
            </Card>
          )}
        </View>
      )}

      {/* ========================================================= */}
      {/* 2. TEXT SCAM ANALYSIS MODE                                */}
      {/* ========================================================= */}
      {mode === "text" && (
        <View style={styles.section}>
          <Card style={styles.heroCard}>
            <View style={styles.cardHeader}>
              <Badge label="GEMINI 2.5 FLASH AI" variant="primary" />
              <Text style={styles.cardSubtitle}>HEURISTIC SCAM SCANNER</Text>
            </View>

            <Text style={styles.sectionTitle}>Analyze Suspicious SMS or Messages</Text>
            <Text style={styles.sectionDesc}>
              Paste suspicious messages, bank notices, or digital arrest threats to evaluate social
              engineering tactics.
            </Text>

            {/* Text Input */}
            <TextInput
              style={styles.textInput}
              placeholder="Paste message text, email, or chat excerpt here..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={4}
              value={inputText}
              onChangeText={setInputText}
            />

            {/* Presets */}
            <Text style={styles.presetLabel}>Quick Presets:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetScroll}>
              {PRESET_MESSAGES.map((preset, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.presetChip}
                  onPress={() => setInputText(preset.text)}
                >
                  <Text style={styles.presetChipText}>{preset.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Button
              title="Analyze Scam Signatures"
              icon={<Ionicons name="sparkles" size={16} color="#FFFFFF" />}
              loading={isAnalyzingText}
              onPress={handleAnalyzeText}
              style={styles.fullButton}
            />
          </Card>

          {/* Text Result */}
          {textResult && (
            <Card
              style={[
                styles.resultCard,
                textResult.threat_level === "CRITICAL_THREAT"
                  ? styles.borderDanger
                  : textResult.threat_level === "SUSPICIOUS"
                  ? styles.borderWarning
                  : styles.borderSafe,
              ]}
            >
              <View style={styles.resultHeader}>
                <Badge
                  label={textResult.threat_level.replace("_", " ")}
                  variant={
                    textResult.threat_level === "CRITICAL_THREAT"
                      ? "danger"
                      : textResult.threat_level === "SUSPICIOUS"
                      ? "warning"
                      : "safe"
                  }
                />
                <Text style={styles.probabilityText}>
                  {textResult.scam_probability}% SCAM PROBABILITY
                </Text>
              </View>

              <Text style={styles.resultVerdictTitle}>{textResult.summary}</Text>

              {/* Identified Tactics */}
              {textResult.identified_tactics.length > 0 && (
                <View style={styles.tacticsRow}>
                  {textResult.identified_tactics.map((tactic, i) => (
                    <Badge key={i} label={tactic} variant="muted" />
                  ))}
                </View>
              )}

              {/* Indicators */}
              <View style={styles.indicatorsList}>
                <Text style={styles.subhead}>Flagged Indicators:</Text>
                {textResult.indicators.map((ind, i) => (
                  <View key={i} style={styles.indicatorRow}>
                    <Ionicons name="shield-outline" size={14} color={Colors.accent} />
                    <Text style={styles.indicatorText}>
                      <Text style={{ fontWeight: "700" }}>{ind.type}: </Text>
                      {ind.description}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Safety Recommendations */}
              <View style={styles.actionsBox}>
                <Text style={styles.subhead}>Recommended Response:</Text>
                {textResult.safety_recommendations.map((rec, i) => (
                  <Text key={i} style={styles.actionItem}>
                    • {rec}
                  </Text>
                ))}
              </View>
            </Card>
          )}
        </View>
      )}

      {/* ========================================================= */}
      {/* 3. VIDEO DEEPFAKE MODE                                    */}
      {/* ========================================================= */}
      {mode === "video" && (
        <View style={styles.section}>
          <Card style={styles.heroCard}>
            <View style={styles.cardHeader}>
              <Badge label="DUAL-ENGINE VISION TRANSFORMER" variant="primary" />
              <Text style={styles.cardSubtitle}>FACIAL ARTIFACT DETECTION</Text>
            </View>

            <Text style={styles.sectionTitle}>Verify Video & Facial Footage</Text>
            <Text style={styles.sectionDesc}>
              Select a video file to inspect keyframes for boundary blending, unnatural gaze, and
              generative texture flickering.
            </Text>

            <Button
              title="Select Video from Gallery"
              icon={<Ionicons name="film-outline" size={18} color="#FFFFFF" />}
              loading={isAnalyzingVideo}
              onPress={handlePickVideo}
              style={styles.fullButton}
            />

            {selectedVideoUri && (
              <Text style={styles.fileUriText} numberOfLines={1}>
                Target: {selectedVideoUri}
              </Text>
            )}
          </Card>

          {/* Video Result */}
          {videoResult && (
            <Card
              style={[
                styles.resultCard,
                videoResult.verdict === "DEEPFAKE_OR_SYNTHETIC"
                  ? styles.borderDanger
                  : styles.borderSafe,
              ]}
            >
              <View style={styles.resultHeader}>
                <Badge
                  label={videoResult.verdict.replace("_", " ")}
                  variant={videoResult.verdict === "DEEPFAKE_OR_SYNTHETIC" ? "danger" : "safe"}
                />
                <Text style={styles.probabilityText}>
                  {videoResult.confidence_percentage}% CONFIDENCE
                </Text>
              </View>

              <Text style={styles.resultVerdictTitle}>
                {videoResult.verdict === "DEEPFAKE_OR_SYNTHETIC"
                  ? "SYNTHETIC FACIAL MANIPULATION DETECTED"
                  : "FOOTAGE DEMONSTRATES AUTHENTIC TEXTURES"}
              </Text>

              {/* Indicators */}
              {videoResult.key_indicators && (
                <View style={styles.indicatorsList}>
                  <Text style={styles.subhead}>Visual Analysis Findings:</Text>
                  {videoResult.key_indicators.map((ind, i) => (
                    <View key={i} style={styles.indicatorRow}>
                      <Ionicons name="eye-outline" size={14} color={Colors.accent} />
                      <Text style={styles.indicatorText}>{ind}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Recommendations */}
              {videoResult.recommended_actions && (
                <View style={styles.actionsBox}>
                  <Text style={styles.subhead}>Verification Guidance:</Text>
                  {videoResult.recommended_actions.map((act, i) => (
                    <Text key={i} style={styles.actionItem}>
                      • {act}
                    </Text>
                  ))}
                </View>
              )}
            </Card>
          )}
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
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  segmentBtnActive: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderActive,
  },
  segmentText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  segmentTextActive: {
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
  cardSubtitle: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.3,
  },
  sectionDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  waveformContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  timerText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  actionRow: {
    marginTop: 4,
  },
  fullButton: {
    width: "100%",
  },
  loadingCard: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.accent,
  },
  resultCard: {
    gap: 12,
    borderWidth: 1.5,
  },
  borderDanger: {
    borderColor: Colors.danger,
    backgroundColor: "#FFFBFB",
  },
  borderWarning: {
    borderColor: Colors.warning,
    backgroundColor: "#FFFDF9",
  },
  borderSafe: {
    borderColor: Colors.safe,
    backgroundColor: "#F9FDFB",
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  probabilityText: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: 0.5,
  },
  resultVerdictTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    lineHeight: 20,
  },
  subhead: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  indicatorsList: {
    gap: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  indicatorRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  indicatorText: {
    fontSize: 12,
    color: Colors.text,
    flex: 1,
    lineHeight: 16,
  },
  actionsBox: {
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  actionItem: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 13,
    color: Colors.text,
    minHeight: 100,
    textAlignVertical: "top",
  },
  presetLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  presetScroll: {
    flexDirection: "row",
    marginBottom: 8,
  },
  presetChip: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  presetChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.text,
  },
  tacticsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  fileUriText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});
