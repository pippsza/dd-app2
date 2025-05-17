// app/_layout.tsx
import { ImageBackground } from "react-native";
import { Slot } from "expo-router";
import { enableLayoutAnimations } from "react-native-reanimated";

export default function Layout() {
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={{
        flex: 1,
        zIndex: -5,
        position: "relative",
        backgroundColor: "skyblue",
      }}
      resizeMode="cover"
    >
      <Slot />
    </ImageBackground>
  );
}
