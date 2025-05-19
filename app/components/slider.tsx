import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import PlayerItem from "./playerItem";

const ITEM_HEIGHT = rh(11.83); // высота одного элемента

type SliderProps = {
  playersArr: any;
  setNames: any;
};

export default React.memo(function Slider({
  playersArr,
  setNames,
}: SliderProps) {
  const listRef = useRef<FlatList<any>>(null);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(
      playersArr.map((player: any) => {
        return player.name;
      })
    );
  }, [playersArr]);
  const [topIndex, setTopIndex] = useState(players.length);
  console.log(playersArr);

  // Для бесконечной прокрутки дублируем массив 3 раза, если игроков больше 7
  const data = useMemo(() => {
    if (players.length > 7) {
      return [...players, ...players, ...players];
    }
    return players;
  }, [players]);

  // При монтировании устанавливаем начальную позицию прокрутки в середину дублированного массива
  useEffect(() => {
    if (players.length > 7) {
      listRef.current?.scrollToOffset({
        offset: players.length * ITEM_HEIGHT,
        animated: false,
      });
      setTopIndex(players.length);
    }
  }, [players]);

  const getPlayerData = (playerName: any) => {
    console.log(
      "GetPlayer data",
      playersArr.find((item: any) => item.name === playerName)?.data
    );
    console.log("playersArr:", playersArr);
    return playersArr.find((item: any) => item.name === playerName)?.data;
  };

  // Меморизируем renderItem для предотвращения лишних рендеров
  const renderItem = useCallback(({ item, index }: any) => {
    const onlineData = getPlayerData(item);
    console.log("slider render func", onlineData);
    return (
      <PlayerItem setNames={setNames} player={item} playerOnline={onlineData} />
    );
  }, []);

  // Обработчик окончания прокрутки с циклической логикой
  const onMomentumScrollEnd = useCallback(
    (e: any) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      let idx = Math.round(offsetY / ITEM_HEIGHT);

      if (players.length > 7) {
        if (idx < players.length) {
          idx += players.length;
        } else if (idx >= players.length * 2) {
          idx -= players.length;
        }
        listRef.current?.scrollToOffset({
          offset: idx * ITEM_HEIGHT,
          animated: false,
        });
      }
      setTopIndex(idx);
    },
    [players.length]
  );

  // getItemLayout для оптимизации прокрутки
  const getItemLayout = useCallback(
    (_data: any, index: any) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View style={{ height: ITEM_HEIGHT * 7 }}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        extraData={topIndex}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
});
