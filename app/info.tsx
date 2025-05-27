import { Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
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
import CrossLight from "../assets/svg/cross-light.svg";
import MoreLight from "../assets/svg/more-light.svg";
import TeeContainer from "./components/teeContainer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { ThemeContext } from "./components/themeSwitcher";

export default function Info({}) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation();
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
        navigation.navigate("index", { error: true });
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
          {isDarkMode ? (
            <CrossDark style={style.svg}></CrossDark>
          ) : (
            <CrossLight style={style.svg}></CrossLight>
          )}
        </TouchableOpacity>
      </Link>
      <Link asChild href={`https://ddstats.tw/player/${data}`}>
        <TouchableOpacity>
          {isDarkMode ? (
            <MoreDark style={style.moreSvg}></MoreDark>
          ) : (
            <MoreLight style={style.moreSvg}></MoreLight>
          )}
        </TouchableOpacity>
      </Link>
      <TeeContainer online={online} data={player} />
      <TotalPlayed data={player} />

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
    zIndex: 999999999,
    top: rh(1),
  },
});
