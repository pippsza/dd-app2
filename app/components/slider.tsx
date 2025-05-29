import React, { useRef, useEffect, useCallback, useMemo, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import PlayerItem from "./playerItem";

interface Player {
  name: string;
  data: {
    status: 'Offline' | 'Online' | 'AFK';
    game: string | null;
    server: string | null;
    mapName: string | null;
  };
}

interface SliderProps {
  playersArr: Player[];
  setNames: (names: Player[]) => void;
  updateFilteredNames: (names: Player[]) => void;
  shouldAnimate?: boolean;
}

const ITEM_HEIGHT = rh(11.83);
const MIN_PLAYERS_FOR_INFINITE_SCROLL = 7;
const INITIAL_RENDER_COUNT = 5;
const MAX_RENDER_PER_BATCH = 3;
const WINDOW_SIZE = 15;

export default React.memo(function Slider({
  playersArr,
  setNames,
  updateFilteredNames,
  shouldAnimate = false,
}: SliderProps) {
  const listRef = useRef<FlatList<Player>>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Memoized data
  const data = useMemo(() => {
    if (playersArr.length > MIN_PLAYERS_FOR_INFINITE_SCROLL) {
      // Добавляем уникальные ключи для дублированных элементов
      return [
        ...playersArr.map((item, index) => ({ ...item, _key: `first_${index}` })),
        ...playersArr.map((item, index) => ({ ...item, _key: `second_${index}` }))
      ];
    }
    return playersArr;
  }, [playersArr]);

  const playersMap = useMemo(
    () =>
      playersArr.reduce((acc, player) => {
        acc[player.name] = player.data;
        return acc;
      }, {} as Record<string, Player["data"]>),
    [playersArr]
  );

  // Effects
  useEffect(() => {
    if (isInitialRender && playersArr.length > MIN_PLAYERS_FOR_INFINITE_SCROLL) {
      const initialOffset = playersArr.length * ITEM_HEIGHT;
      listRef.current?.scrollToOffset({
        offset: initialOffset,
        animated: false,
      });
      setCurrentOffset(initialOffset);
      setIsInitialRender(false);
    }
  }, [playersArr.length, isInitialRender]);

  useEffect(() => {
    if (!isScrolling && !isInitialRender && listRef.current) {
      const totalHeight = playersArr.length * ITEM_HEIGHT;
      let newOffset = currentOffset;

      // Проверяем, не вышли ли мы за пределы списка
      if (currentOffset < 0) {
        newOffset = totalHeight + currentOffset;
      } else if (currentOffset >= totalHeight * 2) {
        newOffset = currentOffset - totalHeight;
      }

      if (newOffset !== currentOffset) {
        listRef.current.scrollToOffset({
          offset: newOffset,
          animated: false,
        });
        setCurrentOffset(newOffset);
      }
    }
  }, [currentOffset, isScrolling, isInitialRender, playersArr.length]);

  // Callbacks
  const getPlayerData = useCallback(
    (playerName: string) => playersMap[playerName] || null,
    [playersMap]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Player & { _key?: string }; index: number }) => (
      <PlayerItem
        player={item.name}
        playerOnline={getPlayerData(item.name)}
        setNames={setNames}
        updateFilteredNames={updateFilteredNames}
        index={index % playersArr.length}
        shouldAnimate={shouldAnimate}
      />
    ),
    [getPlayerData, setNames, updateFilteredNames, playersArr.length, shouldAnimate]
  );

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentOffset(e.nativeEvent.contentOffset.y);
  }, []);

  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true);
  }, []);

  const handleScrollEnd = useCallback(() => {
    setIsScrolling(false);
    if (listRef.current) {
      const totalHeight = playersArr.length * ITEM_HEIGHT;
      const newIndex = Math.round(currentOffset / ITEM_HEIGHT);
      let newOffset = newIndex * ITEM_HEIGHT;

      // Корректируем позицию для бесконечной прокрутки
      if (newOffset < 0) {
        newOffset = totalHeight + newOffset;
      } else if (newOffset >= totalHeight * 2) {
        newOffset = newOffset - totalHeight;
      }

      if (newOffset !== currentOffset) {
        listRef.current.scrollToOffset({
          offset: newOffset,
          animated: true,
        });
        setCurrentOffset(newOffset);
      }
    }
  }, [currentOffset, playersArr.length]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const keyExtractor = useCallback(
    (item: Player & { _key?: string }) => item._key || item.name,
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        initialNumToRender={INITIAL_RENDER_COUNT}
        maxToRenderPerBatch={MAX_RENDER_PER_BATCH}
        windowSize={WINDOW_SIZE}
        extraData={playersMap}
        contentContainerStyle={styles.listContainer}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
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
  },
});
