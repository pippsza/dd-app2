import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./themeSwitcher";
import { SlideUp } from "./animations";
import { useSoundWithSettings } from "../hooks/useSoundWithSettings";
import LoadSvg from "./loadSvg";

type Props = { openModal: () => void };

export default function AddFrBttn({ openModal }: Props) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { playButtonSound } = useSoundWithSettings();

  const handlePress = () => {
    playButtonSound();
    openModal();
  };

  const style = StyleSheet.create({
    box: {
      backgroundColor: isDarkMode ? "white" : "#272727",
      // position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      // bottom: 0,
      width: rw(22),
      height: rw(15.8),
      borderColor: isDarkMode ? "black" : "white",
      borderRadius: 14,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderWidth: 4,
      borderBottomWidth: 0,
    },
    fakeBox: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      bottom: 0,
      width: rw(22),
      height: rw(15.8),
    },
    plus: {
      width: rw(13),
      height: rw(13),
    },
  });

  return (
    <>
      <View style={style.fakeBox}>
        <SlideUp>
          <View style={style.box} onTouchStart={handlePress}>
            <TouchableOpacity>
              <LoadSvg name="plus" style={style.plus} />
            </TouchableOpacity>
          </View>
        </SlideUp>
      </View>
    </>
  );
}
