import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import Header from "./components/header";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import AddFrBttn from "./components/addFriendBttn";
import ModalWindow from "./components/modalWindow";
import { useState } from "react";
import PlayerList from "./components/playersList";
export default function Main() {
  const [modal, setModal] = useState<Boolean>(false);

  const openModal = (): void => {
    setModal(true);
  };
  const closeModal = (): void => {
    setModal(false);
  };
  return (
    <View style={style.box}>
      <View style={style.container}>
        <Header></Header>
        {modal && <ModalWindow closeModal={closeModal}></ModalWindow>}
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
