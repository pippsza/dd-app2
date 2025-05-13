import React from "react";
import { View, StyleSheet } from "react-native";
import Canvas, { Image } from "react-native-canvas";
import { responsiveWidth as rw } from "react-native-responsive-dimensions";

type Props = { src: string; width: number };
type CanvasFunc = (
  sx: number,
  sy: number,
  sW: number,
  sH: number,
  dx: number,
  dy: number,
  dW: number,
  dH: number
) => void;

// Цвета и параметры в одном месте
const COLORS = {
  overlayBody: "rgba(0, 140, 255, 0.3)", // цвет заливки тела
  overlayLegs: "rgba(0, 255, 0, 0.3)", // цвет заливки ног
};

const CANVAS_BASE_SIZE = 100;

const CanvasImageRN = ({ src, width }: Props) => {
  // Общая функция для создания и загрузки изображения
  const loadImage = (canvas: any, src: string): Promise<Image> => {
    return new Promise((resolve, reject) => {
      const img = new Image(canvas);
      img.src = src;
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", reject);
    });
  };

  // Общая функция для установки размеров и получения контекста
  const setupCanvas = (canvas: any) => {
    if (!canvas) return null;
    const size = rw(width);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    return { ctx, size, scale: size / CANVAS_BASE_SIZE };
  };

  // Универсальная функция рисования заданного фрагмента изображения с масштабированием
  const createDrawFunc = (
    ctx: CanvasRenderingContext2D,
    img: Image,
    scale: number
  ): CanvasFunc => {
    return (sx, sy, sW, sH, dx, dy, dW, dH) => {
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
  };

  // Общая функция для отрисовки слоя с опциональной заливкой цветом
  const drawLayer = async (
    canvas: any,
    src: string,
    drawCommands: Array<Parameters<CanvasFunc>>,
    overlayColor?: string
  ) => {
    if (!canvas) return;
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, size, scale } = setup;

    try {
      const img = await loadImage(canvas, src);
      ctx.clearRect(0, 0, size, size);

      const draw = createDrawFunc(ctx, img, scale);

      // Выполняем все команды рисования
      drawCommands.forEach((params) => draw(...params));

      // Если нужно, накладываем цвет с режимом source-atop (только на нарисованное)
      if (overlayColor) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = overlayColor;
        ctx.fillRect(0, 0, size, size);
        ctx.globalCompositeOperation = "source-over";
      }
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };

  // Обработчики для каждого слоя
  const handleMainCanvas = async (canvas) => {
    if (!canvas) return;
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, size, scale } = setup;

    try {
      const img = await loadImage(canvas, src);
      ctx.clearRect(0, 0, size, size);

      const draw = createDrawFunc(ctx, img, scale);

      // Рисуем фрагменты тела и глаз (без заливки)
      draw(192, 64, 64, 30, -7, 52, 90, 38);
      draw(96, 0, 96, 96, 0, 0, 96, 96);
      draw(192, 64, 64, 30, 17, 52, 87, 38);
      // Здесь можно добавить зеркальный глаз, если нужно
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };

  // Левую ногу рисуем и закрашиваем
  const handleLeftLeg = (canvas) => {
    const drawCommands = [
      [192, 40, 70, 30, -13, 58, 110, 50], // нога
    ];
    drawLayer(canvas, src, drawCommands, COLORS.overlayLegs);
  };

  // Правую ногу рисуем и закрашиваем
  const handleRightLeg = (canvas) => {
    const drawCommands = [
      [192, 40, 70, 30, 11, 58, 108, 50], // нога
    ];
    drawLayer(canvas, src, drawCommands, COLORS.overlayLegs);
  };

  // Тело с глазами и заливкой
  const handleBody = (canvas) => {
    if (!canvas) return;
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, size, scale } = setup;

    loadImage(canvas, src)
      .then((img) => {
        ctx.clearRect(0, 0, size, size);
        const draw = createDrawFunc(ctx, img, scale);

        draw(0, 0, 96, 96, -2, -2, 100, 100); // тело
        draw(64, 100, 30, 40, 38, 27, 34, 50); // глаз

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
          0,
          34 * scale,
          50 * scale
        );
        ctx.restore();

        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = COLORS.overlayBody;
        ctx.fillRect(0, 0, size, size);
        ctx.globalCompositeOperation = "source-over";
      })
      .catch((error) => console.error("Image loading failed:", error));
  };

  return (
    <View style={{ width: rw(width), height: rw(width) }}>
      <Canvas style={style.tee} ref={handleMainCanvas} />
      <Canvas style={style.tee} ref={handleLeftLeg} />
      <Canvas style={style.tee} ref={handleBody} />
      <Canvas style={style.tee} ref={handleRightLeg} />
    </View>
  );
};

const style = StyleSheet.create({
  tee: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default CanvasImageRN;
