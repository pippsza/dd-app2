import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";

interface CardProps {
  name: string;
}

export const BigCard: React.FC<CardProps> = ({ name }) => {
  return (
    <View style={[styles.card, styles.bigCard]}>
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
  bigCard: {
    backgroundColor: "#4a90e2", // Цвет для большой карточки
    width: rw(100), // 100% ширины
  },
  text: {
    fontSize: rf(3),
    color: "#fff",
    fontWeight: "600",
  },
});
