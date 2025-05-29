import React, { useEffect, useRef, ReactNode } from "react";
import { Animated, Dimensions, Easing, StyleProp, ViewStyle } from "react-native";

const { width, height } = Dimensions.get("window");

// Глобальные настройки анимации
const ANIMATION_DURATION = 800;
const ANIMATION_EASING = Easing.bezier(0.42, 0, 0.58, 1); // плавная дуговая кривая
const RANDOM_THRESHOLD = 0.5;

// Types
interface AnimationProps {
  children: ReactNode;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export function SlideUp({ children, duration = ANIMATION_DURATION, style }: AnimationProps) {
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration,
      easing: ANIMATION_EASING,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View style={[{ transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

export function SlideLeftToRight({ children, duration = ANIMATION_DURATION, style }: AnimationProps) {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration,
      easing: ANIMATION_EASING,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View style={[{ transform: [{ translateX }] }, style]}>
      {children}
    </Animated.View>
  );
}

export function SlideRightToLeft({ children, duration = ANIMATION_DURATION, style }: AnimationProps) {
  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration,
      easing: ANIMATION_EASING,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View style={[{ transform: [{ translateX }] }, style]}>
      {children}
    </Animated.View>
  );
}

export function FadeIn({ children, duration = ANIMATION_DURATION, style }: AnimationProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      easing: ANIMATION_EASING,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View style={[{ opacity }, style]}>
      {children}
    </Animated.View>
  );
}

// Новый компонент RandomSlide
export function RandomSlide({ children, duration = ANIMATION_DURATION, style }: AnimationProps) {
  const random = Math.random();
  
  return random < RANDOM_THRESHOLD ? (
    <SlideLeftToRight duration={duration} style={style}>
      {children}
    </SlideLeftToRight>
  ) : (
    <SlideRightToLeft duration={duration} style={style}>
      {children}
    </SlideRightToLeft>
  );
}
