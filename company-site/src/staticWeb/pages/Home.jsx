import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhatWeOffer from '../components/WhatWeOffer';
import ProcessFlow from '../components/ProcessFlow';
import OurExpertise from '../components/OurExpertise';
import Services from '../components/Services';
import Sectors from '../components/Sectors';
import Specialists from '../components/Specialists';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhatWeOffer />
        <ProcessFlow />
        <OurExpertise />
        {/* <Services /> */}
        <Sectors />
        {/* <Specialists /> */}
        {/* <CTASection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
