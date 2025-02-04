import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Button, FlatList, Alert } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import GoalItem from "./components/GoalItem";
import { database } from './Firebase/firebaseSetup'; 
import { writeToDB } from "./Firebase/firestoreHelper";
import { goalData } from "./Firebase/firestoreHelper";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { deleteFromDB } from "./Firebase/firestoreHelper";
import { deleteAllFromDB } from "./Firebase/firestoreHelper";

export interface GoalFromDB {
  id: string;
  text: string;
}

export default function App() {
  const appName = "My React Native App";
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState<GoalFromDB[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "goals"),
      (querySnapshot) => {
        //check if the querySnapshot is empty
        if (querySnapshot.empty) {
          setGoals([]);
        } else {
          let newArrayOfGoals: GoalFromDB[] = [];
          querySnapshot.forEach((docSnapshot) => {
            console.log(docSnapshot.id);
            newArrayOfGoals.push({
              ...(docSnapshot.data() as goalData),
              id: docSnapshot.id,
            });
          });
          console.log("newArrayOfGoals", newArrayOfGoals);
          setGoals(newArrayOfGoals);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const handleInputData = async (data: string) => {
    const newGoal = { text: data };
    await writeToDB(newGoal, "goals");
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDeleteGoal = async (deletedId: string) => {
    await deleteFromDB(deletedId, "goals"); // Delete from Firestore
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== deletedId));
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: async () => {
            await deleteAllFromDB("goals");
            setGoals([]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section (Header + Button) */}
      <View style={styles.topSection}>
        <Header appName={appName} />
        <Text style={styles.buttonText}>
          <Button title="Add a goal" onPress={() => setModalVisible(true)} />
        </Text>
      </View>

      {/* Bottom Section (Goals List in FlatList) */}
      <View style={styles.bottomSection}>
        <FlatList
          data={goals}
          renderItem={({ item }) => 
            <GoalItem goalObj={item} deleteHandler={handleDeleteGoal} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scrollContainer}
          ListHeaderComponent={
            goals.length > 0 ? (
              <Text style={styles.listHeader}>My Goals</Text>
            ) : null
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No goals to show</Text>
          }
          ListFooterComponent={
            goals.length > 0 ? (
              <View style={styles.footer}>
                <Button title="Delete All" color="red" onPress={handleDeleteAll} />
              </View>
            ) : null
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  bottomSection: {
    flex: 4,
    backgroundColor: "white",
  },
  buttonText: {
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "light-grey",
    color: "blue",
    fontWeight: "bold",
  },
  scrollContainer: {
    padding: 10,
    alignItems: "center",
  },
  goalItem: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "90%",
  },
  goalText: {
    fontSize: 10,
    color: "black",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  listHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginVertical: 10,
  },
  footer: {
    marginVertical: 20,
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  }
});