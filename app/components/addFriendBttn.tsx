import { TouchableOpacity, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./themeSwitcher";
import { useContext } from "react";
import PlusDark from "../../assets/svg/plus-dark.svg";
import PlusLight from "../../assets/svg/plus-light.svg";
type Props = { openModal: () => void };

export default function AddFrBttn({ openModal }: Props) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const style = StyleSheet.create({
    box: {
      backgroundColor: isDarkMode ? "white" : "#272727",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      bottom: 0,
      width: rw(22),
      height: rw(18),
      borderColor: isDarkMode ? "black" : "white",
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderWidth: 4,
      borderBottomWidth: 0,
    },
    plus: {
      width: rw(13),
      height: rw(13),
    },
  });

  return (
    <>
      <View style={style.box} onTouchStart={openModal}>
        <TouchableOpacity>
          {isDarkMode ? (
            <PlusDark style={style.plus}></PlusDark>
          ) : (
            <PlusLight style={style.plus}></PlusLight>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
