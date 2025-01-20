import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define Props type
type HeaderProps = {
  appName: string;
};

const Header: React.FC<HeaderProps> = ({ appName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to {appName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    borderWidth: 1,
    padding:10,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;