import { Text } from "react-native";
import CanvasImage from "./components/canvas";

export default function TestPage() {
  return (
    <>
      <Text>Testing</Text>
      <CanvasImage
        src={"https://skins.ddnet.org/skin/community/default.png"}
      ></CanvasImage>
    </>
  );
}
