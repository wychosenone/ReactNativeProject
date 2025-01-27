import React, {useState} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export interface Goal {
  id: number;
  text: string;
}
export default function App() {
  const appName = "My React Native App";
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);

  const handleInputData = (data: string) => {
    //define a variable of type goal
    //update it with the data received from input and a random value
    // add the obkect to the goals array
    const newGoal: Goal = { text: data, id: Math.random() }; // Create a new goal object
    setGoals((prevGoals) => [...prevGoals, newGoal]); // Add the new goal to the state
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  }

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

       {/* Bottom Section (Goals List) */}
       <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          {goals.map((goalObj) => (
            <View key={goalObj.id} style={styles.goalItem}>
              <Text style={styles.goalText}>{goalObj.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Modal / Input component */}
      <Input
        visible={modalVisible}
        onInputData={handleInputData}
        onCancel={handleCancel}
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
    backgroundColor: 'white',
  },
  textContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  inputText: {
    fontSize: 20,
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
  },
  goalItem: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  goalText: {
    fontSize: 16,
    color: "black",
  },
});