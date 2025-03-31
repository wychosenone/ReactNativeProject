import React from 'react';
import { View, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Set up the notification handler to show notifications when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationManager = () => {
  // Function to verify and request notification permissions
  const verifyPermission = async (): Promise<boolean> => {
    // Check if permission is already granted
    const permissionStatus = await Notifications.getPermissionsAsync();
    if (permissionStatus.granted) {
      console.log('Notification permission already granted.');
      return true;
    }
    
    // If not granted, request permission
    console.log('Requesting notification permission...');
    const requestedPermission = await Notifications.requestPermissionsAsync();
    console.log('Permission request result:', requestedPermission);
    return requestedPermission.granted;
  };

  const scheduleNotificationHandler = async () => {
    console.log('Schedule button pressed');
    const hasPermission = await verifyPermission();
    
    if (!hasPermission) {
      Alert.alert(
        "Permission Required", 
        "Please grant notification permissions."
      );
      console.log('Permission not granted, aborting schedule.');
      return;
    }
    
    console.log('Permission granted, proceeding to schedule notification.');
    try {
      // Calculate a date 5 seconds from now
      const triggerDate = new Date(Date.now() + 5 * 1000);
      
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: "Hey! This is your scheduled reminder 📅",
          sound: true,
          // Add Android channel ID if needed
          ...(Platform.OS === 'android' && { channelId: 'default' }),
        },
        // Cast trigger to 'any' to bypass faulty type definitions in this expo-notifications version
        trigger: triggerDate as any,
      });

      console.log("Notification scheduled successfully with ID:", notificationId);
      Alert.alert("Success", "Reminder scheduled in 5 seconds!");

    } catch (err) {
      console.error("Error scheduling notification:", err);
      Alert.alert("Error", "Could not schedule reminder.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Set Reminder (5 sec)" onPress={scheduleNotificationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default NotificationManager;
