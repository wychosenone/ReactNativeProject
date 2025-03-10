// layout options for my auth screens
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "purple" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Login",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "signup",
        }}
      />
    </Stack>
  );
}