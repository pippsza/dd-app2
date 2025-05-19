import { Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";
import CrossDark from "../assets/svg/cross-dark.svg";
import MoreDark from "../assets/svg/more-dark.svg";
import GameCategoryPie from "./components/gameCategoriesPie";
import GameModePie from "./components/gamemodesPie";
import TotalPlayed from "./components/totalPlayed";
import TeeContainer from "./components/teeContainer";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";

export default function Info({}) {
  const route = useRoute();
  let online;
  let data: any;

  try {
    const { item, onlineData }: any = route.params;
    data = item;
    online = onlineData;
  } catch (error) {
    console.error("Ошибка при парсинге данных:", error);
  }

  const [player, setPlayer] = useState(null);
  let testData: any;
  useEffect(() => {
    const fetch = async (playername: String) => {
      try {
        const response = await axios.get(
          `http://ddstats.tw/player/json?player=${playername}`
        );

        setPlayer(response.data);
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    };
    fetch(data);
  }, []);

  // const setPlayer: OneTee = data[0];

  const loadingComponent = (
    <View style={style.mainContainer}>
      <Spinner
        visible={true}
        textContent="Loading..."
        textStyle={{ color: "#FFF" }}
      />
    </View>
  );

  const fullComponent = (
    <View style={style.mainContainer}>
      <Link asChild href="/">
        <TouchableOpacity>
          <CrossDark style={style.svg}></CrossDark>
        </TouchableOpacity>
      </Link>
      <Link asChild href={`https://ddstats.tw/player/${data}`}>
        <TouchableOpacity>
          <MoreDark style={style.moreSvg}></MoreDark>
        </TouchableOpacity>
      </Link>
      <TeeContainer data={player} />
      <TotalPlayed data={player} />
      <Text>
        {online.status},{online.mapName},{online.server},{online.game}
      </Text>
      <GameModePie data={player}></GameModePie>
      <GameCategoryPie data={player}></GameCategoryPie>
    </View>
  );

  return player ? fullComponent : loadingComponent;
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: rh(1),
    position: "relative",
  },
  svg: {
    width: rw(14),
    height: rw(14),
    position: "absolute",
    right: 0,
    top: 0,
  },
  moreSvg: {
    width: rw(7),
    height: rw(7),
    position: "absolute",
    left: rw(3),
    top: rh(-2.1),
  },
});
