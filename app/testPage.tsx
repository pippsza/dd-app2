import { Text, View } from "react-native";
import Tee from "./components/tee";

export default function TestPage() {
  const player = "Kirby_[4]";
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Testing</Text>
      <View>
        <Tee width={50} source={player}></Tee>
      </View>
    </View>
  );
}
