import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {};

const files = import.meta.globEager('./locales/*.json');

for (const key in files) {
  const filename = key.replace(/(\.\/locales\/|\.(json))/g, '');
  resources[filename] = {
    translation: JSON.parse(JSON.stringify(files[key])),
  };
}

i18n
  .use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({
    // 初始化
    resources, // 本地多语言数据
    lng: localStorage.getItem('locale')||'en',
    fallbackLng: 'en',
  });

export default i18n;
