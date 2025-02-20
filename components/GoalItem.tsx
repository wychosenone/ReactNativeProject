import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { GoalFromDB } from "@/app";
import { PressableButton } from "@/components/PressableButton";

interface GoalItemProps {
  goalObj: GoalFromDB;
  deleteHandler: (deletedId: string) => void;
}

export default function GoalItem({ goalObj, deleteHandler }: GoalItemProps) {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.textContainer,
        pressed && styles.pressedStyle,
      ]}
      onPress={() => {
        router.push(`/goals/${goalObj.id}`);
      }}
      android_ripple={{
        color: "#ccc",
        borderless: false,
        radius: 100,
      }}
    >
      <Text style={styles.text}>{goalObj.text}</Text>

      <PressableButton
        onPress={() => deleteHandler(goalObj.id)}
        style={styles.deleteBtn}
        pressedStyle={styles.deleteBtnPressed}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#aaa",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  pressedStyle: {
    backgroundColor: "#888",
  },
  text: {
    color: "purple",
    fontSize: 20,
  },
  deleteBtn: {
    backgroundColor: "red",
    borderRadius: 5,
    marginLeft: 8,
  },
  deleteBtnPressed: {
    backgroundColor: "#c00",
  },
});
