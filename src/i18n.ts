// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations directly from src/locales
import enTranslation from "./locales/en/translation.json";
import hiTranslation from "./locales/hi/translation.json";
import mrTranslation from "./locales/mr/translation.json";

i18n
  .use(LanguageDetector) // 👈 auto-detects browser language or saved choice
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
      mr: { translation: mrTranslation },
    },
    fallbackLng: "en", // default if user’s language not found
    interpolation: {
      escapeValue: false, // react already escapes
    },
    detection: {
      order: ["localStorage", "navigator"], // first check localStorage, then browser language
      caches: ["localStorage"], // remember user’s choice
    },
  });

export default i18n;
