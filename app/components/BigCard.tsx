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

export const BigCard: React.FC<CardProps> = ({ name }) => (
  <View style={[styles.card, styles.bigCard]}>
    <Text style={styles.text}>{name}</Text>
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
    backgroundColor: "#4a90e2",
    width: rw(100),
  },
  text: {
    fontSize: rf(3),
    color: "#fff",
    fontWeight: "600",
  },
});
