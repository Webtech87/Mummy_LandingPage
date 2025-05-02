import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../../styles/components/payment-canceled.css";

const PaymentCanceled = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Certifique-se de que o idioma português seja usado como padrão se nenhum idioma estiver definido
    if (i18n.language !== 'pt' && i18n.language !== 'en') {
      i18n.changeLanguage('pt');
    }
    
    // Verifique se há um idioma salvo no localStorage
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  
  return (
    <div className="payment-canceled-container">
      <div className="payment-canceled-card">
        <div className="payment-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 9L9 15" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9L15 15" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="payment-title">{t('Pagamento Cancelado') || 'Pagamento Cancelado'}</h1>
        
        <p className="payment-message">
          {t('O seu pagamento foi cancelado. Não se preocupe, nenhum valor foi cobrado.') || 
           'O seu pagamento foi cancelado. Não se preocupe, nenhum valor foi cobrado.'}
        </p>
        
        <div className="payment-options">
          <button 
            className="primary-button"
            onClick={() => navigate('/')}
          >
            {t('Voltar para página inicial') || 'Voltar para página inicial'}
          </button>
          
          <button 
            className="secondary-button"
            onClick={() => window.location.href = 'http://localhost:8000/api/v1/payment/process/'}
          >
            {t('Tentar novamente') || 'Tentar novamente'}
          </button>
        </div>
        
        <div className="payment-help">
          <p>
            {t('Precisa de ajuda? Entre em contato conosco:') || 
             'Precisa de ajuda? Entre em contato conosco:'}
          </p>
          <a href="mailto:geral@santiclinic.eu" className="contact-link">
            geral@santiclinic.eu
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;