import React, { useState, useEffect } from 'react';
import '../../styles/components/CookieConsent/CookieConsent.css';
import { Check, X } from 'lucide-react';
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (

    <div className="cookie-consent-overlay">
      <div className="cookie-consent-container">
        <div className="cookie-consent-header">
          <h3>🍪 {t("cookies.title")}!</h3>
          <button className="cookie-expand-button" onClick={toggleDetails}>
            {isExpanded ? t("cookies.top_btn.less") : t("cookies.top_btn.more")}
          </button>
        </div>
        
        <div className="cookie-consent-content">
          <p>
            {t("cookies.p")}
          </p>
          
          {isExpanded && (
            <div className="cookie-details">
              <p>
                {t("cookies.lt.p.text")}{' '}
                <a href="/politica-privacidade" className="privacy-link">{t("cookies.lt.p.link")}</a>.
              </p>
              <ul className="cookie-types">
                <li>
                  <strong>{t("cookies.lt.1.bold")}:</strong> {t("cookies.lt.1.p")}
                </li>
                <li>
                  <strong>{t("cookies.lt.2.bold")}:</strong> {t("cookies.lt.2.p")}
                </li>
                <li>
                  <strong>{t("cookies.lt.3.bold")}:</strong> {t("cookies.lt.3.p")}
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
            <span>{t("cookies.btn.reject")}</span>
          </button>
          <button 
            className="cookie-button primary" 
            onClick={handleAccept}
          >
            <Check size={16} />
            <span>{t("cookies.btn.accept")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
