import { ImageBackground, View } from "react-native";
import { Slot } from "expo-router";
import { enableLayoutAnimations } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import NotFoundPage from "./components/notFoundPage";
import { useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./components/themeSwitcher";

export default function App() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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
  const style = StyleSheet.create({
    bg: {
      flex: 1,
      zIndex: -5,
      position: "relative",
      backgroundColor: isDarkMode ? "white" : "#272727",
    },
  });

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={style.bg}
      resizeMode="cover"
    >
      <View style={{ zIndex: 9999 }}>
        <Toast></Toast>
      </View>

      {isConnected ? <Slot /> : <NotFoundPage />}
    </ImageBackground>
  );
}
