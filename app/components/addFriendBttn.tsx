import React, { useRef } from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";
import { SlideUp } from "./animations";
import { useSoundWithSettings } from "../hooks/useSoundWithSettings";
import LoadSvg from "./loadSvg";
import { useTheme } from "../hooks/useTheme";

type Props = { openModal: () => void };

export default function AddFrBttn({ openModal }: Props) {
  const { theme } = useTheme();
  const { playButtonSound } = useSoundWithSettings();
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    playButtonSound();
    
    // Анимация нажатия кнопки
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    openModal();
  };

  const style = StyleSheet.create({
    box: {
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      width: rw(22),
      height: rw(15.8),
      borderColor: theme.border.primary,
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
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity style={style.box} onPress={handlePress}>
              <LoadSvg name="plus" style={style.plus} />
            </TouchableOpacity>
          </Animated.View>
        </SlideUp>
      </View>
    </>
  );
}
