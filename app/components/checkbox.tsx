import React from "react";
import { View, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import LoadSvg from "./loadSvg";
import { useTheme } from "../hooks/useTheme";

interface CheckboxProps {
  checked: boolean;
}

export default function Checkbox({ checked }: CheckboxProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    checkbox: {
      height: rw(10),
      width: rw(10),
      borderColor: theme.checkbox.border,
      borderRadius: 12,
      borderWidth: 2,
      backgroundColor: theme.checkbox.background,
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