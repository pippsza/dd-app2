import { Text } from "react-native";
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";

export default function TotalPlayed({ data }: any) {
  const activity = data?.general_activity;
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const style = StyleSheet.create({
    text: {
      fontSize: rf(2),
      textAlign: "center",
      color: isDarkMode ? "black" : "white",
    },
    fakeText: { color: "red", textAlign: "center", fontSize: rf(3) },
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
