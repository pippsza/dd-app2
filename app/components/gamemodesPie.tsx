import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";

const GAMEMODE_COLORS = ["#ff6a76", "#ffe178", "#6df5c2"];
const SECONDS_IN_HOUR = 3600;
const MAX_GAMEMODES = 3;

export default function GameModePie({ data }: any) {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const bg = isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(39,39,39,0.8)";
  const border = isDarkMode ? "black" : "white";
  const text = isDarkMode ? "black" : "white";

  const style = StyleSheet.create({
    bigText: {
      textAlign: "center",
      fontSize: rf(3),
      color: text,
    },
    fakeContainer: {
      height: rh(20),
      justifyContent: "center",
    },
    fakeText: {
      color: "red",
      textAlign: "center",
      fontSize: rf(2.5),
    },
    container: {
      backgroundColor: bg,
      borderColor: border,
      borderWidth: rw(0.4),
      borderLeftWidth: 0,
      marginRight: rw(2),
      borderBottomRightRadius: rw(3),
      borderTopRightRadius: rw(3),
    },
  });

  const getColorForGamemode = (index: number) => 
    GAMEMODE_COLORS[index % GAMEMODE_COLORS.length];

  const pieData = data?.most_played_gametypes
    ?.slice(0, MAX_GAMEMODES)
    .map((item: any, idx: number) => ({
      name: `${t("hours")} - ${item.key}`,
      population: Math.round(item.seconds_played / SECONDS_IN_HOUR),
      color: getColorForGamemode(idx),
      legendFontColor: text,
      legendFontSize: rf(1.7),
    })) ?? [];

  const renderChart = () => (
    <View>
      <Text style={style.bigText}>{t("gamemodesPie.mostPlayed")}</Text>
      <View>
        <PieChart
          {...({
            data: pieData,
            width: rw(100),
            height: rw(40),
            chartConfig: {
              color: () => text,
            },
            accessor: "population",
            backgroundColor: "transparent",
            absolute: true,
            paddingLeft: rw(-19),
            center: [rw(12), 0],
          } as any)}
        />
      </View>
    </View>
  );

  const renderNoData = () => (
    <View style={style.fakeContainer}>
      <Text style={style.fakeText}>{t("gamemodesPie.noInfo")}</Text>
    </View>
  );

  return (
    <View style={style.container}>
      {data?.most_played_gametypes?.length > 0 ? renderChart() : renderNoData()}
    </View>
  );
}
