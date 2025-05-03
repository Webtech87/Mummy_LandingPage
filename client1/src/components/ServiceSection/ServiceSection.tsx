
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/service-section.css';
import { useTranslation } from 'react-i18next';
import { CircleDollarSign } from 'lucide-react';

interface ServiceBoxProps {
  title: string;
}

// Interface for the price information from the backend
interface PriceInfo {
  current_price: string;
  next_price: string | null;
  promo_type: string;
  next_deadline: string | null;
  days_remaining: number;
  is_first_phase: boolean;
  is_second_phase: boolean;
  is_regular_price: boolean;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({ title }) => {
  return (
    <div className="service-box">
      {title}
    </div>
  );
};

function getTargetDate() {
  const now = new Date();
  const firstDeadline = new Date(2025, 4, 5, 23, 59, 59); // May 5, 2025
  const secondDeadline = new Date(2025, 4, 12, 23, 59, 59); // May 12, 2025
  
  // If current date is before May 5, target May 5
  if (now < firstDeadline) {
    return {
      date: firstDeadline,
      isFirstPhase: true
    };
  } 
  // If current date is after May 5 but before May 12, target May 12
  else if (now < secondDeadline) {
    return {
      date: secondDeadline,
      isFirstPhase: false
    };
  } 
  // If both deadlines have passed
  else {
    return {
      date: secondDeadline, // Return the second deadline, timer will show zeros
      isFirstPhase: false
    };
  }
}

function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }
  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  return { days, hours, minutes, seconds };
}

