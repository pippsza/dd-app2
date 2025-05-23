import { StyleSheet, Text, View } from "react-native";
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";

export default function NotFoundPage() {
  return (
    <View style={style.container}>
      <Text style={style.big}>404</Text>
      <Text style={style.small}>No internet connection.</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  big: { fontSize: rf(20), color: "red" },
  small: {
    fontSize: rf(4),
    color: "black",
  },
});
