import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

type InputProps = {
  focus: boolean; // Prop to control focus
};

const Input: React.FC<InputProps> = ({ focus }) => {
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

  const characterCount = inputValue.length;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Type something..."
        autoFocus={focus} // Set focus using the received prop
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {/* Show character count if inputValue exists and TextInput is focused */}
      {isFocused && inputValue ? (
        <Text style={styles.charCount}>Characters: {characterCount}</Text>
      ) : null}

      {/* Show message on blur */}
      {!isFocused && showMessage && (
        <Text style={styles.message}>
          {characterCount >= 3
            ? "Thank you"
            : "Please type more than 3 characters"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 5,
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
});

export default Input;
