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
  <View style={[styles.card, styles.smallCard]}>
    <View style={styles.contentBox}>
      <Text style={styles.text}>{item.profile.name}</Text>
      <Text style={styles.subText}>Points: {item.profile.points}</Text>
      <Text style={styles.subText}>Clan: {item.profile.clan}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    height: '90%',
    justifyContent: "center",
    alignItems: "center",
  },
  smallCard: {
    width: rw(85),
  },
  contentBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: rf(2.5),
    color: "black",
    fontWeight: "600",
    marginBottom: 5,
  },
  subText: {
    fontSize: rf(1.8),
    color: "#666",
    marginTop: 2,
  },
});
