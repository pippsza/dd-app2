import { Text, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
export default function Settings() {
  return (
    <>
      <View style={style.box}>
        <Text>Settings</Text>
      </View>
    </>
  );
}
import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "yellow",
    width: rw(100),
  },
});
