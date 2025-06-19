import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

// Интерфейс для push-уведомлений
interface PushNotificationData {
  title: string;
  body: string;
  data?: any;
  sound?: boolean;
  priority?: 'high' | 'default' | 'low';
  sticky?: boolean;
}

// Сервис для работы с push-уведомлениями
export class PushNotificationService {
  private static instance: PushNotificationService;
  private isInitialized = false;

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // В реальном приложении здесь была бы инициализация expo-notifications
      // await Notifications.setNotificationHandler({
      //   handleNotification: async () => ({
      //     shouldShowAlert: true,
      //     shouldPlaySound: true,
      //     shouldSetBadge: false,
      //   }),
      // });

      // Создание канала для Android
      if (Platform.OS === 'android') {
        // await Notifications.setNotificationChannelAsync('friends-activity', {
        //   name: 'Friends Activity',
        //   importance: Notifications.AndroidImportance.HIGH,
        //   vibrationPattern: [0, 250, 250, 250],
        //   lightColor: '#FF231F7C',
        // });
        console.log('Android notification channel created');
      }

      this.isInitialized = true;
      console.log('Push notification service initialized');
    } catch (error) {
      console.error('Failed to initialize push notification service:', error);
    }
  }

  async requestPermissions() {
    try {
      // В реальном приложении:
      // const { status: existingStatus } = await Notifications.getPermissionsAsync();
      // let finalStatus = existingStatus;
      
      // if (existingStatus !== 'granted') {
      //   const { status } = await Notifications.requestPermissionsAsync();
      //   finalStatus = status;
      // }
      
      // return finalStatus === 'granted';
      
      console.log('Notification permissions requested');
      return true; // Для демонстрации
    } catch (error) {
      console.error('Failed to request notification permissions:', error);
      return false;
    }
  }

  async sendNotification(notification: PushNotificationData): Promise<string | null> {
    try {
      await this.initialize();
      
      // В реальном приложении:
      // const notificationId = await Notifications.scheduleNotificationAsync({
      //   content: {
      //     title: notification.title,
      //     body: notification.body,
      //     data: notification.data || {},
      //     sound: notification.sound !== false,
      //     priority: notification.priority || 'default',
      //     sticky: notification.sticky || false,
      //   },
      //   trigger: null, // Немедленное уведомление
      // });
      
      console.log('Push notification sent:', notification);
      
      // Возвращаем ID для демонстрации
      return `notification-${Date.now()}`;
    } catch (error) {
      console.error('Failed to send push notification:', error);
      return null;
    }
  }

  async dismissNotification(notificationId: string) {
    try {
      // В реальном приложении:
      // await Notifications.dismissNotificationAsync(notificationId);
      
      console.log('Push notification dismissed:', notificationId);
    } catch (error) {
      console.error('Failed to dismiss push notification:', error);
    }
  }

  async dismissAllNotifications() {
    try {
      // В реальном приложении:
      // await Notifications.dismissAllNotificationsAsync();
      
      console.log('All push notifications dismissed');
    } catch (error) {
      console.error('Failed to dismiss all push notifications:', error);
    }
  }

  // Специальные методы для разных типов уведомлений
  async sendFriendOnlineNotification(playerName: string, mapName: string, t: (key: string, options?: any) => string): Promise<string | null> {
    return this.sendNotification({
      title: t('notifications.friendOnline'),
      body: t('notifications.friendOnlineMessage', { playerName, mapName }),
      data: { type: 'friend_online', playerName, mapName },
      sound: true,
      priority: 'high',
    });
  }

  async sendPersistentNotification(onlinePlayers: string[], t: (key: string, options?: any) => string): Promise<string | null> {
    const title = t('notifications.friendsOnline');
    const body = onlinePlayers.length === 1 
      ? t('notifications.singleFriendOnline', { playerName: onlinePlayers[0] })
      : t('notifications.multipleFriendsOnline', { 
          playerNames: onlinePlayers.slice(0, 5).join(', '),
          count: onlinePlayers.length - 5 
        });

    return this.sendNotification({
      title,
      body,
      data: { type: 'persistent', players: onlinePlayers },
      sound: false,
      priority: 'default',
      sticky: true,
    });
  }
}

// Хук для использования сервиса
export const usePushNotifications = () => {
  const service = PushNotificationService.getInstance();
  
  return {
    initialize: () => service.initialize(),
    requestPermissions: () => service.requestPermissions(),
    sendNotification: (notification: PushNotificationData) => service.sendNotification(notification),
    sendFriendOnlineNotification: (playerName: string, mapName: string, t: (key: string, options?: any) => string) => 
      service.sendFriendOnlineNotification(playerName, mapName, t),
    sendPersistentNotification: (onlinePlayers: string[], t: (key: string, options?: any) => string) => 
      service.sendPersistentNotification(onlinePlayers, t),
    dismissNotification: (notificationId: string) => service.dismissNotification(notificationId),
    dismissAllNotifications: () => service.dismissAllNotifications(),
  };
}; 