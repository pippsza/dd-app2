import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import PlayerItem from "./playerItem";

const ITEM_HEIGHT = rh(11.83);

type SliderProps = {
  playersArr: Array<{ name: string; data: any }>;
  setNames: (names: any) => void;
};

/**
 * Компонент слайдера для отображения списка игроков с бесконечной прокруткой
 * Оптимизированная версия с исправлением проблемы устаревших данных
 */
export default React.memo(function Slider({
  playersArr,
  setNames,
}: SliderProps) {
  const listRef = useRef<FlatList>(null);

  // Мемоизированный массив данных для бесконечной прокрутки
  const data = useMemo(() => {
    if (playersArr.length > 7) {
      return [...playersArr, ...playersArr, ...playersArr];
    }
    return playersArr;
  }, [playersArr]);

  // Создаем хеш-карту для мгновенного доступа к данным игроков
  const playersMap = useMemo(
    () =>
      playersArr.reduce((acc, player) => {
        acc[player.name] = player.data;
        return acc;
      }, {} as Record<string, any>),
    [playersArr]
  );

  // Устанавливаем начальную позицию прокрутки при монтировании
  useEffect(() => {
    if (playersArr.length > 7) {
      const initialOffset = playersArr.length * ITEM_HEIGHT;
      listRef.current?.scrollToOffset({
        offset: initialOffset,
        animated: false,
      });
    }
  }, [playersArr.length]);

  /**
   * Получение данных игрока по имени
   * Использует мемоизированную карту игроков для мгновенного доступа
   */
  const getPlayerData = useCallback(
    (playerName: string) => {
      return playersMap[playerName] || null;
    },
    [playersMap]
  );

  /**
   * Рендер-функция для элементов списка
   * Мемоизирована с зависимостью от getPlayerData
   */
  const renderItem = useCallback(
    ({ item }: { item: { name: string } }) => (
      <PlayerItem
        player={item.name}
        playerOnline={getPlayerData(item.name)}
        setNames={setNames}
      />
    ),
    [getPlayerData, setNames]
  );

  /**
   * Обработчик завершения прокрутки с логикой бесконечного скролла
   */
  const handleScrollEnd = useCallback(
    (e: { nativeEvent: { contentOffset: { y: number } } }) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      let newIndex = Math.round(offsetY / ITEM_HEIGHT);

      if (playersArr.length > 7) {
        if (newIndex < playersArr.length) {
          newIndex += playersArr.length;
        } else if (newIndex >= playersArr.length * 2) {
          newIndex -= playersArr.length;
        }

        listRef.current?.scrollToOffset({
          offset: newIndex * ITEM_HEIGHT,
          animated: false,
        });
      }
    },
    [playersArr.length]
  );

  /**
   * Функция для расчета layout элементов списка
   * Обязательна для корректной работы скролла
   */
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item, index) => `${item.name}_${index}`}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleScrollEnd}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={21}
        extraData={playersMap}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  listContainer: {
    alignItems: "center",
    // paddingVertical: rh(2),
  },
});
