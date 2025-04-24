import { useEffect, useState } from "react";
import "../../styles/components/hero.css";

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
  const endDate = new Date(2024, 4, 5, 23, 59, 59);
  const [time, setTime] = useState(() => getTimeLeft(endDate));
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
    const interval = setInterval(() => setTime(getTimeLeft(endDate)), 1000);
    return () => clearInterval(interval);
  }, []);

  function handleBuy() {
    toast({
      title: "Reserva Recebida! 🎉",
      description: "Obrigado pelo seu interesse no Mummy Day Care! Nossa equipe entrará em contato em breve para finalizar sua reserva com o preço especial.",
      duration: 5000,
    });
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
              <span className="offer-price-value">899€</span>
            </div>

            <p className="offer-deadline">Oferta válida até 5 de maio</p>

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
              <p className="warning-title">Atenção: Prazo Limitado!</p>
              <p className="warning-period">Após 5 de maio até 12 de maio</p>
              <span className="regular-price">999€</span>
            </div>

            <button
              className="cta-button"
              onClick={handleBuy}
              aria-label="Reservar agora o Mummy Day Care com desconto especial"
              type="button"
            >
              RESERVAR AGORA COM DESCONTO
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}