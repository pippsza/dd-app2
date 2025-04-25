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

export const SmallCard: React.FC<CardProps> = ({ item }) => (
  <View style={[stylesSmall.card, stylesSmall.smallCard]}>
    <View style={stylesSmall.contentBox}>
      <Text style={stylesSmall.text}>{item.profile.name}</Text>
    </View>
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
    paddingVertical: 20,
    width: rw(70),
    justifyContent: "center",
    alignItems: "center",
  },
  contentBox: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 15,
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: rf(2),
    color: "black",
    fontWeight: "400",
  },
});
