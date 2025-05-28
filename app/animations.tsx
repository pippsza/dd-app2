import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Animated, StyleSheet } from "react-native";

const FadeWrapper = forwardRef(
  ({ children, duration = 200, onFadeOutComplete }, ref) => {
    const opacity = useRef(new Animated.Value(1)).current;

    // Экспонируем методы наружу через ref
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FadeWrapper;
