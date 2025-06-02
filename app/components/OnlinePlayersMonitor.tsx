import React, { useEffect, useRef, useState } from "react";
import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import { Platform, NativeModules } from "react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export interface Player {
  name: string;
  data: {
    status: "Offline" | "Online" | "AFK";
    game: string | null;
    server: string | null;
    mapName: string | null;
  };
}

export interface NotificationSettings {
  enabled: boolean;
  checkInterval: number;
  permanentNotification: boolean;
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: true,
  checkInterval: 15 * 60, // 15 минут в секундах
  permanentNotification: true,
};

const BACKGROUND_FETCH_TASK = "background-fetch-task";

interface OnlinePlayersMonitorProps {
  settings: NotificationSettings;
  onSettingsChange?: (settings: NotificationSettings) => void;
}

// Проверяем доступность нативного модуля
const isNotificationModuleAvailable =
  Platform.OS === "android" && NativeModules.NotificationModule != null;

// Функция для безопасного вызова методов NotificationModule
async function safeCallNotificationModule(
  method: string,
  ...args: any[]
): Promise<void> {
  if (!isNotificationModuleAvailable) {
    console.log(
      `[Notification] ${method} skipped - NotificationModule not available`
    );
    return;
  }
  try {
    await NativeModules.NotificationModule[method](...args);
  } catch (error) {
    console.error(`[Notification] Failed to call ${method}:`, error);
  }
}

// Функция для создания/удаления перманентного уведомления
async function updatePermanentOnlineNotification(
  onlineFriends: Player[],
  t: (key: string) => string
) {
  try {
    if (!onlineFriends || onlineFriends.length === 0) {
      if (Platform.OS === "android") {
        await safeCallNotificationModule("stopService");
      } else {
        await Notifications.dismissNotificationAsync("online-list");
      }
      console.log(
        "[Notification] Permanent notification dismissed (no online friends)"
      );
      return;
    }

    const body = onlineFriends.map((f) => f.name).join(", ");
    const title = t("notifications.permanentTitle");

    if (Platform.OS === "android") {
      await safeCallNotificationModule("startService", title, body);
    } else {
      // Для iOS используем стандартные уведомления
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sticky: true,
          sound: false,
          priority: Notifications.AndroidNotificationPriority.MAX,
          // @ts-ignore - channelId существует в Android
          channelId: "permanent-online-list",
          autoDismiss: false,
          ongoing: true,
          fullScreenIntent: false,
        },
        trigger: null,
        identifier: "online-list",
      });
    }
    console.log("[Notification] Permanent notification updated:", body);
  } catch (error) {
    console.error(
      "[Notification] Failed to update permanent notification:",
      error
    );
  }
}

export default function OnlinePlayersMonitor({
  settings,
  onSettingsChange,
}: OnlinePlayersMonitorProps): React.ReactElement {
  const { t } = useTranslation();
  const isRegistered = useRef(false);
  const [onlineFriends, setOnlineFriends] = useState<Player[]>([]);

  useEffect(() => {
    async function setupNotifications() {
      console.log("[Notifications] Setting up notifications...");

      // Запрашиваем разрешение на игнорирование оптимизации батареи
      if (Platform.OS === "android") {
        await safeCallNotificationModule("requestIgnoreBatteryOptimization");
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      console.log(
        "[Notifications] Existing permission status:",
        existingStatus
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        console.log("[Notifications] New permission status:", status);
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("[Notifications] Failed to get notification permissions!");
        return;
      }

      // ... rest of the existing setup code ...
    }

    setupNotifications();

    return () => {
      if (isRegistered.current) {
        BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
        isRegistered.current = false;
      }
      // Останавливаем сервис при размонтировании компонента
      if (Platform.OS === "android") {
        safeCallNotificationModule("stopService");
      }
    };
  }, [settings.checkInterval]);

  // ... rest of the component code ...

  return <View />; // возвращаем пустой View вместо null
}
