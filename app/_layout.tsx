import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#800080" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: "All My Goals" }}
      />
      <Stack.Screen 
        name="goals/[id]" 
        options={{ title: "Goal Details" }}
      />
    </Stack>
  );
}
