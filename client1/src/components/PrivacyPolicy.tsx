// src/pages/PrivacyPolicy.tsx
import React from 'react';
import '../styles/components/privacy-policy.css';
import {useTranslation} from "react-i18next";

const PrivacyPolicy: React.FC = () => {
    const {t} = useTranslation();


    return (
        <div className="privacy-policy-container">
            <div className="privacy-policy-content">
                <h1 className="privacy-policy-title">{t("pp.title")}</h1>

                <div className="privacy-policy-section">
                    <h2>1. {t("pp.lt.1.title")}</h2>
                    <p>
                        {t("pp.lt.1.p.0")}
                    </p>
                    <p>
                        {t("pp.lt.1.p.1")}          </p>
                </div>

                <div className="privacy-policy-section">
                    <h2>2. {t("pp.lt.2.title")}</h2>
                    <p>{t("pp.lt.2.p")}:</p>
                    <ul>
                        <li>
                            <strong>{t("pp.lt.2.lt.1.title")}:</strong> {t("pp.lt.2.lt.1.p")}
                        </li>
                        <li>
                            <strong>{t("pp.lt.2.lt.2.title")}:</strong> {t("pp.lt.2.lt.2.p")}
                        </li>
                        <li>
                            <strong>{t("pp.lt.2.lt.3.title")}:</strong> {t("pp.lt.2.lt.3.p")}
                        </li>
                        <li>
                            <strong>{t("pp.lt.2.lt.4.title")}:</strong> {t("pp.lt.2.lt.4.p")}
                        </li>
                        <li>
                            <strong>{t("pp.lt.2.lt.5.title")}:</strong> {t("pp.lt.2.lt.5.p")}
                        </li>
                    </ul>
                </div>

                <div className="privacy-policy-section">
                    <h2>3. {t("pp.lt.3.title")}</h2>
                    <p>{t("pp.lt.3.p")}:</p>
                    <ul>
                        <li>{t("pp.lt.3.lt.0")}</li>
                        <li>{t("pp.lt.3.lt.1")}</li>
                        <li>{t("pp.lt.3.lt.2")}</li>
                        <li>{t("pp.lt.3.lt.3")}</li>
                        <li>{t("pp.lt.3.lt.4")}</li>
                        <li>{t("pp.lt.3.lt.5")}</li>
                        <li>{t("pp.lt.3.lt.6")}</li>
                    </ul>
                </div>

                <div className="privacy-policy-section">
                    <h2>4. {t("pp.lt.4.title")}</h2>
                    <p>
                        {t("pp.lt.4.p")}
                    </p>
                    <ul>
                        <li>{t("pp.lt.4.lt.0")}</li>
                        <li>{t("pp.lt.4.lt.1")}</li>
                        <li>{t("pp.lt.4.lt.2")}</li>
                        <li>{t("pp.lt.4.lt.3")}</li>
                        <li>{t("pp.lt.4.lt.4")}</li>
                    </ul>
                </div>

                <div className="privacy-policy-section">
                    <h2>5. {t("pp.lt.5.title")}</h2>
                    <p>
                        {t("pp.lt.5.p.0")}:
                    </p>
                    <ul>
                        <li>{t("pp.lt.5.lt.0")}</li>
                        <li>{t("pp.lt.5.lt.1")}</li>
                        <li>{t("pp.lt.5.lt.2")}</li>
                        <li>{t("pp.lt.5.lt.3")}</li>
                        <li>{t("pp.lt.5.lt.4")}</li>
                    </ul>
                    <p>
                        {t("pp.lt.5.p.1")}
                    </p>
                </div>

                <div className="privacy-policy-section">
                    <h2>6. {t("pp.lt.6.title")}</h2>
                    <p>
                    {t("pp.lt.6.p")}
                    </p>
                    <ul>
                        <li>{t("pp.lt.6.lt.0")}</li>
                        <li>{t("pp.lt.6.lt.1")}</li>
                        <li>{t("pp.lt.6.lt.2")}</li>
                        <li>{t("pp.lt.6.lt.3")}</li>
                        <li>{t("pp.lt.6.lt.4")}</li>
                    </ul>
                </div>

                <div className="privacy-policy-section">
                    <h2>7. {t("pp.lt.7.title")}</h2>
                    <p>
                        {t("pp.lt.7.p.0")}
                    </p>
                    <ul>
                        <li>{t("pp.lt.7.lt.0")}</li>
                        <li>{t("pp.lt.7.lt.1")}</li>
                        <li>{t("pp.lt.7.lt.2")}</li>
                        <li>{t("pp.lt.7.lt.3")}</li>
                        <li>{t("pp.lt.7.lt.4")}</li>
                        <li>{t("pp.lt.7.lt.5")}</li>
                        <li>{t("pp.lt.7.lt.6")}</li>
                    </ul>
                    <p>
                        {t("pp.lt.7.p.1")}
                        <a href="mailto:geral@santiclinic.eu"> geral@santiclinic.eu</a>.
                    </p>
                </div>

                <div className="privacy-policy-section">
                    <h2>8. {t("pp.lt.8.title")}</h2>
                    <p>
                        {t("pp.lt.8.p")}
                    </p>
                </div>

                <div className="privacy-policy-section">
                    <h2>9. {t("pp.lt.9.title")}</h2>
                    <p>
                        {t("pp.lt.9.p")}
                    </p>
                </div>

                <div className="privacy-policy-section">
                    <h2>10. {t("pp.lt.10.title")}</h2>
                    <p>
                        {t("pp.lt.10.p")}
                    </p>
                </div>

                <div className="privacy-policy-section">
                    <h2>11. {t("pp.lt.11.title")}</h2>
                    <p>
                        {t("pp.lt.11.p")}
                    </p>
                </div>

                <div className="privacy-policy-section">
                    <h2>12. {t("pp.lt.12.title")}</h2>
                    <p>
                        {t("pp.lt.12.p")}
                    </p>
                    <div className="contact-details">
                        <p><strong>Santiclinic</strong></p>
                        <p>Praceta Agostinho Ferreira Chaves 5</p>
                        <p>Lj 4 AA,8005-328 Faro, Portugal</p>
                        <p>Email: <a href="mailto:geral@santiclinic.eu">geral@santiclinic.eu</a></p>
                        <p>Telefone: +351 915 007 427</p>
                    </div>
                </div>

                <div className="privacy-policy-footer">
                    <p>{t("pp.last_update")}</p>
                    <a href="/" className="back-button">{t("pp.btn")}</a>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;