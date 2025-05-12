import { Text } from "react-native";
import CanvasImage from "./components/canvas";

export default function TestPage() {
  const player = "santa_cool_greyfox";
  return (
    <>
      <Text>Testing</Text>
      <CanvasImage
        src={`https://skins.ddnet.org/skin/community/${player}.png`}
      ></CanvasImage>
    </>
  );
}
