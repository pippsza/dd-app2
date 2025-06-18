import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { ThemeType } from "../utils/theme";

type ThemeContextType = {
  currentTheme: ThemeType;
  toggleTheme: () => void;
  isDarkMode: boolean; // для обратной совместимости
  isTransitioning: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'light',
  toggleTheme: () => {},
  isDarkMode: false,
  isTransitioning: false,
});

type Props = { children: ReactNode };

const THEME_KEY = "theme";
const AVAILABLE_THEMES: ThemeType[] = [
  'light', 
  'dark', 
  'blue', 
  'green', 
  'purple', 
  'pink', 
  'orange', 
  'teal', 
  'indigo',
  'darkBlue',
  'darkPurple',
  'darkGreen',
  'darkPink',
  'darkOrange',
  'darkTeal',
  'darkIndigo'
];

export const ThemeProvider = ({ children }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (stored !== null && AVAILABLE_THEMES.includes(stored as ThemeType)) {
          setCurrentTheme(stored as ThemeType);
        }
      } catch (e) {
        console.error("Error loading theme:", e);
      } finally {
        setLoading(false);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      setIsTransitioning(true);
      
      const currentIndex = AVAILABLE_THEMES.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % AVAILABLE_THEMES.length;
      const nextTheme = AVAILABLE_THEMES[nextIndex];
      
      // Небольшая задержка для анимации
      setTimeout(() => {
        setCurrentTheme(nextTheme);
        setIsTransitioning(false);
      }, 200);
      
      await AsyncStorage.setItem(THEME_KEY, nextTheme);
    } catch (e) {
      console.error("Error saving theme:", e);
      setIsTransitioning(false);
    }
  };

  // Для обратной совместимости
  const isDarkMode = ['dark', 'darkBlue', 'darkPurple', 'darkGreen', 'darkPink', 'darkOrange', 'darkTeal', 'darkIndigo'].includes(currentTheme);

  if (loading) {
    return <Spinner color="black" visible />;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, isDarkMode, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
