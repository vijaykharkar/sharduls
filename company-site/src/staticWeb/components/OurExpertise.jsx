import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import steelImage from '../../assets/productImages/steel_beams.jpg';
import copperImage from '../../assets/productImages/copper_beams.jpg';
import aluminiumImage from '../../assets/productImages/aluminium_beams.jpg';
import brassImage from '../../assets/productImages/Brass_round.jpg';
import plasticImage from '../../assets/productImages/plastic_ball.jpg';

const OurExpertise = () => {
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

  const materials = [
    {
      name: 'Stainless Steel',
      image: steelImage,
      link: '/products',
    },
    {
      name: 'Copper',
      image: copperImage,
      link: '/products',
    },
    {
      name: 'Aluminium',
      image: aluminiumImage,
      link: '/products',
    },
    {
      name: 'Brass',
      image: brassImage,
      link: '/products',
    },
    {
      name: 'Plastic',
      image: plasticImage,
      link: '/products',
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-[#f8f9fa]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <p className="scroll-animate text-[#d4a853] font-semibold text-xl sm:text-xl tracking-[0.2em] uppercase mb-3 md:mb-4">
            OUR EXPERTISE
          </p>
          <h2 className="scroll-animate delay-100 text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-[#1a3a5c] mb-3 md:mb-4">
            Material In Which We Work
          </h2>
          <p className="scroll-animate delay-200 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            We specialize in contract manufacturing of precision components across a wide range of materials, delivering
            excellence in every component.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
          {materials.map((material, index) => (
            <a
              key={index}
              href={material.link}
              className={`scroll-animate delay-${Math.min((index + 3) * 100, 800)} group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer block`}
            >
              <div className="aspect-square img-zoom relative">
                <img 
                  src={material.image}
                  alt={material.name}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-[#1a3a5c]/0 group-hover:bg-[#1a3a5c]/70 transition-all duration-300"></div>
              </div>
              
              {/* Bottom section with name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#1a3a5c]/90 to-transparent">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold text-sm">
                    {material.name}
                  </p>
                  {/* Arrow - visible on hover */}
                  <ArrowRight 
                    size={18} 
                    className="text-[#d4a853] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" 
                  />
                </div>
                {/* Bottom line - appears on hover */}
                <div className="h-0.5 bg-[#d4a853] mt-2 w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurExpertise;
