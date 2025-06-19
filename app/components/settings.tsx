import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Animated, Modal } from "react-native";
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
import NotificationSettings from "./notificationSettings";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { settings, toggleSounds, toggleNotifications } = useSettings();
  const { playButtonSound } = useSoundWithSettings();
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const themeButtonScale = useRef(new Animated.Value(1)).current;
  const themeButtonRotation = useRef(new Animated.Value(0)).current;
  const languageButtonScale = useRef(new Animated.Value(1)).current;
  const notificationsButtonScale = useRef(new Animated.Value(1)).current;
  const soundsButtonScale = useRef(new Animated.Value(1)).current;
  const notificationSettingsButtonScale = useRef(new Animated.Value(1)).current;
  
  const availableLanguages = ["en", "ru", "es", "pt", "zh", "ua"];
  const currentLanguageIndex = availableLanguages.indexOf(language);
  const nextLanguageIndex = (currentLanguageIndex + 1) % availableLanguages.length;
  const nextLanguage = availableLanguages[nextLanguageIndex];
  
  const changeLanguage = () => {
    playButtonSound();
    
    // Анимация bounce
    Animated.sequence([
      Animated.timing(languageButtonScale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(languageButtonScale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(languageButtonScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    setLanguage(nextLanguage);
  };

  const handleThemeToggle = () => {
    playButtonSound();
    
    // Анимация wiggle
    Animated.sequence([
      Animated.timing(themeButtonScale, {
        toValue: -3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(themeButtonScale, {
        toValue: 3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(themeButtonScale, {
        toValue: 0,
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
    
    // Анимация shake
    Animated.sequence([
      Animated.timing(soundsButtonScale, {
        toValue: -5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(soundsButtonScale, {
        toValue: 5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(soundsButtonScale, {
        toValue: -5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(soundsButtonScale, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
    
    toggleSounds();
  };

  const handleNotificationsToggle = () => {
    playButtonSound();
    
    // Анимация pulse
    Animated.sequence([
      Animated.timing(notificationsButtonScale, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(notificationsButtonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    
    toggleNotifications();
  };

  const style = StyleSheet.create({
    box: { justifyContent: "flex-start", width: rw(100) },
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
    notificationSettingsButton: {
      width: rw(70),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: rh(1),
      paddingHorizontal: rw(2),
      backgroundColor: theme.surface,
      borderRadius: 10,
      marginTop: rh(2),
    },
    notificationSettingsText: {
      fontSize: rf(2.5),
      color: theme.text.secondary,
      fontStyle: 'italic',
    },
  });

  return (
    <>
      <View style={style.box}>
        <Text style={style.head}>{t("settings.settings")}</Text>

        <View style={style.container}>
          <Animated.View style={{ 
            transform: [{ scale: languageButtonScale }] 
          }}>
            <TouchableOpacity style={style.option} onPress={changeLanguage}>
              <Text style={style.text}>{t("settings.language")}</Text>
              <View>
                <Text style={style.text}>{t("settings.lang")}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          
          <Animated.View style={{ 
            transform: [
              { rotate: themeButtonScale.interpolate({
                inputRange: [-3, 3],
                outputRange: ['-3deg', '3deg']
              })}
            ] 
          }}>
            <TouchableOpacity onPress={handleThemeToggle} style={style.option}>
              <Text style={style.text}>{t("settings.theme")}</Text>
              <Animated.View style={{ 
                transform: [
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
          </Animated.View>
          
          <Animated.View style={{ 
            transform: [{ scale: notificationsButtonScale }] 
          }}>
            <TouchableOpacity onPress={handleNotificationsToggle}  style={style.option}>
              <Text style={style.text}>{t("settings.notifications")}</Text>
              <Checkbox 
                checked={settings.notificationsEnabled} 
              />
            </TouchableOpacity>
          </Animated.View>
          
          <Animated.View style={{ 
            transform: [
              { rotate: soundsButtonScale.interpolate({
                inputRange: [-5, 5],
                outputRange: ['-5deg', '5deg']
              })}
            ] 
          }}>
            <TouchableOpacity    onPress={handleSoundsToggle}   style={style.option}>
              <Text style={style.text}>{t("settings.sounds")}</Text>
              <Checkbox 
                checked={settings.soundsEnabled}            
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Кнопка настроек уведомлений */}
          {settings.notificationsEnabled && (
            <Animated.View style={{ 
              transform: [{ scale: notificationSettingsButtonScale }] 
            }}>
              <TouchableOpacity 
                style={style.notificationSettingsButton} 
                onPress={() => setShowNotificationSettings(true)}
              >
                <Text style={style.notificationSettingsText}>Notification Settings</Text>
                <Text style={style.notificationSettingsText}>⚙️</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>

      {/* Модальное окно настроек уведомлений */}
      <Modal
        visible={showNotificationSettings}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowNotificationSettings(false)}
      >
        <NotificationSettings onClose={() => setShowNotificationSettings(false)} />
      </Modal>
    </>
  );
}
