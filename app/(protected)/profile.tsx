import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "@/Firebase/firebaseSetup";
import LocationManager from "@/components/LocationManager";
import NotificationManager from "@/components/NotificationManager";

export default function profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
      <LocationManager />
      <NotificationManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});