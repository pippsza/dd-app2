import "./locales/i18n";
import App from "./_app";
import { LanguageProvider } from "./components/languageProvide";
import { ThemeProvider } from "./components/themeSwitcher";

export default function Layout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <App></App>
      </LanguageProvider>
    </ThemeProvider>
  );
}
