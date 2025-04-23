import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Settings from "./components/settings";
import AuthorsInfo from "./components/authorsInfo";
import CrossDark from "../assets/svg/cross-dark.svg";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
export default function Authors() {
  return (
    <>
      <View style={style.box}>
        <View style={style.container}>
          <Link href="/main" asChild>
            <TouchableOpacity>
              <CrossDark style={style.svg}></CrossDark>
            </TouchableOpacity>
          </Link>
          <AuthorsInfo></AuthorsInfo>
          <Settings></Settings>
        </View>
      </View>
    </>
  );
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  container: { flex: 1, padding: rw(2) },
  box: {
    flex: 1,
    position: "relative",
  },
  svg: {
    width: rw(14),
    height: rw(14),
    position: "absolute",
    right: 0,
    top: 0,
  },
});
