import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";

interface CardProps {
  name: string;
}

export const SmallCard: React.FC<CardProps> = ({ name }) => {
  return (
    <View style={[styles.card, styles.smallCard]}>
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
  smallCard: {
    backgroundColor: "#e94e77", // Цвет для маленькой карточки
    width: rw(70), // 70% ширины
  },
  text: {
    fontSize: rf(2),
    color: "#fff",
    fontWeight: "400",
  },
});
