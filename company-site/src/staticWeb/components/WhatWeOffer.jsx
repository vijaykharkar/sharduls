import React, { useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import worldimg from '../../assets/images/worldimg.jpg';

const WhatWeOffer = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    'Wide Range of Standard Fasteners',
    'Customer-Unique C-Parts',
    'Global Sourcing Network',
    'Quality Control & Testing',
    'Efficient Logistics Flow',
    'Sustainable Deliveries',
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* <p className="scroll-animate-left text-[#d4a853] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4">
              WHAT WE OFFER
            </p> */}
            
            <h2 className="scroll-animate-left delay-100 text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-2">
              A Seamless Supply Chain
            </h2>
            
            <h3 className="scroll-animate-left delay-200 text-xl sm:text-2xl md:text-3xl font-bold text-[#d4a853] mb-4 md:mb-6">
              We can ease your procurement from India
            </h3>
            
            <p className="scroll-animate-left delay-300 text-gray-600 text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
              We offer an extremely wide range of stocked standard fasteners, and we 
              specialize in trading with any imaginable C-parts according to your unique 
              needs. It could be turned, injected, extruded, stamped, forged, milled, 
              molded, or even assembled. All parts of our offer are based on years of 
              experience in making a difference for you.
            </p>
            
            {/* Features Grid */}
            <div className="scroll-animate-left delay-400 grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 md:mb-8">
              {features.map((feature, index) => (
                <div key={index} className={`scroll-animate delay-${Math.min((index + 4) * 100, 800)} flex items-center gap-3`}>
                  <CheckCircle className="text-[#d4a853] flex-shrink-0" size={20} />
                  <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Learn More Link */}
            <a 
              href="/about"
              className="scroll-animate-left delay-500 inline-flex items-center gap-2 bg-[#d4a853] hover:bg-[#ff8c00] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-bold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1"
            >
              Learn More About Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          {/* Right Image */}
          <div className="scroll-animate-right relative mt-8 lg:mt-0">
            <div className="rounded-lg overflow-hidden shadow-xl img-zoom">
              <img 
                src={worldimg}
                alt="Warehouse with industrial supplies"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-lg shadow-2xl"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-[#d4a853] rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
