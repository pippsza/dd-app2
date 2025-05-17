import React, { useRef, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import PlayerItem from "./playerItem";

// Массив игроков
// const PLAYERS = [
//   { id: "1", name: "people 1" },
//   { id: "2", name: "people 2" },
//   { id: "3", name: "people 3" },
//   { id: "4", name: "people 4" },
//   { id: "5", name: "people 5" },
//   { id: "6", name: "people 6" },
//   { id: "7", name: "people 7" },
//   { id: "8", name: "people 8" },
//   { id: "9", name: "people 9" },
// ];

const ITEM_HEIGHT = rh(11.83); // 4 элемента на экране

export default function Slider({ players }: any) {
  const PLAYERS = players;
  const listRef = useRef(null);
  const [topIndex, setTopIndex] = useState(PLAYERS.length);

  const data =
    PLAYERS.length > 7 ? [...PLAYERS, ...PLAYERS, ...PLAYERS] : PLAYERS;

  useEffect(() => {
    if (PLAYERS.length > 7) {
      listRef.current?.scrollToOffset({
        offset: PLAYERS.length * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, []);

  const onMomentumScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    let idx = Math.round(offsetY / ITEM_HEIGHT);
    setTopIndex(idx);

    if (PLAYERS.length > 7) {
      if (idx < PLAYERS.length) idx += PLAYERS.length;
      else if (idx >= PLAYERS.length * 2) idx -= PLAYERS.length;
      listRef.current?.scrollToOffset({
        offset: idx * ITEM_HEIGHT,
        animated: false,
      });
      setTopIndex(idx);
    }
  };

  return (
    <View style={{ height: ITEM_HEIGHT * 7 }}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PlayerItem player={item}></PlayerItem>}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: index * ITEM_HEIGHT,
          index,
        })}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
});
