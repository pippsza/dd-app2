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
import { useContext, useEffect, useRef, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { ThemeContext } from "./components/themeSwitcher";
import {
  FadeIn,
  SlideLeftToRight,
  SlideRightToLeft,
} from "./components/animations";
import { FadeWrapper } from "./animations";

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
  const handleClosePress = () => {
    if (fadeRef.current) {
      fadeRef.current.fadeOut();
    }
  };

  // const setPlayer: OneTee = data[0];
  const onClose = () => {
    navigation.navigate("index");
  };
  const loadingComponent = (
    <View style={style.mainContainer}>
      <Spinner
        visible={true}
        textContent="Loading..."
        textStyle={{ color: "#FFF" }}
      />
    </View>
  );
  const fadeRef = useRef();
  const fullComponent = (
    <FadeWrapper ref={fadeRef} onFadeOutComplete={onClose}>
      <View style={style.mainContainer}>
        <TouchableOpacity onPress={handleClosePress}>
          {isDarkMode ? (
            <CrossDark style={style.svg}></CrossDark>
          ) : (
            <CrossLight style={style.svg}></CrossLight>
          )}
        </TouchableOpacity>

        <TeeContainer online={online} data={player} />
        <FadeIn>
          <TotalPlayed data={player} />
        </FadeIn>

        <SlideLeftToRight>
          <GameModePie data={player}></GameModePie>
        </SlideLeftToRight>

        <SlideRightToLeft>
          <GameCategoryPie data={player}></GameCategoryPie>
        </SlideRightToLeft>
      </View>
    </FadeWrapper>
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
});
