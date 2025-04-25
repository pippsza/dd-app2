import React, { useRef, useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { BigCard } from "./BigCard";
import { RegularCard } from "./RegularCard";
import { SmallCard } from "./SmallCard";

const ORIGINAL_ITEMS = Array.from({ length: 1 }, (_, i) => `Player ${i + 1}`);
const ITEM_HEIGHT = 200; // Высота карточки

let LOOPED_DATA = [...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS];

if (ORIGINAL_ITEMS.length < 4) {
  LOOPED_DATA = [
    ...ORIGINAL_ITEMS,
    ...ORIGINAL_ITEMS,
    ...ORIGINAL_ITEMS,
    ...ORIGINAL_ITEMS,
    ...ORIGINAL_ITEMS,
    ...ORIGINAL_ITEMS,
  ];
}
const MIDDLE_INDEX = ORIGINAL_ITEMS.length;

export default function Slider() {
  const listRef = useRef<FlatList>(null);
  const [topIndex, setTopIndex] = useState(MIDDLE_INDEX);

  useEffect(() => {
    listRef.current?.scrollToOffset({
      offset: MIDDLE_INDEX * ITEM_HEIGHT,
      animated: false,
    });
  }, []);

  const onMomentumScrollEnd = (e) => {
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

  const renderItem = ({ item, index }) => {
    const rel = index - topIndex;
    const isTop = rel === 0;

    if (rel === 0) {
      return <BigCard name={item} />;
    } else if (rel === 1 || rel === 2) {
      return <RegularCard name={item} />;
    } else {
      return <SmallCard name={item} />;
    }
  };

  return (
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
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center", // Центрируем все элементы по горизонтали
  },
});
