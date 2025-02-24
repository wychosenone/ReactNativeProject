import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { writeToDB } from '@/Firebase/firestoreHelper';

interface User {
  id: number;
  name: string;
  email: string;
}

interface GoalUsersProps {
  goalId: string;
}

const GoalUsers: React.FC<GoalUsersProps> = ({ goalId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAndWriteUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`Network response was not ok, with code ${response.status}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
        for (const user of data) {
          await writeToDB({ text: user.name }, `goals/${goalId}/users`);
        }
      } catch (err) {
        console.error('Error fetching or writing users:', err);
        setError('Failed to fetch or write users');
      }
    };
    fetchAndWriteUsers();
  }, [goalId]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Goal Users</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.name}
            </Text>
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
