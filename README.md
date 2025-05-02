# Mummy_LandingPage
# SantiClinic Landing Page

A modern, responsive landing page for SantiClinic built with React, Vite, and internationalization support. This project provides a complete solution for showcasing SantiClinic's services with multilingual support (English and Portuguese) and an integrated contact form connected to a Django backend.

## 🌟 Features

### Core Functionality
- **Multilingual Support** - Complete internationalization with English and Portuguese
- **Contact Form System** - Form validation and Django backend integration
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **WhatsApp Integration** - Direct contact button with clinic's WhatsApp

### Technical Highlights
- **React + TypeScript** - Type-safe component development
- **Vite Build System** - Fast development and optimized production builds
- **i18next Integration** - Full translation system with persistent language selection
- **React Router** - Client-side routing with history management
- **Django REST API** - Backend services for form processing

### Design Elements
- **Custom Component Library** - Reusable UI components
- **CSS Variables** - Consistent theming and easy customization
- **Smooth Animations** - Enhanced user experience with subtle transitions
- **Country Flag Integration** - Visual language selection with flag colors

## 🔧 Tech Stack

### Frontend
- **Core**: React 18, TypeScript
- **Build System**: Vite
- **Routing**: React Router Dom
- **Internationalization**: 
  - i18next
  - react-i18next
  - i18next-http-backend
  - i18next-browser-languagedetector
- **Styling**: CSS with variables for theming
- **State Management**: React Hooks (useState, useEffect, useRef)

### Backend
- **API Framework**: Django REST Framework
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Authentication**: Django built-in auth system
- **Form Processing**: Custom Django views

## 📋 Project Structure

The project is organized into frontend and backend sections:

### Frontend (React/TypeScript/Vite)
- `client1/` - Contains all frontend code
  - `public/locales/` - Translation files for EN and PT
  - `src/components/` - Reusable UI components (Navbar, Footer, ContactForm, etc.)
  - `src/pages/` - Page components (Home, PrivacyPolicy, TermsConditions)
  - `src/styles/` - CSS styling organized by component and page
  - `src/i18n.js` - Internationalization configuration
  - `src/main.tsx` - Application entry point

### Backend (Django)
- `server/` - Contains all backend code
  - `server/settings.py` - Django configuration
  - `users/views.py` - API endpoints for contact form
  - `Dockerfile` - Container configuration for deployment
  - `requirements.txt` - Python dependencies

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Python (3.9 or higher)
- Django

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Webtech87/Mummy_LandingPage.git
   cd Mummy_LandingPage
   ```

2. **Frontend setup**
   ```bash
   cd client1
   npm install
   
   # Install i18n dependencies if not included in package.json
   npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector
   ```

3. **Backend setup**
   ```bash
   cd ../server
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   ```

### Development Workflow

1. **Start the frontend development server**
   ```bash
   cd client1
   npm run dev
   ```
   The frontend will be available at http://localhost:5173

2. **Start the backend API server**
   ```bash
   cd server
   python manage.py runserver
   ```
   The API will be available at http://localhost:8000
   
### Branch Management

- `main` - Production-ready code
- `deployReady` - Staging branch for pre-deployment testing

When making changes:
1. Develop in a feature branch or `deployReady`
2. Test thoroughly
3. Merge to `main` when ready for production
4. Use `git merge -X theirs branch_name` to prioritize changes from a specific branch

## 🌐 Internationalization

The project implements a comprehensive multilingual system using react-i18next:

### Features
- Language switching via navigation bar buttons with flag-styled indicators
- Persistent language selection across page navigation
- Translation files organized by language in `client1/public/locales/`
- Supported languages: English (en), Portuguese (pt)

### Implementation Details
- Language selection is persisted in localStorage
- The i18n configuration is in `src/i18n.js`
- Language is loaded during app initialization
- Components verify current language on mount
- All UI text is managed through translation keys

## 📝 Contact Form

The contact form integrates with a Django REST API backend:

### Features
- Real-time form validation (client-side)
- Complete server-side validation
- Automatic scrolling to success/error messages
- Support for multiple form field types
- Dynamic subject selection
- Privacy policy acceptance checkbox
- Loading indicators during submission

### Technical Implementation
- Form data is sent to Django API endpoint
- Backend validates and stores submissions
- Error handling for network issues
- Form structure can be customized via backend config
- Mobile-responsive design

## 🖥️ Key Components

### Navbar
- Responsive design
- Customized language switcher with country flag colors
- WhatsApp integration button
- Scroll-aware styling

### Hero Section
- Prominent call-to-action
- Dynamic content based on language
- Mobile-optimized layout

### Services Section
- Showcases clinic specialties
- Interactive service boxes
- Responsive grid layout

### Footer
- Contact information
- Social media links (Instagram, Facebook, TikTok)
- Policy and terms links
- Multi-column responsive design

## 🛠️ Technical Notes

### CSS Structure
- Component-based CSS organization
- CSS variables for consistent theming
- Mobile-first responsive design
- Custom animations and transitions

### Performance Optimizations
- Vite for fast builds and HMR
- Optimized asset loading
- Component-based architecture for better code splitting

## 📞 Contact

SantiClinic 

Project Link: [https://github.com/Webtech87/Mummy_LandingPage](https://github.com/Webtech87/Mummy_LandingPage)

---

© 2025 SantiClinic. All Rights Reserved.