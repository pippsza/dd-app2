import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useNavigation as useExpoNavigation } from "expo-router";
import Header from "./components/header";
import ModalWindow from "./components/modalWindow";
import AddFrBttn from "./components/addFriendBttn";
import Slider from "./components/slider";
import NotificationManager from "./components/notificationManager";
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
import { useSoundWithSettings } from "./hooks/useSoundWithSettings";

interface Player {
  name: string;
  data: {
    status: "Offline" | "Online" | "AFK";
    game: string | null;
    server: string | null;
    mapName: string | null;
  };
}
const friends = [
  "Switcher",
  "ty4urka",
  "Suckur",
  "писюн",
  "CoBa",
  "quish",
  "qiush",
  "MATARA",
  "Xenon",
  "3oTo",
  "Minami",
  "gloupy schnose",
  "Geppetto",
  "#!D!rtyMonk~>",
  "Mónik",
  "Krain",
  "k0ten-",
  "Shagul",
  "точно он",
  "mathohlov",
  "wixzu",
  "sunshine",
  "weterant439",
  "Anthony",
  "Funka",
  "Vika2077",
  "NoSem",
  "Lemonchik",
  "pippsza",
  "Teesy",
  "DarkNessLait",
  "godstro❤",
  "kamidyx",
  "Пушокツ",
  "v1Ny",
  ":)ream",
  "krabik",
  "SilverPaw",
  "rofezy",
  "E-ron.'",
  "ナルチク-",
  "pippsza's slave",
  "-Cuck?♥",
  "Xash",
  "PETERS",
  "SantaOne",
  "yuma",
  "Xteriche",
  "XTeriche",
  "vvrelly1",
  "minttjx1",
  "vrellyy",
  "_-Kurai-_",
  "worst hd player",
  "itr4pz 1337",
  "Cuddіеs²",
  "StormA",
  "Фуфырка",
  "yaposhka空",
  "BagleR",
  "good santa",
  "Reavenkyuol",
  "ch1th шoymeн?",
  "Offtopia",
  "Ого淚",
  "Marsupilami",
  "dievard",
  "Goldick",
  "dmen",
  "Shiryuu",
  "PoZiTiV",
  "ЕБЛАН",
  "✧Endlessღ",
  "after you",
  "Proklyat",
  "joni_2210",
  "amg1en",
  "ne 100",
  "CHITH",
  "phizyxxx",
  "Vika2088",
  "pinkout",
  ":x",
  "XSparky",
  "SparkyX",
  "younici",
  "",
  "Aok",
  "JUST A SNIPER",
  "vvrelly",
  "SympaTee",
];

interface SliderProps {
  playersArr: Player[];
  setNames: (names: Player[]) => void;
  setFilteredNames: (names: Player[]) => void;
  shouldAnimate?: boolean;
}

export default React.memo(function Main() {
  const { t } = useTranslation();
  const route: any = useRoute();
  const navigation = useNavigation();
  const expoNavigation = useExpoNavigation();
  const [modal, setModal] = useState<boolean>(false);
  const [names, setNames] = useState<Player[]>([]);
  const [filteredNames, setFilteredNames] = useState<Player[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const { playSuccessSound, playErrorSound } = useSoundWithSettings();

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
    const loadNames = async () => {
      try {
        const stored = await AsyncStorage.getItem("friendsNames");
        if (stored) {
          const loadedNames: Player[] = JSON.parse(stored);
          setNames(loadedNames);
          setFilteredNames(loadedNames);
        }
      } catch (error) {
        console.error("Error loading names:", error);
      } finally {
        setIsInitialized(true);
      }
    };
    loadNames();

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

  const updateFilteredNames = useCallback(
    (newNames: Player[]) => {
      const filterPlayers = (players: Player[]) => {
        switch (currentFilter) {
          case "online":
            return players.filter((p) => p.data.status === "Online");
          case "offline":
            return players.filter((p) => p.data.status === "Offline");
          case "afk":
            return players.filter((p) => p.data.status === "AFK");
          default:
            return players;
        }
      };
      setFilteredNames(filterPlayers(newNames));
    },
    [currentFilter]
  );

  // Update filtered names when filter changes
  useEffect(() => {
    updateFilteredNames(names);
  }, [currentFilter, names, updateFilteredNames]);

  const addName = async () => {
    const trimmed = inputValue.trim();

    if (trimmed == "pippsza-dev-add") {
      let tempPlayers: Player[] = [];
      friends.map((friend: any) => {
        const newPlayer: Player = {
          name: friend,
          data: {
            status: "Offline" as const,
            game: null,
            server: null,
            mapName: null,
          },
        };
        tempPlayers.push(newPlayer);
      });
      const newNames = [...names, ...tempPlayers];
      setNames(newNames);
      updateFilteredNames(newNames);
      setInputValue("");
      closeModal();
      playSuccessSound();
    }

    if (trimmed == "pippsza-dev-del") {
      setNames([]);
      setFilteredNames([]);
      setInputValue("");
      closeModal();
      playSuccessSound();
    }
    if (trimmed.length === 0) {
      playErrorSound();
      Toast.show({ type: "info", text1: t("toasts.emptyName") });
      return;
    }
    if (trimmed.length > 16) {
      playErrorSound();
      Toast.show({
        type: "info",
        text1: t("toasts.nameTooLong"),
      });
      return;
    }
    if (names.some((friend: any) => friend.name === trimmed)) {
      playErrorSound();
      Toast.show({
        type: "info",
        text1: t("toasts.alreadyFriend"),
      });
      return;
    }

    try {
      await axios.get(
        `https://ddstats.tw/profile/json?player=${encodeURIComponent(trimmed)}`
      );

      const newPlayer: Player = {
        name: trimmed,
        data: {
          status: "Offline" as const,
          game: null,
          server: null,
          mapName: null,
        },
      };
      const newNames = [...names, newPlayer];
      setNames(newNames);
      updateFilteredNames(newNames);
      setInputValue("");
      closeModal();
      playSuccessSound();
    } catch (error) {
      playErrorSound();
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
        if (oldStr !== newStr) {
          setNames(updated);
          setFilteredNames(updated);
        }
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

  const fadeRef = useRef(null);
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
                updateFilteredNames={updateFilteredNames}
                playersArr={filteredNames}
                shouldAnimate={shouldAnimate}
              />
            </View>
          </SlideUp>
          <AddFrBttn openModal={openModal} />
          <FilterButton
            allNames={names}
            filteredNames={filteredNames}
            setFilteredNames={setFilteredNames}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <NotificationManager players={names} />
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
