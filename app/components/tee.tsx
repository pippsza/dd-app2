import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image as RNImage } from "react-native";
import Canvas, { Image } from "react-native-canvas";
import { responsiveWidth as rw } from "react-native-responsive-dimensions";

type Props = { source: string; width: number };
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
const DEFAULT_URI = require("../../assets/images/default.png");

const Tee = ({ source, width }: Props) => {
  const rawSrc = `https://skins.ddnet.org/skin/community/${source}.png`;
  const src = encodeURI(rawSrc);
  const [isLoaded, setIsLoaded] = useState(false);

  // Предварительная загрузка изображения
  useEffect(() => {
    setIsLoaded(false);
    RNImage.prefetch(src)
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(false));
  }, [src]);

  // Общая функция для создания и загрузки изображения
  const loadImage = (canvas: any, src: string): Promise<Image> => {
    return new Promise((resolve, reject) => {
      const img = new Image(canvas);
      img.src = src;
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", () => {
        const defImg = new Image(canvas);
        defImg.src = DEFAULT_URI;
        defImg.addEventListener("load", () => resolve(defImg));
      });
    });
  };

  const setupCanvas = (canvas: any) => {
    if (!canvas) return null;
    const size = rw(width);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    return { ctx, size, scale: size / CANVAS_BASE_SIZE };
  };

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
      drawCommands.forEach((params) => draw(...params));
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };

  const handleMainCanvas = async (canvas) => {
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, size, scale } = setup;

    try {
      const img = await loadImage(canvas, src);
      ctx.clearRect(0, 0, size, size);
      const draw = createDrawFunc(ctx, img, scale);
      draw(192, 64, 64, 30, -7, 52, 90, 38);
      draw(96, 0, 96, 96, 0, 0, 96, 96);
      draw(192, 64, 64, 30, 17, 52, 87, 38);
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };

  const handleLeftLeg = (canvas) => {
    drawLayer(canvas, src, [[192, 40, 70, 30, -13, 58, 110, 50]]);
  };
  const handleRightLeg = (canvas) => {
    drawLayer(canvas, src, [[192, 40, 70, 30, 11, 58, 108, 50]]);
  };

  const handleBody = (canvas) => {
    if (!canvas) return;
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, size, scale } = setup;

    loadImage(canvas, src)
      .then((img) => {
        ctx.clearRect(0, 0, size, size);
        const draw = createDrawFunc(ctx, img, scale);
        draw(0, 0, 96, 96, -2, -2, 100, 100);
        draw(64, 100, 30, 40, 38, 27, 34, 50);
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
      })
      .catch((error) => console.error("Image loading failed:", error));
  };

  // Рендерим плейсхолдер до завершения загрузки
  if (!isLoaded) {
    return (
      <RNImage
        source={DEFAULT_URI}
        style={{ width: rw(width), height: rw(width) }}
        resizeMode="contain"
      />
    );
  }

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

export default Tee;
