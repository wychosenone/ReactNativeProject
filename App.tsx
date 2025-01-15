import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "My React Native App";

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <Input focus={true} /> {/* Pass focus prop */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
