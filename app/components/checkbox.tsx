import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { ThemeContext } from "./themeSwitcher";
import CheckedDark from "../../assets/svg/checked-dark.svg";
import CheckedLight from "../../assets/svg/checked-light.svg";

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

export default function Checkbox({ checked, onPress }: CheckboxProps) {
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
    <TouchableOpacity style={styles.checkbox} onPress={onPress}>
      {checked && (
        isDarkMode ? (
          <CheckedDark style={styles.checkmark} />
        ) : (
          <CheckedLight style={styles.checkmark} />
        )
      )}
    </TouchableOpacity>
  );
} 