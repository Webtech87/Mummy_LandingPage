// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './router/routes';
import ScrollToTop from './components/ScrollToTop';
import FadeIn from './components/FadeIn';

import './styles/global.css';

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean | null>(
    localStorage.getItem('cookieConsent') === 'accepted'
  );

  const handleCookieAccept = () => {
    setCookiesAccepted(true);
    // Here you could initialize analytics or other cookie-dependent services
    console.log('Cookies accepted');
  };

  const handleCookieDecline = () => {
    setCookiesAccepted(false);
    // Here you could disable any cookie-dependent features
    console.log('Cookies declined');
  };

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