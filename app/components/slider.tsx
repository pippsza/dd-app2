import React, { useRef, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";

const ORIGINAL_ITEMS = Array.from({ length: 10 }, (_, i) => `Box ${i + 1}`);
const ITEM_HEIGHT = rh(25); // 4 на экран
const LOOPED_DATA = [...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS];

export default function App() {
  const listRef = useRef<FlatList>(null);
  const MIDDLE_INDEX = ORIGINAL_ITEMS.length;
  const [topIndex, setTopIndex] = useState(MIDDLE_INDEX);

  // при старте ставимся ровно в середину
  useEffect(() => {
    listRef.current?.scrollToOffset({
      offset: MIDDLE_INDEX * ITEM_HEIGHT,
      animated: false,
    });
  }, []);

  const onMomentumScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    let idx = Math.round(offsetY / ITEM_HEIGHT);

    // определяем «верхний» индекс и записываем в стейт
    setTopIndex(idx);

    // если выходим за левую или правую границу, мгновенно перепрыгиваем в центр
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

  return (
    <FlatList
      ref={listRef}
      data={LOOPED_DATA}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item, index }) => {
        const isTop = index === topIndex;
        return (
          <View style={[styles.box, isTop && styles.topBox]}>
            <Text style={[styles.text, isTop && styles.topText]}>{item}</Text>
          </View>
        );
      }}
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
    />
  );
}

const styles = StyleSheet.create({
  box: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderBottomWidth: 1,
    width: rw(100),
    borderColor: "#aaa",
  },
  topBox: {
    backgroundColor: "#4a90e2",
    borderColor: "#357ab8",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: rf(2.5),
    color: "#333",
  },
  topText: {
    fontSize: rf(3),
    color: "#fff",
    fontWeight: "600",
  },
});
