import React from "react";
import { View } from "react-native";
import Canvas, { Image } from "react-native-canvas"; // 1. Добавляем импорт Image

const CanvasImageRN = ({ src }) => {
  const handleCanvas = async (canvas) => {
    // 2. Делаем обработчик асинхронным
    if (!canvas) return;

    // 3. Настраиваем размеры canvas
    canvas.width = 100;
    canvas.height = 100;

    const ctx = canvas.getContext("2d");
    const img = new Image(canvas); // 4. Правильное создание изображения

    try {
      // 5. Асинхронная загрузка изображения
      await new Promise((resolve, reject) => {
        img.src = src;
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
      });

      // 6. Очистка и отрисовка
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 192, 64, 64, 30, -7, 52, 90, 38);
      ctx.drawImage(img, 192, 40, 70, 30, -13, 58, 110, 50);
      ctx.drawImage(img, 96, 0, 96, 96, 0, 0, 96, 96);
      ctx.drawImage(img, 0, 0, 96, 96, -2, -2, 100, 100);
      ctx.drawImage(img, 192, 64, 64, 30, 17, 52, 87, 38);
      ctx.drawImage(img, 192, 40, 70, 30, 11, 58, 108, 50);
      ctx.drawImage(img, 64, 100, 30, 40, 38, 27, 34, 50);

      // Зеркальное отражение последнего элемента
      ctx.save();
      ctx.translate(37 + 34, 30); // x + width, y
      ctx.scale(-1, 1);
      ctx.drawImage(img, 64, 100, 30, 40, -17, -3, 34, 50);
      ctx.restore();

      // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };

  return (
    <View
      style={{
        width: 500,
        height: 500,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas ref={handleCanvas} />
    </View>
  );
};

export default CanvasImageRN;
