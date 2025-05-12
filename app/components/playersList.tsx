import { Pressable, Text, TouchableOpacity, View } from "react-native";
import PlayerItem from "./playerItem";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import VerticalLoopingFlatList from "./carousel";

import { useNavigation } from "expo-router";

export default function PlayerList() {
  const navigation = useNavigation();
  const navigateFunc = () => {
    console.log("penis");
    navigation.navigate("info", { item: JSON.stringify(data) });
  };
  return (
    // <View style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
    //   <PlayerCarousel data={data} itemHeight={40} />
    // </View>

    // <VerticalLoopingFlatList
    //   data={data}
    //   onPressItem={(item, idx) => console.log("Pressed", idx, item)}
    // />

    <TouchableOpacity onPress={navigateFunc}>
      <Text>GO TO INFO PAGE</Text>
    </TouchableOpacity>
  );
}

import { StyleSheet } from "react-native";


const style = StyleSheet.create({ container: { flex: 1 } });
const data: AllTees = [

  {
    status: "Online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    favourite_teammates: [
      {
        name: "MonikFox",
      },
    ],
    recent_player_info: [
      {
        skin_name: "nanami_glow",
        skin_color_body: 14876470,
        skin_color_feet: 7995136,
      },
    ],
    profile: {
      name: "good santa",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 220,
      start_of_playtime: "2022-05-03",
    },
    most_played_locations: [
      {
        key: "eu",
        seconds_played: 5674195,
      },
      {
        key: "eu:it",
        seconds_played: 1583535,
      },
    ],
    most_played_categories: [
      {
        key: "Brutal",
        seconds_played: 3926725,
      },
      {
        key: "Moderate",
        seconds_played: 854790,
      },
      {
        key: "Novice",
        seconds_played: 467800,
      },
    ],
    most_played_gametypes: [
      {
        key: "DDraceNetwork",
        seconds_played: 6167075,
      },
      {
        key: "Gores",
        seconds_played: 2190105,
      },
      {
        key: "TestDDraceNetwork",
        seconds_played: 180,
      },
      {
        key: "fng2",
        seconds_played: 14055,
      },
    ],
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
  {
    status: "Online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    favourite_teammates: [
      {
        name: "MonikFox",
      },
    ],
    recent_player_info: [
      {
        skin_name: "nanami_glow",
        skin_color_body: 14876470,
        skin_color_feet: 7995136,
      },
    ],
    profile: {
      name: "storma",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 220,
      start_of_playtime: "2022-05-03",
    },
    most_played_locations: [
      {
        key: "eu",
        seconds_played: 5674195,
      },
      {
        key: "eu:it",
        seconds_played: 1583535,
      },
    ],
    most_played_categories: [
      {
        key: "Brutal",
        seconds_played: 3926725,
      },
      {
        key: "Moderate",
        seconds_played: 854790,
      },
      {
        key: "Novice",
        seconds_played: 467800,
      },
    ],
    most_played_gametypes: [
      {
        key: "DDraceNetwork",
        seconds_played: 6167075,
      },
      {
        key: "Gores",
        seconds_played: 2190105,
      },
      {
        key: "TestDDraceNetwork",
        seconds_played: 180,
      },
      {
        key: "fng2",
        seconds_played: 14055,
      },
    ],
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
  {
    status: "Online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    favourite_teammates: [
      {
        name: "MonikFox",
      },
    ],
    recent_player_info: [
      {
        skin_name: "nanami_glow",
        skin_color_body: 14876470,
        skin_color_feet: 7995136,
      },
    ],
    profile: {
      name: "monik",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 220,
      start_of_playtime: "2022-05-03",
    },
    most_played_locations: [
      {
        key: "eu",
        seconds_played: 5674195,
      },
      {
        key: "eu:it",
        seconds_played: 1583535,
      },
    ],
    most_played_categories: [
      {
        key: "Brutal",
        seconds_played: 3926725,
      },
      {
        key: "Moderate",
        seconds_played: 854790,
      },
      {
        key: "Novice",
        seconds_played: 467800,
      },
    ],
    most_played_gametypes: [
      {
        key: "DDraceNetwork",
        seconds_played: 6167075,
      },
      {
        key: "Gores",
        seconds_played: 2190105,
      },
      {
        key: "TestDDraceNetwork",
        seconds_played: 180,
      },
      {
        key: "fng2",
        seconds_played: 14055,
      },
    ],
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
  {
    status: "Online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    favourite_teammates: [
      {
        name: "MonikFox",
      },
    ],
    recent_player_info: [
      {
        skin_name: "nanami_glow",
        skin_color_body: 14876470,
        skin_color_feet: 7995136,
      },
    ],
    profile: {
      name: "pippsza",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 220,
      start_of_playtime: "2022-05-03",
    },
    most_played_locations: [
      {
        key: "eu",
        seconds_played: 5674195,
      },
      {
        key: "eu:it",
        seconds_played: 1583535,
      },
    ],
    most_played_categories: [
      {
        key: "Brutal",
        seconds_played: 3926725,
      },
      {
        key: "Moderate",
        seconds_played: 854790,
      },
      {
        key: "Novice",
        seconds_played: 467800,
      },
    ],
    most_played_gametypes: [
      {
        key: "DDraceNetwork",
        seconds_played: 6167075,
      },
      {
        key: "Gores",
        seconds_played: 2190105,
      },
      {
        key: "TestDDraceNetwork",
        seconds_played: 180,
      },
      {
        key: "fng2",
        seconds_played: 14055,
      },
    ],
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
  {
    status: "Online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    favourite_teammates: [
      {
        name: "MonikFox",
      },
    ],
    recent_player_info: [
      {
        skin_name: "nanami_glow",
        skin_color_body: 14876470,
        skin_color_feet: 7995136,
      },
    ],
    profile: {
      name: "nameless tee",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 220,
      start_of_playtime: "2022-05-03",
    },
    most_played_locations: [
      {
        key: "eu",
        seconds_played: 5674195,
      },
      {
        key: "eu:it",
        seconds_played: 1583535,
      },
    ],
    most_played_categories: [
      {
        key: "Brutal",
        seconds_played: 3926725,
      },
      {
        key: "Moderate",
        seconds_played: 854790,
      },
      {
        key: "Novice",
        seconds_played: 467800,
      },
    ],
    most_played_gametypes: [
      {
        key: "DDraceNetwork",
        seconds_played: 6167075,
      },
      {
        key: "Gores",
        seconds_played: 2190105,
      },
      {
        key: "TestDDraceNetwork",
        seconds_played: 180,
      },
      {
        key: "fng2",
        seconds_played: 14055,
      },
    ],
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
];
