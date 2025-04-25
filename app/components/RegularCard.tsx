import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";

interface CardProps {
  name: string;
}

export const RegularCard: React.FC<CardProps> = ({ name }) => {
  return (
    <View style={[styles.card, styles.regularCard]}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200, // Установка фиксированной высоты для карточек
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
  regularCard: {
    backgroundColor: "#50e3c2", // Цвет для средней карточки
    width: rw(90), // 90% ширины
  },
  text: {
    fontSize: rf(2.5),
    color: "#fff",
    fontWeight: "500",
  },
});
