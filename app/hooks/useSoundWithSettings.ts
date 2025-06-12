import { useEffect } from 'react';
import { useSettings } from '../components/settingsProvider';
import { useSoundEffects } from '../utils/soundEffects';

export const useSoundWithSettings = () => {
  const { settings } = useSettings();
  const soundEffects = useSoundEffects();

  useEffect(() => {
    // Обновляем настройки звуков при изменении настроек
    soundEffects.setSettings({ enabled: settings.soundsEnabled });
  }, [settings.soundsEnabled, soundEffects]);

  return {
    playButtonSound: soundEffects.playButtonSound,
    playSuccessSound: soundEffects.playSuccessSound,
    playErrorSound: soundEffects.playErrorSound,
    playNotificationSound: soundEffects.playNotificationSound,
    playDeleteSound: soundEffects.playDeleteSound,
    playAddSound: soundEffects.playAddSound,
  };
}; 