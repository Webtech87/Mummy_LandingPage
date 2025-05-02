// src/i18n.js
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Configuração do i18next com foco na persistência
i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: localStorage.getItem("i18nextLng") || "pt", // Use o idioma salvo ou padrão
        fallbackLng: "pt",
        supportedLngs: ["en", "pt"],
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}/translation.json",
        },
        detection: {
            order: ["localStorage", "navigator"],
            lookupLocalStorage: "i18nextLng",
            caches: ["localStorage"],
        },
    });

// Função personalizada para garantir persistência do idioma
export const changeLanguage = (lang) => {
    localStorage.setItem("i18nextLng", lang);
    return i18n.changeLanguage(lang);
};

export default i18n;