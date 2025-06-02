import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";
import Tee from "./tee";

export default function NotFoundPage() {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Анимация прыжка
    const bounce = Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -20,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    // Анимация вращения
    const rotate = Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    // Запускаем анимации в цикле
    Animated.loop(bounce).start();
    Animated.loop(rotate).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const theme = {
    background: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(39,39,39,0.8)",
    text: isDarkMode ? "black" : "white",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    big: {
      fontSize: rf(15),
      fontWeight: "bold",
      color: theme.text,
      marginBottom: rh(2),
    },
    small: {
      fontSize: rf(3),
      color: theme.text,
      marginBottom: rh(4),
    },
    teesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: rw(1),
    },
    teeWrapper: {
      alignItems: "center",
    },
    teeLabel: {
      fontSize: rf(2),
      color: theme.text,
      marginTop: rh(1),
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.big}>404</Text>
      <Text style={styles.small}>{t("playerItem.offline")}</Text>

      <View style={styles.teesContainer}>
        <Animated.View
          style={[
            styles.teeWrapper,
            { transform: [{ translateY: bounceAnim }] },
          ]}
        >
          <Tee width={rh(5)} source="default" />
          <Text style={styles.teeLabel}>No internet connection</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.teeWrapper,
            {
              transform: [{ translateY: bounceAnim }, { rotate: spin }],
            },
          ]}
        >
          <Tee width={rh(5)} source="monik" />
          <Text style={styles.teeLabel}>No internet connection</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.teeWrapper,
            {
              transform: [
                { translateY: bounceAnim },
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["360deg", "0deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Tee width={rh(5)} source="pippsza" />
          <Text style={styles.teeLabel}>No internet connection</Text>
        </Animated.View>
      </View>
    </View>
  );
}
