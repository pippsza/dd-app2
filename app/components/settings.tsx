import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./languageProvide";
import { useSettings } from "./settingsProvider";
import Checkbox from "./checkbox";
import { useSoundWithSettings } from "../hooks/useSoundWithSettings";
import LoadSvg from "./loadSvg";

export default function Settings() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { settings, toggleSounds, toggleNotifications } = useSettings();
  const { playButtonSound } = useSoundWithSettings();
  
  const availableLanguages = ["en", "ru", "es", "pt", "zh", "ua"];
  
  const changeLanguage = () => {
    playButtonSound();
    const currentIndex = availableLanguages.indexOf(language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLang = availableLanguages[nextIndex];
    setLanguage(nextLang);
  };

  const handleThemeToggle = () => {
    playButtonSound();
    toggleTheme();
  };

  const handleSoundsToggle = () => {
    playButtonSound();
    toggleSounds();
  };

  const handleNotificationsToggle = () => {
    playButtonSound();
    toggleNotifications();
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
          
          <TouchableOpacity onPress={handleThemeToggle} style={style.option}>
            <Text style={style.text}>{t("settings.theme")}</Text>
            <LoadSvg name="sun" style={style.svg} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleNotificationsToggle}  style={style.option}>
            <Text style={style.text}>{t("settings.notifications")}</Text>
            <Checkbox 
              checked={settings.notificationsEnabled} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity    onPress={handleSoundsToggle}   style={style.option}>
            <Text style={style.text}>{t("settings.sounds")}</Text>
            <Checkbox 
              checked={settings.soundsEnabled}            
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
