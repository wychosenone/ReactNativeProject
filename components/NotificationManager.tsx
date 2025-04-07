import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
} from "expo-notifications";

export default function NotificationManager() {
  async function verifyPermission() {
    try {
      const permissionResponse = await getPermissionsAsync();
      if (permissionResponse?.status === "granted") {
        return true;
      }
      const responseFromUser = await requestPermissionsAsync();
      return responseFromUser.granted;
    } catch (e) {
      console.log("Error in verifyPermission", e);
    }
  }
  async function scheduleNotificationHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission not granted",
          "Please enable notifications in settings"
        );
        return;
      }
      scheduleNotificationAsync({
        content: {
          title: "Daily Goals Reminder",
          body: "Don't forget to add your daily goals!",
          data: { url: "https://www.google.com" },
        },
        trigger: {
          seconds: 20,
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
    } catch (e) {
      console.log("Error in scheduling notification", e);
    }
  }

  return (
    <View>
      <Button
        title="Remind me to add my daily goals"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({});