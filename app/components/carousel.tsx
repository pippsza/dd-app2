// components/VerticalLoopingFlatList.tsx
import React, { useRef, useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from "react-native";

type Tee = { profile: { name: string } };

interface Props {
  data: Tee[];
  onPressItem?: (item: Tee, index: number) => void;
}

export default function VerticalLoopingFlatList({
  data,
  onPressItem = () => {},
}: Props) {
  const { height: SCREEN_H, width: SCREEN_W } = useWindowDimensions();
  const VISIBLE_COUNT = 6;
  const ITEM_H = SCREEN_H / VISIBLE_COUNT;

  const [topIndex, setTopIndex] = useState<number>(0);

  // Triple data for looping
  const loopData = useMemo(() => [...data, ...data, ...data], [data]);
  const dataLen = data.length;
  const middleOffset = dataLen * ITEM_H;
  const flatListRef = useRef<FlatList<Tee>>(null);

  // On mount, scroll to middle
  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: middleOffset,
      animated: false,
    });
  }, [middleOffset]);

  // Reset scroll if out of bounds and update topIndex
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    let idx = Math.round(y / ITEM_H);
    // Normalize to middle
    if (idx < dataLen) {
      idx += dataLen;
      flatListRef.current?.scrollToOffset({
        offset: idx * ITEM_H,
        animated: false,
      });
    } else if (idx >= dataLen * 2) {
      idx -= dataLen;
      flatListRef.current?.scrollToOffset({
        offset: idx * ITEM_H,
        animated: false,
      });
    }
    // orig index
    const orig = idx % dataLen;
    setTopIndex(orig);
  };

  // Handle press: scroll that item to top of list
  const handlePress = (index: number) => {
    const orig = index % dataLen;
    const target = dataLen + orig;
    flatListRef.current?.scrollToOffset({
      offset: target * ITEM_H,
      animated: true,
    });
    onPressItem(data[orig], orig);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={loopData}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => {
          const orig = index % dataLen;
          const isTop = orig === topIndex;
          return (
            <TouchableOpacity
              onPress={() => handlePress(index)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.card,
                  { height: ITEM_H, width: SCREEN_W * 0.9 },
                  isTop && styles.topCard,
                ]}
              >
                <Text style={[styles.text, isTop && styles.topText]}>
                  {item.profile.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_H}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: ITEM_H,
          offset: ITEM_H * index,
          index,
        })}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 2,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  topCard: {
    backgroundColor: "#e0f7fa", // distinct fill
    borderColor: "#00796b", // distinct border
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  topText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#004d40",
  },
});
