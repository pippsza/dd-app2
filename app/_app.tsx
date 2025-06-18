import React from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import { Slot } from "expo-router";
import { enableLayoutAnimations, FadeInRight } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import NotFoundPage from "./components/notFoundPage";
import { useEffect, useState, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import { StyleSheet } from "react-native";
import { useSoundEffects } from "./utils/soundEffects";
import { useTheme } from "./hooks/useTheme";
import { BlinkingBackground } from "./components/blinkingBackground";
import { ThemeTransition } from "./components/animations";
import { Animated } from "react-native";

export default function App() {
  const { theme, isTransitioning } = useTheme();
  const [isConnected, setIsConnected] = useState(true);
  const soundEffects = useSoundEffects();
  const statusBarOpacity = useRef(new Animated.Value(1)).current;

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

  // Анимация StatusBar при смене темы
  useEffect(() => {
    if (isTransitioning) {
      Animated.timing(statusBarOpacity, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(statusBarOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [isTransitioning]);
  
  const style = StyleSheet.create({
    bg: {
      flex: 1,
      zIndex: -5,
      position: "relative",
      backgroundColor: theme.background,
    },
  });

  return (
    <>
      <Animated.View style={{ opacity: statusBarOpacity }}>
        <StatusBar
          backgroundColor={theme.statusBar.background}
          barStyle={theme.statusBar.style}
        />
      </Animated.View>

      <ThemeTransition 
        isTransitioning={isTransitioning} 
        duration={400}
        style={style.bg}
      >
        <BlinkingBackground
          imageSource={require("../assets/images/background.png")}
        >
          <View style={{ zIndex: 9999 }}>
            <Toast></Toast>
          </View>

          {isConnected ? <Slot /> : <NotFoundPage />}
        </BlinkingBackground>
      </ThemeTransition>
    </>
  );
}
