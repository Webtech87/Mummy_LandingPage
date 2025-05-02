import React, { useState, useEffect } from 'react';
import '../../styles/components/CookieConsent/CookieConsent.css';
import { Check, X } from 'lucide-react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice about cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    // If no choice has been made yet, show the popup
    if (!cookieConsent) {
      // Add a slight delay to show the popup for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    onDecline();
  };

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-container">
        <div className="cookie-consent-header">
          <h3>🍪 Utilizamos cookies!</h3>
          <button className="cookie-expand-button" onClick={toggleDetails}>
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </button>
        </div>
        
        <div className="cookie-consent-content">
          <p>
            Utilizamos cookies e outras tecnologias semelhantes para melhorar a sua experiência no nosso site,
            personalizar publicidade e recomendar conteúdo do seu interesse.
          </p>
          
          {isExpanded && (
            <div className="cookie-details">
              <p>
                Ao continuar navegando, você concorda com a nossa{' '}
                <a href="/politica-privacidade" className="privacy-link">Política de Privacidade</a>.
              </p>
              <ul className="cookie-types">
                <li>
                  <strong>Cookies essenciais:</strong> Necessários para o funcionamento do site
                </li>
                <li>
                  <strong>Cookies analíticos:</strong> Nos ajudam a entender como você usa o site
                </li>
                <li>
                  <strong>Cookies de marketing:</strong> Permitem oferecer conteúdo personalizado
                </li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="cookie-consent-actions">
          <button 
            className="cookie-button secondary" 
            onClick={handleDecline}
          >
            <X size={16} />
            <span>Recusar</span>
          </button>
          <button 
            className="cookie-button primary" 
            onClick={handleAccept}
          >
            <Check size={16} />
            <span>Aceitar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
