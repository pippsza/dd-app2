import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image as RNImage,
  ActivityIndicator,
} from "react-native";
import Canvas, { Image as CanvasImage } from "react-native-canvas";
import { responsiveWidth as rw } from "react-native-responsive-dimensions";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const CACHE_KEY_PREFIX = "@tee_cache:";

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
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const [useDefault, setUseDefault] = useState(false);
  const [renderSource, setRenderSource] = useState<
    "LOCALSTORAGE" | "SERVER" | "DEFAULT"
  >("SERVER");
  const [key] = useState(() => `${source}_${Date.now()}`);

  const rawSrc = `${SKIN_BASE_URL}${source}.png`;
  const src = encodeURI(rawSrc);
  const cacheKey = `${CACHE_KEY_PREFIX}${source}`;

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Пытаемся получить изображение из кэша
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          setCachedImage(cached);
          setRenderSource("LOCALSTORAGE");
          setIsLoaded(true);
          return;
        }

        // Проверяем существование скина на сервере
        const checkResponse = await fetch(src, { method: "HEAD" });
        if (!checkResponse.ok) {
          setUseDefault(true);
          setRenderSource("DEFAULT");
          setIsLoaded(true);
          return;
        }

        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            const base64 = reader.result as string;
            // Сохраняем в кэш только если это не дефолтный тишка
            if (source !== "default") {
              await AsyncStorage.setItem(cacheKey, base64);
            }
            setCachedImage(base64);
            setRenderSource("SERVER");

            setIsLoaded(true);
          } catch (error) {
            setUseDefault(true);
            setRenderSource("DEFAULT");
            setIsLoaded(true);
          }
        };

        reader.onerror = () => {
          setUseDefault(true);
          setRenderSource("DEFAULT");
          setIsLoaded(true);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        setUseDefault(true);
        setRenderSource("DEFAULT");
        setIsLoaded(true);
      }
    };

    setIsLoaded(false);
    setUseDefault(false);
    setRenderSource("SERVER");
    loadImage();
  }, [src, cacheKey, source]);

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

      const handleLoad = () => {
        if (img.width === 0 || img.height === 0) {
          reject(new Error("Image has zero size"));
        } else {
          resolve(img);
        }
      };

      const handleError = () => {
        if (useDefault) {
          reject(new Error("Both main and default images failed"));
          return;
        }

        const defImg = new CanvasImage(canvas);
        defImg.addEventListener("load", () => {
          setUseDefault(true);
          setRenderSource("DEFAULT");
          resolve(defImg);
        });
        defImg.addEventListener("error", () => {
          reject(new Error("Default image failed too"));
        });
        defImg.src = DEFAULT_URI;
      };

      img.addEventListener("load", handleLoad);
      img.addEventListener("error", handleError);

      // Используем кэшированное изображение или дефолтное
      const imageSrc = useDefault ? DEFAULT_URI : cachedImage || src;

      img.src = imageSrc;
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
    } catch (error) {}
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
      setUseDefault(true);
      setRenderSource("DEFAULT");
      setIsLoaded(true);
    }
  };

  const renderLoadingState = () => (
    <RNImage
      source={DEFAULT_URI}
      style={{ width: rw(width), height: rw(width) }}
      resizeMode="contain"
    />
  );

  const renderTee = () => {
    return (
      <View style={{ width: rw(width), height: rw(width) }} key={key}>
        {useDefault ? (
          <RNImage
            source={DEFAULT_URI}
            style={{
              width: rw(width),
              height: rw(width),
              resizeMode: "contain",
            }}
          />
        ) : (
          <Canvas style={styles.tee} ref={handleFullRenderCanvas} />
        )}
      </View>
    );
  };

  return isLoaded ? (
    renderTee()
  ) : (
    <View
      style={{
        width: rw(width),
        height: rw(width),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  tee: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Tee;
