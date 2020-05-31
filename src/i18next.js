import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from './locales/en.json'
import translationPL from './locales/pl.json'

i18n.languages = ['pl', 'en']

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: translationEN,
    },
    pt: {
      translations: translationPL,
    },
  },
  lng: 'pl',
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
