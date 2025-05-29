import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing } from "react-native";

const { width, height } = Dimensions.get("window");

// Глобальные настройки анимации
const ANIMATION_DURATION = 800;
const ANIMATION_EASING = Easing.bezier(0.42, 0, 0.58, 1); // плавная дуговая кривая

export function SlideUp({ children, duration = ANIMATION_DURATION }) {
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration,
      easing: ANIMATION_EASING,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

export function SlideLeftToRight({ children, duration = ANIMATION_DURATION }) {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration,
      easing: ANIMATION_EASING,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      {children}
    </Animated.View>
  );
}

export function SlideRightToLeft({ children, duration = ANIMATION_DURATION }) {
  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration,
      easing: ANIMATION_EASING,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      {children}
    </Animated.View>
  );
}

export function FadeIn({ children, duration = ANIMATION_DURATION }: any) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      easing: ANIMATION_EASING,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}

// Новый компонент RandomSlide
export function RandomSlide({ children, duration = ANIMATION_DURATION }: any) {
  const random = Math.random();
  // console.log(random);
  if (random < 0.5) {
    return <SlideLeftToRight duration={duration}>{children}</SlideLeftToRight>;
  } else {
    return <SlideRightToLeft duration={duration}>{children}</SlideRightToLeft>;
  }
}
