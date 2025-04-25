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

export const SmallCard: React.FC<CardProps> = ({ name }) => (
  <View style={[stylesSmall.card, stylesSmall.smallCard]}>
    <Text style={stylesSmall.text}>{name}</Text>
  </View>
);

const stylesSmall = StyleSheet.create({
  card: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
  smallCard: {
    backgroundColor: "#e94e77",
    width: rw(70),
  },
  text: {
    fontSize: rf(2),
    color: "#fff",
    fontWeight: "400",
  },
});
