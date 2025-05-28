import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";
import zh from "./zh.json";
import es from "./es.json";
import pt from "./pt.json";
import ua from "./ua.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    es: { translation: es },
    pt: { translation: pt },
    zh: { translation: zh },
    ua: { translation: ua },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
