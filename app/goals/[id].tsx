import { goalData, readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState, useLayoutEffect } from "react";
import { Text, View, ActivityIndicator, Button } from "react-native";

export default function GoalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<goalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGoal = async () => {
      if (!id) return;
      try {
        const data = (await readDocFromDB(id, "goals")) as goalData | null;
        if (data) {
          setGoal(data);
          setIsWarning(data.warning || false);
        }
      } catch (err) {
        console.error("Failed to fetch goal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [id]);

  useLayoutEffect(() => {
    if (goal?.text) {
      navigation.setOptions({
        title: isWarning ? "⚠️ Warning!" : goal.text,
        headerRight: () => (
          <Button
            title="⚠️ Warning"
            color="red"
            onPress={toggleWarning}
          />
        ),
      });
    }
  }, [goal, isWarning]);

  const toggleWarning = async () => {
    if (!id) return;
    const newWarningState = !isWarning;
    setIsWarning(newWarningState);

    try {
      await updateDB(id, "goals", { warning: newWarningState });
    } catch (err) {
      console.error("Failed to update warning state:", err);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ backgroundColor: isWarning ? "red" : "white", flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: isWarning ? "white" : "black" }}>
        Goal Details
      </Text>
      {goal ? (
        <Text style={{ color: isWarning ? "white" : "black" }}>Goal: {goal.text}</Text>
      ) : (
        <Text>No goal found for this ID.</Text>
      )}
    </View>
  );
}
