import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import Settings from "./components/settings";
import AuthorsInfo from "./components/authorsInfo";
import { StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./components/languageProvide";
import { FadeWrapper } from "./animations";
import { AnimatedButton } from "./components/animations";
import { useSoundWithSettings } from "./hooks/useSoundWithSettings";
import LoadSvg from "./components/loadSvg";
import { useTheme } from "./hooks/useTheme";

export default function Authors() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const { playButtonSound } = useSoundWithSettings();
  
  const style = StyleSheet.create({
    container: { flex: 1, padding: rw(2) },
    svgContainer: {
      position: "relative",
      zIndex: 99,
    },
    box: {
      flex: 1,
      position: "relative",
    },
    text: {
      textAlign: "center",
      fontSize: rf(1.5),
      padding: rh(1),
      color: theme.text.primary,
    },
    svg: {
      width: rw(14),
      height: rw(14),
      position: "absolute",
      right: 0,
      top: 0,
    },
  });
  const fadeRef = useRef<any>(null);
  const navigation = useNavigation();
  const onClose = () => {
    // @ts-ignore - expo-router types are not properly set up
    navigation.navigate("index");
  };
  const handleClosePress = () => {
    playButtonSound();
    if (fadeRef.current) {
      fadeRef.current.fadeOut();
    }
  };
  return (
    <>
      <FadeWrapper ref={fadeRef} onFadeOutComplete={onClose}>
        <View style={style.box}>
          <View style={style.container}>
            <AnimatedButton
              animationType="shake"
              onPress={handleClosePress}
              style={style.svgContainer}
            >
              <LoadSvg name="cross" style={style.svg} />
            </AnimatedButton>

            <AuthorsInfo></AuthorsInfo>
            <Settings></Settings>
          </View>
          <Text style={style.text}>{t("mainSettings")}</Text>
        </View>
        <Text style={{ textAlign: "right", fontSize: rf(1.2), paddingRight: rh(1), color: theme.text.primary }}>v.1.0.1</Text>
      </FadeWrapper>
    </>
  );
}
