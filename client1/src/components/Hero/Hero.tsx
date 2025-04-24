import { useEffect, useState } from "react";
import "../../styles/components/hero.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [targetInfo, setTargetInfo] = useState(getTargetDate);
  const [time, setTime] = useState(() => getTimeLeft(targetInfo.date));
  const [isMobile, setIsMobile] = useState(false);

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
    toast("Reserva Recebida! 🎉 Obrigado pelo seu interesse no Mummy Day Care! Nossa equipe entrará em contato em breve para finalizar sua reserva com o preço especial.");
  }

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
                Queres ser a primeira a usufruir dos novos serviços da Santiclinic?
              </h2>
              <h1 id="main-heading" className="hero-title">
                Mummy Day Care
              </h1>
              <h3 className="hero-tagline">
                O presente perfeito para o Dia das Mães
              </h3>
            </div>
          </div>
        </div>

        <aside className="hero-cta-container" aria-label="Oferta especial do Mummy Day Care">
          <h2 className="hero-cta-heading">
            Garanta Seu Mummy Day Care com Oferta Especial!
          </h2>

          <div className="offer-card" role="region" aria-label="Oferta especial">
            <div className="offer-header">
              <span className="offer-title">Promoção Exclusiva</span>
            </div>

            <div className="offer-price-container">
              <span className="offer-price-label">Valor Promocional:</span>
              <span className="offer-price-value">
                {targetInfo.isFirstPhase ? "899€" : "999€"}
              </span>
            </div>

            <p className="offer-deadline">
              {targetInfo.isFirstPhase 
                ? "Oferta válida até 5 de maio" 
                : "Oferta válida até 12 de maio"}
            </p>

            <div className="countdown-timer" aria-live="polite" aria-label="Contagem regressiva até o fim da oferta">
              <div className="timer-segment">
                <span className="timer-number">{time.days}</span>
                <span className="timer-label">Dias</span>
              </div>
              <div className="timer-segment">
                <span className="timer-number">{time.hours}</span>
                <span className="timer-label">Horas</span>
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
              {targetInfo.isFirstPhase ? (
                <>
                  <p className="warning-title">Atenção: Prazo Limitado!</p>
                  <p className="warning-period">Após 5 de maio até 12 de maio</p>
                  <span className="regular-price">999€</span>
                </>
              ) : (
                <>
                  <p className="warning-title">Última Oportunidade!</p>
                  <p className="warning-period">Promoção encerra em 12 de maio</p>
                  <span className="regular-price">1099€</span>
                </>
              )}
            </div>

            <button
              className="cta-button"
              onClick={handleBuy}
              aria-label="Reservar agora o Mummy Day Care com desconto especial"
              type="button"
            >
              {targetInfo.isFirstPhase 
                ? "RESERVAR AGORA COM DESCONTO ESPECIAL" 
                : "RESERVAR COM DESCONTO LIMITADO"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}