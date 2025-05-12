import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import CrossDark from "../assets/svg/cross-dark.svg";
let data: AllTees;
export default function Info({}) {
  const route = useRoute();
  const { item }: any = route.params;
  try {
    data = JSON.parse(item);
  } catch (error) {
    console.error("Ошибка при парсинге данных:", error);
  }
  const testData: OneTee = data[0];

  const getColorGametypes = (index: number) => {
    const colors = ["#ff6a76", "#ffe178", "#6df5c2"];
    return colors[index];
  };
  const getColorGamecategories = (index: number) => {
    const colors = ["#009589", "#001e87", "#920a3d"];
    return colors[index];
  };

  const pieDataGametypes = testData.most_played_gametypes
    .slice(0, 3)
    .map((item, idx) => {
      return {
        name: "hours - " + item.key,
        population: Math.round(item.seconds_played / 60),
        color: getColorGametypes(idx),
        legendFontColor: "#1b1b1e",
        legendFontSize: rf(1.9),
      };
    });
  const pieDataGamecategories = testData.most_played_categories
    .slice(0, 3)
    .map((item, idx) => {
      return {
        name: "hours - " + item.key,
        population: Math.round(item.seconds_played / 60),
        color: getColorGamecategories(idx),
        legendFontColor: "#1b1b1e",
        legendFontSize: rf(1.9),
      };
    });
  return (
    <View style={style.mainContainer}>
      <Link asChild href="/">
        <TouchableOpacity>
          <CrossDark style={style.svg}></CrossDark>
        </TouchableOpacity>
      </Link>
      <View style={style.teeContainer}>
        <View>
          <Text style={style.regText}>Best friend:</Text>
          <Text style={style.smallText}>
            {testData.favourite_teammates[0].name}
          </Text>
        </View>
        <View style={style.container}>
          <View>
            <Text style={style.bigText}>♥{testData.status} </Text>
            <Text style={style.regText}>
              Playing on: {testData.playing_map}
            </Text>
            <Text style={style.regText}>{testData.playing_server}</Text>
          </View>
          <Image
            style={style.img}
            source={require("../assets/images/monik.png")}
          ></Image>
          <View>
            <Text style={style.bigText}>{testData.profile.name}</Text>
            <Text style={style.smallText}>{testData.profile.clan}</Text>
            <Text style={style.regText}> {testData.profile.points} PTS</Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={style.rightText}>Fav map:</Text>
            <Text style={style.rightSmallText}>
              {testData.most_played_maps[0].map_name}
            </Text>
          </View>
          <View>
            <Text style={style.rightText}>Fav region:</Text>
            <Text style={style.rightSmallText}>
              {testData.most_played_locations[0].key.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <Text style={style.sectionMargin}>
        Total played
        {Math.round(testData.general_activity.total_seconds_played / 60)} hours
        since {testData.general_activity.start_of_playtime}
      </Text>
      <View>
        <View>
          <Text style={style.bigText}>Most played gamemodes</Text>
        </View>
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
          ></PieChart>
        </View>
      </View>
      <View>
        <Text style={style.bigText}>Most played categories</Text>
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
    </View>
  );
}

const style = StyleSheet.create({
  container: { alignItems: "center", gap: rh(2) },
  tee: { width: 200, height: 200 },
  regText: { textAlign: "center", fontSize: rf(2) },
  bigText: { textAlign: "center", fontSize: rf(3) },
  smallText: { textAlign: "center", fontSize: rf(1.8) },
  teeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: rw(100),
  },
  img: {
    width: rw(20),
    height: rw(20),
  },
  rightText: { fontSize: rf(2), textAlign: "center" },
  rightSmallText: { fontSize: rf(1.8), textAlign: "center" },
  favContainer: { padding: 0, margin: 0 },
  sectionMargin: { marginBottom: rh(3), textAlign: "center", fontSize: rf(2) },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: rh(1),
  },
  svg: {
    width: rw(14),
    height: rw(14),
    position: "absolute",
    right: 0,
    top: 0,
  },
});
