import { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { useNavigation } from "expo-router";
import { ThemeContext } from "./themeSwitcher";
import SunDark from "../../assets/svg/sun-dark.svg";
import BurgeDark from "../../assets/svg/burger-dark.svg";
import BurgerLight from "../../assets/svg/burger-light.svg";
import SunLight from "../../assets/svg/sun-light.svg";

interface HeaderProps {
  onClose: () => void;
}

export default function Header({ onClose }: HeaderProps) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const renderThemeButton = () => (
    <TouchableOpacity onPress={toggleTheme}>
      {isDarkMode ? (
        <SunDark style={styles.svg} />
      ) : (
        <SunLight style={styles.svg} />
      )}
    </TouchableOpacity>
  );

  const renderMenuButton = () => (
    <TouchableOpacity onPress={onClose}>
      {isDarkMode ? (
        <BurgeDark style={styles.svg} />
      ) : (
        <BurgerLight style={styles.svg} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.header}>
      {renderThemeButton()}
      {renderMenuButton()}
    </View>
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
