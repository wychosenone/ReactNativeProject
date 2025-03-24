import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "@/Firebase/firebaseSetup";
import LocationManager from "@/components/LocationManager";

export default function profile() {
  return (
    <View>
      <Text>{auth.currentUser?.email}</Text>
      <LocationManager />
    </View>
  );
}

const styles = StyleSheet.create({});