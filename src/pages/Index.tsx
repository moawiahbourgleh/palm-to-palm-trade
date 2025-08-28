import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const Index: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;