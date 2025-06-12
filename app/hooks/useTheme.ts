import { useContext } from "react";
import { ThemeContext } from "../components/themeSwitcher";
import { themes, ThemeColors, ThemeType } from "../utils/theme";

export const useTheme = () => {
  const { currentTheme, toggleTheme, isDarkMode } = useContext(ThemeContext);
  
  const theme: ThemeColors = themes[currentTheme];
  
  return {
    theme,
    currentTheme,
    toggleTheme,
    isDarkMode,
  };
}; 