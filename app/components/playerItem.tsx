import { Text, View } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
type Props = {
  item: any;
  isActive: any;
};

export default function PlayerItem({ item, isActive }: Props) {
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

  return <> {isActive ? FirstCard : RegularCard}</>;
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  box: {
    height: rh(15), // 15% высоты экрана
    width: rw(90), // 90% ширины экрана
    marginHorizontal: rw(5),
    marginVertical: rh(1),
    borderRadius: rh(1),
    borderWidth: 3,
    borderColor: "black",
    padding: rw(4),

    backgroundColor: "white",
    justifyContent: "center",
  },
  firstCard: {
    backgroundColor: "green",
    width: rw(100),
    marginHorizontal: 0,
    borderWidth: 3,
    borderColor: "black",
    height: rh(20), // 20% высоты для первой карточки
    elevation: 5, // Тень для Android
    shadowColor: "#000", // Тень для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  nick: {
    fontSize: rf(2.3), // 2.3% ширины экрана
    fontWeight: "700",
    textAlign: "center",
  },
  // firstCard: {},
});
