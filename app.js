import { Slot } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Slot />
    </NavigationContainer>
  );
} 