// src/router/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import PrivacyPolicy from '../components/PrivacyPolicy';
import TermsConditions from '../pages/TermsConditions';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
      <Route path="/termos-condicoes" element={<TermsConditions />} />
    </Routes>
  );
};

export default AppRoutes;