// src/pages/Home.tsx
import { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import Hero from '../components/Hero';
import Services from '../components/Services';
// Import VideoSection as lazy
const VideoSection = lazy(() => import('../components/VideoSection/VideoSection')); // Ensure the file exists at this path
import ContactForm from '../components/ContactForm/ContactForm'; // Ensure the file exists at this path or update the path
import InfoSection from '../components/InfoSection/InfoSection';

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Services />
      {/* Wrap VideoSection with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <VideoSection />
      </Suspense>
      <InfoSection />
      <ContactForm />
    </MainLayout>
  );
};

export default Home;