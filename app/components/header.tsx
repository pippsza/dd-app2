import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import SunLight from "../../assets/svg/sun-dark.svg";
import BurgeDark from "../../assets/svg/burger-dark.svg";
import { StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";

export default function Header({ toggleTheme }: any) {
  const changeTheme = () => {
    console.log("PENIS");
  };
  return (
    <>
      <View style={styles.header}>
        <SunLight onPress={toggleTheme} style={styles.svgDark}></SunLight>
        <Link href="/authors" asChild>
          <TouchableOpacity>
            <BurgeDark style={styles.svgDark}></BurgeDark>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    padding: 20,
    width: rw(100),
    height: rh(10),
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  svgDark: {
    width: rw(10),
    height: rw(10),
  },
});
