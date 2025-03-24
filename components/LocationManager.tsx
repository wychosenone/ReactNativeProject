import {
    Alert,
    Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import {
    getCurrentPositionAsync,
    useForegroundPermissions,
  } from "expo-location";
  import { LocationData } from "@/types";
  import { router, useLocalSearchParams } from "expo-router";
  
  export default function LocationManager() {
    const params = useLocalSearchParams();
    // if (params) update the location state variable
    console.log(params);
    const [permissionResponse, requestPermission] = useForegroundPermissions();
    const [location, setLocation] = useState<LocationData | null>(null);
    async function verifyPermission() {
      try {
        if (permissionResponse?.status === "granted") {
          return true;
        }
        const responseFromUser = await requestPermission();
        return responseFromUser.granted;
      } catch (e) {
        console.log("Error in verifyPermission", e);
      }
    }
    async function locateUserHandler() {
      try {
        const hasPermission = verifyPermission();
        if (!hasPermission) {
          Alert.alert("You need to give permission to access location");
          return;
        }
        // only continue if hasPermission is true
        const response = await getCurrentPositionAsync();
        setLocation({
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        });
      } catch (e) {
        console.log("Error in getting location", e);
      }
    }
    function chooseLocationHandler() {
      // navigate to the map screen
      router.navigate("map");
    }
    if (location)
      console.log(
        `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${process.env.EXPO_PUBLIC_mapsAPIKey}`
      );
    return (
      <View>
        <Button title="Find My Location" onPress={locateUserHandler} />
        <Button
          title="Let me choose on the map"
          onPress={chooseLocationHandler}
        />
        {location && (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${process.env.EXPO_PUBLIC_mapsAPIKey}`,
            }}
            style={styles.map}
          />
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    map: {
      width: Dimensions.get("window").width,
      height: 200,
      marginTop: 10,
    },
  });