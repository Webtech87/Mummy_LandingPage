import { useState, useEffect, useRef } from 'react';
import '../../styles/components/navbar.css';
import {useTranslation} from "react-i18next";

// WhatsApp icon
const WhatsAppIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17.6 6.32C16.12 4.82 14.06 4 12 4C7.72 4 4.23 7.5 4.23 11.78C4.23 13.04 4.52 14.31 5.09 15.42L4.12 19.94L8.75 19C9.8 19.52 10.94 19.78 12.11 19.78C16.38 19.78 19.88 16.28 19.88 12C19.87 9.93 19.06 7.93 17.6 6.32ZM12 18.28C10.97 18.28 9.94 18.03 9.03 17.56L8.81 17.43L6.04 18L6.62 15.31L6.47 15.06C5.94 14.11 5.67 13.05 5.67 11.96C5.67 8.31 8.48 5.38 12.11 5.38C13.8 5.38 15.39 6.04 16.58 7.24C17.77 8.44 18.41 10.03 18.41 11.74C18.28 15.39 15.59 18.28 12 18.28ZM15.85 13.23C15.62 13.11 14.5 12.55 14.27 12.47C14.05 12.38 13.9 12.35 13.73 12.59C13.56 12.81 13.12 13.34 12.97 13.5C12.82 13.67 12.67 13.7 12.44 13.55C11.38 13.02 10.67 12.6 9.95 11.39C9.75 11.06 10.11 11.09 10.45 10.42C10.53 10.26 10.49 10.12 10.45 10C10.41 9.88 10.06 8.77 9.87 8.3C9.68 7.84 9.5 7.9 9.33 7.9C9.18 7.9 9 7.86 8.84 7.86C8.69 7.86 8.43 7.9 8.21 8.12C7.98 8.35 7.38 8.91 7.38 10.02C7.38 11.13 8.21 12.21 8.33 12.38C8.45 12.55 10.05 15.11 12.57 16.09C14.01 16.67 14.56 16.7 15.26 16.59C15.69 16.51 16.59 16.02 16.78 15.48C16.97 14.94 16.97 14.48 16.9 14.36C16.8 14.25 16.67 14.17 16.42 14.09C16.21 14.01 15.85 13.23 15.85 13.23Z"
            fill="currentColor"/>
    </svg>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navbarRef = useRef<HTMLElement>(null);
    const {i18n} = useTranslation();

    useEffect(() => {
        // Verifica se há um idioma salvo no localStorage ao montar o componente
        const savedLanguage = localStorage.getItem("i18nextLng");
        if (savedLanguage && i18n.language !== savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [i18n]);

    // Função personalizada para garantir persistência do idioma
    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
    };

    return (
        <nav
            ref={navbarRef}
            className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
            aria-label="Main navigation"
        >
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/" aria-label="Home">
                        <span className="logo-text">SantiClinic</span>
                    </a>
                </div>

                {/* Right side elements */}
                <div className="navbar-actions">
                    {/* Language switcher */}
                    <div className="language-switcher">
                        <button
                            className={`lang-btn ${i18n.language === 'pt' ? "active" : ""}`}
                            onClick={() => handleLanguageChange("pt")}
                            aria-label="Switch to Portuguese"
                        >
                            PT
                        </button>
                        <span className="lang-separator">|</span>
                        <button
                            className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                            onClick={() => handleLanguageChange('en')}
                            aria-label="Switch to English"
                        >
                            EN
                        </button>
                    </div>

                    {/* WhatsApp button */}
                    <a
                        href="https://wa.me/915007427"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-whatsapp-button"
                        aria-label="Contact on WhatsApp"
                    >
                        <WhatsAppIcon/>
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;