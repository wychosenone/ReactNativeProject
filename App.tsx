import React, {useState} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "My React Native App";
  const [inputData, setInputData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputData = (data: string) => {
    setInputData(data);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section (Header + Button) */}
      <View style={styles.topSection}>
        <Header appName={appName} />
        <Text style={styles.buttonText}>
        <Button
          title="Add a goal"
          onPress={() => setModalVisible(true)}
        />
        </Text>
      </View>

      {/* Bottom Section (User Input Text) */}
      <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          <Text style={styles.inputText}>User Input: {inputData}</Text>
        </View>
      </View>

      {/* Modal / Input component */}
      <Input
        visible={modalVisible}
        onInputData={handleInputData}
        focus={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  bottomSection: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  textContainer: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  inputText: {
    fontSize: 18,
    color: 'blue',
    fontWeight: 'bold',
  },
  buttonText: {
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'light-grey',
    color: 'blue',
    fontWeight: 'bold',
  }
});