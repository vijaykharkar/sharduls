import React, { useEffect, useRef } from 'react';
import { Link2, Package, Lightbulb, ArrowRight, Target, Users, Shield, Clock, Globe } from 'lucide-react';
import specialistImage1 from '../../assets/productImages/1000316716.jpg';
import specialistImage2 from '../../assets/productImages/cableManagement/1000316717.jpg';
import specialistImage3 from '../../assets/productImages/1000316718.jpg';

const Specialists = () => {
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

  const specialistCards = [
    {
      title: "Experienced SCM Team",
      description: "Our seasoned Global Supply Chain Management professionals bring decades of expertise in international procurement and logistics",
      link: '/specialists/supplier-base',
      linkText: 'Experienced SCM Team',
      icon: Users,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage1,
    },
    {
      title: "Quality-First Approach",
      description: "In-house quality lab with advanced calibration equipment ensures every component meets international standards before shipment.",
      link: '/specialists/supplier-base',
      linkText: 'Quality-First Approach',
      icon: Shield,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage1,
    },
    {
      title: "Flexible Production Scale",
      description: "From rapid prototyping to mass production, we adapt to your requirements at every stage with consistent quality.",
      link: '/specialists/supplier-base',
      linkText: 'Flexible Production Scale',
      icon: Clock,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage1,
    },
    {
      title: "Global Standards Compliance",
      description: "All suppliers are carefully audited for international compliance, including confidentiality and business ethics standards.",
      link: '/specialists/supplier-base',
      linkText: 'Global Standards Compliance',
      icon: Globe,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage1,
    },
    {
      title: "Strategic Location in India",
      description: "Positioned at the heart of India's manufacturing hub in Pune, providing cost advantages and access to world-class suppliers.",
      link: '/specialists/supplier-base',
      linkText: 'Strategic Location in India',
      icon: Target,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage1,
    },
    {
      title: 'Best-in-Class Supplier Base',
      description: 'We have a global network of suppliers, ensuring you always have access to the best quality materials.',
      link: '/specialists/supplier-base',
      linkText: 'Best-in-Class Supplier Base',
      icon: Link2,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage1,
    },
    {
      title: 'Your Supplier Base Optimization',
      description: 'We offer solutions to reduce the different cost-driving factors in the C-parts value chain. We are a global team acting locally.',
      link: '/specialists/optimization',
      linkText: 'Your Supplier Base Optimization',
      icon: Package,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#d4a853]',
      linkColor: 'text-[#d4a853] hover:text-[#1a3a5c]',
      image: specialistImage2,
    },
    {
      title: 'Supplier Evolutions & Periodic Audits',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/specialists/audits',
      linkText: 'Supplier Evolutions & Periodic Audits',
      icon: Lightbulb,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage3,
    },
    {
      title: 'Inventory Management-Kanban',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/specialists/audits',
      linkText: 'Inventory Management-Kanban',
      icon: Lightbulb,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage3,
    },
    {
      title: 'Cost Improvements & Price Contracts',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/specialists/audits',
      linkText: 'Cost Improvements & Price Contracts',
      icon: Lightbulb,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage3,
    },
    {
      title: 'Quality Assurance & Control',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/specialists/audits',
      linkText: 'Quality Assurance & Control',
      icon: Lightbulb,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage3,
    },
    {
      title: 'Sustainability',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/specialists/audits',
      linkText: 'Sustainability',
      icon: Lightbulb,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage3,
    },
    {
      title: 'Kits & Sub-Assemblies',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/specialists/audits',
      linkText: 'Kits & Sub-Assemblies',
      icon: Lightbulb,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage3,
    },
    {
      title: 'Dedicated Support',
      description: 'To read and listen to our experts is a shortcut to improve your sourcing, quality control and logistics for your supply chain.',
      link: '/specialists/audits',
      linkText: 'Dedicated Support',
      icon: Lightbulb,
      iconBg: 'bg-[#d4a853]',
      titleColor: 'text-[#1a3a5c]',
      linkColor: 'text-[#1a3a5c] hover:text-[#d4a853]',
      image: specialistImage3,
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-[#f8f9fa]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <p className="scroll-animate text-[#d4a853] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4">
            WHEN YOU LOOK FOR C-PARTS
          </p>
          <h2 className="scroll-animate delay-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-4 md:mb-6">
            We are Specialist For...
          </h2>
          <p className="scroll-animate delay-200 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            Whether you look for fasteners or customer-unique C-parts, a supply chain partner for sourcing,
            quality control, and logistics - we are your Solutionist.
          </p>
        </div>

        {/* Specialist Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {specialistCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <a
                key={index}
                href={card.link}
                className={`scroll-animate delay-${(index + 1) * 200} group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-3 block`}
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-52 img-zoom">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Icon Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className={`w-12 h-12 bg-[#1a3a5c] group-hover:bg-[#d4a853] rounded-lg flex items-center justify-center shadow-lg transition-colors duration-300`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-[#1a3a5c] group-hover:text-[#d4a853] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <div className="inline-flex items-center gap-2 font-semibold text-sm text-[#1a3a5c] group-hover:text-[#d4a853] transition-colors duration-300">
                    {card.linkText}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specialists;
