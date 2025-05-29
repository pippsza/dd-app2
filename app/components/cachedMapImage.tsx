import React, { useState, useEffect } from "react";
import { ImageBackground, ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DDNET_RANKS_URL = "https://ddnet.org/ranks/maps/";
const CACHE_KEY_PREFIX = "@map_cache:";

interface CachedMapImageProps {
  mapName: string | null;
  style: any;
  children?: React.ReactNode;
}

export default function CachedMapImage({ mapName, style, children }: CachedMapImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const [useDefault, setUseDefault] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!mapName) {
        setIsLoaded(true);
        return;
      }

      try {
        const cacheKey = `${CACHE_KEY_PREFIX}${mapName}`;
        const src = `${DDNET_RANKS_URL}${mapName.replace(/ /g, "_")}.png`;

        // Пытаемся получить изображение из кэша
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          setCachedImage(cached);
          setIsLoaded(true);
          return;
        }

        // Проверяем существование карты на сервере
        const checkResponse = await fetch(src, { method: "HEAD" });
        if (!checkResponse.ok) {
          setUseDefault(true);
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
            await AsyncStorage.setItem(cacheKey, base64);
            setCachedImage(base64);
            setIsLoaded(true);
          } catch (error) {
            setUseDefault(true);
            setIsLoaded(true);
          }
        };

        reader.onerror = () => {
          setUseDefault(true);
          setIsLoaded(true);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        setUseDefault(true);
        setIsLoaded(true);
      }
    };

    setIsLoaded(false);
    setUseDefault(false);
    setCachedImage(null);
    loadImage();
  }, [mapName]);

  if (!isLoaded) {
    return (
      <View style={[style, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (!mapName || useDefault) {
    return <View style={style}>{children}</View>;
  }

  return (
    <ImageBackground
      source={{ uri: cachedImage || `${DDNET_RANKS_URL}${mapName.replace(/ /g, "_")}.png` }}
      resizeMode="cover"
      style={style}
    >
      {children}
    </ImageBackground>
  );
} 