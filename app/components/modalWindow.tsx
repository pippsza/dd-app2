import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { useSoundWithSettings } from "../hooks/useSoundWithSettings";
import { useTheme } from "../hooks/useTheme";

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
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { playButtonSound, playAddSound } = useSoundWithSettings();

  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      position: "absolute",
      backgroundColor: theme.modal.overlay,
      justifyContent: "center",
      alignItems: "center",
      width: rw(100),
      height: rh(100),
      zIndex: 9999,
    },
    text: {
      fontSize: rf(3),
      color: theme.text.primary,
    },
    button: {
      backgroundColor: theme.button.background,
      width: rw(35),
      height: rh(7),
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.button.border,
      borderWidth: 3,
      borderRadius: 5,
    },
    modalWin: {
      width: rw(80),
      height: rh(40),
      borderColor: theme.border.primary,
      borderRadius: 9,
      borderWidth: 4,
      opacity: 1,
      backgroundColor: theme.modal.background,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    input: {
      borderColor: theme.input.border,
      borderWidth: 3,
      paddingHorizontal: rw(10),
      backgroundColor: theme.input.background,
      borderRadius: 4,
      height: rh(8),
      width: rw(60),
      color: theme.input.text,
    },
  });

  const handleModalPress = (e: any) => e.stopPropagation();

  const handleAddPress = () => {
    playAddSound();
    addName();
  };

  const handleClosePress = () => {
    playButtonSound();
    closeModal();
  };

  return (
    <TouchableOpacity style={styles.modal} onPress={handleClosePress}>
      <TouchableOpacity style={styles.modalWin} onPress={handleModalPress}>
        <Text style={styles.text}>{t("modalWindow.addFriend")}</Text>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={t("modalWindow.enterName")}
          placeholderTextColor={theme.text.secondary}
        />
        <View style={{ flexDirection: "row", gap: rw(5) }}>
          <TouchableOpacity style={styles.button} onPress={handleClosePress}>
            <Text style={styles.text}>{t("modalWindow.cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAddPress}>
            <Text style={styles.text}>{t("modalWindow.add")}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
