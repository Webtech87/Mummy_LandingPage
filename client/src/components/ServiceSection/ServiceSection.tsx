import React, { useState, useEffect } from 'react';
import '../../styles/components/service-section.css';

interface ServiceBoxProps {
  title: string;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({ title }) => {
  return (
    <div className="service-box">
      {title}
    </div>
  );
};

const ServiceSection: React.FC = () => {
  const [days, setDays] = useState(9);
  const [hours, setHours] = useState(15);
  const [minutes, setMinutes] = useState(42);
  const [seconds, setSeconds] = useState(9);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setSeconds(59);
        if (minutes > 0) {
          setMinutes(minutes - 1);
        } else {
          setMinutes(59);
          if (hours > 0) {
            setHours(hours - 1);
          } else {
            setHours(23);
            if (days > 0) {
              setDays(days - 1);
            } else {
              clearInterval(timer);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds]);

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
          Criámos o protocolo <span className="highlight">MUMMY DAY CARE</span>, para celebrar todas as 
          mães com cuidado, descanso e beleza.
        </p>

        <h3 className="service-subtitle">
          Tudo o que está incluído no 
          <span className="quote-marks">"Mummy Day Care"</span>
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
            <p>Valor especial: <span className="price">899€</span></p>
            <p className="limited-time">Somente até 5 de maio</p>
          </div>

          <div className="countdown">
            <div className="timer-item">
              <span className="timer-number">{days.toString().padStart(2, '0')}</span>
              <span className="timer-label">Dias</span>
            </div>
            <div className="timer-item">
              <span className="timer-number">{hours.toString().padStart(2, '0')}</span>
              <span className="timer-label">Horas</span>
            </div>
            <div className="timer-item">
              <span className="timer-number">{minutes.toString().padStart(2, '0')}</span>
              <span className="timer-label">Min</span>
            </div>
            <div className="timer-item">
              <span className="timer-number">{seconds.toString().padStart(2, '0')}</span>
              <span className="timer-label">Seg</span>
            </div>
          </div>

          <div className="attention-section">
            <p className="attention">Atenção!</p>
            <p className="promo-dates">De 0 à 12 de Maio</p>
            <p className="promo-price">989€</p>
          </div>

          <button className="buy-button">QUERO COMPRAR AGORA</button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;