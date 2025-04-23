// app/_layout.tsx
import { ImageBackground } from "react-native";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={{ flex: 1, zIndex: -5, position: "relative" }}
      resizeMode="cover"
    >
      <Slot />
    </ImageBackground>
  );
}
