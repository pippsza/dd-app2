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
  function numberToRgba(colorNumber: number, alpha = 1): string {
    const r = (colorNumber >> 16) & 0xff;
    const g = (colorNumber >> 8) & 0xff;
    const b = colorNumber & 0xff;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
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

      //  фрагменты
      draw(192, 64, 64, 30, -7, 52, 90, 38);

      draw(192, 40, 70, 30, -13, 58, 110, 50); // нога
      draw(96, 0, 96, 96, 0, 0, 96, 96);
      draw(0, 0, 96, 96, -2, -2, 100, 100); //ТЕЛО
      draw(192, 64, 64, 30, 17, 52, 87, 38); // левая часть тела

      draw(192, 40, 70, 30, 11, 58, 108, 50); // НОГА / НУЖНО ЗАКРАСИТЬ ЭТУ
      draw(64, 100, 30, 40, 38, 27, 34, 50); // глаз

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
      ); //глаз
      ctx.restore();
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };
  const canvasLeftLeg = async (canvas) => {
    if (!canvas) return;
    const canvasSize = rw(width);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");
    const scale = canvasSize / 100;
    const img = new Image(canvas);
    try {
      await new Promise((resolve, reject) => {
        img.src = src;
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
      });
      ctx.clearRect(0, 0, canvasSize, canvasSize);
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
      //  фрагменты
      draw(192, 40, 70, 30, -13, 58, 110, 50); // нога
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(50, 200, 100, 0.6)";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      ctx.restore();
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };
  const canvasRightLeg = async (canvas) => {
    if (!canvas) return;
    const canvasSize = rw(width);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");
    const scale = canvasSize / 100;
    const img = new Image(canvas);
    try {
      await new Promise((resolve, reject) => {
        img.src = src;
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
      });
      ctx.clearRect(0, 0, canvasSize, canvasSize);
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
      draw(192, 40, 70, 30, 11, 58, 108, 50); // НОГА / НУЖНО ЗАКРАСИТЬ ЭТУ

      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(50, 200, 100, 0.6)";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      ctx.restore();
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };
  const canvasBody = async (canvas) => {
    if (!canvas) return;
    const canvasSize = rw(width);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");
    const scale = canvasSize / 100;
    const img = new Image(canvas);
    try {
      await new Promise((resolve, reject) => {
        img.src = src;
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
      });
      ctx.clearRect(0, 0, canvasSize, canvasSize);
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

      //  фрагменты
      draw(0, 0, 96, 96, -2, -2, 100, 100); //ТЕЛО
      draw(64, 100, 30, 40, 38, 27, 34, 50); // глаз
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
      ); //глаз

      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(50, 200, 100, 0.6)";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      ctx.restore();
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };
  return (
    <View style={{ width: rw(width), height: rw(width) }}>
      <Canvas style={style.tee} ref={handleCanvas} />
      <Canvas style={style.tee} ref={canvasLeftLeg}></Canvas>
      <Canvas ref={canvasBody} style={style.tee}></Canvas>
      <Canvas style={style.tee} ref={canvasRightLeg}></Canvas>
    </View>
  );
};
import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  tee: {
    position: "absolute",
    top: 0,
  },
});
export default CanvasImageRN;
