import { createContext, useEffect, useState, useContext } from "react";
import i18n from "../locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext({
  language: "en",
  setLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }: any) => {
  const [language, setLang] = useState("en");

  useEffect(() => {
    AsyncStorage.getItem("app-language").then((lang) => {
      if (lang) {
        i18n.changeLanguage(lang);
        setLang(lang);
      }
    });
  }, []);

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem("app-language", lang);
    setLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
