import { useContext, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { useNavigation } from "expo-router";
import { ThemeContext } from "./themeSwitcher";
import { SlideDown, AnimatedButton } from "./animations";
import { useSoundWithSettings } from "../hooks/useSoundWithSettings";
import LoadSvg from "./loadSvg";

interface HeaderProps {
  onClose: () => void;
}

export default function Header({ onClose }: HeaderProps) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { playButtonSound } = useSoundWithSettings();
  const themeButtonScale = useRef(new Animated.Value(1)).current;
  const themeButtonRotation = useRef(new Animated.Value(0)).current;
  const themeButtonPulse = useRef(new Animated.Value(1)).current;

  // Анимация пульсации для показа активной темы
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(themeButtonPulse, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(themeButtonPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulseAnimation.start();
    
    return () => pulseAnimation.stop();
  }, []);

  const handleThemeToggle = () => {
    playButtonSound();
    
    // Анимация нажатия кнопки
    Animated.sequence([
      Animated.timing(themeButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(themeButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Анимация вращения иконки
    Animated.timing(themeButtonRotation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Сбрасываем значение для следующего вращения
      themeButtonRotation.setValue(0);
    });
    
    toggleTheme();
  };

  const handleMenuToggle = () => {
    playButtonSound();
    onClose();
  };

  const renderThemeButton = () => (
    <SlideDown duration={700}>
      <Animated.View style={{ 
        transform: [
          { scale: Animated.multiply(themeButtonScale, themeButtonPulse) },
          { 
            rotate: themeButtonRotation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }
        ] 
      }}>
        <AnimatedButton 
          animationType="rotate" 
          onPress={handleThemeToggle}
        >
          <LoadSvg name="sun" style={styles.svg} />
        </AnimatedButton>
      </Animated.View>
    </SlideDown>
  );

  const renderMenuButton = () => (
    <SlideDown duration={1000}>
      <AnimatedButton 
        animationType="scale" 
        onPress={handleMenuToggle}
      >
        <LoadSvg name="burger" style={styles.svg} />
      </AnimatedButton>
    </SlideDown>
  );

  return (
    <View style={styles.header}>
      {renderThemeButton()}
      {renderMenuButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    width: rw(100),
    height: rh(10),
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  svg: {
    width: rw(10),
    height: rw(10),
  },
});
