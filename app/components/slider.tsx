import React, { useRef, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { BigCard } from "./BigCard";
import { RegularCard } from "./RegularCard";
import { SmallCard } from "./SmallCard";

const ORIGINAL_ITEMS = Array.from({ length: 20 }, (_, i) => `Player ${i + 1}`);
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

  // Функция обработки нажатия на карточку
  const handlePress = (idx: number) => {
    if (idx === topIndex) {
      console.log("🛑 Эта карточка уже первая!");
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

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const rel = index - topIndex;
    const card =
      rel === 0 ? (
        <BigCard name={item} />
      ) : rel === 1 || rel === 2 ? (
        <RegularCard name={item} />
      ) : (
        <SmallCard name={item} />
      );

    return <Pressable onPress={() => handlePress(index)}>{card}</Pressable>;
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
