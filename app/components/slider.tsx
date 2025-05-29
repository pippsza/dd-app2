import React, { useRef, useEffect, useCallback, useMemo } from "react";
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
}

const ITEM_HEIGHT = rh(11.83);
const MIN_PLAYERS_FOR_INFINITE_SCROLL = 7;
const INITIAL_RENDER_COUNT = 10;
const MAX_RENDER_PER_BATCH = 5;
const WINDOW_SIZE = 21;

export default React.memo(function Slider({
  playersArr,
  setNames,
}: SliderProps) {
  const listRef = useRef<FlatList<Player>>(null);

  // Memoized data
  const data = useMemo(() => {
    if (playersArr.length > MIN_PLAYERS_FOR_INFINITE_SCROLL) {
      return [...playersArr, ...playersArr, ...playersArr];
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
    if (playersArr.length > MIN_PLAYERS_FOR_INFINITE_SCROLL) {
      const initialOffset = playersArr.length * ITEM_HEIGHT;
      listRef.current?.scrollToOffset({
        offset: initialOffset,
        animated: false,
      });
    }
  }, [playersArr.length]);

  // Callbacks
  const getPlayerData = useCallback(
    (playerName: string) => playersMap[playerName] || null,
    [playersMap]
  );

  const renderItem = useCallback(
    ({ item }: { item: Player }) => (
      <PlayerItem
        player={item.name}
        playerOnline={getPlayerData(item.name)}
        setNames={setNames}
      />
    ),
    [getPlayerData, setNames]
  );

  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      let newIndex = Math.round(offsetY / ITEM_HEIGHT);

      if (playersArr.length > MIN_PLAYERS_FOR_INFINITE_SCROLL) {
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

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const keyExtractor = useCallback(
    (item: Player, index: number) => `${item.name}_${index}`,
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
        onMomentumScrollEnd={handleScrollEnd}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        initialNumToRender={INITIAL_RENDER_COUNT}
        maxToRenderPerBatch={MAX_RENDER_PER_BATCH}
        windowSize={WINDOW_SIZE}
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
