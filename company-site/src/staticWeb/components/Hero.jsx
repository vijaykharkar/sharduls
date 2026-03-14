import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import worldimg from '../../assets/images/shipment.jpg';
import electrical from '../../assets/images/electrical.jpg';
import hydraulic from '../../assets/images/hydraulic.jpg';
import qualitycontrol from '../../assets/images/qualitycontrol.jpg';
import accelerateinnovationcomponent from '../../assets/images/accelerateinnovationcomponent.jpg';
import threadcivilization from '../../assets/images/threadcivilization.jpg';
import cnclatheturning from '../../assets/images/cnclatheturning.jpg';

const heroSlides = [
  { image: worldimg, alt: 'Global Shipment & Logistics' },
  // { image: electrical, alt: 'Electrical Components' },
  { image: hydraulic, alt: 'Hydraulic & Industrial Parts' },
  { image: qualitycontrol, alt: 'Quality Control & Inspection' },
  { image: accelerateinnovationcomponent, alt: 'Accelerate Innovation Component' },
  { image: threadcivilization, alt: 'Thread Civilization' },
  { image: cnclatheturning, alt: 'CNC Lathe Turning' },
];

const Hero = () => {
  const heroRef = useRef(null);
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2000);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    startAutoPlay();
  }, [startAutoPlay]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    startAutoPlay();
  }, [startAutoPlay]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    startAutoPlay();
  }, [startAutoPlay]);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.hero-animate');
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 150);
    });

    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

  return (
    <section ref={heroRef} className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[650px] xl:h-[650px] 2xl:h-[650px] flex items-center justify-center overflow-hidden">
      {/* Carousel Background Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: index === currentSlide ? 1 : 0,
          }}
          aria-hidden={index !== currentSlide}
        />
      ))}

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-12 md:py-16 lg:py-20">
        <h1 className="hero-animate opacity-0 translate-y-8 transition-all duration-700 ease-out text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          <span className="text-white">{t('hero.title')}</span>
          <br />
          <span className="text-white">{t('hero.subtitle')}</span>
        </h1>

        <p className="hero-animate opacity-0 translate-y-8 transition-all duration-700 ease-out text-[#d4a853] text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-wide">
          {t('hero.companyName')}
        </p>

        <p className="hero-animate opacity-0 translate-y-8 transition-all duration-700 ease-out text-gray-200 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
          {t('hero.description')}
        </p>

        {/* CTA Buttons */}
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? 'w-8 h-3 bg-[#d4a853]'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .hero-animate.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}

export default Hero;
