import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from 'locales/en.json'
import translationPL from 'locales/pl.json'

i18n.languages = ['pl', 'en']

const resources = {
  en: {
    translations: translationEN,
  },
  pl: {
    translations: translationPL,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
  },
  react: {
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  },
})

export default i18n
