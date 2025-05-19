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
  const [names, setNames] = useState<any>([
    {
      name: "pippsza",
      data: { status: "Offline", game: null, server: null, mapName: null },
    },
    {
      name: "MonikFox",
      data: { status: "Offline", game: null, server: null, mapName: null },
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const toggleTheme = (): void => {
    console.log("theme has toggled");
    setTheme((prev) => !prev);
  };
  useEffect(() => {
    AsyncStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
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
    if (names.some((friend: any) => friend.name === trimmed)) {
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

      setNames((prev: any) => [
        ...prev,
        {
          name: trimmed,
          data: { status: "Offline", game: null, server: null, mapName: null },
        },
      ]);
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
        console.log("stored:", stored);
        setNames(JSON.parse(stored));
      }
    })();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem("friendsNames", JSON.stringify(names));
  }, [names]);

  useEffect(() => {
    fetchOnline();
    const intervalId = setInterval(fetchOnline, 30000);
    return () => clearInterval(intervalId);
  }, [names]);

  const fetchOnline = async () => {
    try {
      const MASTER_URL = "https://master1.ddnet.org/ddnet/15/servers.json";
      const response = await axios.get(MASTER_URL);
      const servers = response.data.servers;

      // Создаём новый массив с дефолтными данными
      const updatedNames = names.map((friend: any) => ({
        ...friend,
        data: {
          status: "Offline",
          game: null,
          server: null,
          mapName: null,
        },
      }));

      // Быстрый доступ по имени
      const lookup = updatedNames.reduce((acc: any, friend: any) => {
        acc[friend.name] = friend;
        return acc;
      }, {} as Record<string, (typeof updatedNames)[0]>);

      for (const server of servers) {
        if (!server.info || !server.info.clients) continue;
        const serverName = server.info.name;
        const gameType = server.info.game_type;
        const mapName = server.info.map?.name || null;
        const playersArr = server.info.clients;

        for (const playerObj of playersArr) {
          const playerName = playerObj.name;
          if (!lookup[playerName]) continue;

          // Обновляем копию объекта
          lookup[playerName].data = {
            status: playerObj.afk ? "AFK" : "Online",
            game: gameType,
            server: serverName,
            mapName: mapName,
          };
        }
      }

      // Проверяем, изменились ли данные (глубокое сравнение)
      const oldString = JSON.stringify(names);
      const newString = JSON.stringify(updatedNames);
      if (oldString !== newString) {
        setNames(updatedNames);
      }
    } catch (error) {
      console.error("Ошибка при обновлении онлайн-статусов:", error);
    }
  };

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
          <Slider setNames={setNames} playersArr={names}></Slider>
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
