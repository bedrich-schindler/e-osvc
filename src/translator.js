import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations';

const translator = i18n;

translator
  .use(initReactI18next)
  .init({
    fallbackLng: 'cs',
    lng: 'cs',
    resources: translations,
  });

export default translator;
