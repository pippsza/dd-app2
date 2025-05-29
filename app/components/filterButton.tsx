import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";
export default function FilterButton({ names, setNames }: any) {
  const filters = ["Online", "Offline", "AFK", "ALL"];
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      position: "absolute",
      backgroundColor: isDarkMode ? "white" : "#272727",
      justifyContent: "center",
      alignItems: "center",
      width: rw(25),
      height: rh(5),
      bottom: 0,
      borderColor: isDarkMode ? "black" : "white",
      right: rw(9),
      borderRadius: 14,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderWidth: 4,
      borderBottomWidth: 0,
    },
    text: {
      fontSize: rf(1.1),
      color: isDarkMode ? "black" : "white",
    },
  });

  //   const allNames = names.map((el) => {
  //     console.log(el.name);
  //   });
  //   console.log(names);

  return (
    <TouchableOpacity style={style.container}>
      <Text style={style.text}>{t("filtered")}:</Text>
    </TouchableOpacity>
  );
}
