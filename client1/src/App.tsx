// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './router/routes';
import ScrollToTop from './components/ScrollToTop';
import FadeIn from './components/FadeIn';
import { useTranslation } from 'react-i18next';

import './styles/global.css';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Verifica e aplica o idioma salvo no localStorage ao iniciar a aplicação
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <FadeIn duration={1500} delay={300}>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </FadeIn>
    </BrowserRouter>
  );
}

export default App;