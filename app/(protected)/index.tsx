import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import GoalItem from "@/components/GoalItem";
import { writeToDB, deleteFromDB } from "@/Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database, storage } from "@/Firebase/firebaseSetup";
import PressableButton from "@/components/PressableButton";
import { GoalData, GoalFromDB, userInput } from "@/types";
import { ref, uploadBytesResumable } from "firebase/storage";
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  setNotificationHandler,
} from "expo-notifications";
import { router } from "expo-router";

setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});
export default function App() {
  // listener for receiving notifications in the useeffect
  // this will be run only the first time the app is opened (after it's successfully rendered)
  useEffect(() => {
    const subscription = addNotificationReceivedListener((notification) => {
      console.log(notification);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    const subscription = addNotificationResponseReceivedListener((response) => {
      // extract the data from the response
      // use Linking API from react-native to navigate to the url
      Linking.openURL(response.notification.request.content.data.url);
      // if we want to navigate user to the homapage screen:
      // router.dismissAll();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const appName = "My Awesome App";
  const [goals, setGoals] = useState<GoalFromDB[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    //start the listener on real time changes on goals collection
    if (!auth.currentUser) return;
    const unsubscribe = onSnapshot(
      // repace the next line with a query that checks for owner field:
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser?.uid)
      ),
      (querySnapshot) => {
        //check if the querySnapshot is empty
        if (querySnapshot.empty) {
          setGoals([]);
        } else {
          let newArrayOfGoals: GoalFromDB[] = [];
          querySnapshot.forEach((docSnapshot) => {
            newArrayOfGoals.push({
              ...(docSnapshot.data() as GoalData),
              id: docSnapshot.id,
            });
          });
          setGoals(newArrayOfGoals);
        }
      },
      (error) => {
        console.log("Error in getting goals", error);
      }
    );
    //return a cleanup function to stop the listener
    return () => {
      unsubscribe();
    };
  }, []);
  function handleDeleteGoal(deletedId: string) {
    //which goal was deleted?
    //I need to update the goals array by removing the goal
    //filter out the goal with the id that was passed

    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goalObj) => {
    //     return goalObj.id !== deletedId;
    //   });
    // });
    //delete from db
    //call the function from firestoreHelper
    deleteFromDB(deletedId, "goals");
  }
  async function fetchImage(uri: string) {
    try {
      // fetch the image data from the uri
      const response = await fetch(uri);
      if (!response.ok) {
        //e.g. a 404 error
        throw new Error("Image not found");
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log("fetch image error", err);
    }
  }
  async function handleInputData(data: userInput) {
    try {
      let storedImageUri;
      // this function will receive data from Input
      if (data.imageUri != undefined) {
        storedImageUri = await fetchImage(data.imageUri);
      }
      //store the data in the state variable
      // setReceivedData(data);
      //close the modal
      // define a variable of type Goal object
      let newGoal: GoalData = {
        text: data.text,
        owner: auth.currentUser ? auth.currentUser.uid : null,
      };
      if (storedImageUri) {
        newGoal.imageUri = storedImageUri;
      }
      // write to db by calling the functionf rom firestoreHelper
      writeToDB(newGoal, "goals");
      //update it with the data received from Input and a random number
      // add the object to the goals array
      // use updater function in setState whenever you are
      // updating the state based on the previous state
      // setGoals((currGoals) => {
      //   return [...currGoals, newGoal];
      // });
      setIsModalVisible(false);
    } catch (err) {
      console.log("handleInputData error", err);
    }
  }

  function dismissModal() {
    setIsModalVisible(false);
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header name={appName} />
        <Input
          textInputFocus={true}
          inputHandler={handleInputData}
          modalVisible={isModalVisible}
          dismissModal={dismissModal}
        />
        <PressableButton pressedHandler={() => setIsModalVisible(true)}>
          <Text style={styles.addGoalButton}>Add a Goal</Text>
        </PressableButton>
        {/* <Button title="Add a Goal" onPress={() => setIsModalVisible(true)} /> */}
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: 5,
                backgroundColor: highlighted ? "purple" : "gray",
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 ? (
              <Text style={styles.header}>My Goals List</Text>
            ) : null
          }
          ListFooterComponent={
            goals.length ? (
              <Button title="Delete all" onPress={deleteAll} />
            ) : null
          }
          contentContainerStyle={styles.centeredHorizontal}
          data={goals}
          renderItem={({ item, separators }) => {
            //pass the received item to GoalItem component as a prop
            return (
              <GoalItem
                goalObj={item}
                deleteHandler={handleDeleteGoal}
                separators={separators}
              />
            );
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.centeredHorizontal}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id}>
                <Text style={styles.text}>{goalObj.text} </Text>
              </View>
            );
          })}
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
    // alignItems: "center",
  },
  centeredHorizontal: {
    alignItems: "center",
  },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
  addGoalButton: {
    padding: 5,
    fontSize: 15,
    color: "white",
  },
});