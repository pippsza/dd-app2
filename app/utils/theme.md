# Система тем

## Использование

### 1. Импорт хука
```typescript
import { useTheme } from "../hooks/useTheme";
```

### 2. Использование в компоненте
```typescript
const { theme, isDarkMode } = useTheme();
```

### 3. Доступные цвета

#### Основные цвета
- `theme.primary` - основной цвет (белый для темной темы, #272727 для светлой)
- `theme.secondary` - вторичный цвет
- `theme.background` - цвет фона
- `theme.surface` - цвет поверхности

#### Текстовые цвета
- `theme.text.primary` - основной текст
- `theme.text.secondary` - вторичный текст
- `theme.text.error` - текст ошибки
- `theme.text.success` - текст успеха
- `theme.text.warning` - текст предупреждения

#### Границы
- `theme.border.primary` - основная граница
- `theme.border.secondary` - вторичная граница

#### Статусы
- `theme.status.online` - зеленый
- `theme.status.offline` - красный
- `theme.status.afk` - синий
- `theme.status.designer` - оранжевый
- `theme.status.developer` - розовый

#### Графики
- `theme.chart.colors` - массив цветов для графиков
- `theme.chart.legendText` - цвет текста легенды

#### Модальные окна
- `theme.modal.background` - фон модального окна
- `theme.modal.overlay` - фон оверлея

#### Кнопки
- `theme.button.background` - фон кнопки
- `theme.button.border` - граница кнопки
- `theme.button.text` - текст кнопки

#### Чекбоксы
- `theme.checkbox.background` - фон чекбокса
- `theme.checkbox.border` - граница чекбокса
- `theme.checkbox.checked` - цвет галочки

#### Инпуты
- `theme.input.background` - фон инпута
- `theme.input.border` - граница инпута
- `theme.input.text` - текст инпута

#### Карточки
- `theme.card.background` - фон карточки
- `theme.card.border` - граница карточки

#### Статус бар
- `theme.statusBar.background` - фон статус бара
- `theme.statusBar.style` - стиль статус бара

### 4. Утилитарные функции

```typescript
import { 
  createCardStyle, 
  createTextStyle, 
  createButtonStyle,
  createInputStyle,
  createModalStyle,
  createCheckboxStyle 
} from "../utils/theme";

// Использование
const cardStyle = createCardStyle(theme);
const textStyle = createTextStyle(theme);
```

### 5. Пример использования

```typescript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function MyComponent() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      borderColor: theme.border.primary,
      borderWidth: 1,
    },
    text: {
      color: theme.text.primary,
    },
    button: {
      backgroundColor: theme.button.background,
      borderColor: theme.button.border,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
}
```

## Преимущества

1. **Централизованное управление** - все цвета в одном месте
2. **Типизация** - полная поддержка TypeScript
3. **Легкость изменения** - измените тему в одном файле
4. **Консистентность** - одинаковые цвета во всем приложении
5. **Утилитарные функции** - готовые стили для частых случаев 