import React, { useRef, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";

const ORIGINAL_ITEMS = Array.from({ length: 5 }, (_, i) => `Box ${i + 1}`);
const ITEM_HEIGHT = rh(25); // 4 элемента на экране
const LOOPED_DATA = [...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS];
const MIDDLE_INDEX = ORIGINAL_ITEMS.length;

export default function Slider() {
  const listRef = useRef<FlatList>(null);
  const [topIndex, setTopIndex] = useState(MIDDLE_INDEX);

  useEffect(() => {
    // стартуем в центре
    listRef.current?.scrollToOffset({
      offset: MIDDLE_INDEX * ITEM_HEIGHT,
      animated: false,
    });
  }, []);

  const handlePress = (idx: number) => {
    // скроллим нажатую карточку наверх
    listRef.current?.scrollToOffset({
      offset: idx * ITEM_HEIGHT,
      animated: true,
    });
    setTopIndex(idx);
  };

  const onMomentumScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    let idx = Math.round(offsetY / ITEM_HEIGHT);

    // обновляем "верхнюю" карточку
    setTopIndex(idx);

    // зацикливание
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
        const rel = index - topIndex;
        let widthPercent = 100;
        if (rel === 1 || rel === 2) widthPercent = 90;
        else if (rel === 3) widthPercent = 70;

        const isTop = rel === 0;

        return (
          <Pressable onPress={() => handlePress(index)}>
            <View
              style={[
                styles.box,
                { width: rw(widthPercent) },
                isTop && styles.topBox,
              ]}
            >
              <Text style={[styles.text, isTop && styles.topText]}>{item}</Text>
            </View>
          </Pressable>
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
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
  box: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderBottomWidth: 1,
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
