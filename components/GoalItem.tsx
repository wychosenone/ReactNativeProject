import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

interface GoalItemProps {
    id: number; // Add a unique ID to each goal item for deletion purposes
    text: string;
    onDelete: (id: number) => void; // Prop to handle deletion of a goal
  }

const GoalItem: React.FC<GoalItemProps> = ({ id, text, onDelete}) => {
  return (
    <View style={styles.goalItem}>
        <Text style={styles.goalText}>{text}</Text>
        <Button
            title="X"
            color="red"
            onPress={() => onDelete(id)}
        />
  </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  goalText: {
    fontSize: 20,
    color: "black",
  },
  deleteButton: {
    borderWidth:1,
    backgroundColor:"red",
  }
});

export default GoalItem;
