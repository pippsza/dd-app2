import React, { useContext } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./themeSwitcher";
import { FadeIn, SlideUp } from "./animations";

interface ModalWindowProps {
  closeModal: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  addName: () => void;
}

export default function ModalWindow({
  closeModal,
  inputValue,
  setInputValue,
  addName,
}: ModalWindowProps) {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const theme = {
    background: isDarkMode ? "rgba(255,255,255,1)" : "rgba(39,39,39,1)",
    border: isDarkMode ? "black" : "white",
    text: isDarkMode ? "black" : "white",
    modalBackground: isDarkMode
      ? "rgba(39,39,39,0.1)"
      : "rgba(255,255,255,0.1)",
  };

  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      position: "absolute",
      backgroundColor: theme.modalBackground,
      justifyContent: "center",
      alignItems: "center",
      width: rw(100),
      height: rh(100),
      zIndex: 9999,
    },
    text: {
      fontSize: rf(3),
      color: theme.text,
    },
    button: {
      backgroundColor: theme.background,
      width: rw(35),
      height: rh(7),
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.border,
      borderWidth: 3,
      borderRadius: 5,
    },
    modalWin: {
      width: rw(80),
      height: rh(40),
      borderColor: theme.border,
      borderRadius: 9,
      borderWidth: 4,
      opacity: 1,
      backgroundColor: theme.background,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    input: {
      borderColor: theme.border,
      borderWidth: 3,
      paddingHorizontal: rw(10),
      backgroundColor: theme.background,
      borderRadius: 4,
      height: rh(8),
      width: rw(60),
      color: theme.text,
    },
  });

  const handleModalPress = (e: any) => e.stopPropagation();

  return (
    <Pressable onPress={closeModal} style={styles.modal}>
      <SlideUp>
        <Pressable onPress={handleModalPress} style={styles.modalWin}>
          <Text style={styles.text}>{t("modalWindow.enterName")}</Text>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
            placeholder="nameless tee"
            placeholderTextColor={theme.text}
          />
          <TouchableOpacity onPress={addName} style={styles.button}>
            <Text style={styles.text}>{t("modalWindow.add")}</Text>
          </TouchableOpacity>
        </Pressable>
      </SlideUp>
    </Pressable>
  );
}
