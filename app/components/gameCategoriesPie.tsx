import { Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";

export default function GameCategoryPie({ data }: any) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const bg = isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(39,39,39,0.8)";
  const border = isDarkMode ? "black" : "white";
  const text = isDarkMode ? "black" : "white";
  const style = StyleSheet.create({
    bigText: {
      textAlign: "center",
      fontSize: rf(3),
      color: isDarkMode ? "black" : "white",
    },
    fakeContainer: { height: rh(20), justifyContent: "center" },
    fakeText: { color: "red", textAlign: "center", fontSize: rf(2.5) },
    container: {
      backgroundColor: bg,
      borderColor: border,
      borderWidth: rw(0.4),
      borderRightWidth: 0,
      // borderRightWidth: 0,
      // paddingRight:10,
      marginLeft: rw(2),
      borderBottomLeftRadius: rw(3),
      borderTopLeftRadius: rw(3),
    },
  });

  const getColorGamecategories = (index: number) => {
    const colors = ["#009589", "#001e87", "#920a3d"];
    return colors[index];
  };
  const pieDataGamecategories = data.most_played_categories
    .slice(0, 3)
    .map((item, idx) => {
      return {
        name: "hours - " + item.key,
        population: Math.round(item.seconds_played / 3600),
        color: getColorGamecategories(idx),
        legendFontColor: isDarkMode ? "black" : "white",
        legendFontSize: rf(1.9),
      };
    });
  return (
    <>
      <View style={style.container}>
        {data.most_played_categories.length > 0 ? (
          <View>
            <Text style={style.bigText}>{t("categoriesPie.mostPlayed")}</Text>
            <View>
              <PieChart
                data={pieDataGamecategories}
                width={rw(100)}
                height={rw(40)}
                chartConfig={{
                  color: () => `rgba(0, 0, 0, 1)`,
                }}
                accessor="population"
                backgroundColor="transparent"
                absolute
                paddingLeft={rw(-19)}
                center={[rw(12), 0]}
              ></PieChart>
            </View>
          </View>
        ) : (
          <View style={style.fakeContainer}>
            <Text style={style.fakeText}>{t("categoriesPie.noInfo")}</Text>
          </View>
        )}
      </View>
    </>
  );
}

import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";
