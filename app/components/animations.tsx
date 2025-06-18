import React, { useEffect, useRef, ReactNode } from "react";
import { Animated, Dimensions, Easing, StyleProp, ViewStyle, View } from "react-native";

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

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  opacity: Animated.Value;
  translateX: Animated.Value;
  translateY: Animated.Value;
  rotate: Animated.Value;
}

interface ExplosionAnimationProps {
  onComplete?: () => void;
  color?: string;
  size?: number;
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

export function SlideDown({ children, duration = ANIMATION_DURATION, style }: AnimationProps) {
  const translateY = useRef(new Animated.Value(-height)).current;

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

// Добавляем новый компонент для отслеживания первого рендера
function useFirstRender() {
  const isFirst = useRef(true);
  useEffect(() => {
    isFirst.current = false;
  }, []);
  return isFirst.current;
}

// Новый компонент RandomSlide
export function RandomSlide({ children, duration = ANIMATION_DURATION, style }: AnimationProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const random = useRef(Math.random()).current; // Сохраняем случайное значение между рендерами
  const isFirstRender = useFirstRender();
  
  useEffect(() => {
    if (isFirstRender) {
      // Устанавливаем начальное значение в зависимости от случайного направления
      translateX.setValue(random < RANDOM_THRESHOLD ? -width : width);
      
      // Запускаем анимацию
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        easing: ANIMATION_EASING,
        useNativeDriver: true,
      }).start();
    }
  }, [duration, isFirstRender, random]);

  // Если это не первый рендер, просто возвращаем детей без анимации
  if (!isFirstRender) {
    return <View style={style}>{children}</View>;
  }

  return (
    <Animated.View 
      style={[
        style,
        {
          transform: [{ translateX }],
          width: '100%',
          height: '100%',
        }
      ]}
    >
      {children}
    </Animated.View>
  );
}

export function ExplosionAnimation({ 
  onComplete, 
  color = "#ffffff", 
  size = 50 
}: ExplosionAnimationProps) {
  const particles = useRef<Particle[]>([]);
  const animations = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    // Создаем частицы
    const particleCount = 12;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const particleSize = Math.random() * 4 + 2; // Размер частицы от 2 до 6

      newParticles.push({
        x: size / 2,
        y: size / 2,
        size: particleSize,
        color,
        rotation: angle,
        opacity: new Animated.Value(1),
        translateX: new Animated.Value(0),
        translateY: new Animated.Value(0),
        rotate: new Animated.Value(0),
      });
    }

    particles.current = newParticles;

    // Запускаем анимации для каждой частицы
    animations.current = newParticles.map((particle) => {
      const distance = Math.random() * 100 + 50; // Расстояние разлета от 50 до 150
      const angle = particle.rotation;
      const duration = Math.random() * 500 + 500; // Длительность от 500 до 1000 мс

      const translateX = Animated.timing(particle.translateX, {
        toValue: Math.cos(angle) * distance,
        duration,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      });

      const translateY = Animated.timing(particle.translateY, {
        toValue: Math.sin(angle) * distance,
        duration,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      });

      const rotate = Animated.timing(particle.rotate, {
        toValue: Math.random() * 360,
        duration,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      });

      const opacity = Animated.timing(particle.opacity, {
        toValue: 0,
        duration: duration * 0.8,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      });

      return Animated.parallel([translateX, translateY, rotate, opacity]);
    });

    // Запускаем все анимации
    Animated.parallel(animations.current).start(() => {
      onComplete?.();
    });

    return () => {
      // Очищаем анимации при размонтировании
      animations.current.forEach(animation => animation.stop());
    };
  }, []);

  return (
    <View style={{ position: 'absolute', width: size, height: size }}>
      {particles.current.map((particle, index) => (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.size / 2,
            opacity: particle.opacity,
            transform: [
              { translateX: particle.translateX },
              { translateY: particle.translateY },
              { rotate: particle.rotate.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                })
              },
            ],
          }}
        />
      ))}
    </View>
  );
}

// Анимация перехода между темами
interface ThemeTransitionProps {
  children: ReactNode;
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
  duration?: number;
  style?: any;
}

export function ThemeTransition({ 
  children, 
  isTransitioning, 
  onTransitionComplete, 
  duration = 400,
  style 
}: ThemeTransitionProps) {
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTransitioning) {
      // Анимация исчезновения
      const fadeOut = Animated.timing(opacity, {
        toValue: 0.3,
        duration: duration * 0.4,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      });

      const scaleDown = Animated.timing(scale, {
        toValue: 0.95,
        duration: duration * 0.4,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      });

      Animated.parallel([fadeOut, scaleDown]).start(() => {
        // Анимация появления
        const fadeIn = Animated.timing(opacity, {
          toValue: 1,
          duration: duration * 0.6,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        });

        const scaleUp = Animated.timing(scale, {
          toValue: 1,
          duration: duration * 0.6,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        });

        Animated.parallel([fadeIn, scaleUp]).start(() => {
          onTransitionComplete?.();
        });
      });
    }
  }, [isTransitioning, duration, onTransitionComplete]);

  return (
    <Animated.View 
      style={[
        style,
        {
          opacity,
          transform: [{ scale }],
        }
      ]}
    >
      {children}
    </Animated.View>
  );
}
