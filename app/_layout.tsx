// app/_layout.tsx
import { ImageBackground, View } from "react-native";
import { Slot } from "expo-router";
import { enableLayoutAnimations } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import NotFoundPage from "./components/notFoundPage";

export default function Layout() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected === true);
    });
    // Початкова перевірка
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected === true);
    });

    return () => unsubscribe();
  }, []);
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
      <View style={{ zIndex: 9999 }}>
        <Toast></Toast>
      </View>

      {isConnected ? <Slot /> : <NotFoundPage />}
    </ImageBackground>
  );
}
