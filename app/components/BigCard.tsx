import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
  responsiveHeight as rh,
} from "react-native-responsive-dimensions";

interface CardProps {
  item: any;
  containerHeight: number;
}

export const BigCard: React.FC<CardProps> = ({ item, containerHeight }) => (
  <View style={[styles.card, styles.bigCard, { height: containerHeight * 0.35 }]}>
    <Text style={styles.text}>{item.profile.name}</Text>
    <Text style={styles.subText}>Points: {item.profile.points}</Text>
    <Text style={styles.subText}>Clan: {item.profile.clan}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: rw(100),
    justifyContent: "center",
    alignItems: "center",
  },
  bigCard: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: rh(1),
    padding: rw(4),
  },
  text: {
    fontSize: rf(4),
    color: "black",
    fontWeight: "600",
    marginBottom: rh(1),
  },
  subText: {
    fontSize: rf(2.5),
    color: "#666",
    marginTop: rh(0.5),
  },
});
