import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import GoalUsers from "@/components/GoalUsers";
import { GoalData } from "@/types";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/Firebase/firebaseSetup";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function GoalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<GoalData | null>(null);
  const [warning, setWarning] = useState(false);
  //   const navigation = useNavigation();
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = (await readDocFromDB(id, "goals")) as GoalData;
        if (data != null) {
          if (data?.warning) {
            setWarning(true);
          }
          if (data.imageUri) {
            //get a download url for the image
            const imageRef = ref(storage, data.imageUri);
            const downloadUrl = await getDownloadURL(imageRef);

            //store the url in a state variab;e
            setUrl(downloadUrl);
          }
          setGoal(data);
          //   navigation.setOptions({ headerTitle: data.text });
        }
      } catch (e) {
        console.log("get data in GoalDetails", e);
      }
    }
    getData();
  }, []);
  function warningHandler() {
    setWarning(true);
    updateDB(id, "goals", { warning: true });
  }
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: goal ? (warning ? "warning" : goal.text) : "",
          headerRight: () => {
            // return <Button title="Warning" onPress={warningHandler} />;
            return (
              <PressableButton
                componentStyle={styles.warningIcon}
                pressedHandler={warningHandler}
              >
                <Ionicons name="warning" size={24} color="white" />
              </PressableButton>
            );
          },
        }}
      />
      <Text style={warning && styles.warningText}>Details of {goal?.text}</Text>
      <GoalUsers goalId={id} />
      {url && (
        <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  warningText: { color: "red" },
  warningIcon: {
    backgroundColor: "purple",
  },
});