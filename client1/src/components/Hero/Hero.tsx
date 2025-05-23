import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/hero.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { CircleDollarSign } from "lucide-react";

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

export default function Hero() {
  const navigate = useNavigate();
  const [targetInfo, setTargetInfo] = useState(getTargetDate);
  const [time, setTime] = useState(() => getTimeLeft(targetInfo.date));
  const [isMobile, setIsMobile] = useState(false);
  const [serverPriceInfo, setServerPriceInfo] = useState<PriceInfo | null>(null);
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
    }
  }, [navigate]);

  // Fetch price info from the backend
  useEffect(() => {
    const fetchPriceInfo = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/payment/api/current-price/');
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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetInfo]);

  function handleBuy() {
    // Salvar um item no localStorage para indicar que o usuário iniciou o processo de pagamento
    localStorage.setItem('paymentStarted', 'true');
    
    // Redirect to the payment processing URL
    window.location.href = 'http://localhost:8000/api/v1/payment/api/process/';
  }

  // Use server prices if available, otherwise use local calculations
  const currentPrice = serverPriceInfo?.current_price || (targetInfo.isFirstPhase ? "899€" : "999€");
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

  return (
    <section className="hero-section" aria-labelledby="main-heading">
      <div className="hero-container">
        <div className="hero-image-container" aria-hidden="true">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/380c33a12cdaf3b40271534b0fb8f30ed980e6e9?placeholderIfAbsent=true"
            alt="Mãe e filho felizes no Mummy Day Care"
            className="hero-image"
            loading="eager"
          />
          <div className="hero-overlay">
            <div className="hero-text-content" tabIndex={0}>
              <h2 className="hero-subtitle">
                {t("top_img.h2.0")}?
              </h2>
              <h1 id="main-heading" className="hero-title">
                Mummy DayCare
              </h1>
              <h3 className="hero-tagline">
                {t("top_img.h3")}
              </h3>
            </div>
          </div>
        </div>

        <aside className="hero-cta-container" aria-label="Oferta especial do Mummy Day Care">
          <h2 className="hero-cta-heading">
            {t("top_img.h2.1")}
          </h2>

          <div className="offer-card" role="region" aria-label="Oferta especial">
            <div className="offer-header">
              <span className="offer-title">{t("top_ptomotion.title")}</span>
            </div>

            <div className="offer-price-container" aria-label="Preço promocional">
              <span className="offer-price-label">{t("top_ptomotion.prom_price")}:</span>
              <span className="offer-price-value">
                {currentPrice}
              </span>
              <span className="offer-price-savings">{t("save")} {calculateSavings()}!</span>
            </div>

            <p className="offer-deadline">
              {isFirstPhase 
                ? t("top_ptomotion.validation.0")
                : t("top_ptomotion.validation.1")}
            </p>

            <div className="countdown-timer" aria-live="polite" aria-label="Contagem regressiva até o fim da oferta">
              <div className="timer-segment">
                <span className="timer-number">{time.days}</span>
                <span className="timer-label">{t("top_ptomotion.cont_down.days")}</span>
              </div>
              <div className="timer-segment">
                <span className="timer-number">{time.hours}</span>
                <span className="timer-label">{t("top_ptomotion.cont_down.hours")}</span>
              </div>
              <div className="timer-segment">
                <span className="timer-number">{time.minutes}</span>
                <span className="timer-label">Min</span>
              </div>
              <div className="timer-segment">
                <span className="timer-number">{time.seconds}</span>
                <span className="timer-label">Seg</span>
              </div>
            </div>

            <div className="offer-warning" aria-live="polite">
              {isFirstPhase ? (
                <>
                  <p className="warning-title">{t('top_ptomotion.atention.0.0')}</p>
                  <p className="warning-period">{t("top_ptomotion.atention.0.1")}</p>
                  <span className="regular-price">{nextPrice}</span>
                </>
              ) : (
                <>
                  <p className="warning-title">{t("top_ptomotion.atention.1.0")}</p>
                  <p className="warning-period">{t("top_ptomotion.atention.1.1")}</p>
                  <span className="regular-price">{nextPrice}</span>
                </>
              )}
            </div>

            <button
              className="cta-button"
              onClick={handleBuy}
              aria-label="Reservar agora o Mummy Day Care com desconto especial"
              type="button"
            >
              {isFirstPhase 
                ? t("top_ptomotion.button.0")
                : t("top_ptomotion.button.1")}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}