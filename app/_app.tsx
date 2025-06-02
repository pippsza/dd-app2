import React from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import { Slot } from "expo-router";
import { enableLayoutAnimations, FadeInRight } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import NotFoundPage from "./components/notFoundPage";
import { useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./components/themeSwitcher";
import OnlinePlayersMonitor, {
  NotificationSettings,
  DEFAULT_NOTIFICATION_SETTINGS,
} from "./components/OnlinePlayersMonitor";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BlinkingBackground } from "./components/blinkingBackground";

const NOTIFICATION_SETTINGS_KEY = "notificationSettings";

export default function App() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isConnected, setIsConnected] = useState(true);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);

  useEffect(() => {
    // Загружаем настройки уведомлений при старте
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
        if (stored) {
          setNotificationSettings(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load notification settings:", error);
      }
    };
    loadSettings();
  }, []);

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

  const handleSettingsChange = async (newSettings: NotificationSettings) => {
    try {
      await AsyncStorage.setItem(
        NOTIFICATION_SETTINGS_KEY,
        JSON.stringify(newSettings)
      );
      setNotificationSettings(newSettings);
    } catch (error) {
      console.error("Failed to save notification settings:", error);
    }
  };

  const style = StyleSheet.create({
    bg: {
      flex: 1,
      zIndex: -5,
      position: "relative",
      backgroundColor: isDarkMode ? "white" : "#272727",
    },
  });

  return (
    <>
      <StatusBar
        backgroundColor={isDarkMode ? "white" : "#272727"}
        barStyle={isDarkMode ? "dark-content" : "light-content"}
      />

      {/* <ImageBackground
        source={require("../assets/images/background.png")}
        style={style.bg}
        resizeMode="cover"
      > */}

      <View style={style.bg}>
        <BlinkingBackground
          imageSource={require("../assets/images/background.png")}
        >
          <View style={{ zIndex: 9999 }}>
            <Toast></Toast>
          </View>

          {isConnected ? (
            <>
              <Slot />
              <OnlinePlayersMonitor
                settings={notificationSettings}
                onSettingsChange={handleSettingsChange}
              />
            </>
          ) : (
            <NotFoundPage />
          )}
        </BlinkingBackground>
        {/* </ImageBackground> */}
      </View>
    </>
  );
}