const ServiceSection: React.FC = () => {
  const navigate = useNavigate();
  const [targetInfo, setTargetInfo] = useState(getTargetDate);
  const [time, setTime] = useState(() => getTimeLeft(targetInfo.date));
  const [serverPriceInfo, setServerPriceInfo] = useState<PriceInfo | null>(null);
  const [animateSeconds, setAnimateSeconds] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  
  // Verificar se o usuário está retornando de um pagamento
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('status');
    
    if (paymentStatus === 'canceled' && localStorage.getItem('paymentStarted')) {
      // Limpar o estado de pagamento
      localStorage.removeItem('paymentStarted');
      
      // Redirecionar para a página de pagamento cancelado
      navigate('/payment-canceled');
    } else if (paymentStatus === 'success' && localStorage.getItem('paymentStarted')) {
      // Limpar o estado de pagamento
      localStorage.removeItem('paymentStarted');
      
      // Redirecionar para a página de pagamento bem-sucedido
      navigate('/payment-success');
    }
  }, [navigate]);

  // Fetch price info from the backend
  useEffect(() => {
    const fetchPriceInfo = async () => {
      try {
        const response = await fetch('https://mummy-landingpage.onrender.com/api/v1/payment/current-price/');
        if (response.ok) {
          const data = await response.json();
          setServerPriceInfo(data);
          
          // If we have server data, update our phase information
          if (data.is_first_phase !== undefined) {
            setTargetInfo(prevInfo => ({
              ...prevInfo,
              isFirstPhase: data.is_first_phase
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching price info:', error);
      }
    };
    
    fetchPriceInfo();
    
    // Refresh price info every minute to stay in sync with server
    const priceInterval = setInterval(fetchPriceInfo, 60000);
    return () => clearInterval(priceInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Check if we need to update the target date
      const newTargetInfo = getTargetDate();
      
      // If the phase changed (from first to second deadline)
      if (newTargetInfo.isFirstPhase !== targetInfo.isFirstPhase) {
        setTargetInfo(newTargetInfo);
      }
      
      // Update the countdown
      setTime(getTimeLeft(newTargetInfo.date));
      
      // Add pulse animation to seconds
      setAnimateSeconds(true);
      setTimeout(() => setAnimateSeconds(false), 500);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetInfo]);

  // Handle the buy button click - redirect to payment processing
  const handleBuy = () => {
    // Salvar um item no localStorage para indicar que o usuário iniciou o processo de pagamento
    localStorage.setItem('paymentStarted', 'true');
    
    setIsLoading(true);
    
    // Simulate a short delay before redirecting (to show loading effect)
    setTimeout(() => {
      window.location.href = 'https://mummy-landingpage.onrender.com/api/v1/payment/process/';
    }, 1500);
  };

  // Use server prices if available, otherwise use local calculations
  const currentPrice = serverPriceInfo?.current_price || (targetInfo.isFirstPhase ? "899€" : "989€");
  const nextPrice = serverPriceInfo?.next_price || (targetInfo.isFirstPhase ? "999€" : "1099€");
  const isFirstPhase = serverPriceInfo?.is_first_phase !== undefined 
    ? serverPriceInfo.is_first_phase 
    : targetInfo.isFirstPhase;

  // Calculate savings amount (for display purposes)
  const calculateSavings = () => {
    // Remove currency symbol and extract numbers
    const currentPriceValue = parseInt(currentPrice.replace(/[^0-9]/g, ''));
    const nextPriceValue = parseInt(nextPrice.replace(/[^0-9]/g, ''));
    const savings = nextPriceValue - currentPriceValue;
    return `${savings}€`;
  };

  const savingsAmount = calculateSavings();
  const savingsText = `- ${savingsAmount}`;

  return (
    <section className="service-section">
      <div className="service-container">
        <h2 className="service-title">{t("description_8_in_1.title")}</h2>
        
        <p className="service-description">
          {t("description_8_in_1.p.0")}
        </p>
        
        <p className="service-description">
          {t("description_8_in_1.p.1.0")}<span className="clinic-name"> SANTICLINIC </span>, {t("description_8_in_1.p.1.1")}
        </p>
        
        <p className="service-description">
          {t("description_8_in_1.p.2.0")} <span className="highlight"> MUMMY DAYCARE </span>, {t("description_8_in_1.p.2.1")}
        </p>

        <h3 className="service-subtitle">
          {t("description_8_in_1.pacage_desc.title")}
          <span className="quote-marks">"Mummy DayCare"</span>
        </h3>

        <div className="service-grid">
          <ServiceBox title={t("description_8_in_1.pacage_desc.procedures.0")} />
          <ServiceBox title={t("description_8_in_1.pacage_desc.procedures.1")} />
          <ServiceBox title={t("description_8_in_1.pacage_desc.procedures.2")} />
          <ServiceBox title={t("description_8_in_1.pacage_desc.procedures.3")} />
          <ServiceBox title={t("description_8_in_1.pacage_desc.procedures.4")} />
          <ServiceBox title={t("description_8_in_1.pacage_desc.procedures.5")} />
          <ServiceBox title={t("description_8_in_1.pacage_desc.procedures.6")} />
          <ServiceBox title={t("description_8_in_1.pacage_desc.procedures.7")} />
        </div>

        <div className="offer-card">
          <div className="limited-spots-banner">
            <span>{t("bot_ptomotion.p")}</span>
          </div>

          <div className="special-price" data-savings={savingsText}>
            <p>
              <CircleDollarSign className="price-icon" size={24} />
              {t("bot_ptomotion.price_esp")}: 
              <span className="price">{currentPrice}</span>
            </p>
            <p className="limited-time">
              {isFirstPhase 
                ? t("bot_ptomotion.validation.0")
                : t("bot_ptomotion.validation.1")}
            </p>
          </div>

          <div className="countdown-container">
            <div className="countdown-header">
              <div className="countdown-title">{t("bot_ptomotion.contdwn")}</div>
              <div className="countdown-line"></div>
            </div>
            
            <div className="countdown">
              <div className="timer-item">
                <div className="timer-number-container">
                  <span className="timer-number">{time.days}</span>
                </div>
                <span className="timer-label">{t("top_ptomotion.cont_down.days")}</span>
              </div>
              <div className="timer-separator">:</div>
              <div className="timer-item">
                <div className="timer-number-container">
                  <span className="timer-number">{time.hours}</span>
                </div>
                <span className="timer-label">{t("top_ptomotion.cont_down.hours")}</span>
              </div>
              <div className="timer-separator">:</div>
              <div className="timer-item">
                <div className="timer-number-container">
                  <span className="timer-number">{time.minutes}</span>
                </div>
                <span className="timer-label">Min</span>
              </div>
              <div className="timer-separator">:</div>
              <div className="timer-item">
                <div className={`timer-number-container ${animateSeconds ? 'pulse' : ''}`}>
                  <span className="timer-number">{time.seconds}</span>
                </div>
                <span className="timer-label">Seg</span>
              </div>
            </div>
          </div>

          <div className="attention-section">
            {isFirstPhase ? (
              <>
                <div className="ribbon">
                  <span className="ribbon-text">{t("bot_ptomotion.atention.header.0")}</span>
                </div>
                <p className="attention">{t("bot_ptomotion.atention.title.0")}!</p>
                <p className="promo-dates">{t("bot_ptomotion.atention.p.0")}</p>
                <p className="promo-price">{nextPrice}</p>
              </>
            ) : (
              <>
                <div className="ribbon">
                  <span className="ribbon-text">{t("bot_ptomotion.atention.header.1")}</span>
                </div>
                <p className="attention">{t("bot_ptomotion.atention.title.1")}!</p>
                <p className="promo-dates">{t("bot_ptomotion.atention.p.1")}</p>
                <p className="promo-price">{nextPrice}</p>
              </>
            )}
          </div>

          <button 
            className={`buy-button ${isLoading ? 'loading' : ''}`}
            onClick={handleBuy}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="button-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            ) : (
              isFirstPhase 
                ? t("bot_ptomotion.buy.0")
                : t("bot_ptomotion.buy.1")
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
