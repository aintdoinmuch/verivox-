import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Colors } from "../theme/colors";

interface WaveformProps {
  isRecording?: boolean;
  barCount?: number;
  color?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  isRecording = false,
  barCount = 20,
  color = Colors.accent,
}) => {
  const animValues = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0.2))
  ).current;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isRecording) {
      const animateBars = () => {
        const animations = animValues.map((anim) => {
          const toValue = 0.15 + Math.random() * 0.85;
          return Animated.timing(anim, {
            toValue,
            duration: 120 + Math.random() * 100,
            useNativeDriver: false,
          });
        });
        Animated.parallel(animations).start(() => {
          if (isRecording) {
            timeout = setTimeout(animateBars, 40);
          }
        });
      };
      animateBars();
    } else {
      animValues.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 0.15,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }

    return () => clearTimeout(timeout);
  }, [isRecording, animValues]);

  return (
    <View style={styles.container}>
      {animValues.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              backgroundColor: color,
              transform: [
                {
                  scaleY: anim,
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    gap: 3,
  },
  bar: {
    width: 3.5,
    height: 42,
    borderRadius: 2,
  },
});
