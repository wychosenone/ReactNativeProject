import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Modal } from 'react-native';

type InputProps = {
  focus: boolean; // Prop to control focus
  onInputData: (data: string) => void; // Prop to handle input data
  visible: boolean; // Prop to control modal visibility
};

const Input: React.FC<InputProps> = ({ focus, onInputData, visible }) => {
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
  }

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
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
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
    width: '100%', // Input takes full width of inner container
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
    width: '30%',
    marginTop: 20,
  },
});

export default Input;
