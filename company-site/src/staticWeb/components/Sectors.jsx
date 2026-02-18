import React, { useEffect, useRef } from 'react';
import {
  Car,
  Zap,
  Waves,
  Circle,
  Radio,
  Heart,
  Eye,
  Flame,
  Triangle,
  Battery,
  Factory,
  Sun
} from 'lucide-react';
import automotive from '../../assets/images/automotive.jpg';
import electrical from '../../assets/images/electrical.jpg';
import mscb from '../../assets/images/msbc.jpg';
import plasticrubber from '../../assets/images/plasticrubber.jpg';
import hydraulic from '../../assets/images/hydraulic.jpg';
import medical from '../../assets/images/medical.jpg';
import furniture from '../../assets/images/furniture.jpg';
import gasandoil from '../../assets/images/gasandoil.jpg';
import solar from '../../assets/images/solar.jpg';


const Sectors = () => {
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

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sectors = [
    { 
      name: 'Automotive', 
      icon: Car, 
      img: automotive,
      description: 'As well as strong links in the Motorsport industry SKY GROUP is also involved in supplying components to the High End \'Niche Markets\' within the Automotive Industry.'
    },
    { 
      name: 'Electrical', 
      icon: Zap, 
      img: mscb,
      description: 'Providing high-quality electrical components and solutions for diverse applications across industrial and commercial sectors.'
    },
    { 
      name: 'Hydraulic & Pneumatic', 
      icon: Waves, 
      img: hydraulic,
      description: 'Precision hydraulic and pneumatic components ensuring reliable performance in demanding applications.'
    },
    { 
      name: 'Plastics & Rubber', 
      icon: Circle, 
      img: plasticrubber,
      description: 'Advanced plastic and rubber components manufactured to exact specifications for various industrial needs.'
    },
    { 
      name: 'Communication', 
      icon: Radio, 
      img: electrical,
      description: 'Specialized components for communication systems ensuring seamless connectivity and reliability.'
    },
    { 
      name: 'Solar Industries', 
      icon: Sun, 
      img: solar,
      description: 'High-precision solar components meeting stringent quality and safety standards.'
    },
    { 
      name: 'Furniture', 
      icon: Eye, 
      img: furniture,
      description: 'Advanced furniture components and solutions for precision instruments and systems.'
    },
    { 
      name: 'Gas & Oil Industries', 
      icon: Flame, 
      img: gasandoil,
      description: 'Robust components designed for harsh environments in oil and gas exploration and production.'
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <p className="scroll-animate text-[#d4a853] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4">
            SECTORS WE CATER...
          </p>
          <h2 className="scroll-animate delay-100 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#1a3a5c] mb-4 md:mb-6">
            Serving Industries from Furniture to Aerospace
          </h2>
          <p className="scroll-animate delay-200 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We work with customers across diverse industries. Our precision components serve
            global markets, delivering quality and reliability across sectors.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon;
            return (
              <div
                key={index}
                className={`scroll-animate delay-${Math.min((index + 2) * 100, 800)} group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
              >
                {/* Background Image (visible on hover) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{ backgroundImage: `url(${sector.img})` }}
                >
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-6">
                  {/* Top Section - Icon and Image */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon Circle */}
                    <div className="w-16 h-16 bg-[#0052a3] group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <IconComponent className="text-white group-hover:text-[#0052a3]" size={28} />
                    </div>
                    
                    {/* Corner Image (hidden on hover) */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden opacity-100 group-hover:opacity-0 transition-opacity duration-300 ml-2">
                      <img 
                        src={sector.img} 
                        alt={sector.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[#1a3a5c] group-hover:text-white font-bold text-lg mb-3 transition-colors duration-300">
                    {sector.name}
                  </h3>

                  {/* Description */}
                  {/* <p className="text-gray-600 group-hover:text-white text-sm leading-relaxed transition-colors duration-300">
                    {sector.description}
                  </p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
