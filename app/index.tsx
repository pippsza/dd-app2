import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Header from "./components/header";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import AddFrBttn from "./components/addFriendBttn";
import ModalWindow from "./components/modalWindow";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Slider from "./components/slider";
import axios from "axios";
export default React.memo(function Main() {
  const [modal, setModal] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(false);
  const [names, setNames] = useState<String[]>(["pippsza", "MonikFox"]);
  const [inputValue, setInputValue] = useState("");

  const toggleTheme = (): void => {
    console.log("theme has toggled");
    setTheme((prev) => !prev);
    async () => {
      const stored = await AsyncStorage.setItem("theme", JSON.stringify(theme));
    };
  };

  const openModal = (): void => {
    setModal(true);
  };
  const closeModal = (): void => {
    setModal(false);
  };

  const addName = async () => {
    const trimmed = inputValue.trim();

    if (trimmed.length > 16) {
      Toast.show({
        type: "info",
        text1: "Name must be shorter than 16 symbols!",
      });
      return;
    }

    if (trimmed.length === 0) {
      Toast.show({
        type: "info",
        text1: "Name field can't be empty!",
      });
      return;
    }
    if (names.includes(trimmed)) {
      Toast.show({
        type: "info",
        text1: "This player is already your friend!",
      });
      return;
    }

    try {
      const response = await axios.get(
        `http://ddstats.tw/profile/json?player=${encodeURIComponent(trimmed)}`
      );
      console.log(response.data);

      setNames((prev) => [...prev, trimmed]);
      setInputValue("");
      closeModal();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Player doesn't exist",
      });
      console.error(error);
    }
  };

  // Загрузка из AsyncStorage при монтировании
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("friendsNames");
      const themeStored = await AsyncStorage.getItem("theme");
      if (themeStored !== null) {
        setTheme(JSON.parse(themeStored));
      }
      if (stored) {
        setNames(JSON.parse(stored));
      }
    })();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem("friendsNames", JSON.stringify(names));
  }, [names]);

  return (
    <View style={style.box}>
      <View style={style.container}>
        <Header toggleTheme={toggleTheme}></Header>
        {modal && (
          <ModalWindow
            closeModal={closeModal}
            inputValue={inputValue}
            setInputValue={setInputValue}
            addName={addName}
          ></ModalWindow>
        )}
        <View style={style.sliderContainer}>
          <Slider setNames={setNames} players={names}></Slider>
        </View>

        {theme && <Text>Theme is {theme}</Text>}

        <AddFrBttn openModal={openModal}></AddFrBttn>
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  box: { flex: 1 },
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: rw(2),
  },
  sliderContainer: { height: rh(83) },
});

// https://ddnet.org/players/?query=Cor -МОЖНО ДЕЛАТЬ ЗАПРОС НА СЕРВЕР И ПОЛУЧАТЬ ПОДХОДЯЩИЕ НИКИ
