import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "./components/header";
import ModalWindow from "./components/modalWindow";
import AddFrBttn from "./components/addFriendBttn";
import Slider from "./components/slider";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default React.memo(function Main() {
  const [modal, setModal] = useState<boolean>(false);

  const [names, setNames] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const route: any = useRoute();
  let params = { error: false };
  if (route.params != undefined) {
    params = route.params;
  }

  const openModal = (): void => {
    setModal(true);
  };

  const closeModal = (): void => {
    setModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const storedNames = await AsyncStorage.getItem("friendsNames");

        if (storedNames) {
          setNames(JSON.parse(storedNames));
        }
      } catch (error) {
        console.error("Error loading from storage:", error);
      } finally {
        setIsInitialized(true);
      }
    })();

    if (Object.keys(params).length > 0) {
      if ((params.error = true)) {
        Toast.show({
          type: "error",
          text1: "Oops, something went wrong :(",
        });
      }
    }
  }, []);

  // Save names when updated, only after initialization
  useEffect(() => {
    if (!isInitialized) return;
    AsyncStorage.setItem("friendsNames", JSON.stringify(names)).catch((err) =>
      console.error("Error saving friendsNames:", err)
    );
  }, [names, isInitialized]);

  const addName = async () => {
    const trimmed = inputValue.trim();

    if (trimmed.length === 0) {
      Toast.show({ type: "info", text1: "Name field can't be empty!" });
      return;
    }
    if (trimmed.length > 16) {
      Toast.show({
        type: "info",
        text1: "Name must be shorter than 16 symbols!",
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
      await axios.get(
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
      Toast.show({ type: "error", text1: "Player doesn't exist" });
      console.error(error);
    }
  };

  // Fetch online status every 30s and on names change
  useEffect(() => {
    if (names.length === 0) return;
    const fetchOnline = async () => {
      try {
        const MASTER_URL = "https://master1.ddnet.org/ddnet/15/servers.json";
        const response = await axios.get(MASTER_URL);
        const servers = response.data.servers;

        const updated = names.map((friend: any) => ({
          ...friend,
          data: { status: "Offline", game: null, server: null, mapName: null },
        }));

        const lookup: Record<string, any> = {};
        updated.forEach((f: any) => {
          lookup[f.name] = f;
        });

        servers.forEach((server: any) => {
          if (!server.info?.clients) return;
          server.info.clients.forEach((p: any) => {
            const f = lookup[p.name];
            if (f) {
              f.data = {
                status: p.afk ? "AFK" : "Online",
                game: server.info.game_type,
                server: server.info.name,
                mapName: server.info.map?.name || null,
              };
            }
          });
        });

        const oldStr = JSON.stringify(names);
        const newStr = JSON.stringify(updated);
        if (oldStr !== newStr) setNames(updated);
      } catch (err) {
        console.error("Error updating online status:", err);
      }
    };

    fetchOnline();
    const id = setInterval(fetchOnline, 30000);
    return () => clearInterval(id);
  }, [names]);

  return (
    <View style={style.box}>
      <View style={style.container}>
        <Header />

        {modal && (
          <ModalWindow
            closeModal={closeModal}
            inputValue={inputValue}
            setInputValue={setInputValue}
            addName={addName}
          />
        )}

        <View style={style.sliderContainer}>
          <Slider setNames={setNames} playersArr={names} />
        </View>

        <AddFrBttn openModal={openModal} />
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  box: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: rw(2),
  },
  sliderContainer: { height: rh(83) },
});
