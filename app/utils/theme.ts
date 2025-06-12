export type ThemeType = 
  | "light" 
  | "dark" 
  | "blue" 
  | "green" 
  | "purple" 
  | "pink" 
  | "orange" 
  | "teal" 
  | "indigo"
  | "darkBlue"
  | "darkPurple" 
  | "darkGreen"
  | "darkPink"
  | "darkOrange"
  | "darkTeal"
  | "darkIndigo";

export interface ThemeColors {
  // Основные цвета
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  
  // Текстовые цвета
  text: {
    primary: string;
    secondary: string;
    error: string;
    success: string;
    warning: string;
  };
  
  // Границы
  border: {
    primary: string;
    secondary: string;
  };
  
  // Статусы
  status: {
    online: string;
    offline: string;
    afk: string;
    designer: string;
    developer: string;
  };
  
  // Графики
  chart: {
    colors: string[];
    legendText: string;
    gamemodes: string[];
    categories: string[];
  };
  
  // Модальные окна
  modal: {
    background: string;
    overlay: string;
  };
  
  // Кнопки
  button: {
    background: string;
    border: string;
    text: string;
  };
  
  // Чекбоксы
  checkbox: {
    background: string;
    border: string;
    checked: string;
  };
  
  // Инпуты
  input: {
    background: string;
    border: string;
    text: string;
  };
  
  // Карточки
  card: {
    background: string;
    border: string;
  };
  
  // Статус бар
  statusBar: {
    background: string;
    style: 'dark-content' | 'light-content';
  };
  
  overlay: {
    light: string;
    dark: string;
  };
}

// Функция для получения контрастных цветов статусов
export const getStatusColors = (themeType: ThemeType) => {
  const statusColors = {
    light: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#3b82f6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
    dark: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#3b82f6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
    blue: {
      online: "#4ade80",
      offline: "#f87171",
      afk: "#60a5fa",
      designer: "#fbbf24",
      developer: "#f472b6",
    },
    green: {
      online: "#22c55e",
      offline: "#f87171",
      afk: "#60a5fa",
      designer: "#fbbf24",
      developer: "#f472b6",
    },
    purple: {
      online: "#4ade80",
      offline: "#f87171",
      afk: "#a5b4fc",
      designer: "#fbbf24",
      developer: "#f472b6",
    },
    pink: {
      online: "#4ade80",
      offline: "#f87171",
      afk: "#60a5fa",
      designer: "#fbbf24",
      developer: "#f472b6",
    },
    orange: {
      online: "#4ade80",
      offline: "#f87171",
      afk: "#60a5fa",
      designer: "#fbbf24",
      developer: "#f472b6",
    },
    teal: {
      online: "#4ade80",
      offline: "#f87171",
      afk: "#60a5fa",
      designer: "#fbbf24",
      developer: "#f472b6",
    },
    indigo: {
      online: "#4ade80",
      offline: "#f87171",
      afk: "#a5b4fc",
      designer: "#fbbf24",
      developer: "#f472b6",
    },
    darkBlue: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#3b82f6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
    darkPurple: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#8b5cf6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
    darkGreen: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#3b82f6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
    darkPink: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#3b82f6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
    darkOrange: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#3b82f6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
    darkTeal: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#3b82f6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
    darkIndigo: {
      online: "#22c55e",
      offline: "#ef4444",
      afk: "#3b82f6",
      designer: "#f59e0b",
      developer: "#ec4899",
    },
  };

  return statusColors[themeType] || statusColors.light;
};

