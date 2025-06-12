import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

export interface SettingsState {
  soundsEnabled: boolean;
  notificationsEnabled: boolean;
}

type SettingsContextType = {
  settings: SettingsState;
  toggleSounds: () => void;
  toggleNotifications: () => void;
  setSettings: (newSettings: Partial<SettingsState>) => void;
};

const DEFAULT_SETTINGS: SettingsState = {
  soundsEnabled: true,
  notificationsEnabled: true,
};

const SETTINGS_KEY = "app-settings";

export const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  toggleSounds: () => {},
  toggleNotifications: () => {},
  setSettings: () => {},
});

interface Props {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: Props) => {
  const [settings, setSettingsState] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        if (stored !== null) {
          const parsedSettings = JSON.parse(stored);
          setSettingsState({ ...DEFAULT_SETTINGS, ...parsedSettings });
        }
      } catch (e) {
        console.error("Failed to load settings:", e);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async (newSettings: SettingsState) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error("Failed to save settings:", e);
    }
  };

  const toggleSounds = async () => {
    const newSettings = {
      ...settings,
      soundsEnabled: !settings.soundsEnabled,
    };
    setSettingsState(newSettings);
    await saveSettings(newSettings);
  };

  const toggleNotifications = async () => {
    const newSettings = {
      ...settings,
      notificationsEnabled: !settings.notificationsEnabled,
    };
    setSettingsState(newSettings);
    await saveSettings(newSettings);
  };

  const setSettings = async (newSettings: Partial<SettingsState>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettingsState(updatedSettings);
    await saveSettings(updatedSettings);
  };

  if (loading) {
    return <Spinner color="black" visible />;
  }

  return (
    <SettingsContext.Provider value={{ settings, toggleSounds, toggleNotifications, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext); 