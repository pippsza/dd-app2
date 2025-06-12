import React from "react";
import { Text, StyleSheet } from "react-native";
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";

export default function TotalPlayed({ data }: any) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const style = StyleSheet.create({
    text: {
      paddingVertical: rh(1),
      fontSize: rf(2),
      backgroundColor: theme.card.background,
      borderColor: theme.card.border,
      borderWidth: rw(0.4),
      borderRadius: rw(2),
      marginHorizontal: rw(7),
      textAlign: "center",
      color: theme.text.primary,
    },
    fakeText: {
      backgroundColor: theme.card.background,
      paddingVertical: rh(1),
      borderColor: theme.card.border,
      borderWidth: rw(0.4),
      borderLeftWidth: 0,
      borderRightWidth: 0,
      color: theme.text.error,
      textAlign: "center",
      fontSize: rf(3),
    },
  });

  const activity = data?.general_activity;

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
