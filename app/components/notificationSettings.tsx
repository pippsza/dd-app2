import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useNotificationSettings } from './notificationManager';
import { useSettings } from './settingsProvider';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

interface NotificationSettingsProps {
  onClose?: () => void;
}

export default function NotificationSettings({ onClose }: NotificationSettingsProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { settings: appSettings } = useSettings();
  const { settings, updateSettings } = useNotificationSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleToggle = async (key: keyof typeof localSettings) => {
    const newSettings = {
      ...localSettings,
      [key]: !localSettings[key],
    };
    setLocalSettings(newSettings);
    await updateSettings(newSettings);
  };

  const handleSave = async () => {
    await updateSettings(localSettings);
    Alert.alert(
      t('notifications.settingsSaved'),
      t('notifications.settingsSavedMessage'),
      [{ text: t('common.ok'), onPress: onClose }]
    );
  };

  const handleReset = () => {
    Alert.alert(
      t('notifications.resetTitle'),
      t('notifications.resetMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.reset'),
          style: 'destructive',
          onPress: async () => {
            const defaultSettings = {
              enabled: true,
              persistentEnabled: true,
              instantEnabled: true,
              lastOnlinePlayers: [],
            };
            setLocalSettings(defaultSettings);
            await updateSettings(defaultSettings);
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: rw(5),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rh(4),
      paddingBottom: rh(2),
      borderBottomWidth: 1,
      borderBottomColor: theme.border.primary,
    },
    title: {
      fontSize: rf(4),
      fontWeight: 'bold',
      color: theme.text.primary,
    },
    closeButton: {
      padding: rw(2),
      borderRadius: rw(2),
      backgroundColor: theme.surface,
    },
    closeText: {
      fontSize: rf(3),
      color: theme.primary,
      fontWeight: '600',
    },
    section: {
      marginBottom: rh(4),
    },
    sectionTitle: {
      fontSize: rf(3.5),
      fontWeight: '600',
      color: theme.text.primary,
      marginBottom: rh(2),
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: rh(2),
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.border.primary,
    },
    settingText: {
      flex: 1,
      fontSize: rf(3),
      color: theme.text.primary,
      marginRight: rw(3),
    },
    settingDescription: {
      fontSize: rf(2.5),
      color: theme.text.secondary,
      marginTop: rh(0.5),
    },
    disabledText: {
      color: theme.text.secondary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: rh(4),
      gap: rw(3),
    },
    button: {
      flex: 1,
      paddingVertical: rh(2.5),
      paddingHorizontal: rw(4),
      borderRadius: rw(2.5),
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: theme.primary,
    },
    resetButton: {
      backgroundColor: theme.text.error,
    },
    buttonText: {
      fontSize: rf(3),
      fontWeight: '600',
      color: 'white',
    },
    warningText: {
      fontSize: rf(2.5),
      color: theme.text.warning,
      textAlign: 'center',
      marginTop: rh(3),
      paddingHorizontal: rw(5),
      lineHeight: rf(3.5),
    },
    infoContainer: {
      backgroundColor: theme.surface,
      padding: rw(4),
      borderRadius: rw(2),
      marginTop: rh(2),
    },
    infoText: {
      fontSize: rf(2.5),
      color: theme.text.secondary,
      lineHeight: rf(3.5),
    },
    statusIndicator: {
      width: rw(2),
      height: rw(2),
      borderRadius: rw(1),
      marginRight: rw(2),
    },
    statusOnline: {
      backgroundColor: theme.status.online,
    },
    statusOffline: {
      backgroundColor: theme.status.offline,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: rh(1),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('notifications.settings')}</Text>
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Основные настройки */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications.general')}</Text>
          
          <View style={styles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={[
                styles.settingText,
                !appSettings.notificationsEnabled && styles.disabledText
              ]}>
                {t('notifications.enableNotifications')}
              </Text>
              <Text style={styles.settingDescription}>
                {t('notifications.enableNotificationsDesc')}
              </Text>
            </View>
            <Switch
              value={localSettings.enabled && appSettings.notificationsEnabled}
              onValueChange={() => handleToggle('enabled')}
              disabled={!appSettings.notificationsEnabled}
              trackColor={{ false: theme.border.primary, true: theme.primary }}
              thumbColor={theme.background}
            />
          </View>
        </View>

        {/* Типы уведомлений */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications.types')}</Text>
          
          <View style={styles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={[
                styles.settingText,
                (!localSettings.enabled || !appSettings.notificationsEnabled) && styles.disabledText
              ]}>
                {t('notifications.instantNotifications')}
              </Text>
              <Text style={styles.settingDescription}>
                {t('notifications.instantNotificationsDesc')}
              </Text>
            </View>
            <Switch
              value={localSettings.instantEnabled}
              onValueChange={() => handleToggle('instantEnabled')}
              disabled={!localSettings.enabled || !appSettings.notificationsEnabled}
              trackColor={{ false: theme.border.primary, true: theme.primary }}
              thumbColor={theme.background}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={[
                styles.settingText,
                (!localSettings.enabled || !appSettings.notificationsEnabled) && styles.disabledText
              ]}>
                {t('notifications.persistentNotifications')}
              </Text>
              <Text style={styles.settingDescription}>
                {t('notifications.persistentNotificationsDesc')}
              </Text>
            </View>
            <Switch
              value={localSettings.persistentEnabled}
              onValueChange={() => handleToggle('persistentEnabled')}
              disabled={!localSettings.enabled || !appSettings.notificationsEnabled}
              trackColor={{ false: theme.border.primary, true: theme.primary }}
              thumbColor={theme.background}
            />
          </View>
        </View>

        {/* Информация */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications.info')}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {t('notifications.infoText')}
            </Text>
            
            <View style={styles.statusContainer}>
              <View style={[styles.statusIndicator, styles.statusOnline]} />
              <Text style={styles.infoText}>
                {t('notifications.statusOnline')}
              </Text>
            </View>
            
            <View style={styles.statusContainer}>
              <View style={[styles.statusIndicator, styles.statusOffline]} />
              <Text style={styles.infoText}>
                {t('notifications.statusOffline')}
              </Text>
            </View>
          </View>
        </View>

        {!appSettings.notificationsEnabled && (
          <Text style={styles.warningText}>
            {t('notifications.appNotificationsDisabled')}
          </Text>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>{t('common.reset')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>{t('common.save')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 