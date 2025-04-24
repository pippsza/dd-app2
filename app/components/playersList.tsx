import { View } from "react-native";
import PlayerItem from "./playerItem";

export default function PlayerList() {
  const testPlayers = [
    {
      name: "pippsza",
      points: 1234,
      status: "Offline",
      clan: "NEMO",
      server: "ger1",
    },
    {
      name: "penis",
      points: 1234,
      status: "Offline",
      clan: "NEMO",
      server: "ger1",
    },
  ];
  return (
    <>
      <View>
        {testPlayers.map((item) => {
          return <PlayerItem item={item} key={item.name}></PlayerItem>;
        })}
      </View>
    </>
  );
}
