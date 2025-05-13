import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Header from "./components/header";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import AddFrBttn from "./components/addFriendBttn";
import ModalWindow from "./components/modalWindow";
import { useEffect, useState } from "react";
import PlayerList from "./components/playersList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
export default function Main() {
  const [modal, setModal] = useState<Boolean>(false);

  const openModal = (): void => {
    setModal(true);
  };
  const closeModal = (): void => {
    setModal(false);
  };

  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addName = () => {
    console.log(inputValue);
    if (inputValue.trim().length > 16) {
      Toast.show({
        type: "info",
        text1: "Name must be shorter then 16 symbols!",
      });
      return;
    } else if (inputValue.trim().length === 0) {
      Toast.show({
        type: "info",
        text1: "Name field can't be empty!",
      });
    }

    if (inputValue.trim() === "") return;
    setNames((prev) => [...prev, inputValue.trim()]);
    setInputValue("");
    closeModal();
  };

  // Загрузка из AsyncStorage при монтировании
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("friendsNames");
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
        <Header></Header>
        {modal && (
          <ModalWindow
            closeModal={closeModal}
            inputValue={inputValue}
            setInputValue={setInputValue}
            addName={addName}
          ></ModalWindow>
        )}
        <PlayerList></PlayerList>

        <AddFrBttn openModal={openModal}></AddFrBttn>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  box: { flex: 1 },
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: rw(2),
  },
});

// https://ddnet.org/players/?query=Cor -МОЖНО ДЕЛАТЬ ЗАПРОС НА СЕРВЕР И ПОЛУЧАТЬ ПОДХОДЯЩИЕ НИКИ
