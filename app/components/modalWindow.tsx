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
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";

type Props = {
  closeModal: () => void;
  inputValue: any;
  setInputValue: any;
  addName: any;
};

export default function ModalWindow({
  closeModal,
  inputValue,
  setInputValue,
  addName,
}: Props) {
  return (
    <Pressable onPress={closeModal} style={style.modal}>
      <Toast></Toast>
      <Pressable onPress={(e) => e.stopPropagation()} style={style.modalWin}>
        <Text style={style.text}>Enter friend name</Text>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          style={style.input}
          placeholder="nameless tee"
        />
        <TouchableOpacity onPress={addName} style={style.button}>
          <Text style={style.text}>Add</Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  );
}

import { StyleSheet } from "react-native";
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
    fontSize: rf(3),
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
