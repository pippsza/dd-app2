import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import SunDark from "../../assets/svg/sun-dark.svg";
import BurgeDark from "../../assets/svg/burger-dark.svg";
import BurgerLight from "../../assets/svg/burger-light.svg";
import SunLight from "../../assets/svg/sun-light.svg";
import { StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { useContext, useRef } from "react";
import { ThemeContext } from "./themeSwitcher";

export default function Header({ onClose }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity>
          {isDarkMode ? (
            <SunDark onPress={toggleTheme} style={styles.svg}></SunDark>
          ) : (
            <SunLight onPress={toggleTheme} style={styles.svg}></SunLight>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          {isDarkMode ? (
            <BurgeDark style={styles.svg}></BurgeDark>
          ) : (
            <BurgerLight style={styles.svg}></BurgerLight>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    padding: 20,
    width: rw(100),
    height: rh(10),
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  svg: {
    width: rw(10),
    height: rw(10),
  },
});
