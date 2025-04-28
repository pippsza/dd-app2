// SingleTeeSkia.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import {
  Canvas,
  Image as SkImage,
  useCanvas,
  useImage,
  Rect,
  Fill,
  Image,
} from "@shopify/react-native-skia";

interface Props {
  skinName: string; // Имя файла без .png
  defaultSkinName?: string; // Запасное имя
  bodyColor?: string; // CSS-цвет туловища, например '#ff0000'
  feetColor?: string; // CSS-цвет ног, например '#0000ff'
  style?: StyleProp<ViewStyle>; // Ширина/высота контейнера
}

export default function SingleTeeSkia({
  skinName,
  defaultSkinName = "default",
  bodyColor = "#ffffff",
  feetColor = "#ffffff",
  style,
}: Props) {
  const [uri, setUri] = useState(
    `https://ddnet.org/skins/skin/${skinName}.png`
  );
  const [triedDefault, setTriedDefault] = useState(false);

  // useImage автоматически кеширует и парсит PNG в SkImage
  const skImage = useImage(uri);

  // Если png не загрузился, пробуем дефолтный
  useEffect(() => {
    if (skImage === null && !triedDefault) {
      setUri(`https://ddnet.org/skins/skin/${defaultSkinName}.png`);
      setTriedDefault(true);
    }
  }, [skImage]);

  // Пока нет картинки — спиннер
  if (!skImage) {
    return (
      <View style={[{ justifyContent: "center", alignItems: "center" }, style]}>
        <ActivityIndicator />
      </View>
    );
  }

  // Canvas займёт весь контейнер
  return (
    <View style={style}>
      <Canvas style={{ flex: 1 }}>
        {/* 35% от высоты — туловище */}
        <Fill color={bodyColor} />
        <Rect x={0} y={0} width="100%" height="35%" />

        {/* 60% — сам скин */}
        <Image image={skImage} x={0} y="35%" width="100%" height="60%" />

        {/* 15% — ноги */}
        <Fill color={feetColor} />
        <Rect x={0} y="95%" width="100%" height="5%" />
      </Canvas>
    </View>
  );
}
