import React, { useEffect } from 'react';
import '../../styles/components/footer.css';
import { useTranslation } from 'react-i18next';

// Social media icons
const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
);

const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

const TikTokIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
);

const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
    </svg>
);

const LocationIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
    </svg>
);

const Footer: React.FC = () => {
    const {t, i18n} = useTranslation();
    
    useEffect(() => {
        // Verifica se há um idioma salvo no localStorage ao montar o componente
        const savedLanguage = localStorage.getItem("i18nextLng");
        if (savedLanguage && i18n.language !== savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);
    
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <h3 className="footer-heading">SantiClinic</h3>
                    </div>
                    <p className="footer-tagline">
                        {t("footer.sc_p")}
                    </p>
                    <div className="footer-social">
                        <a href="https://www.instagram.com/santi_clinic/?igsh=a3dydHlyOG5ld3k%3D#"
                           aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <InstagramIcon/>
                        </a>
                        <a href="https://www.facebook.com/santiclinic/?paipv=0&eav=AfZUxkfuslMkRNZhmVngRj_JItrq4WNeKPEkEItG3LMP4zWVI2a3jxdZ6HF2YrDQZxI&_rdr"
                           aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FacebookIcon/>
                        </a>
                        <a href="https://www.tiktok.com/@santiclinic1?_t=8niy0jdosou&_r=1" aria-label="TikTok"
                           target="_blank" rel="noopener noreferrer" className="social-icon">
                            <TikTokIcon/>
                        </a>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="footer-nav">
                    <h3 className="footer-heading">{t("footer.nav.title")}</h3>
                    <ul className="footer-links">
                        <li><a href="https://www.santiclinic.eu/">{t("footer.nav.lt.0")}</a></li>
                        <li><a href="https://www.santiclinic.eu/">{t("footer.nav.lt.1")}</a></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="footer-contact">
                    <h3 className="footer-heading">{t("footer.contact")}</h3>
                    <div className="contact-info">
                        <a href="tel:+351910144032" className="contact-item">
                            <span className="contact-icon"><PhoneIcon/></span>
                            <span className="contact-text">(+351) 910 144-032</span>
                        </a>
                        <div className="contact-item">
                            <span className="contact-icon"><LocationIcon/></span>
                            <span className="contact-text">Praceta Agostinho, 8005-147 Faro</span>
                        </div>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="footer-legal">
                    <h3 className="footer-heading">{t("footer.roles.title")}</h3>
                    <ul className="footer-links">
                        <li><a href="/politica-privacidade" onClick={() => {
                            // Garante que o idioma atual seja mantido ao navegar
                            localStorage.setItem("i18nextLng", i18n.language);
                        }}>{t("footer.roles.lt.0")}</a></li>
                        <li><a href="/termos-condicoes" onClick={() => {
                            // Garante que o idioma atual seja mantido ao navegar
                            localStorage.setItem("i18nextLng", i18n.language);
                        }}>{t("footer.roles.lt.1")}</a></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <p className="copyright">
                        © {new Date().getFullYear()} <span className="highlight">SANTICLINIC</span>. {t("footer.footer_btn.0")}
                    </p>
                    <p className="developer-credit">
                        {t("footer_btn.1")} ❤️ {t("footer_btn.2")} <a href="#" target="_blank" rel="noopener noreferrer">{t("footer_btn.3")}
                        SantiClinic</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;