import { View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import PlusDark from "../../assets/svg/plus-dark.svg";
export default function AddFrBttn() {
  return (
    <>
      <View style={style.box}>
        <PlusDark style={style.plus}></PlusDark>
      </View>
    </>
  );
}
import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  box: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    width: rw(22),
    height: rw(18),
    borderColor: "black",
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
