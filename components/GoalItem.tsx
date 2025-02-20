import React from "react";
import { Pressable, StyleSheet, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { GoalFromDB } from "@/app";
import { PressableButton } from "./PressableButton";

interface GoalItemProps {
  goalObj: GoalFromDB;
  deleteHandler: (deletedId: string) => void;
  // Added for highlight/unhighlight
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export default function GoalItem({
  goalObj,
  deleteHandler,
  onPressIn,
  onPressOut,
}: GoalItemProps) {
  const router = useRouter();

  const handleLongPress = () => {
    Alert.alert("Delete Goal?", "Are you sure you want to delete this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => deleteHandler(goalObj.id),
      },
    ]);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.textContainer,
        pressed && styles.pressedStyle,
      ]}
      onPress={() => router.push(`/goals/${goalObj.id}`)}
      onLongPress={handleLongPress}
      // Forward the highlight callbacks from FlatList
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      android_ripple={{ color: "#ccc", borderless: false, radius: 100 }}
    >
      <Text style={styles.text}>{goalObj.text}</Text>
      <PressableButton
        onPress={() => deleteHandler(goalObj.id)}
        iconName="delete"
        iconColor="white"
        iconSize={20}
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
