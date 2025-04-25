import { Text, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
type Props = {
  item: any;
  cardStyle: any;
};
export default function PlayerItem({ item, cardStyle }: Props) {
  return (
    <>
      <View style={cardStyle}>
        <Text>{item.status}</Text>
        <Text style={style.nick}>{item.name}</Text>
      </View>
    </>
  );
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  nick: { color: "blue", fontSize: 15 },
  // firstCard: {},
});
