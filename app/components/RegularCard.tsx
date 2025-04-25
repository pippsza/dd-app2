import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
  responsiveHeight as rh,
} from "react-native-responsive-dimensions";

interface CardProps {
  name: string;
}

export const RegularCard: React.FC<CardProps> = ({ name }) => (
  <View style={[stylesReg.card, stylesReg.regularCard]}>
    <Text style={stylesReg.text}>{name}</Text>
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
    backgroundColor: "#50e3c2",
    width: rw(90),
  },
  text: {
    fontSize: rf(2.5),
    color: "#fff",
    fontWeight: "500",
  },
});
