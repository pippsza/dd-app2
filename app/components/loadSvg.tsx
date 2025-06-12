import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./themeSwitcher";

// Импортируем все SVG
import SunLight from "../../assets/svg/sun-light.svg";
import SunDark from "../../assets/svg/sun-dark.svg";
import CrossLight from "../../assets/svg/cross-light.svg";
import CrossDark from "../../assets/svg/cross-dark.svg";
import PlusLight from "../../assets/svg/plus-light.svg";
import PlusDark from "../../assets/svg/plus-dark.svg";
import TrashLight from "../../assets/svg/trash-light.svg";
import TrashDark from "../../assets/svg/trash-dark.svg";
import BurgerLight from "../../assets/svg/burger-light.svg";
import BurgeDark from "../../assets/svg/burger-dark.svg";
import CheckedLight from "../../assets/svg/checked-light.svg";
import CheckedDark from "../../assets/svg/checked-dark.svg";

interface LoadSvgProps {
  name: string;
  style?: any;
}

export default function LoadSvg({ name, style }: LoadSvgProps) {
  const { isDarkMode } = useContext(ThemeContext);

  const getSvgComponent = () => {
    switch (name) {
      case "sun":
        return isDarkMode ? SunDark : SunLight;
      case "cross":
        return isDarkMode ? CrossDark : CrossLight;
      case "plus":
        return isDarkMode ? PlusDark : PlusLight;
      case "trash":
        return isDarkMode ? TrashDark : TrashLight;
      case "burger":
        return isDarkMode ? BurgeDark : BurgerLight;
      case "checked":
        return isDarkMode ? CheckedDark : CheckedLight;
      default:
        return null;
    }
  };

  const SvgComponent = getSvgComponent();

  if (!SvgComponent) {
    return null;
  }

  return <SvgComponent style={style} />;
} 