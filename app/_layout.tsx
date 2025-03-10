import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Slot, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";

export default function _layout() {
  const segments = useSegments();
  console.log("segments", segments);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userLoggedIn && segments[0] === "(auth)") {
      console.log("user is logged in");
      router.replace("(protected)");
    } else if (!userLoggedIn && segments[0] === "(protected)") {
      console.log("user is not logged in");
      router.replace("(auth)/login");
    }
  }, [userLoggedIn]);

  return <Slot />;
}

const styles = StyleSheet.create({});