export const themes: Record<ThemeType, ThemeColors> = {
  light: {
    primary: "#1a1a1a",
    secondary: "#ffffff",
    background: "#1a1a1a",
    surface: "#ffffff",
    
    text: {
      primary: "#ffffff",
      secondary: "#1a1a1a",
      error: "#dc2626",
      success: "#16a34a",
      warning: "#d97706",
    },
    
    border: {
      primary: "#ffffff",
      secondary: "#1a1a1a",
    },
    
    status: getStatusColors('light'),
    
    chart: {
      colors: ["#3b82f6", "#10b981", "#f59e0b"],
      legendText: "#ffffff",
      gamemodes: ["#60a5fa", "#34d399", "#fbbf24"],
      categories: ["#3b82f6", "#10b981", "#f59e0b"],
    },
    
    modal: {
      background: "rgba(26,26,26,0.95)",
      overlay: "rgba(255,255,255,0.1)",
    },
    
    button: {
      background: "rgba(26,26,26,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#1a1a1a",
      border: "#ffffff",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(26,26,26,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(26,26,26,0.8)",
      border: "#ffffff",
    },
    
    statusBar: {
      background: "#1a1a1a",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  dark: {
    primary: "#ffffff",
    secondary: "#1a1a1a",
    background: "#ffffff",
    surface: "#1a1a1a",
    
    text: {
      primary: "#1a1a1a",
      secondary: "#ffffff",
      error: "#dc2626",
      success: "#16a34a",
      warning: "#d97706",
    },
    
    border: {
      primary: "#1a1a1a",
      secondary: "#ffffff",
    },
    
    status: getStatusColors('dark'),
    
    chart: {
      colors: ["#3b82f6", "#10b981", "#f59e0b"],
      legendText: "#1a1a1a",
      gamemodes: ["#60a5fa", "#34d399", "#fbbf24"],
      categories: ["#3b82f6", "#10b981", "#f59e0b"],
    },
    
    modal: {
      background: "rgba(255,255,255,0.95)",
      overlay: "rgba(26,26,26,0.1)",
    },
    
    button: {
      background: "rgba(255,255,255,0.9)",
      border: "#1a1a1a",
      text: "#1a1a1a",
    },
    
    checkbox: {
      background: "#ffffff",
      border: "#1a1a1a",
      checked: "#1a1a1a",
    },
    
    input: {
      background: "rgba(255,255,255,0.9)",
      border: "#1a1a1a",
      text: "#1a1a1a",
    },
    
    card: {
      background: "rgba(255,255,255,0.8)",
      border: "#1a1a1a",
    },
    
    statusBar: {
      background: "#ffffff",
      style: "dark-content",
    },
    
    overlay: {
      light: "rgba(26,26,26,0.1)",
      dark: "rgba(255,255,255,0.1)",
    },
  },

  blue: {
    primary: "#1e40af",
    secondary: "#dbeafe",
    background: "#1e40af",
    surface: "#dbeafe",
    
    text: {
      primary: "#ffffff",
      secondary: "#1e40af",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#ffffff",
      secondary: "#1e40af",
    },
    
    status: getStatusColors('blue'),
    
    chart: {
      colors: ["#3b82f6", "#10b981", "#f59e0b"],
      legendText: "#ffffff",
      gamemodes: ["#60a5fa", "#34d399", "#fbbf24"],
      categories: ["#3b82f6", "#10b981", "#f59e0b"],
    },
    
    modal: {
      background: "rgba(30,64,175,0.95)",
      overlay: "rgba(219,234,254,0.1)",
    },
    
    button: {
      background: "rgba(30,64,175,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#1e40af",
      border: "#ffffff",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(30,64,175,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(30,64,175,0.8)",
      border: "#ffffff",
    },
    
    statusBar: {
      background: "#1e40af",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  green: {
    primary: "#059669",
    secondary: "#d1fae5",
    background: "#059669",
    surface: "#d1fae5",
    
    text: {
      primary: "#ffffff",
      secondary: "#059669",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#ffffff",
      secondary: "#059669",
    },
    
    status: getStatusColors('green'),
    
    chart: {
      colors: ["#10b981", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#34d399", "#fbbf24", "#60a5fa"],
      categories: ["#10b981", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(5,150,105,0.95)",
      overlay: "rgba(209,250,229,0.1)",
    },
    
    button: {
      background: "rgba(5,150,105,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#059669",
      border: "#ffffff",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(5,150,105,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(5,150,105,0.8)",
      border: "#ffffff",
    },
    
    statusBar: {
      background: "#059669",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  purple: {
    primary: "#7c3aed",
    secondary: "#ede9fe",
    background: "#7c3aed",
    surface: "#ede9fe",
    
    text: {
      primary: "#ffffff",
      secondary: "#7c3aed",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#ffffff",
      secondary: "#7c3aed",
    },
    
    status: getStatusColors('purple'),
    
    chart: {
      colors: ["#a855f7", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#c084fc", "#fbbf24", "#60a5fa"],
      categories: ["#a855f7", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(124,58,237,0.95)",
      overlay: "rgba(237,233,254,0.1)",
    },
    
    button: {
      background: "rgba(124,58,237,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#7c3aed",
      border: "#ffffff",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(124,58,237,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(124,58,237,0.8)",
      border: "#ffffff",
    },
    
    statusBar: {
      background: "#7c3aed",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  pink: {
    primary: "#be185d",
    secondary: "#fce7f3",
    background: "#be185d",
    surface: "#fce7f3",
    
    text: {
      primary: "#ffffff",
      secondary: "#be185d",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#ffffff",
      secondary: "#be185d",
    },
    
    status: getStatusColors('pink'),
    
    chart: {
      colors: ["#ec4899", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#f472b6", "#fbbf24", "#60a5fa"],
      categories: ["#ec4899", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(190,24,93,0.95)",
      overlay: "rgba(252,231,243,0.1)",
    },
    
    button: {
      background: "rgba(190,24,93,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#be185d",
      border: "#ffffff",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(190,24,93,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(190,24,93,0.8)",
      border: "#ffffff",
    },
    
    statusBar: {
      background: "#be185d",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  orange: {
    primary: "#ea580c",
    secondary: "#fed7aa",
    background: "#ea580c",
    surface: "#fed7aa",
    
    text: {
      primary: "#ffffff",
      secondary: "#ea580c",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#ffffff",
      secondary: "#ea580c",
    },
    
    status: getStatusColors('orange'),
    
    chart: {
      colors: ["#fb923c", "#10b981", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#fdba74", "#34d399", "#60a5fa"],
      categories: ["#fb923c", "#10b981", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(234,88,12,0.95)",
      overlay: "rgba(254,215,170,0.1)",
    },
    
    button: {
      background: "rgba(234,88,12,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#ea580c",
      border: "#ffffff",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(234,88,12,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(234,88,12,0.8)",
      border: "#ffffff",
    },
    
    statusBar: {
      background: "#ea580c",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  teal: {
    primary: "#0d9488",
    secondary: "#ccfbf1",
    background: "#0d9488",
    surface: "#ccfbf1",
    
    text: {
      primary: "#ffffff",
      secondary: "#0d9488",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#ffffff",
      secondary: "#0d9488",
    },
    
    status: getStatusColors('teal'),
    
    chart: {
      colors: ["#14b8a6", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#5eead4", "#fbbf24", "#60a5fa"],
      categories: ["#14b8a6", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(13,148,136,0.95)",
      overlay: "rgba(204,251,241,0.1)",
    },
    
    button: {
      background: "rgba(13,148,136,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#0d9488",
      border: "#ffffff",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(13,148,136,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(13,148,136,0.8)",
      border: "#ffffff",
    },
    
    statusBar: {
      background: "#0d9488",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  indigo: {
    primary: "#4338ca",
    secondary: "#e0e7ff",
    background: "#4338ca",
    surface: "#e0e7ff",
    
    text: {
      primary: "#ffffff",
      secondary: "#4338ca",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#ffffff",
      secondary: "#4338ca",
    },
    
    status: getStatusColors('indigo'),
    
    chart: {
      colors: ["#6366f1", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#a5b4fc", "#fbbf24", "#60a5fa"],
      categories: ["#6366f1", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(67,56,202,0.95)",
      overlay: "rgba(224,231,255,0.1)",
    },
    
    button: {
      background: "rgba(67,56,202,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#4338ca",
      border: "#ffffff",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(67,56,202,0.9)",
      border: "#ffffff",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(67,56,202,0.8)",
      border: "#ffffff",
    },
    
    statusBar: {
      background: "#4338ca",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  darkBlue: {
    primary: "#1e3a8a",
    secondary: "#1e40af",
    background: "#0f172a",
    surface: "#1e293b",
    
    text: {
      primary: "#ffffff",
      secondary: "#e2e8f0",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#3b82f6",
      secondary: "#1e40af",
    },
    
    status: getStatusColors('darkBlue'),
    
    chart: {
      colors: ["#3b82f6", "#10b981", "#f59e0b"],
      legendText: "#ffffff",
      gamemodes: ["#60a5fa", "#34d399", "#fbbf24"],
      categories: ["#3b82f6", "#10b981", "#f59e0b"],
    },
    
    modal: {
      background: "rgba(15,23,42,0.95)",
      overlay: "rgba(30,64,175,0.1)",
    },
    
    button: {
      background: "rgba(30,58,138,0.9)",
      border: "#3b82f6",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#1e3a8a",
      border: "#3b82f6",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(30,58,138,0.9)",
      border: "#3b82f6",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(30,41,59,0.8)",
      border: "#3b82f6",
    },
    
    statusBar: {
      background: "#0f172a",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  darkPurple: {
    primary: "#581c87",
    secondary: "#7c3aed",
    background: "#0f0f23",
    surface: "#1e1b4b",
    
    text: {
      primary: "#ffffff",
      secondary: "#e2e8f0",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
    },
    
    status: getStatusColors('darkPurple'),
    
    chart: {
      colors: ["#8b5cf6", "#10b981", "#f59e0b"],
      legendText: "#ffffff",
      gamemodes: ["#a855f7", "#34d399", "#fbbf24"],
      categories: ["#8b5cf6", "#10b981", "#f59e0b"],
    },
    
    modal: {
      background: "rgba(15,15,35,0.95)",
      overlay: "rgba(124,58,237,0.1)",
    },
    
    button: {
      background: "rgba(88,28,135,0.9)",
      border: "#8b5cf6",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#581c87",
      border: "#8b5cf6",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(88,28,135,0.9)",
      border: "#8b5cf6",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(30,27,75,0.8)",
      border: "#8b5cf6",
    },
    
    statusBar: {
      background: "#0f0f23",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  darkGreen: {
    primary: "#14532d",
    secondary: "#059669",
    background: "#0a0f0a",
    surface: "#1e293b",
    
    text: {
      primary: "#ffffff",
      secondary: "#e2e8f0",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#10b981",
      secondary: "#059669",
    },
    
    status: getStatusColors('darkGreen'),
    
    chart: {
      colors: ["#10b981", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#34d399", "#fbbf24", "#60a5fa"],
      categories: ["#10b981", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(10,15,10,0.95)",
      overlay: "rgba(5,150,105,0.1)",
    },
    
    button: {
      background: "rgba(20,83,45,0.9)",
      border: "#10b981",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#14532d",
      border: "#10b981",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(20,83,45,0.9)",
      border: "#10b981",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(30,41,59,0.8)",
      border: "#10b981",
    },
    
    statusBar: {
      background: "#0a0f0a",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  darkPink: {
    primary: "#831843",
    secondary: "#be185d",
    background: "#1a0a1a",
    surface: "#2d1b2d",
    
    text: {
      primary: "#ffffff",
      secondary: "#e2e8f0",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#ec4899",
      secondary: "#be185d",
    },
    
    status: getStatusColors('darkPink'),
    
    chart: {
      colors: ["#ec4899", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#f472b6", "#fbbf24", "#60a5fa"],
      categories: ["#ec4899", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(26,10,26,0.95)",
      overlay: "rgba(190,24,93,0.1)",
    },
    
    button: {
      background: "rgba(131,24,67,0.9)",
      border: "#ec4899",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#831843",
      border: "#ec4899",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(131,24,67,0.9)",
      border: "#ec4899",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(45,27,45,0.8)",
      border: "#ec4899",
    },
    
    statusBar: {
      background: "#1a0a1a",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  darkOrange: {
    primary: "#9a3412",
    secondary: "#fed7aa",
    background: "#1a0a00",
    surface: "#2d1b0a",
    
    text: {
      primary: "#ffffff",
      secondary: "#e2e8f0",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#fb923c",
      secondary: "#ea580c",
    },
    
    status: getStatusColors('darkOrange'),
    
    chart: {
      colors: ["#fb923c", "#10b981", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#fdba74", "#34d399", "#60a5fa"],
      categories: ["#fb923c", "#10b981", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(26,10,0,0.95)",
      overlay: "rgba(254,215,170,0.1)",
    },
    
    button: {
      background: "rgba(154,52,18,0.9)",
      border: "#fb923c",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#9a3412",
      border: "#fb923c",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(154,52,18,0.9)",
      border: "#fb923c",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(45,27,10,0.8)",
      border: "#fb923c",
    },
    
    statusBar: {
      background: "#1a0a00",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  darkTeal: {
    primary: "#134e4a",
    secondary: "#ccfbf1",
    background: "#0a1a1a",
    surface: "#1e2e2e",
    
    text: {
      primary: "#ffffff",
      secondary: "#e2e8f0",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#14b8a6",
      secondary: "#0d9488",
    },
    
    status: getStatusColors('darkTeal'),
    
    chart: {
      colors: ["#14b8a6", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#5eead4", "#fbbf24", "#60a5fa"],
      categories: ["#14b8a6", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(10,26,26,0.95)",
      overlay: "rgba(204,251,241,0.1)",
    },
    
    button: {
      background: "rgba(19,78,74,0.9)",
      border: "#14b8a6",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#134e4a",
      border: "#14b8a6",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(19,78,74,0.9)",
      border: "#14b8a6",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(30,46,46,0.8)",
      border: "#14b8a6",
    },
    
    statusBar: {
      background: "#0a1a1a",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },

  darkIndigo: {
    primary: "#312e81",
    secondary: "#e0e7ff",
    background: "#0a0a1a",
    surface: "#1e1e2e",
    
    text: {
      primary: "#ffffff",
      secondary: "#e2e8f0",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    
    border: {
      primary: "#6366f1",
      secondary: "#4338ca",
    },
    
    status: getStatusColors('darkIndigo'),
    
    chart: {
      colors: ["#6366f1", "#f59e0b", "#3b82f6"],
      legendText: "#ffffff",
      gamemodes: ["#a5b4fc", "#fbbf24", "#60a5fa"],
      categories: ["#6366f1", "#f59e0b", "#3b82f6"],
    },
    
    modal: {
      background: "rgba(10,10,26,0.95)",
      overlay: "rgba(224,231,255,0.1)",
    },
    
    button: {
      background: "rgba(49,46,129,0.9)",
      border: "#6366f1",
      text: "#ffffff",
    },
    
    checkbox: {
      background: "#312e81",
      border: "#6366f1",
      checked: "#ffffff",
    },
    
    input: {
      background: "rgba(49,46,129,0.9)",
      border: "#6366f1",
      text: "#ffffff",
    },
    
    card: {
      background: "rgba(30,30,46,0.8)",
      border: "#6366f1",
    },
    
    statusBar: {
      background: "#0a0a1a",
      style: "light-content",
    },
    
    overlay: {
      light: "rgba(255,255,255,0.1)",
      dark: "rgba(26,26,26,0.1)",
    },
  },
};

// Утилитарные функции для создания стилей
export const createCardStyle = (theme: ThemeColors) => ({
  backgroundColor: theme.card.background,
  borderColor: theme.card.border,
});

export const createTextStyle = (theme: ThemeColors) => ({
  color: theme.text.primary,
});

export const createButtonStyle = (theme: ThemeColors) => ({
  backgroundColor: theme.button.background,
  borderColor: theme.button.border,
});

export const createInputStyle = (theme: ThemeColors) => ({
  backgroundColor: theme.input.background,
  borderColor: theme.input.border,
  color: theme.input.text,
});

export const createModalStyle = (theme: ThemeColors) => ({
  backgroundColor: theme.modal.background,
  borderColor: theme.border.primary,
});

export const createCheckboxStyle = (theme: ThemeColors) => ({
  backgroundColor: theme.checkbox.background,
  borderColor: theme.checkbox.border,
}); 