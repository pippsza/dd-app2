import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

type Props = { children: ReactNode };

const THEME_KEY = "theme";

export const ThemeProvider = ({ children }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (stored !== null) {
          setIsDarkMode(stored === "true");
        }
      } catch (e) {
        console.error("Failed to load theme:", e);
      } finally {
        setLoading(false);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem(THEME_KEY, newValue.toString());
    } catch (e) {
      console.error("Failed to save theme:", e);
    }
  };

  if (loading) {
    return <Spinner color="black" visible />;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
