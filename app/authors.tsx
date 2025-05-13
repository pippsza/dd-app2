import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Settings from "./components/settings";
import AuthorsInfo from "./components/authorsInfo";
import CrossDark from "../assets/svg/cross-dark.svg";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
export default function Authors() {
  return (
    <>
      <View style={style.box}>
        <View style={style.container}>
          <Link href="/" asChild style={style.svgContainer}>
            <TouchableOpacity>
              <CrossDark style={style.svg}></CrossDark>
            </TouchableOpacity>
          </Link>
          <AuthorsInfo></AuthorsInfo>
          <Settings></Settings>
        </View>
        <Text style={style.text}>
          Are you a React Native developer? I'd love your support! You can join
          the project on GitHub — it's open-source. Or just drop me a message on
          Discord: #pippsza.
        </Text>
      </View>
    </>
  );
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  container: { flex: 1, padding: rw(2) },
  svgContainer: {
    position: "relative",
    zIndex: 99,
  },
  box: {
    flex: 1,
    position: "relative",
  },
  text: {
    textAlign: "center",
    fontSize: rf(1.5),
    padding: rh(1),
  },
  svg: {
    width: rw(14),
    height: rw(14),
    position: "absolute",
    right: 0,
    top: 0,
  },
});
