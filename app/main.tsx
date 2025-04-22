import { View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";

export default function Main() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.header}>
        <Image
          style={styles.burger}
          source={require("../assets/svg/burger.svg")}
        ></Image>
      </View>
      <Text>Edit app/index.tsx to dasdasedit this screen.</Text>
      <Link href="/authors"> Tap to me</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    width: rw(100),
    height: rh(10),
    backgroundColor: "black",
  },
  burger: { color: "white" },
});
