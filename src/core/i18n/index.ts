import i18n, { use as i18nextUse } from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import en from "./locales/en.json";
import ta from "./locales/ta.json";

const resources = {
  en: { translation: en },
  ta: { translation: ta },
};

const deviceLanguage = getLocales()[0]?.languageCode ?? "en";

i18nextUse(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
