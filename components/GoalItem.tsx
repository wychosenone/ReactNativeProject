import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import PressableButton from "./PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GoalFromDB } from "@/types";

interface GoalItemProps {
  goalObj: GoalFromDB;
  deleteHandler: (deletedId: string) => void;
  separators: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: "leading" | "trailing", newProps: any) => void;
  };
}
export default function GoalItem({
  goalObj,
  deleteHandler,
  separators,
}: GoalItemProps) {
  function handleDelete() {
    deleteHandler(goalObj.id);
  }
  function handleLongPress() {
    Alert.alert("Delete A Goal", "Are you sure you want to delete this goal?", [
      { text: "No" },
      { text: "Yes", onPress: handleDelete },
    ]);
  }
  return (
    <Pressable
      android_ripple={styles.androidRipple}
      style={({ pressed }) => {
        return [styles.textContainer, pressed && styles.pressed];
      }}
      onPressIn={() => separators.highlight()}
      onPressOut={() => separators.unhighlight()}
      onLongPress={handleLongPress}
      onPress={() => {
        router.navigate(`/goals/${goalObj.id}`);
      }}
    >
      <Text style={styles.text}>{goalObj.text} </Text>
      <PressableButton
        pressedHandler={() => {
          //pass the id
          deleteHandler(goalObj.id);
        }}
        pressedStyle={styles.pressed}
        componentStyle={styles.deleteIcon}
      >
        {/* <Text>x</Text> */}
        <Ionicons name="trash" size={24} color="black" />
      </PressableButton>
      {/* <Button
        title="X"
        onPress={() => {
          //pass the id
          deleteHandler(goalObj.id);
        }}
      /> */}
      {/* <Link asChild href={`/goals/${goalObj.id}`}> */}
      {/* <Button
        title="info"
        onPress={() => {
          router.navigate(`/goals/${goalObj.id}?sort="asc"`);
        }}
      /> */}
      {/* </Link> */}
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
  text: {
    color: "purple",
    fontSize: 20,
  },
  pressed: {
    backgroundColor: "grey",
    opacity: 0.5,
  },
  androidRipple: { color: "red" },
  deleteIcon: {
    backgroundColor: "#aaa",
  },
});