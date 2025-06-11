import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';
import { useEffect } from 'react';

export interface SoundSettings {
  enabled: boolean;
  volume: number;
}

const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  enabled: true,
  volume: 0.5,
};

const SOUND_SETTINGS_KEY = 'soundSettings';

// Звуковые файлы с поддержкой нескольких вариантов
const SOUND_FILES = {
  button: [
    require('../../assets/sounds/button.mp3'),
  ],
  success: [
    require('../../assets/sounds/success.mp3'),
  ],
  error: [
    require('../../assets/sounds/error.mp3'),
  ],
  notification: [
    require('../../assets/sounds/notification.mp3'),
  ],
  delete: [
    require('../../assets/sounds/delete1.mp3'),
    require('../../assets/sounds/delete2.mp3'),
  ],
  add: [
    require('../../assets/sounds/add1.mp3'),
    require('../../assets/sounds/add2.mp3'),
    require('../../assets/sounds/add3.mp3'),
    require('../../assets/sounds/add4.mp3'),
    require('../../assets/sounds/add5.mp3'),
    require('../../assets/sounds/add6.mp3'),
    require('../../assets/sounds/add7.mp3'),
  ],
};

class SoundManager {
  private settings: SoundSettings = DEFAULT_SOUND_SETTINGS;
  private isInitialized = false;
  private isInitializing = false;
  private initializationPromise: Promise<void> | null = null;
  private appStateListener: any = null;
  private soundInstances: { [key: string]: Audio.Sound } = {};

  constructor() {
    this.setupAppStateListener();
  }

  private setupAppStateListener() {
    this.appStateListener = AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  private async handleAppStateChange(nextAppState: AppStateStatus) {
    if (nextAppState === 'active') {
      // Приложение стало активным - пересоздаем звуки
      this.isInitialized = false;
      await this.cleanupSounds();
    }
  }

  async initialize() {
    if (this.isInitialized) return;
    if (this.initializationPromise) return this.initializationPromise;
    
    this.initializationPromise = this._initialize();
    return this.initializationPromise;
  }

  private async _initialize() {
    if (this.isInitialized || this.isInitializing) return;
    
    this.isInitializing = true;
    
    try {
      // Настраиваем аудио режим
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      await this.loadSettings();
      await this.preloadSounds();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize sound manager:', error);
      this.isInitialized = false;
    } finally {
      this.isInitializing = false;
      this.initializationPromise = null;
    }
  }

  private async loadSettings() {
    try {
      const stored = await AsyncStorage.getItem(SOUND_SETTINGS_KEY);
      if (stored) {
        this.settings = { ...DEFAULT_SOUND_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load sound settings:', error);
    }
  }

  private async preloadSounds() {
    try {
      // Создаем по одному экземпляру для каждого типа звука
      for (const [key, sources] of Object.entries(SOUND_FILES)) {
        if (sources.length > 0) {
          const source = sources[0]; // Берем первый звук из массива
          try {
            const { sound } = await Audio.Sound.createAsync(source, {
              shouldPlay: false,
              volume: this.settings.volume,
              isLooping: false,
            });
            this.soundInstances[key] = sound;
          } catch (error) {
            console.error(`Failed to preload sound ${key}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to preload sounds:', error);
    }
  }

  private async cleanupSounds() {
    try {
      for (const sound of Object.values(this.soundInstances)) {
        try {
          await sound.unloadAsync();
        } catch (error) {
          // Игнорируем ошибки при очистке
        }
      }
      this.soundInstances = {};
    } catch (error) {
      console.error('Failed to cleanup sounds:', error);
    }
  }

  async playSound(soundType: keyof typeof SOUND_FILES): Promise<void> {
    if (!this.settings.enabled) return;
    
    if (!this.isInitialized) {
      await this.initialize();
    }

    const sound = this.soundInstances[soundType];
    if (!sound) {
      return;
    }

    try {
      // Проверяем статус звука
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) {
        // Если звук не загружен, пересоздаем его
        await this.recreateSound(soundType);
        return;
      }

      // Устанавливаем громкость и воспроизводим
      await sound.setVolumeAsync(this.settings.volume);
      await sound.replayAsync();
    } catch (error) {
      console.error(`Failed to play sound ${soundType}:`, error);
      // При ошибке пытаемся пересоздать звук
      await this.recreateSound(soundType);
    }
  }

  private async recreateSound(soundType: keyof typeof SOUND_FILES) {
    try {
      // Удаляем старый звук
      const oldSound = this.soundInstances[soundType];
      if (oldSound) {
        try {
          await oldSound.unloadAsync();
        } catch (error) {
          // Игнорируем ошибки
        }
      }

      // Создаем новый звук
      const sources = SOUND_FILES[soundType];
      if (sources && sources.length > 0) {
        const source = sources[0];
        const { sound } = await Audio.Sound.createAsync(source, {
          shouldPlay: false,
          volume: this.settings.volume,
          isLooping: false,
        });
        this.soundInstances[soundType] = sound;
      }
    } catch (error) {
      console.error(`Failed to recreate sound ${soundType}:`, error);
    }
  }

  async setSettings(newSettings: Partial<SoundSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    
    try {
      await AsyncStorage.setItem(SOUND_SETTINGS_KEY, JSON.stringify(this.settings));
      
      // Обновляем громкость для всех звуков
      for (const sound of Object.values(this.soundInstances)) {
        try {
          await sound.setVolumeAsync(this.settings.volume);
        } catch (error) {
          // Игнорируем ошибки
        }
      }
    } catch (error) {
      console.error('Failed to save sound settings:', error);
    }
  }

  getSettings(): SoundSettings {
    return { ...this.settings };
  }

  // Метод для принудительной переинициализации
  async reinitialize() {
    this.isInitialized = false;
    await this.cleanupSounds();
    await this.initialize();
  }

  // Метод для полного удаления менеджера звуков
  dispose() {
    if (this.appStateListener) {
      this.appStateListener.remove();
      this.appStateListener = null;
    }
    this.cleanupSounds();
  }
}

// Создаем единственный экземпляр
export const soundManager = new SoundManager();

// Экспортируем удобные функции
export const playButtonSound = () => soundManager.playSound('button');
export const playSuccessSound = () => soundManager.playSound('success');
export const playErrorSound = () => soundManager.playSound('error');
export const playNotificationSound = () => soundManager.playSound('notification');
export const playDeleteSound = () => soundManager.playSound('delete');
export const playAddSound = () => soundManager.playSound('add');

// Хук для использования в компонентах
export const useSoundEffects = () => {
  useEffect(() => {
    // Инициализируем звуки при монтировании компонента
    soundManager.initialize();

    // Очистка при размонтировании не нужна, так как звуки должны жить на протяжении всего приложения
    return () => {
      // Можно добавить логику очистки если нужно
    };
  }, []);

  return {
    playButtonSound,
    playSuccessSound,
    playErrorSound,
    playNotificationSound,
    playDeleteSound,
    playAddSound,
    getSettings: soundManager.getSettings.bind(soundManager),
    setSettings: soundManager.setSettings.bind(soundManager),
    reinitialize: soundManager.reinitialize.bind(soundManager),
  };
}; 