// src/pages/TermsConditions.tsx
import React from 'react';
import '../styles/pages/terms-conditions.css';
import { useTranslation } from "react-i18next";


const TermsConditions: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">{t("tc.title")}</h1>
        
        <div className="terms-section">
          <h2>1. {t("tc.lt.1.title")}</h2>
          <p>
            {t("tc.lt.1.p")}
          </p>
        </div>

        <div className="terms-section">
          <h2>2. {t("tc.lt.2.title")}</h2>
          <p>{t("tc.lt.2.p")}:</p>
          <ul>
            <li>
              <strong>"{t("tc.lt.2.lt.1.lt.0")}", {t("tc.lt.2.lt.1.lt.1")}", "{t("tc.lt.2.lt.1.lt.2")}"</strong> {t("tc.lt.2.lt.1.p")}
            </li>
            <li>
              <strong>"{t("tc.lt.2.lt.2.lt.0")}", "{t("tc.lt.2.lt.2.lt.1")}"</strong> {t("tc.lt.2.lt.2.p")}
            </li>
            <li>
              <strong>"{t("tc.lt.2.lt.3.lt.0")}", "{t("tc.lt.2.lt.3.lt.1")}", "{t("tc.lt.2.lt.3.lt.2")}"</strong> {t("tc.lt.2.lt.3.p")}
            </li>
            <li>
              <strong>"{t("tc.lt.2.lt.4.lt.0")}"</strong> {t("tc.lt.2.lt.4.p")}
            </li>
            <li>
              <strong>"Mummy DayCare"</strong> {t("tc.lt.2.lt.5.p")}
            </li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. {t("tc.lt.3.title")}</h2>
          <p>
            {t("tc.lt.3.p.0")}
          </p>
          <p>
            {t("tc.lt.3.p.1")}
          </p>
        </div>

        <div className="terms-section">
          <h2>4. {t("tc.lt.4.title")}</h2>
          <p>
            {t("tc.lt.4.p.0")}
          </p>
          <p>
            {t("tc.lt.4.p.1")}
          </p>
          <ul>
            <li>
              {t("tc.lt.4.lt.0")}
            </li>
            <li>
              {t("tc.lt.4.lt.1")}
            </li>
            <li>
              {t("tc.lt.4.lt.2")}
            </li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>5. {t("tc.lt.5.title")}</h2>
          <p>
            {t("tc.lt.5.p.0")}
          </p>
          <p>
            {t("tc.lt.5.p.1")}
          </p>
          <ul>
            <li>{t("tc.lt.5.lt.0")}</li>
            <li>{t("tc.lt.5.lt.1")}</li>
            <li>{t("tc.lt.5.lt.2")}</li>
            <li>{t("tc.lt.5.lt.3")}</li>
          </ul>
          <p>
            {t("tc.lt.5.p.2")}
          </p>
        </div>

        <div className="terms-section">
          <h2>6. {t("tc.lt.6.title")}</h2>
          <p>
            {t("tc.lt.6.p.0")}
          </p>
          <p>
            {t("tc.lt.6.p.1")}
          </p>
        </div>

        <div className="terms-section">
          <h2>7. {t("tc.lt.7.title")}</h2>
          <p>
            {t("tc.lt.7.p.0")}
          </p>
          <p>
          {t("tc.lt.7.p.1")}
          </p>
        </div>

        <div className="terms-section">
          <h2>8. {t("tc.lt.8.title")}</h2>
          <p>
            {t("tc.lt.8.p.0")}
          </p>
          <p>
            {t("tc.lt.8.p.1")}
          </p>
        </div>

        <div className="terms-section">
          <h2>9. {t("tc.lt.9.title")}</h2>
          <p>
            {t("tc.lt.9.p")}
          </p>
          <ul>
            <li>{t("tc.lt.9.lt.0")}</li>
            <li>{t("tc.lt.9.lt.1")}</li>
            <li>{t("tc.lt.9.lt.2")}</li>
            <li>{t("tc.lt.9.lt.3")}</li>
            <li>{t("tc.lt.9.lt.4")}</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>10. {t("tc.lt.10.title")}</h2>
          <p>
            {t("tc.lt.10.p")}
          </p>
        </div>

        <div className="terms-section">
          <h2>11. {t("tc.lt.11.title")}</h2>
          <p>
            {t("tc.lt.11.p")}
          </p>
        </div>

        <div className="terms-section">
          <h2>12. {t("tc.lt.12.title")}</h2>
          <p>
            {t("tc.lt.12.p")}
          </p>
        </div>

        <div className="terms-section">
          <h2>13. {t("tc.lt.13.title")}</h2>
          <p>
            {t("tc.lt.13.p")}
          </p>
          <div className="contact-details">
            <p><strong>Santiclinic</strong></p>
            <p>Praceta Agostinho Ferreira Chaves 5,</p>
            <p>Lj 4AA,8005-328 Faro, Portugal</p>
            <p>Email: <a href="mailto:info@santiclinic.pt">geral@santiclinic.eu</a></p>
            <p>Telefone: +351 915 007 427</p>
          </div>
        </div>

        <div className="terms-footer">
          <p>{t("tc.last_update")}</p>
          <a href="/" className="back-button">{t("tc.btn")}</a>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;