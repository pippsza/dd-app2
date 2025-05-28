import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";

export function BlinkingBackground({ children, imageSource }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();

    return () => blink.stop();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Анімований фон */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        <ImageBackground
          source={imageSource}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Контент поверх фону */}
      <View style={StyleSheet.absoluteFill}>{children}</View>
    </View>
  );
}
