import { Text, TouchableOpacity, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import SunLight from "../../assets/svg/sun-light.svg";
import SunDark from "../../assets/svg/sun-dark.svg";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./themeSwitcher";
import { useContext } from "react";

export default function Settings() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const changeLanguage = () => {
    console.log("language has changed");
  };

  const toggleNotifications = () => {
    console.log("Notifications has toggled!");
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
    },
    svg: { width: rw(10), height: rw(10) },
    checkBox: {
      height: rw(10),
      width: rw(10),
      borderColor: "black",
      borderRadius: 12,
      borderWidth: 2,
      backgroundColor: "white",
    },
  });

  return (
    <>
      <View style={style.box}>
        <Text style={style.head}>Settings</Text>

        <View style={style.container}>
          <TouchableOpacity style={style.option} onPress={changeLanguage}>
            <Text style={style.text}>Language</Text>
            <View>
              <Text style={style.text}>EN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme} style={style.option}>
            <Text style={style.text}>Theme</Text>
            {isDarkMode ? (
              <SunDark style={style.svg}></SunDark>
            ) : (
              <SunLight style={style.svg}></SunLight>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleNotifications} style={style.option}>
            <Text style={style.text}>Notifications</Text>
            <View style={style.checkBox}></View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
