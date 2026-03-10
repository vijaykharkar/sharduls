import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Language definitions with metadata
export const languages = {
  en: {
    name: 'English',
    dir: 'ltr',
    country: 'gb'
  },
  fr: {
    name: 'Français',
    dir: 'ltr',
    country: 'fr'
  },
  es: {
    name: 'Español',
    dir: 'ltr',
    country: 'es'
  },
  it: {
    name: 'Italiano',
    dir: 'ltr',
    country: 'it'
  },
  'fr-CA': {
    name: 'Français (Canada)',
    dir: 'ltr',
    country: 'ca'
  },
  'es-MX': {
    name: 'Español (México)',
    dir: 'ltr',
    country: 'mx'
  },
  ar: {
    name: 'العربية',
    dir: 'rtl',
    country: 'sa'
  },
  'en-ZA': {
    name: 'English (South Africa)',
    dir: 'ltr',
    country: 'za'
  },
  nl: {
    name: 'Nederlands',
    dir: 'ltr',
    country: 'nl'
  },
  sv: {
    name: 'Svenska',
    dir: 'ltr',
    country: 'se'
  },
  pl: {
    name: 'Polski',
    dir: 'ltr',
    country: 'pl'
  },
  da: {
    name: 'Dansk',
    dir: 'ltr',
    country: 'dk'
  },
  ro: {
    name: 'Română',
    dir: 'ltr',
    country: 'ro'
  },
  lt: {
    name: 'Lietuvių',
    dir: 'ltr',
    country: 'lt'
  },
  ko: {
    name: '한국어',
    dir: 'ltr',
    country: 'kr'
  },
  fi: {
    name: 'Suomi',
    dir: 'ltr',
    country: 'fi'
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },

    // Backend configuration for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Supported languages
    supportedLngs: Object.keys(languages),
  });

// Helper function to set HTML dir attribute for RTL support
export const setLanguageDirection = (lng) => {
  const dir = languages[lng]?.dir || 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
};

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  setLanguageDirection(lng);
});

export default i18n;
