import PressableButton from "@/components/PressableButton";
import { router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "purple" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "All My Goals",
          headerRight: () => {
            return (
              <PressableButton
                pressedHandler={() => {
                  router.navigate("profile");
                }}
              >
                <Ionicons name="person" size={24} color="white" />
              </PressableButton>
            );
          },
        }}
      />
      <Stack.Screen
        name="goals/[id]"
        options={{
          headerTitle: "Goal Details",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          headerRight: () => {
            return (
              <PressableButton
                componentStyle={{ backgroundColor: "purple" }}
                pressedHandler={() => {
                  signOut(auth);
                }}
              >
                <Ionicons name="log-out" size={24} color="white" />
              </PressableButton>
            );
          },
        }}
      />
    </Stack>
  );
}