import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Settings from "./components/settings";
import AuthorsInfo from "./components/authorsInfo";
import CrossDark from "../assets/svg/cross-dark.svg";
import CrossLight from "../assets/svg/cross-light.svg";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "./components/themeSwitcher";

import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
export default function Authors() {
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

  return (
    <>
      <View style={style.box}>
        <View style={style.container}>
          <Link href="/" asChild style={style.svgContainer}>
            <TouchableOpacity>
              {isDarkMode ? (
                <CrossDark style={style.svg}></CrossDark>
              ) : (
                <CrossLight style={style.svg}></CrossLight>
              )}
            </TouchableOpacity>
          </Link>
          <AuthorsInfo></AuthorsInfo>
          <Settings></Settings>
        </View>
        <Text style={style.text}>
          Are you a React Native developer? I'd love your support! You can join
          the project on GitHub — it's open-source. Or just drop me a message on
          Discord: #pippsza.
        </Text>
      </View>
    </>
  );
}
