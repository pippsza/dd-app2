import { Text, View } from "react-native";
import PlayerItem from "./playerItem";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Swiper from "react-native-swiper";
import Slider from "./slider";

export default function PlayerList() {
  return (
    <View style={style.container}>{<Slider></Slider>}</View>

    //   <View style={style.container}>
    //     <Swiper
    //       ref={swiperRef}
    //       index={0}
    //       showsPagination={false}
    //       loop={true}
    //       onIndexChanged={(i) => setIndex(i)}
    //       horizontal={false}
    //       height={SCREEN_HEIGHT}
    //       containerStyle={style.swiper}
    //     >
    //       {pages.map((page, pageIndex) => (
    //         <View key={pageIndex} style={style.page}>
    //           {page.map((player, i) => (
    //             <PlayerItem
    //               key={player.profile.name}
    //               item={player}
    //               isActive={i === 0}
    //             />
    //           ))}
    //         </View>
    //       ))}
    //     </Swiper>
    //   </View>
    //
  );
}
import { StyleSheet } from "react-native";
const style = StyleSheet.create({ container: { flex: 1 } });
const data = [
  {
    status: "online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",

    profile: {
      name: "good santa",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 8416710,
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
        seconds_played: 17185,
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
    status: "online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    profile: {
      name: "joni_2210",
      points: 124453,
      clan: "Furry",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 8416710,
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
        seconds_played: 17185,
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
    status: "online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    profile: {
      name: "Monik",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 8416710,
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
        seconds_played: 17185,
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
    status: "online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    start_of_playtime: "2022-05-03",
    profile: {
      name: "pippsza",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 8416710,
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
        seconds_played: 17185,
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
    status: "online",
    playing_map: "Linear",
    playing_server: "Ger1 - ddrace",
    start_of_playtime: "2022-05-03",
    profile: {
      name: "pippsza",
      points: 124453,
      clan: "NEMO",
      skin_name: "Kirby_[4]",
      skin_color_body: "",
      skin_color_feet: "",
    },
    general_activity: {
      total_seconds_played: 8416710,
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
        seconds_played: 17185,
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
