#!/bin/bash

echo "🔧 Очистка временных файлов и кешей..."
rm -rf node_modules android/.gradle ~/.gradle ~/.eas-tmp /tmp/eas-*
npm cache clean --force

echo "📦 Переустановка зависимостей..."
npm install

echo "🛠 Запуск сборки .apk (profile: production)..."
mkdir -p ~/.eas-tmp
TMPDIR=~/.eas-tmp eas build --local --platform android --profile production
