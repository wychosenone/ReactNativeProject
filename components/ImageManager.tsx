import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";

interface ImageManagerProps {
  imageUriHandler: (uri: string) => void;
}
export default function ImageManager({ imageUriHandler }: ImageManagerProps) {
  const [permissionResponse, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
  async function verifyPermission() {
    // check if we have permission to access the camera
    if (permissionResponse?.granted) return true;

    // if we don't have permission, ask for permission
    const responseAfterRequest = await requestPermission();
    if (responseAfterRequest?.granted) {
      return true;
    }
    return false;
  }
  async function takeImageHandler() {
    // call verifyPermission
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to access camera");
        return;
      }
      const result = await launchCameraAsync({
        allowsEditing: true,
        quality: 0.2,
      });
      if (result.canceled) return;
      setImageUri(result.assets[0].uri);
      imageUriHandler(result.assets[0].uri);
    } catch (e) {
      console.log("error in takeImageHandler", e);
    }
  }

  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: 200, height: 200, marginTop: 10 },
});