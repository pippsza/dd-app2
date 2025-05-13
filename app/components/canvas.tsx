import React from "react";
import { View } from "react-native";
import Canvas, { Image } from "react-native-canvas";
import { responsiveWidth as rw } from "react-native-responsive-dimensions";

type Props = { src: string; width: Number };
type CanvasFunc = (
  sx: Number,
  sy: Number,
  sW: Number,
  sH: Number,
  dx: Number,
  dy: Number,
  dW: Number,
  dH: Number
) => void;
const CanvasImageRN = ({ src, width }: Props) => {
  const handleCanvas = async (canvas) => {
    if (!canvas) return;

    // Адаптивная ширина и квадратная высота = ширине
    const canvasSize = rw(width);
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext("2d");

    // Единый коэффициент масштабирования по базовым 100x100
    const scale = canvasSize / 100;

    // Создаем и загружаем изображение
    const img = new Image(canvas);
    try {
      await new Promise((resolve, reject) => {
        img.src = src;
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
      });

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Функция рисования с единым scale
      const draw = (sx, sy, sW, sH, dx, dy, dW, dH): CanvasFunc => {
        ctx.drawImage(
          img,
          sx,
          sy,
          sW,
          sH,
          dx * scale,
          dy * scale,
          dW * scale,
          dH * scale
        );
      };

      // Рисуем фрагменты
      draw(192, 64, 64, 30, -7, 52, 90, 38);
      draw(192, 40, 70, 30, -13, 58, 110, 50);
      draw(96, 0, 96, 96, 0, 0, 96, 96);
      draw(0, 0, 96, 96, -2, -2, 100, 100);
      draw(192, 64, 64, 30, 17, 52, 87, 38);
      draw(192, 40, 70, 30, 11, 58, 108, 50);
      draw(64, 100, 30, 40, 38, 27, 34, 50);

      // Зеркальное отражение последнего элемента
      ctx.save();
      ctx.translate((38 + 34) * scale, 27 * scale);
      ctx.scale(-1, 1);
      ctx.drawImage(
        img,
        64,
        100,
        30,
        40,
        -17 * scale,
        0 * scale,
        34 * scale,
        50 * scale
      );
      ctx.restore();
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };

  return (
    <View style={{ width: rw(width), height: rw(width) }}>
      <Canvas ref={handleCanvas} />
    </View>
  );
};

export default CanvasImageRN;
