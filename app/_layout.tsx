import "./locales/i18n";
import App from "./_app";
import { LanguageProvider } from "./components/languageProvide";
import { ThemeProvider } from "./components/themeSwitcher";
import { SettingsProvider } from "./components/settingsProvider";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SettingsProvider>
          <App></App>
        </SettingsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
