import {
  Button,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";

type Props = { closeModal: () => void };

export default function ModalWindow({ closeModal }: Props) {
  const [value, setValue] = useState("");
  const addFriend = () => {
    console.log(value);
    if (value.trim().length > 16) {
      Toast.show({
        type: "info",
        text1: "Name must be shorter then 16 symbols!",
      });
      return;
    } else if (value.trim().length === 0) {
      Toast.show({
        type: "info",
        text1: "Name field can't be empty!",
      });
    }

    closeModal();
  };

  return (
    <Pressable onPress={closeModal} style={style.modal}>
      <Toast></Toast>
      <Pressable onPress={(e) => e.stopPropagation()} style={style.modalWin}>
        <Text style={style.text}>Enter friend name</Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={style.input}
          placeholder="nameless tee"
        />
        <TouchableOpacity onPress={addFriend} style={style.button}>
          <Text style={style.text}>Add</Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  );
}

import { StyleSheet } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";
const style = StyleSheet.create({
  modal: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    width: rw(100),
    height: rh(100),
    zIndex: 9999,
  },
  text: {
    fontSize: rw(7),
  },
  button: {
    backgroundColor: "white",
    width: rw(35),
    height: rh(7),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
  },
  modalWin: {
    width: rw(80),
    height: rh(40),
    borderRadius: 40,
    borderWidth: 4,
    opacity: 1,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 3,
    paddingHorizontal: rw(10),
    backgroundColor: "white",
    borderRadius: 10,
    height: rh(8),
    width: rw(60),
  },
});
