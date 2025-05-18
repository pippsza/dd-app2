import { Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";

export default function GameModePie({ data }: any) {
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
        legendFontColor: "#1b1b1e",
        legendFontSize: rf(1.9),
      };
    });

  return (
    <>
      <View>
        {data.most_played_gametypes.length > 0 ? (
          <View>
            <Text style={style.bigText}>Most played gamemodes</Text>
            <View>
              <PieChart
                data={pieDataGametypes}
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
              />
            </View>
          </View>
        ) : (
          <View style={style.fakeContainer}>
            <Text style={style.fakeText}>No information for Tee</Text>
          </View>
        )}
      </View>
    </>
  );
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  bigText: { textAlign: "center", fontSize: rf(3) },
  fakeContainer: { height: rh(20) },
  fakeText: { color: "red", textAlign: "center", fontSize: rf(3) },
});
