import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GoalFromDB } from "@/App";

interface GoalItemProps {
  goalObj: GoalFromDB;
  deleteHandler: (deletedId: string) => void;
}

export default function GoalItem({ goalObj, deleteHandler }: GoalItemProps) {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button
        title="X"
        onPress={() => {
          deleteHandler(goalObj.id);
        }}
      />
    </View>
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
});
