import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
  responsiveHeight as rh,
} from "react-native-responsive-dimensions";

interface CardProps {
  item: any;
}

export const RegularCard: React.FC<CardProps> = ({ item }) => (
  <View style={[stylesReg.card, stylesReg.regularCard]}>
    <View style={stylesReg.contentBox}>
      <Text style={stylesReg.text}>{item.profile.name}</Text>
      <Text style={stylesReg.text}>Regular card</Text>
    </View>
  </View>
);

const stylesReg = StyleSheet.create({
  card: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
  regularCard: {
    width: rw(90),
  },
  text: {
    fontSize: rf(2.5),
    color: "black",
    fontWeight: "500",
  },
  contentBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 15,
    height: "60%",
    width: "100%",
  },
});
