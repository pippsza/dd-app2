import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import Header from "./components/header";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import AddFrBttn from "./components/addFriendBttn";
import ModalWindow from "./components/modalWindow";
export default function Main() {
  return (
    <View style={style.box}>
      <View style={style.container}>
        <Header></Header>
        <Text>test</Text>
        <ModalWindow></ModalWindow>
        <AddFrBttn></AddFrBttn>
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
