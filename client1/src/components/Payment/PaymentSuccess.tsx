import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../../styles/components/payment-success.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Ensure Portuguese is used as default if no language is defined
    if (i18n.language !== 'pt' && i18n.language !== 'en') {
      i18n.changeLanguage('pt');
    }
    
    // Check if there's a language saved in localStorage
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  
  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="payment-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="payment-title">{t('payment.success.h1')}</h1>
        
        <p className="payment-message">
          {t('payment.success.p')}
        </p>
        
        <div className="payment-options">
          <button 
            className="primary-button"
            onClick={() => navigate('/')}
          >
            {t('payment.top_button')}
          </button>
        </div>
        
        <div className="payment-help">
          <p>
            {t('payment.contact_us')}
          </p>
          <a href="mailto:geral@santiclinic.eu" className="contact-link">
            geral@santiclinic.eu
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;