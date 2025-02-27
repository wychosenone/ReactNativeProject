import React from "react";
import { Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface PressableButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
}

export function PressableButton({
  onPress,
  style,
  pressedStyle,
}: PressableButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        style,
        pressed && pressedStyle,
      ]}
      android_ripple={{
        color: "#ccc",
        borderless: false,
        radius: 50,
      }}
    >
      <MaterialIcons name="delete" size={20} color="white" style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
