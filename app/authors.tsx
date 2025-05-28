import { View, Text, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import Settings from "./components/settings";
import AuthorsInfo from "./components/authorsInfo";
import CrossDark from "../assets/svg/cross-dark.svg";
import CrossLight from "../assets/svg/cross-light.svg";
import { StyleSheet } from "react-native";
import { useContext, useRef } from "react";
import { ThemeContext } from "./components/themeSwitcher";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./components/languageProvide";
import { FadeWrapper } from "./animations";
export default function Authors() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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
      color: isDarkMode ? "black" : "white",
    },
    svg: {
      width: rw(14),
      height: rw(14),
      position: "absolute",
      right: 0,
      top: 0,
    },
  });
  const fadeRef = useRef();
  const navigation = useNavigation();
  const onClose = () => {
    navigation.navigate("index");
  };
  const handleClosePress = () => {
    if (fadeRef.current) {
      fadeRef.current.fadeOut();
    }
  };
  return (
    <>
      <FadeWrapper ref={fadeRef} onFadeOutComplete={onClose}>
        <View style={style.box}>
          <View style={style.container}>
            <TouchableOpacity
              style={style.svgContainer}
              onPress={handleClosePress}
            >
              {isDarkMode ? (
                <CrossDark style={style.svg}></CrossDark>
              ) : (
                <CrossLight style={style.svg}></CrossLight>
              )}
            </TouchableOpacity>

            <AuthorsInfo></AuthorsInfo>
            <Settings></Settings>
          </View>
          <Text style={style.text}>{t("mainSettings")}</Text>
        </View>
      </FadeWrapper>
    </>
  );
}
