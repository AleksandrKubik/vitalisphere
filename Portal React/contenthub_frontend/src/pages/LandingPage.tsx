import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import VideoSection from '../components/landing/VideoSection';
import MusicSection from '../components/landing/MusicSection';
import ArticlesSection from '../components/landing/ArticlesSection';
import CoursesSection from '../components/landing/CoursesSection';
import GamesSection from '../components/landing/GamesSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import FaqSection from '../components/landing/FaqSection';
import CtaSection from '../components/landing/CtaSection';

import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <VideoSection />
      <MusicSection />
      <ArticlesSection />
      <CoursesSection />
      <GamesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
