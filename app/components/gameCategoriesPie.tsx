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

const CATEGORY_COLORS = ["#1f81b1", "#b1991f", "#b12036"];
const SECONDS_IN_HOUR = 3600;
const MAX_CATEGORIES = 3;

export default function GameCategoryPie({ data }: any) {
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
      borderRightWidth: 0,
      marginLeft: rw(5),
      borderBottomLeftRadius: rw(3),
      borderTopLeftRadius: rw(3),
    },
  });

  const getColorForCategory = (index: number) =>
    CATEGORY_COLORS[index % CATEGORY_COLORS.length];

  const pieData =
    data?.most_played_categories
      ?.slice(0, MAX_CATEGORIES)
      .map((item: any, idx: number) => ({
        name: `${t("hours")} - ${item.key}`,
        population: Math.round(item.seconds_played / SECONDS_IN_HOUR),
        color: getColorForCategory(idx),
        legendFontColor: text,
        legendFontSize: rf(1.9),
      })) ?? [];

  const renderChart = () => (
    <View>
      <Text style={style.bigText}>{t("categoriesPie.mostPlayed")}</Text>
      <View>
        <PieChart
          {...({
            data: pieData,
            width: rw(97),
            height: rw(36),
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
      <Text style={style.fakeText}>{t("categoriesPie.noInfo")}</Text>
    </View>
  );

  return (
    <View style={style.container}>
      {data?.most_played_categories?.length > 0
        ? renderChart()
        : renderNoData()}
    </View>
  );
}
