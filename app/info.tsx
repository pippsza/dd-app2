import { TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";
import CrossDark from "../assets/svg/cross-dark.svg";
import GameCategoryPie from "./components/gameCategoriesPie";
import GameModePie from "./components/gamemodesPie";
import TotalPlayed from "./components/totalPlayed";
import TeeContainer from "./components/teeContainer";
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

  return (
    <View style={style.mainContainer}>
      <Link asChild href="/">
        <TouchableOpacity>
          <CrossDark style={style.svg}></CrossDark>
        </TouchableOpacity>
      </Link>
      <TeeContainer data={testData} />
      <TotalPlayed data={testData} />
      <GameModePie data={testData}></GameModePie>
      <GameCategoryPie data={testData}></GameCategoryPie>
    </View>
  );
}

const style = StyleSheet.create({
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
