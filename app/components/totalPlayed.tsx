import { Text } from "react-native";
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";

export default function TotalPlayed({ data }: any) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const bg = isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(39,39,39,0.8)";
  const border = isDarkMode ? "black" : "white";
  const text = isDarkMode ? "black" : "white";
  const activity = data?.general_activity;

  const { t } = useTranslation();
  const style = StyleSheet.create({
    text: {
      paddingVertical: rh(1),
      fontSize: rf(2),
      backgroundColor: bg,
      borderColor: border,
      borderWidth: rw(0.4),
      // borderLeftWidth: 0,
      // borderRightWidth: 0,
      borderRadius: rw(2),
      marginHorizontal: rw(7),
      textAlign: "center",
      color: isDarkMode ? "black" : "white",
    },
    fakeText: {
      backgroundColor: bg,
      paddingVertical: rh(1),
      borderColor: border,
      borderWidth: rw(0.4),
      borderLeftWidth: 0,
      borderRightWidth: 0,
      color: "red",
      textAlign: "center",
      fontSize: rf(3),
    },
  });

  return (
    <Text style={activity ? style.text : style.fakeText}>
      {activity
        ? `${t("totalPlayed.totalPlayed")} ${Math.round(
            activity.total_seconds_played / 3600
          )} ${t("totalPlayed.hours")} ${activity.start_of_playtime}`
        : t("totalPlayed.noPlayed")}
    </Text>
  );
}

import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";
