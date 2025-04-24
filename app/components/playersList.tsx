import { View } from "react-native";
import PlayerItem from "./playerItem";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
export default function PlayerList() {
  return (
    <>
      <View style={style.box}>
        {testPlayers.map((item) => {
          return <PlayerItem item={item} key={item.name}></PlayerItem>;
        })}
      </View>
    </>
  );
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.5,
    width: rw(100),
    height: rh(100),
    position: "absolute",
    alignItems: "center",
    paddingVertical: rh(4),
  },
});

const testPlayers = [
  {
    profile: {
      name: "pippsza",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
      most_played_maps: [
        {
          map_name: "Stronghold",
          seconds_played: 12313213,
        },
        {
          map_name: "Stronghold",
          seconds_played: 12313213,
        },
      ],
    },
    finishes: [
      {
        map: {
          map: "0 KBeeeR S - 2",
          server: "DDmaX.Next",
          points: 8,
          stars: 2,
          mapper: "KBeeeR",
          timestamp: "2014-09-18T08:13:00",
        },
        name: "pippsza",
        time: 2879.38,
        timestamp: "2024-07-16T20:46:24",
        server: "RUS",
        rank: 7185,
        team_rank: 850,
        seconds_played: 3435,
      },
      {
        map: {
          map: "0 KBeeeR S - 2",
          server: "DDmaX.Next",
          points: 8,
          stars: 2,
          mapper: "KBeeeR",
          timestamp: "2014-09-18T08:13:00",
        },
        name: "pippsza",
        time: 2879.38,
        timestamp: "2024-07-16T20:46:24",
        server: "RUS",
        rank: 7185,
        team_rank: 850,
        seconds_played: 3435,
      },
    ],
  },
  {
    name: "pippsza",
    points: 1234,
    status: "Offline",
    clan: "NEMO",
    server: "ger1",
  },
  {
    name: "card2",
    points: 1234,
    status: "Offline",
    clan: "NEMO",
    server: "ger1",
  },
];
