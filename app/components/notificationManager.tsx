import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useSettings } from './settingsProvider';
import { usePushNotifications } from './pushNotificationService';

interface Player {
  name: string;
  data: {
    status: "Offline" | "Online" | "AFK";
    game: string | null;
    server: string | null;
    mapName: string | null;
  };
}

interface NotificationManagerProps {
  players: Player[];
}

const STORAGE_KEY = 'notification-settings';

interface NotificationSettings {
  enabled: boolean;
  persistentEnabled: boolean;
  instantEnabled: boolean;
  lastOnlinePlayers: string[];
}

export default function NotificationManager({ players }: NotificationManagerProps) {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { 
    initialize, 
    requestPermissions, 
    sendFriendOnlineNotification, 
    sendPersistentNotification,
    dismissNotification 
  } = usePushNotifications();
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enabled: true,
    persistentEnabled: true,
    instantEnabled: true,
    lastOnlinePlayers: [],
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const persistentNotificationRef = useRef<string | null>(null);

  // Инициализация push-уведомлений
  useEffect(() => {
    const initNotifications = async () => {
      try {
        await initialize();
        await requestPermissions();
      } catch (error) {
        console.error('Failed to initialize notifications:', error);
      }
    };
    
    if (settings.notificationsEnabled) {
      initNotifications();
    }
  }, [settings.notificationsEnabled, initialize, requestPermissions]);

  // Загрузка настроек уведомлений
  useEffect(() => {
    const loadNotificationSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setNotificationSettings(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
      } finally {
        setIsInitialized(true);
      }
    };
    loadNotificationSettings();
  }, []);

  // Сохранение настроек уведомлений
  const saveNotificationSettings = async (newSettings: NotificationSettings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setNotificationSettings(newSettings);
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  // Основная логика отслеживания активности
  useEffect(() => {
    if (!isInitialized || !settings.notificationsEnabled || !notificationSettings.enabled) {
      return;
    }

    const onlinePlayers = players.filter(player => player.data.status === 'Online');
    const onlinePlayerNames = onlinePlayers.map(player => player.name);
    const previousOnlinePlayers = notificationSettings.lastOnlinePlayers;

    // Находим новых игроков онлайн
    const newOnlinePlayers = onlinePlayerNames.filter(
      name => !previousOnlinePlayers.includes(name)
    );

    // Отправляем разовые уведомления для новых игроков
    if (notificationSettings.instantEnabled && newOnlinePlayers.length > 0) {
      newOnlinePlayers.forEach(playerName => {
        const player = players.find(p => p.name === playerName);
        if (player && player.data.mapName) {
          sendInstantNotification(playerName, player.data.mapName);
        } else {
          sendInstantNotification(playerName, 'unknown map');
        }
      });
    }

    // Обновляем постоянное уведомление
    if (notificationSettings.persistentEnabled) {
      updatePersistentNotification(onlinePlayerNames);
    } else {
      // Удаляем постоянное уведомление если отключено
      removePersistentNotification();
    }

    // Сохраняем текущий список онлайн игроков
    if (JSON.stringify(onlinePlayerNames) !== JSON.stringify(previousOnlinePlayers)) {
      saveNotificationSettings({
        ...notificationSettings,
        lastOnlinePlayers: onlinePlayerNames,
      });
    }
  }, [players, isInitialized, settings.notificationsEnabled, notificationSettings, t]);

  // Отправка разового уведомления
  const sendInstantNotification = async (playerName: string, mapName: string) => {
    try {
      // Показываем Alert в приложении
      Alert.alert(
        t('notifications.friendOnline'),
        t('notifications.friendOnlineMessage', { playerName, mapName }),
        [{ text: 'OK' }],
        { cancelable: true }
      );

      // Отправляем push-уведомление на телефон
      await sendFriendOnlineNotification(playerName, mapName, t);
    } catch (error) {
      console.error('Error sending instant notification:', error);
    }
  };

  // Обновление постоянного уведомления
  const updatePersistentNotification = async (onlinePlayerNames: string[]) => {
    try {
      if (onlinePlayerNames.length === 0) {
        // Удаляем уведомление если нет игроков онлайн
        await removePersistentNotification();
        return;
      }

      // Удаляем предыдущее постоянное уведомление
      if (persistentNotificationRef.current) {
        await dismissNotification(persistentNotificationRef.current);
      }

      // Отправляем новое постоянное push-уведомление
      const notificationId = await sendPersistentNotification(onlinePlayerNames, t);
      
      if (notificationId) {
        persistentNotificationRef.current = notificationId;
      }
    } catch (error) {
      console.error('Error updating persistent notification:', error);
    }
  };

  // Удаление постоянного уведомления
  const removePersistentNotification = async () => {
    try {
      if (persistentNotificationRef.current) {
        await dismissNotification(persistentNotificationRef.current);
        persistentNotificationRef.current = null;
      }
    } catch (error) {
      console.error('Error removing persistent notification:', error);
    }
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      removePersistentNotification();
    };
  }, []);

  // Компонент не рендерит ничего видимого
  return null;
}

// Экспортируем функции для управления настройками
export const useNotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    persistentEnabled: true,
    instantEnabled: true,
    lastOnlinePlayers: [],
  });

  const updateSettings = async (newSettings: Partial<NotificationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  return { settings, updateSettings };
}; 