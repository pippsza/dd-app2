import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
export default function ModalWindow() {
  const [value, setValue] = useState("");
  const addFriend = () => {
    console.log(value);
  };
  return (
    <>
      <View style={style.modal}>
        <View style={style.modalWin}>
          <Text style={style.text}>Enter friend name</Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            style={style.input}
            placeholder="   nameless tee"
          ></TextInput>
          <TouchableOpacity onPress={addFriend} style={style.button}>
            <Text style={style.text}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

import { StyleSheet } from "react-native";
import { useState } from "react";
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
    // paddingHorizontal: 10,
    color: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    height: rh(8),
    width: rw(60),
  },
});
