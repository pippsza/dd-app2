import React, { useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./languageProvide";
import { useSettings } from "./settingsProvider";
import Checkbox from "./checkbox";
import { useSoundWithSettings } from "../hooks/useSoundWithSettings";
import LoadSvg from "./loadSvg";
import { useTheme } from "../hooks/useTheme";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { settings, toggleSounds, toggleNotifications } = useSettings();
  const { playButtonSound } = useSoundWithSettings();
  const themeButtonScale = useRef(new Animated.Value(1)).current;
  const themeButtonRotation = useRef(new Animated.Value(0)).current;
  
  const availableLanguages = ["en", "ru", "es", "pt", "zh", "ua"];
  const currentLanguageIndex = availableLanguages.indexOf(language);
  const nextLanguageIndex = (currentLanguageIndex + 1) % availableLanguages.length;
  const nextLanguage = availableLanguages[nextLanguageIndex];
  
  const changeLanguage = () => {
    playButtonSound();
    setLanguage(nextLanguage);
  };

  const handleThemeToggle = () => {
    playButtonSound();
    
    // Анимация нажатия кнопки
    Animated.sequence([
      Animated.timing(themeButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(themeButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Анимация вращения иконки
    Animated.timing(themeButtonRotation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Сбрасываем значение для следующего вращения
      themeButtonRotation.setValue(0);
    });
    
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
      color: theme.text.primary,
    },
    text: {
      fontSize: rf(3),
      textAlign: "left",
      color: theme.text.primary,
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
            <Animated.View style={{ 
              transform: [
                { scale: themeButtonScale },
                { 
                  rotate: themeButtonRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  })
                }
              ] 
            }}>
              <LoadSvg name="sun" style={style.svg} />
            </Animated.View>
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
