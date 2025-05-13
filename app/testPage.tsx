import { Text, View } from "react-native";
import CanvasImage from "./components/canvas";
import CanvasImageRN from "./components/canvas";

export default function TestPage() {
  const player = "nanami";
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
        <CanvasImageRN width={50} source={player}></CanvasImageRN>
      </View>
    </View>
  );
}
