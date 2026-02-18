import React, { useEffect, useRef } from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import serviceImage1 from '../../assets/productImages/1000316699.jpg';
import serviceImage2 from '../../assets/productImages/1000316700.jpg';
import serviceImage3 from '../../assets/productImages/1000316701.jpg';
import serviceImage4 from '../../assets/productImages/cableManagement/1000316702.jpg';
import serviceImage5 from '../../assets/productImages/1000316714.jpg';
import serviceImage6 from '../../assets/productImages/cableManagement/1000316715.jpeg';

const Services = () => {
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

  const services = [
    {
      title: 'Inventory Management-Kanban',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/services/inventory',
      linkText: 'Inventory Management-Kanban',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
    },
    {
      title: 'Cost Improvements & Price Contracts',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/services/cost',
      linkText: 'Cost Improvements & Price Contracts',
      titleColor: 'text-[#d4a853]',
      linkColor: 'text-[#d4a853] hover:text-[#1a3a5c]',
    },
    {
      title: 'Quality Assurance & Control',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/services/quality',
      linkText: 'Quality Assurance & Control',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
    },
    {
      title: 'Sustainability',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/services/sustainability',
      linkText: 'Sustainability',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
    },
    {
      title: 'Kits & Sub-Assemblies',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/services/kits',
      linkText: 'Kits & Sub-Assemblies',
      titleColor: 'text-[#d4a853]',
      linkColor: 'text-[#d4a853] hover:text-[#1a3a5c]',
    },
    {
      title: 'Dedicated Support',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/services/support',
      linkText: 'Dedicated Support',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
    },
  ];

  return (
  <>
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`scroll-animate delay-${(index + 1) * 100} bg-white rounded-2xl shadow-lg overflow-hidden card-hover`}
            >
              {/* Image Container */}
              <div className="relative h-48 img-zoom">
                <img
                  src={[serviceImage1, serviceImage2, serviceImage3, serviceImage4, serviceImage5, serviceImage6][index]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {/* Icon Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="text-center mb-8 md:mb-10 lg:mb-12">
                    <div className="w-12 h-12 bg-[#d4a853]/90 rounded-lg flex items-center justify-center shadow-lg">
                      <Lightbulb className="text-[#d4a853]" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="scroll-animate delay-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-3 md:mb-4">
                  {service.title}
                </h2>
                <p className="scroll-animate text-[#d4a853] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  className={`inline-flex items-center gap-2 font-semibold text-sm md:text-base ${service.linkColor} transition-colors`}
                >
                  {service.linkText}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

export default Services;
