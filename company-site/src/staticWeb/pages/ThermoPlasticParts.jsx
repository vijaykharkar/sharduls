import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Flame, ArrowRight, Phone, Mail } from 'lucide-react';
import thermoplasticComponent from '../../assets/productImages/thermoplasticcomponent.jpg';
import turningParts from '../../assets/productImages/turning-parts.jpg';

const ThermoPlasticParts = () => {
  const pageRef = useRef(null);

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

    const elements = pageRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    'Injection Molded',
    'High Strength',
    'Chemical Resistant',
    'Custom Colors',
    'Lightweight',
    'Cost Effective',
  ];

  const products = [
    {
      name: 'ABS Components',
      description: 'High-impact ABS plastic parts for durability',
      features: ['Impact Resistant', 'Good Finish', 'Multiple Colors', 'Easy Processing']
    },
    {
      name: 'Polycarbonate Parts',
      description: 'Transparent and durable polycarbonate components',
      features: ['High Clarity', 'UV Resistant', 'Impact Strength', 'Heat Resistant']
    },
    {
      name: 'Nylon Components',
      description: 'Engineering grade nylon for mechanical parts',
      features: ['High Tensile Strength', 'Low Friction', 'Wear Resistant', 'Chemical Resistant']
    },
    {
      name: 'Acetal (POM) Parts',
      description: 'Precision molded acetal parts for demanding uses',
      features: ['Dimensional Stability', 'Low Friction', 'High Stiffness', 'Excellent Machinability']
    },
    {
      name: 'PP Components',
      description: 'Polypropylene parts for chemical resistance',
      features: ['Chemical Resistant', 'Lightweight', 'Flexible', 'Food Grade Available']
    },
    {
      name: 'PEEK Parts',
      description: 'High-performance PEEK for extreme conditions',
      features: ['High Temperature', 'Chemical Resistant', 'Excellent Strength', 'Low Wear']
    },
    {
      name: 'PVC Components',
      description: 'PVC plastic parts for various applications',
      features: ['Rigid/Flexible', 'Chemical Resistant', 'Cost Effective', 'Weather Resistant']
    },
    {
      name: 'PTFE Parts',
      description: 'Non-stick PTFE components for special uses',
      features: ['Non-Stick Surface', 'Chemical Inert', 'High Temperature', 'Low Friction']
    },
    {
      name: 'TPE/TPU Parts',
      description: 'Thermoplastic elastomer components',
      features: ['Flexible', 'Soft Touch', 'Weather Resistant', 'Various Hardness']
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen">
      <Header />

      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="scroll-animate flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#d4a853] rounded-xl flex items-center justify-center">
              <Flame className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Thermo Plastic </span>
            <span className="text-[#d4a853]">Parts</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            High-quality injection molded thermoplastic components offering excellent strength, durability, and chemical resistance.
          </p>

          <div className="scroll-animate flex flex-wrap justify-center gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                <CheckCircle className="text-[#d4a853]" size={16} />
                <span className="text-white text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">OUR PRODUCTS</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Thermoplastic Components Range</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Engineering-grade thermoplastic parts manufactured with precision molding and stringent quality control.
          </p>

          <div className="space-y-16">
            {/* Section 1: Content LEFT, Image RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Injection Molded Components
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our injection molding capabilities deliver high-quality thermoplastic components with <span className="font-semibold text-[#1a3a5c]">excellent repeatability</span> and 
                    <span className="font-semibold text-[#1a3a5c]"> consistent quality</span>, suitable for both prototyping and mass production.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Flame className="text-[#d4a853]" size={20} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">High-precision injection molding technology</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Materials: ABS, PC, Nylon, POM, PP, PEEK, PVC, PTFE</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Custom colors and surface finishes available</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Lightweight yet high-strength solutions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Engineering-grade thermoplastics for demanding industrial applications"
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={thermoplasticComponent}
                    alt="Injection Molded Parts"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Image LEFT, Content RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative overflow-hidden order-2 lg:order-1">
                  <img
                    src={turningParts}
                    alt="Engineering Plastics"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Specialty Thermoplastics
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Specialized engineering thermoplastics including <span className="font-semibold text-[#1a3a5c]">PEEK, PTFE, and TPE/TPU</span> 
                    for extreme conditions, chemical resistance, and high-performance applications.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Flame className="text-[#d4a853]" size={20} />
                      Material Properties
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Chemical resistant and weather resistant options</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">High-temperature resistant materials available</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Food-grade and medical-grade certifications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Cost-effective alternatives to metal components</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Advanced thermoplastic solutions for challenging environments"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">GET STARTED</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready for Quality Plastic Solutions?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our thermoplastic molding expertise delivers high-quality components for your specific requirements.
          </p>
          <div className="scroll-animate flex flex-wrap justify-center gap-4">
            <a href="/contact" className="flex items-center gap-2 bg-[#d4a853] hover:bg-[#c49843] text-white px-6 py-3 rounded font-semibold transition-colors">
              <Phone size={18} /> Contact Us
            </a>
            <a href="mailto:director@shardulge.com" className="flex items-center gap-2 bg-transparent border-2 border-white hover:border-[#d4a853] hover:text-[#d4a853] text-white px-6 py-3 rounded font-semibold transition-colors">
              <Mail size={18} /> Email Inquiry
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThermoPlasticParts;
