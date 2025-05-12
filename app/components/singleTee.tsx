import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";

export default function TeeImage({
  skinName,
  bodyColor,
  feetColor,
  style,
}: any) {
  // Конвертация BGR->RGB
  function bgrToHex(bgrDec: any) {
    const hex = parseInt(bgrDec, 10).toString(16).padStart(6, "0");
    const b = hex.slice(0, 2),
      g = hex.slice(2, 4),
      r = hex.slice(4, 6);
    return `#${r}${g}${b}`;
  }
  const bodyHex = bgrToHex(bodyColor);
  const feetHex = bgrToHex(feetColor);

  // Составляем URL. Сначала пробуем community-скин, потом обычный.
  const base = "https://skins.ddnet.org/skin";
  const url = `${base}/community/${skinName}.png`;

  // Используем state, чтобы при ошибке подставить default.png
  const [imgUri, setImgUri] = useState(url);
  useEffect(() => {
    setImgUri(`${base}/community/${skinName}.png`);
  }, [skinName]);

  // Обработчик ошибки загрузки
  const onError = () => {
    setImgUri(`${base}/${skinName}.png`);
  };

  return (
    <View style={style}>
      <Image
        source={{ uri: imgUri }}
        style={{ width: 184, height: 184 }} // пример размеров
        onError={onError}
        // Пример: применяем один из цветов через tintColor
        // (в реальном случае потребуются более сложные приёмы для раздельного окрашивания тела/ног)
        tintColor={bodyHex}
        resizeMode="contain"
      />
    </View>
  );
}
