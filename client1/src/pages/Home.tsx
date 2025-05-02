import React from 'react';
import Hero from '../components/Hero/Hero';
import VideoSection from '../components/VideoSection/VideoSection';
import ServiceSection from '../components/ServiceSection/ServiceSection';
import ContactForm from '../components/ContactForm/ContactForm';
import { useTranslation } from "react-i18next";

import '../styles/pages/home.css'; // Use page-specific styles

const Home: React.FC = () => {
  const { t } = useTranslation();
    return (
    <div className="home-page">
      <Hero />
      
      <VideoSection 
        videoSrc="/videos/clinic-tour.mp4"  // Update with your actual video path
        posterSrc="/images/video-thumbnail.jpg"  // Update with your actual thumbnail image
        title="Mummy DayCare" 
        description={t("video_area")}
      />
      
      <ServiceSection />
      
      <ContactForm />
      
      {/* Other content */}
    </div>
  );
};

export default Home;