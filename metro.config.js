// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);

// Убираем svg из ассетов и добавляем его как исходный файл
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

module.exports = config;
