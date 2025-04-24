import { Text, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
type Props = {
  item: any;
};
export default function PlayerItem({ item }: Props) {
  return (
    <>
      <View style={style.box}>
        <Text>card</Text>
        <Text>{item.name}</Text>
      </View>
    </>
  );
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  box: { flex: 1, width: rw(5), height: rh(1) },
  firstCard: {},
});
