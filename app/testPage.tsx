import { Text, View } from "react-native";
import CanvasImage from "./components/canvas";
import CanvasImageRN from "./components/canvas";

export default function TestPage() {
  const player = "santa_cool_greyfox";
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
        <CanvasImageRN
          width={20}
          src={`https://skins.ddnet.org/skin/community/${player}.png`}
        ></CanvasImageRN>
      </View>
    </View>
  );
}
