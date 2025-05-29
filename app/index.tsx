import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useNavigation as useExpoNavigation } from "expo-router";
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
import { SlideUp } from "./components/animations";
import { FadeWrapper } from "./animations";
import FilterButton from "./components/filterButton";

export default React.memo(function Main() {
  const { t } = useTranslation();
  const route: any = useRoute();
  const navigation = useNavigation();
  const expoNavigation = useExpoNavigation();
  const [modal, setModal] = useState<boolean>(false);
  const [names, setNames] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
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
      } finally {
        setIsInitialized(true);
      }
    })();

    if (Object.keys(params).length > 0) {
      if (params.error == true) {
        Toast.show({
          type: "error",
          text1: t("toasts.unexpectedError"),
        });
      }
    }
  }, []);

  // Save names when updated, only after initialization
  useEffect(() => {
    if (!isInitialized) return;
    AsyncStorage.setItem("friendsNames", JSON.stringify(names)).catch((err) => {
      throw new Error();
    });
  }, [names, isInitialized]);

  const addName = async () => {
    const trimmed = inputValue.trim();

    if (trimmed.length === 0) {
      Toast.show({ type: "info", text1: t("toasts.emptyName") });
      return;
    }
    if (trimmed.length > 16) {
      Toast.show({
        type: "info",
        text1: t("toasts.nameTooLong"),
      });
      return;
    }
    if (names.some((friend: any) => friend.name === trimmed)) {
      Toast.show({
        type: "info",
        text1: t("toasts.alreadyFriend"),
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
      Toast.show({ type: "error", text1: t("toasts.playerNotFound") });
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
      } catch (err) {}
    };

    fetchOnline();
    const id = setInterval(fetchOnline, 30000);
    return () => clearInterval(id);
  }, [names]);

  useEffect(() => {
    setShouldAnimate(true);

    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const fadeRef = useRef();
  const onClose = () => {
    expoNavigation.navigate("authors");
  };
  const handleClosePress = () => {
    if (fadeRef.current) {
      fadeRef.current.fadeOut();
    }
  };
  return (
    <FadeWrapper ref={fadeRef} onFadeOutComplete={onClose}>
      <View style={style.box}>
        <View style={style.container}>
          <Header onClose={handleClosePress} />

          {modal && (
            <ModalWindow
              closeModal={closeModal}
              inputValue={inputValue}
              setInputValue={setInputValue}
              addName={addName}
            />
          )}
          <SlideUp duration={1000}>
            <View style={style.sliderContainer}>
              <Slider
                setNames={setNames}
                playersArr={names}
                shouldAnimate={shouldAnimate}
              />
            </View>
          </SlideUp>
          <AddFrBttn openModal={openModal} />
          <FilterButton names={names} setNames={setNames}></FilterButton>
        </View>
      </View>
    </FadeWrapper>
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
