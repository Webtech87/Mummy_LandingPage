import React, { useState, useEffect } from 'react';
import '../../styles/components/service-section.css';

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
  const [targetInfo, setTargetInfo] = useState(getTargetDate);
  const [time, setTime] = useState(() => getTimeLeft(targetInfo.date));
  const [serverPriceInfo, setServerPriceInfo] = useState<PriceInfo | null>(null);
  const [animateSeconds, setAnimateSeconds] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch price info from the backend
  useEffect(() => {
    const fetchPriceInfo = async () => {
      try {
        const response = await fetch('https://mummy-landingpage.onrender.com/api/v1/payment/api/current-price/');
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
    setIsLoading(true);
    
    // Simulate a short delay before redirecting (to show loading effect)
    setTimeout(() => {
      window.location.href = 'https://mummy-landingpage.onrender.com/api/v1/payment/process/';
    }, 1500);
  };

  // Use server prices if available, otherwise use local calculations
  const currentPrice = serverPriceInfo?.current_price || (targetInfo.isFirstPhase ? "899€" : "989€");
  const nextPrice = serverPriceInfo?.next_price || (targetInfo.isFirstPhase ? "989€" : "1099€");
  const isFirstPhase = serverPriceInfo?.is_first_phase !== undefined 
    ? serverPriceInfo.is_first_phase 
    : targetInfo.isFirstPhase;

  return (
    <section className="service-section">
      <div className="service-container">
        <h2 className="service-title">8 Tratamentos em Um Único Dia</h2>
        
        <p className="service-description">
          Ser mulher já é extraordinário. Ser mãe, então, é divino. As mães 
          cuidam, amam, equilibram o mundo. E muitas vezes, esquecem-se 
          de si próprias.
        </p>
        
        <p className="service-description">
          Na <span className="clinic-name">SANTICLINIC</span>, queremos inverter esse papel nem que seja por 
          um dia ou por uma semana.
        </p>
        
        <p className="service-description">
          Criámos o protocolo <span className="highlight">MUMMY DAYCARE</span>, para celebrar todas as 
          mães com cuidado, descanso e beleza.
        </p>

        <h3 className="service-subtitle">
          Tudo o que está incluído no 
          <span className="quote-marks">"Mummy DayCare"</span>
        </h3>

        <div className="service-grid">
          <ServiceBox title="Laser CO2 Resurfacing facial" />
          <ServiceBox title="Mesoterapia Capilar" />
          <ServiceBox title="Limpeza de Pele Profunda" />
          <ServiceBox title="Peeling de Diamante" />
          <ServiceBox title="Skin Booster" />
          <ServiceBox title="Botox" />
          <ServiceBox title="Massagem de relaxamento" />
          <ServiceBox title="Radiofrequência Corporal" />
        </div>

        <div className="offer-card">
          <div className="offer-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#A38200"/>
            </svg>
            <span>Vagas limitadas</span>
          </div>

          <div className="special-price">
            <p>Valor especial: <span className="price">
              {currentPrice}
            </span></p>
            <p className="limited-time">
              {isFirstPhase 
                ? "Somente até 5 de maio" 
                : "Somente até 12 de maio"}
            </p>
          </div>

          <div className="countdown-container">
            <div className="countdown-header">
              <div className="countdown-title">A oferta expira em:</div>
              <div className="countdown-line"></div>
            </div>
            
            <div className="countdown">
              <div className="timer-item">
                <div className="timer-number-container">
                  <span className="timer-number">{time.days}</span>
                </div>
                <span className="timer-label">Dias</span>
              </div>
              <div className="timer-separator">:</div>
              <div className="timer-item">
                <div className="timer-number-container">
                  <span className="timer-number">{time.hours}</span>
                </div>
                <span className="timer-label">Horas</span>
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
                  <span className="ribbon-text">Oferta Especial</span>
                </div>
                <p className="attention">Atenção!</p>
                <p className="promo-dates">De 6 à 12 de Maio</p>
                <p className="promo-price">{nextPrice}</p>
              </>
            ) : (
              <>
                <div className="ribbon">
                  <span className="ribbon-text">Última Chance</span>
                </div>
                <p className="attention">Última Oportunidade!</p>
                <p className="promo-dates">Promoção encerra em 12 de Maio</p>
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
                ? "QUERO COMPRAR AGORA" 
                : "APROVEITAR ÚLTIMA OFERTA"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;