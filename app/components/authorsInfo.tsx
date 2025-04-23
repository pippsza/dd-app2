import { View, Text } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
export default function AuthorsInfo() {
  return (
    <>
      <View style={style.box}>
        <Text style={style.head}>Authors</Text>
      </View>
    </>
  );
}
import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  box: {
    position: "relative",
    flex: 1,
    zIndex: -1,
    backgroundColor: "blue",
    width: rw(100),
  },
  head: { fontSize: rw(8), textAlign: "center" },
});
