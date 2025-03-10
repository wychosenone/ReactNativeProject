import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// type HeaderProps = {name:string};
interface HeaderProps {
  name: string;
}
export default function Header({ name }: HeaderProps) {
  const { width, height } = useWindowDimensions();
  const paddingVerticalDynamic = height < 415 ? 0 : 10;
  return (
    <View>
      <Text style={[styles.textStyle, { padding: paddingVerticalDynamic }]}>
        Welcome to {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "purple",
    fontSize: windowWidth < 380 ? 20 : 26,
    paddingHorizontal: windowWidth < 380 ? 10 : 20,
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});