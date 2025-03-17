import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { auth } from "@/Firebase/firebaseSetup";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = () => {
    //take user to sign up
    // navigation.replace("Signup");
    router.replace("signup");
  };
  const loginHandler = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please fill out all fields");
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        "code" in error &&
        "message" in error
      ) {
        if (error.code === "auth/user-not-found") {
          Alert.alert("Error", "User not found");
          return;
        } else if (error.code === "auth/invalid-credential") {
          Alert.alert("Error", "Invalid credentials");
          return;
        }
        // Replace there with user friendly error message
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create An Account" onPress={signupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});