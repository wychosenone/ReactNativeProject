import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { writeToDB, readAllFromDB } from '@/Firebase/firestoreHelper';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GoalUsersProps {
  goalId: string;
}

const GoalUsers: React.FC<GoalUsersProps> = ({ goalId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await readAllFromDB(`goals/${goalId}/users`);
        if (!storedUsers) {
          throw new Error('No users found in Firestore');
        }
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`Network response was not ok, with code ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);

        for (const user of data) {
          await writeToDB(user, `goals/${goalId}/users`);
        }
      } catch (err) {
        console.error('Error fetching or writing users:', err);
        setError('Failed to fetch or write users');
      }
    };

    fetchUsers();
  }, [goalId]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Goal Users</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.name}</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  error: {
    color: 'red',
  },
  item: {
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default GoalUsers;
