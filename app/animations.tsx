import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

// FadeWrapper с анимацией fadeIn/fadeOut
export const FadeWrapper = forwardRef(
  ({ children, duration = 200, onFadeOutComplete }, ref) => {
    const opacity = useRef(new Animated.Value(1)).current;

    useImperativeHandle(ref, () => ({
      fadeOut: () => {
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }).start(() => {
          if (onFadeOutComplete) onFadeOutComplete();
        });
      },
      fadeIn: () => {
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start();
      },
    }));

    return (
      <Animated.View style={[styles.container, { opacity }]}>
        {children}
      </Animated.View>
    );
  }
);

// Базовый шаблон для анимаций выхода сдвигом
const createSlideOutComponent = (initialValue, axis = "translateY") =>
  forwardRef(({ children, duration = 300, onSlideOutComplete }, ref) => {
    const translation = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
      slideOut: () => {
        Animated.timing(translation, {
          toValue: initialValue,
          duration,
          useNativeDriver: true,
        }).start(() => {
          if (onSlideOutComplete) onSlideOutComplete();
        });
      },
      slideIn: () => {
        Animated.timing(translation, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }).start();
      },
    }));

    const transformStyle =
      axis === "translateX"
        ? { transform: [{ translateX: translation }] }
        : { transform: [{ translateY: translation }] };

    return (
      <Animated.View style={[styles.container, transformStyle]}>
        {children}
      </Animated.View>
    );
  });

// Анимация выхода вверх (сдвиг вверх за экран)
export const SlideOutUp = createSlideOutComponent(-height, "translateY");

// Анимация выхода вниз (сдвиг вниз за экран)
export const SlideOutDown = createSlideOutComponent(height, "translateY");

// Анимация выхода влево (сдвиг влево за экран)
export const SlideOutLeft = createSlideOutComponent(-width, "translateX");

// Анимация выхода вправо (сдвиг вправо за экран)
export const SlideOutRight = createSlideOutComponent(width, "translateX");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
