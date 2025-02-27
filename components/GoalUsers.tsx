import { FlatList, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { readAllFromDB, writeToDB } from "@/Firebase/firestoreHelper";
import { User } from "@/types";

interface GoalUsersProps {
  goalId: string;
}

export default function GoalUsers({ goalId }: GoalUsersProps) {
  const [users, setUsers] = useState<String[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        // Check the database if the users are already there
        const userFromDB = await readAllFromDB(`goals/${goalId}/users`);
        console.log("Read from DB");

        // If they are, set the users state to the users from the database
        if (userFromDB) {
          const userNames = userFromDB.map((user: User) => user.name);
          setUsers(userNames);
          return;
        }

        // If they are not, fetch the users from the API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        console.log("Reading from API");

        if (!response.ok) {
          throw new Error(`Something went wrong with the ${response.status} code`);
        }

        // Extract the JSON data
        const data = await response.json();

        // Write the users data to Firestore using writeToDB
        const userNames = data.map((user: User) => {
          writeToDB(user, `goals/${goalId}/users`);
          return user.name;
        });

        setUsers(userNames);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    }

    getUsers();
  }, [goalId]);

  const handlePostRequest = async () => {
    try {
      // Create a fake user object
      const fakeUser = {
        name: "John Doe",
        email: "john.doe@example.com",
      };

      // Send a POST request to the /users endpoint
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(fakeUser),
      });

      if (!response.ok) {
        throw new Error(`POST request failed with status ${response.status}`);
      }

      // Extract the JSON data from the response
      const data = await response.json();
      console.log("POST request successful:", data);

      // Update the users state with the new user
      setUsers((prevUsers) => [...prevUsers, data.name]);

      // Write the new user to Firestore
      await writeToDB(data, `goals/${goalId}/users`);
    } catch (err) {
      console.error("Error sending POST request:", err);
    }
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
  onPress={handlePostRequest}
  style={{ padding: 10, backgroundColor: "blue" }}
>
  <Text style={{ color: "white" }}>Add Fake User</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});