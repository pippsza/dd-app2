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
  const { isDarkMode } = useContext(ThemeContext);
  const bg = isDarkMode ? "rgba(255,255,255,1)" : "rgba(39,39,39,1)";
  const border = isDarkMode ? "black" : "white";
  const text = isDarkMode ? "black" : "white";
  const style = StyleSheet.create({
    modal: {
      flex: 1,
      position: "absolute",
      backgroundColor: isDarkMode
        ? "rgba(39,39,39,0.1)"
        : "rgba(255,255,255,0.1)",

      justifyContent: "center",
      alignItems: "center",
      width: rw(100),
      height: rh(100),
      zIndex: 9999,
    },
    text: {
      fontSize: rf(3),
      color: text,
    },
    button: {
      backgroundColor: bg,
      width: rw(35),
      height: rh(7),
      justifyContent: "center",
      alignItems: "center",
      borderColor: border,
      borderWidth: 3,
      borderRadius: 5,
    },
    modalWin: {
      width: rw(80),
      height: rh(40),
      borderColor: border,
      borderRadius: 9,
      borderWidth: 4,
      opacity: 1,
      backgroundColor: bg,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    input: {
      borderColor: border,
      borderWidth: 3,
      paddingHorizontal: rw(10),
      backgroundColor: bg,
      borderRadius: 4,
      height: rh(8),
      width: rw(60),
      color: text,
    },
  });

  const { t } = useTranslation();
  return (
    <Pressable onPress={closeModal} style={style.modal}>
      <SlideUp>
        <Toast></Toast>
        <Pressable onPress={(e) => e.stopPropagation()} style={style.modalWin}>
          <Text style={style.text}>{t("modalWindow.enterName")}</Text>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={style.input}
            placeholder="nameless tee"
          />
          <TouchableOpacity onPress={addName} style={style.button}>
            <Text style={style.text}>{t("modalWindow.add")}</Text>
          </TouchableOpacity>
        </Pressable>
      </SlideUp>
    </Pressable>
  );
}

import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "./themeSwitcher";
import { FadeIn, SlideUp } from "./animations";
