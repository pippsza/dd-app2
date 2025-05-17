import React, { useRef, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";

// Массив игроков
const PLAYERS = [
  { id: "1", name: "people 1" },
  { id: "2", name: "people 2" },
  { id: "3", name: "people 3" },
  { id: "4", name: "people 4" },
  { id: "5", name: "people 5" },
  { id: "6", name: "people 6" },
  { id: "7", name: "people 7" },
  { id: "8", name: "people 8" },
  { id: "9", name: "people 9" },
];
const ITEM_HEIGHT = rh(11.83); // 4 элемента на экране

// Бесконечный массив из трех копий

const loopData = (data) => [...data, ...data, ...data];

// Конфигурация стилей и ширин для каждой позиции
const STYLE_CONFIG = {
  0: {
    width: 100,
    container: {
      backgroundColor: "#4a90e2",
      borderColor: "#357ab8",
      borderWidth: 2,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    text: { fontSize: rf(3), color: "#fff", fontWeight: "600" },
  },
  1: {
    width: 90,
    container: {
      backgroundColor: "#50e3c2",
      borderColor: "#41735e",
      borderWidth: 2,
      color: "red",
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      elevation: 2,
    },
    text: { fontSize: rf(2.8), color: "red", fontWeight: "600" },
  },
  2: {
    // совпадает со стилем позиции 1
    width: 90,
    container: {},
    text: {},
  },
  3: {
    width: 70,
    container: {
      backgroundColor: "#9013fe",
      borderColor: "#6d0ea5",
      borderWidth: 2,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      elevation: 2,
    },
    text: { fontSize: rf(2.8), color: "#fff", fontWeight: "600" },
  },
};
// Базовый конфиг для остальных позиций (использует стиль позиции 3)
const DEFAULT_CONFIG = {
  width: STYLE_CONFIG[3].width,
  container: STYLE_CONFIG[3].container,
  text: STYLE_CONFIG[3].text,
};

// Компонент карточки игрока
function PlayerCard({ player, styleConfig, onPress }) {
  const { width, container, text } = styleConfig;
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.box, container, { width: rw(width) }]}>
        <Text style={[styles.text, text]}>{player.name}</Text>
      </View>
    </Pressable>
  );
}

export default function Slider() {
  const listRef = useRef(null);
  const [topIndex, setTopIndex] = useState(PLAYERS.length);
  let data;
  if (PLAYERS.length <= 7) {
    data = PLAYERS;
  } else {
    data = loopData(PLAYERS);
  }

  // Стартуем в центре
  // useEffect(() => {
  //   listRef.current?.scrollToOffset({
  //     offset: PLAYERS.length * ITEM_HEIGHT,
  //     animated: false,
  //   });
  // }, []);

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

  const onMomentumScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    let idx = Math.round(offsetY / ITEM_HEIGHT);
    setTopIndex(idx);

    // Зацикливание
    if (idx < PLAYERS.length) idx += PLAYERS.length;
    else if (idx >= PLAYERS.length * 2) idx -= PLAYERS.length;

    if (idx !== topIndex) {
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
      data={data}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item, index }) => {
        const rel = index - topIndex;
        // Получаем конфиг: если нет, используем DEFAULT_CONFIG
        const rawConfig = STYLE_CONFIG[rel] || DEFAULT_CONFIG;
        // Для pos 2 без явных стилей читаем из pos 1
        const styleConfig = { ...rawConfig };
        if (rel === 2 && Object.keys(rawConfig.container).length === 0) {
          styleConfig.container = STYLE_CONFIG[1].container;
          styleConfig.text = STYLE_CONFIG[1].text;
        }
        return (
          <PlayerCard
            player={item}
            styleConfig={styleConfig}
            onPress={() => handlePress(index)}
          />
        );
      }}
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
  );
}

const styles = StyleSheet.create({
  listContainer: { alignItems: "center" },
  box: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
  text: { fontSize: rf(2.5), color: "#333" },
});
