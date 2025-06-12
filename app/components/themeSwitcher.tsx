import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { ThemeType } from "../utils/theme";

type ThemeContextType = {
  currentTheme: ThemeType;
  toggleTheme: () => void;
  isDarkMode: boolean; // для обратной совместимости
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'light',
  toggleTheme: () => {},
  isDarkMode: false,
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
      const currentIndex = AVAILABLE_THEMES.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % AVAILABLE_THEMES.length;
      const nextTheme = AVAILABLE_THEMES[nextIndex];
      
      setCurrentTheme(nextTheme);
      await AsyncStorage.setItem(THEME_KEY, nextTheme);
    } catch (e) {
      console.error("Error saving theme:", e);
    }
  };

  // Для обратной совместимости
  const isDarkMode = ['dark', 'darkBlue', 'darkPurple', 'darkGreen', 'darkPink', 'darkOrange', 'darkTeal', 'darkIndigo'].includes(currentTheme);

  if (loading) {
    return <Spinner color="black" visible />;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
