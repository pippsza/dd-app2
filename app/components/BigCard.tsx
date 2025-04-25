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

export const BigCard: React.FC<CardProps> = ({ item }) => (
  <View style={[styles.card, styles.bigCard]}>
    <Text style={styles.text}>{item.profile.name}</Text>
    <Text>Points: {item.profile.points}</Text>
    <Text>Clan: {item.profile.clan}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
  bigCard: {
    width: rw(100),
  },
  text: {
    fontSize: rf(3),
    color: "black",
    fontWeight: "600",
  },
});
