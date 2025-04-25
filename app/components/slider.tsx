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
  const listRef = useRef(null);
  const [topIndex, setTopIndex] = useState(MIDDLE_INDEX);

  // При монтировании сразу ставим прокрутку в середину
  useEffect(() => {
    listRef.current?.scrollToOffset({
      offset: MIDDLE_INDEX * ITEM_HEIGHT,
      animated: false,
    });
  }, []);

  // Обработка нажатия на карточку
  const handlePress = (idx) => {
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

  // Бесконечное перелистывание и обновление topIndex
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

  return (
    <FlatList
      ref={listRef}
      data={LOOPED_DATA}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item, index }) => {
        const rel = index - topIndex;
        let widthPercent = 100;
        let variantStyle = {};
        let textVariantStyle = {};

        switch (rel) {
          case 0:
            widthPercent = 100;
            variantStyle = styles.variant0;
            textVariantStyle = styles.variant0Text;
            break;
          case 1:
            widthPercent = 90;
            variantStyle = styles.variant1;
            textVariantStyle = styles.variant1Text;
            break;
          case 2:
            widthPercent = 90;
            variantStyle = styles.variant2;
            textVariantStyle = styles.variant2Text;
            break;
          case 3:
            widthPercent = 70;
            variantStyle = styles.variant3;
            textVariantStyle = styles.variant3Text;
            break;
          default:
            widthPercent = 100;
        }

        return (
          <Pressable onPress={() => handlePress(index)}>
            <View
              style={[styles.box, { width: rw(widthPercent) }, variantStyle]}
            >
              <Text style={[styles.text, textVariantStyle]}> {item} </Text>
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
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
  text: {
    fontSize: rf(2.5),
    color: "#333",
  },
  variant0: {
    backgroundColor: "#4a90e2",
    borderColor: "#357ab8",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  variant0Text: {
    fontSize: rf(3),
    color: "#fff",
    fontWeight: "600",
  },
  variant1: {
    backgroundColor: "#50e3c2",
    borderColor: "#41735e",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  variant1Text: {
    fontSize: rf(2.8),
    color: "#fff",
    fontWeight: "600",
  },
  variant2: {
    backgroundColor: "#f5a623",
    borderColor: "#aa7b17",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  variant2Text: {
    fontSize: rf(2.8),
    color: "#fff",
    fontWeight: "600",
  },
  variant3: {
    backgroundColor: "#9013fe",
    borderColor: "#6d0ea5",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  variant3Text: {
    fontSize: rf(2.8),
    color: "#fff",
    fontWeight: "600",
  },
});
