import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Box, ArrowRight, Phone, Mail } from 'lucide-react';
import panelenclosures from "../../assets/productImages/switchboardComponents/panelenclosures.jpg"
import busbar from '../../assets/productImages/switchboardComponents/busbar.jpg'
import terminalblocks from '../../assets/productImages/switchboardComponents/terminalblocks.jpg'
import dinrails from '../../assets/productImages/switchboardComponents/dinrails.jpg'
import cableducts from '../../assets/productImages/switchboardComponents/cableducts.jpg'
import mountingplates from '../../assets/productImages/switchboardComponents/mountingplates.jpg'


const SwitchboardComponents = () => {
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
    'Industrial Grade',
    'IP65/IP66 Options',
    'Custom Solutions',
    'Quick Delivery',
    'Technical Support',
    'Competitive Pricing',
  ];

  const products = [
    {
      name: 'Panel Enclosures',
      description: 'Robust steel/SS enclosures for control panel applications',
      features: ['Steel/SS Construction', 'IP65/IP66 Rated', 'Various Sizes', 'Powder Coated'],
      image: panelenclosures
    },
    {
      name: 'Bus Bars',
      description: 'High current capacity bus bars for power distribution boards',
      image: busbar,
      features: ['Copper/Aluminum', 'Tin Plated', 'Custom Lengths', 'High Amperage']
    },
    {
      name: 'Terminal Blocks',
      description: 'Reliable screw/spring terminal blocks for secure wiring',
      image: terminalblocks,
      features: ['DIN Rail Mount', 'Various Types', 'Color Options', 'High Current']
    },
    {
      name: 'Din Rails',
      description: 'Standard 35mm mounting rails for panel components',
      image: dinrails,
      features: ['Steel/Aluminum', '35mm Standard', 'Various Lengths', 'Slotted Options']
    },
    {
      name: 'Cable Ducts',
      description: 'PVC wiring ducts for organized cable routing in panels',
      image: cableducts,
      features: ['PVC Material', 'Slotted/Solid', 'Various Sizes', 'Easy Access']
    },
    {
      name: 'Mounting Plates',
      description: 'Galvanized mounting plates for component installation',
      image: mountingplates,
      features: ['Zinc Plated', 'Various Sizes', 'Drilling Pattern', 'High Strength']
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
              <Box className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Switchboard </span>
            <span className="text-[#d4a853]">Components</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Build robust and functional control panels with high-quality enclosures, bus bars,
            terminal blocks and control devices.
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

      <section className="py-20 bg-white">
        <div className="w-full mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">OUR PRODUCTS</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Switchboard Components Products</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Industrial grade components for building reliable and professional control panels.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="scroll-animate bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="w-70 h-50 object-cover" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a3a5c] to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{product.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">GET STARTED</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready to Experience Excellence?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Don't settle for anything less than the best. Our knowledgeable engineers are available to assist you.
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

export default SwitchboardComponents;
