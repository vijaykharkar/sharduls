import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import WhatWeOffer from '../components/WhatWeOffer';
import ProcessFlow from '../components/ProcessFlow';
import OurExpertise from '../components/OurExpertise';
import Sectors from '../components/Sectors';

const HomePage = () => {
  useEffect(() => {
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

    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <WhatWeOffer />
      <ProcessFlow />
      <OurExpertise />
      <Sectors />
    </div>
  );
};

export default HomePage;
