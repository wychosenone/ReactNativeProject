import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define Props type
type HeaderProps = {
  appName: string;
};

const Header: React.FC<HeaderProps> = ({ appName }) => {
  return (
    <View style={styles.container}>
      {/* Display the appName */}
      <Text style={styles.text}>Welcome to {appName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
