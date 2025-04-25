import React, { useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";

const ORIGINAL_ITEMS = Array.from({ length: 10 }, (_, i) => `Box ${i + 1}`);
const ITEM_HEIGHT = rh(25); // 4 элемента на экран

// Дублируем массив трижды
const LOOPED_DATA = [...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS, ...ORIGINAL_ITEMS];

export default function App() {
  const listRef = useRef<FlatList>(null);

  // стартуем посередине
  const INITIAL_INDEX = ORIGINAL_ITEMS.length;

  // при монтировании плавно устанавливаемся на центральный блок
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({
        offset: INITIAL_INDEX * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, []);

  // после каждого «останова» проверяем индекс и, если нужно, «прыгаем» к центральному блоку
  const onMomentumScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    let index = Math.round(offsetY / ITEM_HEIGHT);

    if (index < ORIGINAL_ITEMS.length) {
      // уходим в начало левой копии — перепрыгиваем в середину
      index += ORIGINAL_ITEMS.length;
      listRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: false,
      });
    } else if (index >= ORIGINAL_ITEMS.length * 2) {
      // вышли за правую копию — перепрыгиваем в середину
      index -= ORIGINAL_ITEMS.length;
      listRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: false,
      });
    }
  };

  return (
    <FlatList
      ref={listRef}
      data={LOOPED_DATA}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => (
        <View style={styles.box}>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
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
    borderColor: "#aaa",
  },
  text: {
    fontSize: rf(2.5),
  },
});
