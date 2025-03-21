import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import ImageManager from "./ImageManager";
import { userInput } from "@/types";

interface InputProps {
  textInputFocus: boolean;
  inputHandler: (data: userInput) => void;
  modalVisible: boolean;
  dismissModal: () => void;
}
export default function Input({
  textInputFocus,
  inputHandler,
  modalVisible,
  dismissModal,
}: InputProps) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const [takenImageUri, setTakenImageUri] = useState("");
  const minimumChar = 3;

  function updateText(changedText: string) {
    // update the text state
    setText(changedText);
  }
  function handleConfirm() {
    console.log("user has typed ", text);
    // call the callback from App
    //pass the data that user typed
    // pass the image uri if exists
    inputHandler({ text: text, imageUri: takenImageUri });
    setText("");
  }

  function imageUriHandler(uri: string) {
    setTakenImageUri(uri);
  }

  function handleCancel() {
    // hide the modal
    Alert.alert("Cancel", "Are you sure you want to cancel", [
      { text: "cancel", style: "cancel" },
      {
        text: "ok",
        onPress: () => {
          setText("");
          dismissModal();
        },
      },
    ]);
  }

  return (
    <Modal transparent={true} visible={modalVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            style={styles.image}
            alt="Image of a an arrow"
          />
          <Image
            source={require("../assets/goal.png")}
            style={styles.image}
            alt="Image of a an arrow"
          />
          <TextInput
            style={styles.input}
            autoFocus={textInputFocus}
            value={text}
            onChangeText={updateText}
            placeholder="Type something"
            onBlur={() => {
              setBlur(true);
            }}
            onFocus={() => {
              setBlur(false);
            }}
          />
          {blur ? (
            text.length >= 3 ? (
              <Text style={styles.text}>Thank you</Text>
            ) : (
              <Text style={styles.text}>
                Please type more than 3 characters
              </Text>
            )
          ) : (
            text && <Text style={styles.text}>{text.length}</Text>
          )}
          <ImageManager imageUriHandler={imageUriHandler} />
          <View style={styles.buttonsRow}>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancel} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                disabled={text.length < minimumChar}
                title="Confirm"
                onPress={handleConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    // backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    color: "blue",
    margin: 5,
  },
  buttonContainer: {
    width: "30%",
    margin: 10,
  },
  text: {
    color: "purple",
    margin: 5,
  },
  buttonsRow: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 5,
  },
});