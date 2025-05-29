import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image as RNImage } from "react-native";
import Canvas, { Image as CanvasImage } from "react-native-canvas";
import { responsiveWidth as rw } from "react-native-responsive-dimensions";
import FastImage from "react-native-fast-image";

interface TeeProps {
  source: string;
  width: number;
}

interface CanvasSetup {
  ctx: any;
  size: number;
  scale: number;
}

type DrawCommand = [
  sx: number,
  sy: number,
  sW: number,
  sH: number,
  dx: number,
  dy: number,
  dW: number,
  dH: number
];

type CanvasFunc = (...args: DrawCommand) => void;

const COLORS = {
  overlayBody: "rgba(0, 140, 255, 0.3)",
  overlayLegs: "rgba(0, 255, 0, 0.3)",
};

const CANVAS_BASE_SIZE = 100;
const DEFAULT_URI = require("../../assets/images/default.png");
const SKIN_BASE_URL = "https://skins.ddnet.org/skin/community/";

const DRAW_COMMANDS = {
  main: [
    [192, 64, 64, 30, -7, 52, 90, 38],
    [96, 0, 96, 96, 0, 0, 96, 96],
    [192, 64, 64, 30, 17, 52, 87, 38],
  ] as DrawCommand[],
  leftLeg: [[192, 40, 70, 30, -13, 58, 110, 50]] as DrawCommand[],
  rightLeg: [[192, 40, 70, 30, 11, 58, 108, 50]] as DrawCommand[],
  full: [
    [192, 40, 70, 30, -13, 58, 110, 50],
    [0, 0, 96, 96, -2, -2, 100, 100],
    [64, 100, 30, 40, 38, 27, 34, 50],
    [192, 40, 70, 30, 11, 58, 108, 50],
  ] as DrawCommand[],
  body: [
    [0, 0, 96, 96, -2, -2, 100, 100],
    [64, 100, 30, 40, 38, 27, 34, 50],
  ] as DrawCommand[],
};

const imageCache = new Map<string, CanvasImage>();

const Tee = ({ source, width }: TeeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const rawSrc = `${SKIN_BASE_URL}${source}.png`;
  const src = encodeURI(rawSrc);

  useEffect(() => {
    setIsLoaded(false);
    RNImage.prefetch(src)
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(false));
  }, [src]);

  const setupCanvas = (canvas: Canvas | null): CanvasSetup | null => {
    if (!canvas) return null;
    const size = rw(width);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    return { ctx, size, scale: size / CANVAS_BASE_SIZE };
  };

  const createDrawFunc = (
    ctx: any,
    img: CanvasImage,
    scale: number
  ): CanvasFunc => {
    return (sx, sy, sW, sH, dx, dy, dW, dH) => {
      // @ts-ignore - react-native-canvas uses its own implementation of Canvas
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

  const loadImage = (canvas: Canvas, src: string): Promise<CanvasImage> => {
    return new Promise((resolve, reject) => {
      const img = new CanvasImage(canvas);
      
      img.addEventListener("load", () => {
        if (img.width === 0 || img.height === 0) {
          reject(new Error("Image has zero size"));
        } else {
          resolve(img);
        }
      });

      img.addEventListener("error", () => {
        const defImg = new CanvasImage(canvas);
        defImg.src = DEFAULT_URI;
        defImg.addEventListener("load", () => resolve(defImg));
        defImg.addEventListener("error", () => reject(new Error("Default image failed too")));
      });

      img.src = src;
    });
  };

  const drawLayer = async (
    canvas: Canvas,
    src: string,
    drawCommands: DrawCommand[],
    overlayColor?: string
  ) => {
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

  const handleFullRenderCanvas = async (canvas: Canvas) => {
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, size, scale } = setup;

    try {
      const img = await loadImage(canvas, src);
      ctx.clearRect(0, 0, size, size);
      const draw = createDrawFunc(ctx, img, scale);

      DRAW_COMMANDS.full.forEach((params) => draw(...params));

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
    } catch (error) {
      console.error("Full render failed:", error);
    }
  };

  const renderLoadingState = () => (
    <RNImage
      source={DEFAULT_URI}
      style={{ width: rw(width), height: rw(width) }}
      resizeMode="contain"
    />
  );

  const renderTee = () => (
    <View style={{ width: rw(width), height: rw(width) }}>
      <Canvas style={styles.tee} ref={handleFullRenderCanvas} />
    </View>
  );

  return isLoaded ? renderTee() : renderLoadingState();
};

const styles = StyleSheet.create({
  tee: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Tee;
