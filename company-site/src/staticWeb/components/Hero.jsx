import React, { useEffect, useRef } from 'react';
import worldimg from '../../assets/images/shipment.jpg';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.hero-animate');
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 150);
    });
  }, []);

  return (
    <section ref={heroRef} className="relative w-350 h-[400px] md:h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${worldimg})`
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-12 md:py-16 lg:py-20">
        <h1 className="hero-animate opacity-0 translate-y-8 transition-all duration-700 ease-out text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          <span className="text-white">Building Tomorrow's</span>
          <br />
          <span className="text-white">Sourcing HUB From India</span>
        </h1>

        <p className="hero-animate opacity-0 translate-y-8 transition-all duration-700 ease-out text-[#d4a853] text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-wide">
          SHARDUL-GE
        </p>

        <p className="hero-animate opacity-0 translate-y-8 transition-all duration-700 ease-out text-gray-200 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
          A professionally managed organization delivering high-quality products and
          reliable solutions across multiple industrial sectors.
        </p>

        {/* CTA Buttons */}
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
