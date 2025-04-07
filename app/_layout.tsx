import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Slot, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";

export default function _layout() {
  const segments = useSegments();
  console.log("segments", segments);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (userLoggedIn && segments[0] === "(auth)") {
      console.log("user is logged in");
      router.replace("(protected)");
    } else if (!userLoggedIn && segments[0] === "(protected)") {
      console.log("user is not logged in");
      router.replace("(auth)/login");
    }
  }, [userLoggedIn, isLoading]);

  return isLoading ? <Text>isLoading</Text> : <Slot />;
}

const styles = StyleSheet.create({});