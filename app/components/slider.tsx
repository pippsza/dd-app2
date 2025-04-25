import React, { useRef, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";

const ORIGINAL_ITEMS = Array.from({ length: 10 }, (_, i) => `Box ${i + 1}`);
const ITEM_HEIGHT = rh(25); // 4 элемента на экран
const LOOPED_DATA = [...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS];

export default function App() {
  const listRef = useRef<FlatList>(null);
  const INITIAL_INDEX = ORIGINAL_ITEMS.length;
  const [topIndex, setTopIndex] = useState(INITIAL_INDEX);

  // При монтировании ставим стартовую позицию в середине
  useEffect(() => {
    listRef.current?.scrollToOffset({
      offset: INITIAL_INDEX * ITEM_HEIGHT,
      animated: false,
    });
  }, []);

  // Обработчик видимых элементов
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length) {
      // Находим минимальный индекс среди видимых — это и есть «верхний»
      const minIndex = viewableItems.reduce(
        (min, v) => (v.index! < min ? v.index! : min),
        Infinity
      );
      setTopIndex(minIndex);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // считать видимым, если больше чем на 50%
  };

  return (
    <FlatList
      ref={listRef}
      data={LOOPED_DATA}
      keyExtractor={(_, idx) => idx.toString()}
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
      onMomentumScrollEnd={() => {
        /* цикл остаётся тот же */
      }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
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
    backgroundColor: "#4a90e2", // другой фон
    borderColor: "#357ab8", // другая рамка
    borderWidth: 2,
    shadowColor: "#000", // лёгкая тень
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
    fontSize: rf(3), // чуть больше шрифт
    color: "#fff", // светлый текст
    fontWeight: "600",
  },
});
