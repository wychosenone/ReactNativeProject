import React from "react";
import { Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface PressableButtonProps {
  onPress: () => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
}

export function PressableButton({
  onPress,
  iconName,
  iconColor = "black",
  iconSize = 24,
  style,
  pressedStyle,
}: PressableButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, pressed && pressedStyle]}
      android_ripple={{ color: "#ccc", borderless: false, radius: 50 }}
    >
      <MaterialIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 4,
  },
});
