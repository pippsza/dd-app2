import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import SunLight from "../../assets/svg/sun-light.svg";
import SunDark from "../../assets/svg/sun-dark.svg";
import CheckedLight from "../../assets/svg/checked-light.svg";
import CheckedDark from "../../assets/svg/checked-dark.svg";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./themeSwitcher";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./languageProvide";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationSettings, DEFAULT_NOTIFICATION_SETTINGS } from "./OnlinePlayersMonitor";
import * as Notifications from 'expo-notifications';

const NOTIFICATION_SETTINGS_KEY = 'notificationSettings';

export default function Settings() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const availableLanguages = ["en", "ru", "es", "pt", "zh", "ua"];

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
        if (storedSettings) {
          setNotificationSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    };
    loadSettings();
  }, []);

  const changeLanguage = () => {
    const currentIndex = availableLanguages.indexOf(language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLang = availableLanguages[nextIndex];
    setLanguage(nextLang);
  };

  const toggleNotifications = async () => {
    try {
      const isEnabled = !notificationSettings.notifyNewPlayers;
      const newSettings = {
        ...notificationSettings,
        notifyNewPlayers: isEnabled,
        notifyStatusChanges: isEnabled,
        notifyMapChanges: isEnabled,
        notifyServerChanges: isEnabled,
        notifyAFK: isEnabled,
      };
      setNotificationSettings(newSettings);
      await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(newSettings));

      // Request notification permissions if enabling notifications
      if (isEnabled) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status !== 'granted') {
            // If permission denied, revert settings
            const revertedSettings = {
              ...notificationSettings,
              notifyNewPlayers: false,
              notifyStatusChanges: false,
              notifyMapChanges: false,
              notifyServerChanges: false,
              notifyAFK: false,
            };
            setNotificationSettings(revertedSettings);
            await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(revertedSettings));
            return;
          }
        }
      }
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const style = StyleSheet.create({
    box: { justifyContent: "flex-start", flex: 1, width: rw(100) },
    container: {
      justifyContent: "center",
      alignItems: "center",
      gap: rh(3),
    },
    head: {
      fontSize: rf(4),
      textAlign: "center",
      marginBottom: rh(4),
      color: isDarkMode ? "black" : "white",
    },
    text: {
      fontSize: rf(3),
      textAlign: "left",
      color: isDarkMode ? "black" : "white",
    },
    option: {
      width: rw(70),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    svg: { width: rw(10), height: rw(10) },
    svgChecked: { width: rw(13), height: rw(13) },
    checkBox: {
      height: rw(10),
      width: rw(10),
      borderColor: isDarkMode ? "black" : "white",
      borderRadius: 12,
      borderWidth: 2,
      backgroundColor: isDarkMode ? "white" : "#272727",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <>
      <View style={style.box}>
        <Text style={style.head}>{t("settings.settings")}</Text>

        <View style={style.container}>
          <TouchableOpacity style={style.option} onPress={changeLanguage}>
            <Text style={style.text}>{t("settings.language")}</Text>
            <View>
              <Text style={style.text}>{t("settings.lang")}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme} style={style.option}>
            <Text style={style.text}>{t("settings.theme")}</Text>
            {isDarkMode ? (
              <SunDark style={style.svg} />
            ) : (
              <SunLight style={style.svg} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleNotifications} style={style.option}>
            <Text style={style.text}>{t("settings.notifications")}</Text>
            <View style={style.checkBox}>
              {notificationSettings.notifyNewPlayers && (
                isDarkMode ? (
                  <CheckedDark style={ style.svgChecked} />
                ) : (
                  <CheckedLight style={style.svgChecked} />
                )
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
