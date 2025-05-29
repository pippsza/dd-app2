import React, { useRef, useImperativeHandle, forwardRef, ReactNode } from "react";
import { Animated, Dimensions, StyleSheet, Easing } from "react-native";

const { width, height } = Dimensions.get("window");

// Types
interface AnimationProps {
  children: ReactNode;
  duration?: number;
  style?: any;
}

interface FadeWrapperProps extends AnimationProps {
  onFadeOutComplete?: () => void;
}

interface SlideOutProps extends AnimationProps {
  onSlideOutComplete?: () => void;
}

interface FadeWrapperRef {
  fadeOut: () => void;
  fadeIn: () => void;
}

interface SlideOutRef {
  slideOut: () => void;
  slideIn: () => void;
}

// FadeWrapper с анимацией fadeIn/fadeOut
export const FadeWrapper = forwardRef<FadeWrapperRef, FadeWrapperProps>(
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
const createSlideOutComponent = (initialValue: number, axis: "translateX" | "translateY" = "translateY") =>
  forwardRef<SlideOutRef, SlideOutProps>(({ children, duration = 300, onSlideOutComplete }, ref) => {
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

// Анимации входа
export function SlideUp({ children, duration = 800, style }: AnimationProps) {
  const translateY = useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View style={[{ transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

export function SlideLeftToRight({ children, duration = 800, style }: AnimationProps) {
  const translateX = useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View style={[{ transform: [{ translateX }] }, style]}>
      {children}
    </Animated.View>
  );
}

export function SlideRightToLeft({ children, duration = 800, style }: AnimationProps) {
  const translateX = useRef(new Animated.Value(width)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View style={[{ transform: [{ translateX }] }, style]}>
      {children}
    </Animated.View>
  );
}

export function FadeIn({ children, duration = 800, style }: AnimationProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View style={[{ opacity }, style]}>
      {children}
    </Animated.View>
  );
}

export function RandomSlide({ children, duration = 800, style }: AnimationProps) {
  const random = Math.random();
  const RANDOM_THRESHOLD = 0.5;
  
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
