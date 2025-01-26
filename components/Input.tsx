import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Modal, Alert,Image } from 'react-native';

type InputProps = {
  focus: boolean; // Prop to control focus
  onInputData: (data: string) => void; // Prop to handle input data
  visible: boolean; // Prop to control modal visibility
  onCancel: () => void; // Prop to handle cancel button press
};

const Input: React.FC<InputProps> = ({ focus, onInputData, visible, onCancel }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    setShowMessage(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowMessage(false);
  };
  
  const handleConfirm = () => {
    if (inputValue.length > 0) {
      onInputData(inputValue);
    }
    setInputValue("");
  }

  const handleCancel = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
          onCancel();  // Call the onCancel callback passed from App
          setInputValue(""); // Clear the input field after cancellation
        }
      },
      ],
      { cancelable: false }
    );
  };

  const characterCount = inputValue.length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {}}
      transparent={true}
    >
    <View style={styles.modalContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
            style={styles.image}
            alt="Network image of a goal icon" // Description for screen readers
          />
          <Image
            source={require('../assets/2617812.png')} // Local image path
            style={styles.image}
            alt="Local image of a goal icon" // Description for screen readers
          />
        </View>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Type your goal"
          autoFocus={focus}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {/* Show character count if focused and user has typed */}
        {isFocused && inputValue && (
          <Text style={styles.charCount}>Characters: {characterCount}</Text>
        )}
        {/* Show message when input loses focus */}
        {!isFocused && showMessage && (
          <Text style={styles.message}>
            {characterCount >= 3 ? "Thank you" : "Please type more than 3 characters"}
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={handleCancel} />
          </View>
          <View style={styles.button}>
            <Button title="Confirm" onPress={handleConfirm} disabled={characterCount >= 3 ? false : true}/>
          </View>
        </View>

        {/* Add Image components */}
      </View>
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding:1,
  },
  innerContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginBottom: 20,
  },
  charCount: {
    marginTop: 5,
    fontSize: 16,
    color: '#555',
  },
  message: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:10,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth:2,
    borderRadius:10,
    borderColor: "grey"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default Input;
