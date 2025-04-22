// src/components/Navbar/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import {
  NavbarContainer,
  NavContent,
  Logo,
  NavLinks,
  NavLink,
  CTAButton,
  MobileMenuButton
} from './Navbar.styles';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <NavbarContainer>
      <NavContent>
        <Logo>Mummy</Logo>
        
        <NavLinks>
          <NavLink>
            <Link to="/">Home</Link>
          </NavLink>
          <NavLink>
            <Link to="#services">Services</Link>
          </NavLink>
          <NavLink>
            <Link to="#about">About</Link>
          </NavLink>
          <NavLink>
            <Link to="#contact">Contact</Link>
          </NavLink>
        </NavLinks>
        
        <CTAButton>Get Started</CTAButton>
        
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;