import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { QUIZ_QUESTIONS, QUIZ_CATEGORIES, OptionKey } from "../services/quizData";

export const QuizScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const selectedAnswer = answers[currentQ?.id];

  const handleSelectOption = (key: OptionKey) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key,
    }));
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  // Score Calculation
  const totalQuestions = QUIZ_QUESTIONS.length;
  const correctCount = Object.entries(answers).reduce((acc, [id, userAns]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(id));
    return acc + (q && q.correctAnswer === userAns ? 1 : 0);
  }, 0);
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {!showResults ? (
        <View style={styles.section}>
          {/* Progress Header */}
          <Card style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Badge label={`QUESTION ${currentIndex + 1} OF ${totalQuestions}`} variant="primary" />
              <Text style={styles.categoryBadgeText}>{currentQ.categoryBadge}</Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${((currentIndex + 1) / totalQuestions) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.categoryTitle}>{currentQ.categoryTitle}</Text>
          </Card>

          {/* Question Card */}
          <Card style={styles.questionCard}>
            <Text style={styles.questionText}>{currentQ.question}</Text>

            {/* Options */}
            <View style={styles.optionsList}>
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswer === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    activeOpacity={0.8}
                    style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                    onPress={() => handleSelectOption(opt.key)}
                  >
                    <View
                      style={[
                        styles.optionKeyCircle,
                        isSelected && styles.optionKeyCircleSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionKeyText,
                          isSelected && styles.optionKeyTextSelected,
                        ]}
                      >
                        {opt.key}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionBodyText,
                        isSelected && styles.optionBodyTextSelected,
                      ]}
                    >
                      {opt.text}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>

          {/* Navigation Controls */}
          <View style={styles.navRow}>
            <Button
              title="Previous"
              variant="secondary"
              disabled={currentIndex === 0}
              onPress={handlePrevious}
              style={{ flex: 1 }}
            />
            <Button
              title={currentIndex === totalQuestions - 1 ? "Submit Quiz" : "Next Question"}
              variant="primary"
              disabled={!selectedAnswer}
              onPress={handleNext}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      ) : (
        /* Results View */
        <View style={styles.section}>
          <Card style={styles.resultsHero}>
            <View style={styles.certIcon}>
              <Ionicons name="ribbon" size={42} color={Colors.accent} />
            </View>

            <Text style={styles.scoreNumber}>{percentage}%</Text>
            <Text style={styles.scoreSub}>
              {correctCount} OF {totalQuestions} QUESTIONS CORRECT
            </Text>

            <Badge
              label={
                percentage >= 80
                  ? "DEFENSE SPECIALIST (ADVANCED)"
                  : percentage >= 50
                  ? "AWARE PRACTITIONER (MODERATE)"
                  : "SECURITY ALERT (HIGH RISK)"
              }
              variant={percentage >= 80 ? "safe" : percentage >= 50 ? "warning" : "danger"}
            />

            <Text style={styles.resultSummary}>
              {percentage >= 80
                ? "Outstanding! You demonstrated robust resistance to voice cloning, psychological urgency, and deepfake verification bypasses."
                : percentage >= 50
                ? "Good baseline awareness. Review the categories below to reinforce your analog verification procedures."
                : "Caution: Several scam indicators were missed. Re-study the emergency protocol guides."}
            </Text>

            <Button
              title="Retake Awareness Assessment"
              variant="primary"
              icon={<Ionicons name="refresh" size={16} color="#FFFFFF" />}
              onPress={handleRestart}
              style={{ width: "100%", marginTop: 10 }}
            />
          </Card>

          {/* Category Breakdown */}
          <Card style={styles.breakdownCard}>
            <Text style={styles.breakdownHeader}>Category Performance</Text>
            {QUIZ_CATEGORIES.map((cat) => {
              const [start, end] = cat.questionRange;
              const catQuestions = QUIZ_QUESTIONS.filter((q) => q.number >= start && q.number <= end);
              const catCorrect = catQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
              const catPct = Math.round((catCorrect / catQuestions.length) * 100);

              return (
                <View key={cat.id} style={styles.catRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.catRowTitle}>{cat.shortTitle}</Text>
                    <Text style={styles.catRowRange}>Questions {start}–{end}</Text>
                  </View>
                  <Text style={styles.catRowPct}>{catPct}%</Text>
                </View>
              );
            })}
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
  section: {
    gap: 16,
  },
  progressCard: {
    gap: 10,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.surfaceMuted,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 3,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  questionCard: {
    gap: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.text,
    lineHeight: 23,
    letterSpacing: -0.2,
  },
  optionsList: {
    gap: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 12,
  },
  optionItemSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentLight,
  },
  optionKeyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderActive,
    alignItems: "center",
    justifyContent: "center",
  },
  optionKeyCircleSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  optionKeyText: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.text,
  },
  optionKeyTextSelected: {
    color: "#FFFFFF",
  },
  optionBodyText: {
    fontSize: 13,
    color: Colors.text,
    flex: 1,
    lineHeight: 18,
  },
  optionBodyTextSelected: {
    fontWeight: "600",
    color: Colors.accentDark,
  },
  navRow: {
    flexDirection: "row",
    gap: 12,
  },
  resultsHero: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 10,
  },
  certIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: Colors.text,
    letterSpacing: -1,
  },
  scoreSub: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.textSecondary,
    letterSpacing: 0.8,
  },
  resultSummary: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  breakdownCard: {
    gap: 12,
  },
  breakdownHeader: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  catRowTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
  },
  catRowRange: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  catRowPct: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.accent,
  },
});
