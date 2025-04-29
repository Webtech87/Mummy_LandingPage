// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './router/routes';
import ScrollToTop from './components/ScrollToTop';
import FadeIn from './components/FadeIn';

import './styles/global.css';

function App() {
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