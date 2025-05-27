import { Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";

export default function GameModePie({ data }: any) {
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
      borderLeftWidth: 0,
      // borderRightWidth: 0,
      // paddingRight:10,
      marginRight: rw(2),
      borderBottomRightRadius: rw(3),
      borderTopRightRadius: rw(3),
    },
  });

  const getColorGametypes = (index: number) => {
    const colors = ["#ff6a76", "#ffe178", "#6df5c2"];
    return colors[index];
  };

  const pieDataGametypes = data.most_played_gametypes
    .slice(0, 3)
    .map((item, idx) => {
      return {
        name: "hours - " + item.key,
        population: Math.round(item.seconds_played / 3600),
        color: getColorGametypes(idx),
        legendFontColor: isDarkMode ? "black" : "white",
        legendFontSize: rf(1.9),
      };
    });

  return (
    <>
      <View style={style.container}>
        {data.most_played_gametypes.length > 0 ? (
          <View>
            <Text style={style.bigText}>{t("gamemodesPie.mostPlayed")}</Text>
            <View>
              <PieChart
                data={pieDataGametypes}
                width={rw(100)}
                height={rw(40)}
                chartConfig={{
                  color: () => (isDarkMode ? "green" : "white"),
                }}
                accessor="population"
                backgroundColor="transparent"
                absolute
                paddingLeft={rw(-19)}
                center={[rw(12), 0]}
              />
            </View>
          </View>
        ) : (
          <View style={style.fakeContainer}>
            <Text style={style.fakeText}>{t("gamemodesPie.noInfo")}</Text>
          </View>
        )}
      </View>
    </>
  );
}
