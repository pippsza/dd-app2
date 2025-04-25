import { Text, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
type Props = {
  item: any;
  isFirst: any;
};

export default function PlayerItem({ item, isFirst }: Props) {
  const FirstCard = (
    <>
      <View style={style.firstCard}>
        <Text>{item.status}</Text>
        <Text style={style.nick}>{item.name}</Text>
      </View>
    </>
  );
  const RegularCard = (
    <>
      <View style={style.box}>
        <Text>{item.status}</Text>
        <Text style={style.nick}>{item.name}</Text>
      </View>
    </>
  );

  return <> {isFirst ? FirstCard : RegularCard}</>;
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  box: {
    flex: 0,
    width: rw(80),
    height: rh(13),
    borderColor: "black",
    marginVertical: rh(4),
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  firstCard: {
    backgroundColor: "red",
    width: rw(80),
    height: rh(13),
    borderColor: "black",
  },
  nick: { color: "blue", fontSize: 15 },
  // firstCard: {},
});
