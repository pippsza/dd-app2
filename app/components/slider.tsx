import React, { useRef, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Dimensions, View } from "react-native";
import { BigCard } from "./BigCard";
import { RegularCard } from "./RegularCard";
import { SmallCard } from "./SmallCard";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPER_HEIGHT = SCREEN_HEIGHT * 0.8; // 80% of screen height
const ITEM_HEIGHT = SWIPER_HEIGHT / 5; // Each item takes 1/5 of the swiper height

const ORIGINAL_ITEMS = [
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

const LOOPED_DATA = [...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS];
const MIDDLE_INDEX = ORIGINAL_ITEMS.length;

export default function Slider() {
  const listRef = useRef<FlatList>(null);
  const [topIndex, setTopIndex] = useState(MIDDLE_INDEX);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    listRef.current?.scrollToOffset({
      offset: MIDDLE_INDEX * ITEM_HEIGHT,
      animated: false,
    });
  }, []);

  const handlePress = (idx: number) => {
    if (idx === topIndex) {
      console.log("This card is already at the top!");
      return;
    }
    listRef.current?.scrollToOffset({
      offset: idx * ITEM_HEIGHT,
      animated: true,
    });
    setTopIndex(idx);
  };

  const onMomentumScrollEnd = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    let idx = Math.round(offsetY / ITEM_HEIGHT);

    setTopIndex(idx);

    if (idx < ORIGINAL_ITEMS.length) {
      idx += ORIGINAL_ITEMS.length;
      listRef.current?.scrollToOffset({
        offset: idx * ITEM_HEIGHT,
        animated: false,
      });
      setTopIndex(idx);
    } else if (idx >= ORIGINAL_ITEMS.length * 2) {
      idx -= ORIGINAL_ITEMS.length;
      listRef.current?.scrollToOffset({
        offset: idx * ITEM_HEIGHT,
        animated: false,
      });
      setTopIndex(idx);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const rel = index - topIndex;
    let card;

    if (rel === 0) {
      card = <BigCard item={item} containerHeight={containerHeight} />;
    } else if (rel === 1 || rel === 2) {
      card = <RegularCard item={item} />;
    } else if (rel === 3) {
      card = <SmallCard item={item} />;
    }

    return (
      <Pressable 
        onPress={() => handlePress(index)}
        style={[
          styles.itemContainer,
          { height: rel === 0 ? containerHeight * 0.35 : ITEM_HEIGHT },
        ]}
      >
        {card}
      </Pressable>
    );
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}
    >
      <FlatList
        ref={listRef}
        data={LOOPED_DATA}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={styles.listContainer}
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  listContainer: {
    alignItems: "center",
  },
  itemContainer: {
    width: rw(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
