import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import { Badge } from "../components/Badge";
import { askAssistant } from "../services/api";
import { ChatMessage } from "../types";

const SUGGESTIONS = [
  "What is Digital Arrest?",
  "How does voice cloning work?",
  "Verify my call",
  "Report a scam to 1930",
];

export const AssistantScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "assistant",
      content:
        "Hello! I am your VoiceGuard AI Safety Assistant. Ask me how to identify deepfakes, verify urgent family calls, or counter social engineering scams.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<any>(null);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const reply = await askAssistant(text);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I encountered an issue retrieving the safety protocol. Please verify your connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "initial",
        role: "assistant",
        content:
          "Conversation reset. Ask me anything regarding deepfake detection, voice cloning defenses, or scam prevention.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Subheader */}
      <View style={styles.topBar}>
        <View style={styles.topBarInfo}>
          <Badge label="GEMINI 2.5 SAFETY COPILOT" variant="primary" />
          <Text style={styles.topBarSub}>VERIFIED INCIDENT PROTOCOLS</Text>
        </View>
        <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
          <Ionicons name="refresh-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.clearBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatScroll}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.role === "user" ? styles.userBubble : styles.assistantBubble,
            ]}
          >
            <View style={styles.bubbleHeader}>
              <Ionicons
                name={msg.role === "user" ? "person" : "shield-checkmark"}
                size={12}
                color={msg.role === "user" ? "#FFFFFF" : Colors.accent}
              />
              <Text
                style={[
                  styles.senderLabel,
                  msg.role === "user" ? styles.userSenderLabel : styles.assistantSenderLabel,
                ]}
              >
                {msg.role === "user" ? "YOU" : "VOICEGUARD AI"}
              </Text>
              <Text
                style={[
                  styles.timeLabel,
                  msg.role === "user" ? styles.userSenderLabel : styles.timeLabelMuted,
                ]}
              >
                {msg.timestamp}
              </Text>
            </View>
            <Text
              style={[
                styles.messageText,
                msg.role === "user" ? styles.userText : styles.assistantText,
              ]}
            >
              {msg.content}
            </Text>
          </View>
        ))}

        {loading && (
          <View style={[styles.messageBubble, styles.assistantBubble]}>
            <Text style={styles.assistantText}>Analyzing safety database...</Text>
          </View>
        )}
      </ScrollView>

      {/* Suggestion Chips */}
      <View style={styles.suggestionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionScroll}>
          {SUGGESTIONS.map((chip, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.chip}
              onPress={() => handleSend(chip)}
            >
              <Text style={styles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input Row */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask a question about a call or scam..."
          placeholderTextColor={Colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => handleSend()}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={() => handleSend()}
          disabled={!inputText.trim() || loading}
        >
          <Ionicons name="send" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  topBarInfo: {
    gap: 3,
  },
  topBarSub: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  chatScroll: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    padding: 14,
    borderRadius: 14,
    maxWidth: "88%",
    gap: 6,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.accent,
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bubbleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  senderLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  userSenderLabel: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  assistantSenderLabel: {
    color: Colors.accent,
  },
  timeLabel: {
    fontSize: 9,
    marginLeft: "auto",
  },
  timeLabelMuted: {
    color: Colors.textMuted,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 19,
  },
  userText: {
    color: "#FFFFFF",
  },
  assistantText: {
    color: Colors.text,
  },
  suggestionsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  suggestionScroll: {
    flexDirection: "row",
  },
  chip: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: Colors.surface,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 13,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
});
