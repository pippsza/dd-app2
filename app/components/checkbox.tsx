import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { ThemeContext } from "./themeSwitcher";
import LoadSvg from "./loadSvg";

interface CheckboxProps {
  checked: boolean;
}

export default function Checkbox({ checked }: CheckboxProps) {
  const { isDarkMode } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    checkbox: {
      height: rw(10),
      width: rw(10),
      borderColor: isDarkMode ? "black" : "white",
      borderRadius: 12,
      borderWidth: 2,
      backgroundColor: isDarkMode ? "white" : "#272727",
      justifyContent: "center",
      alignItems: "center",
    },
    checkmark: {
      width: rw(6),
      height: rw(6),
    },
  });

  return (
    <View style={styles.checkbox}>
      {checked && <LoadSvg name="checked" style={styles.checkmark} />}
    </View>
  );
} 