import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

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
  const { theme } = useTheme();

  const getSvgComponent = () => {
    // Определяем, какая тема светлая, а какая темная
    // Светлые темы имеют белый фон
    const isLightTheme = theme.background === "#ffffff";
    
    switch (name) {
      case "sun":
        return isLightTheme ? SunDark : SunLight;
      case "cross":
        return isLightTheme ? CrossDark : CrossLight;
      case "plus":
        return isLightTheme ? PlusDark : PlusLight;
      case "trash":
        return isLightTheme ? TrashDark : TrashLight;
      case "burger":
        return isLightTheme ? BurgeDark : BurgerLight;
      case "checked":
        return isLightTheme ? CheckedDark : CheckedLight;
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