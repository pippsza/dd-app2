# Настройка Push-уведомлений для DD-App

## Установка зависимостей

### 1. Установка expo-notifications

```bash
npx expo install expo-notifications
```

### 2. Обновление app.json

Добавьте в `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff",
          "sounds": ["./assets/notification-sound.wav"]
        }
      ]
    ]
  }
}
```

## Обновление кода

### 1. Обновление pushNotificationService.tsx

Раскомментируйте код в `app/components/pushNotificationService.tsx`:

```typescript
import * as Notifications from 'expo-notifications';

// В методе initialize()
await Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Для Android
if (Platform.OS === 'android') {
  await Notifications.setNotificationChannelAsync('friends-activity', {
    name: 'Friends Activity',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

// В методе requestPermissions()
const { status: existingStatus } = await Notifications.getPermissionsAsync();
let finalStatus = existingStatus;

if (existingStatus !== 'granted') {
  const { status } = await Notifications.requestPermissionsAsync();
  finalStatus = status;
}

return finalStatus === 'granted';

// В методе sendNotification()
const notificationId = await Notifications.scheduleNotificationAsync({
  content: {
    title: notification.title,
    body: notification.body,
    data: notification.data || {},
    sound: notification.sound !== false,
    priority: notification.priority || 'default',
    sticky: notification.sticky || false,
  },
  trigger: null, // Немедленное уведомление
});

// В методе dismissNotification()
await Notifications.dismissNotificationAsync(notificationId);

// В методе dismissAllNotifications()
await Notifications.dismissAllNotificationsAsync();
```

### 2. Обработка уведомлений

Добавьте в `app/_layout.tsx`:

```typescript
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

// Настройка обработчика уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Layout() {
  useEffect(() => {
    // Обработка нажатия на уведомление
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      
      if (data.type === 'friend_online') {
        // Обработка нажатия на уведомление о друге онлайн
        console.log('Friend online notification tapped:', data);
      }
    });

    return () => subscription.remove();
  }, []);

  // ... остальной код
}
```

## Настройка для разных платформ

### iOS

1. **App Store Connect**: Настройте push-уведомления в App Store Connect
2. **Certificates**: Создайте push-сертификаты
3. **Capabilities**: Включите Push Notifications в Xcode

### Android

1. **Firebase**: Настройте Firebase Cloud Messaging
2. **google-services.json**: Добавьте файл в проект
3. **Permissions**: Добавьте разрешения в AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

## Тестирование

### Локальное тестирование

```typescript
// В компоненте для тестирования
import { usePushNotifications } from './pushNotificationService';

const { sendFriendOnlineNotification } = usePushNotifications();

// Тест уведомления
const testNotification = async () => {
  await sendFriendOnlineNotification('TestPlayer', 'TestMap');
};
```

### Проверка разрешений

```typescript
import * as Notifications from 'expo-notifications';

const checkPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  console.log('Notification permission status:', status);
};
```

## Возможные проблемы

### 1. Уведомления не приходят
- Проверьте разрешения в настройках устройства
- Убедитесь, что приложение не в фоновом режиме
- Проверьте настройки "Не беспокоить"

### 2. Ошибки компиляции
- Убедитесь, что expo-notifications установлен
- Проверьте версии зависимостей
- Перезапустите Metro bundler

### 3. Уведомления не отображаются на Android
- Проверьте настройки канала уведомлений
- Убедитесь, что приложение не оптимизировано системой
- Проверьте настройки батареи

## Дополнительные возможности

### Звуки уведомлений

```typescript
// Кастомный звук
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Friend Online!',
    body: 'Player is online',
    sound: 'notification-sound.wav', // Файл в assets
  },
  trigger: null,
});
```

### Badge (iOS)

```typescript
// Установка badge
await Notifications.setBadgeCountAsync(5);

// Сброс badge
await Notifications.setBadgeCountAsync(0);
```

### Группировка уведомлений

```typescript
// Группировка уведомлений
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Friends Online',
    body: 'Multiple friends are online',
    data: { type: 'group' },
    threadIdentifier: 'friends-activity', // iOS
    groupIdentifier: 'friends-activity', // Android
  },
  trigger: null,
});
```

## Производительность

### Оптимизация

1. **Кэширование**: Кэшируйте настройки уведомлений
2. **Batch**: Группируйте уведомления при большом количестве друзей
3. **Throttling**: Ограничивайте частоту уведомлений
4. **Cleanup**: Очищайте старые уведомления

### Мониторинг

```typescript
// Логирование для отладки
const logNotification = (type: string, data: any) => {
  console.log(`[${new Date().toISOString()}] ${type}:`, data);
};

// Использование
logNotification('friend_online', { playerName, mapName });
``` 