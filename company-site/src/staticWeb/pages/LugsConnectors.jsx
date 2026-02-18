import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Plug, ArrowRight, Phone, Mail } from 'lucide-react';
import cableLugs from "../../assets/productImages/lugsConnectors/cablelugs.jpg"
import ringTerminals from "../../assets/productImages/lugsConnectors/ringterminals.jpg"
import spadeTerminals from "../../assets/productImages/lugsConnectors/spadeterminals.avif"
import bimetallicConnectors from "../../assets/productImages/lugsConnectors/bimetallicconnectors.jpg"
import compressionLugs from "../../assets/productImages/lugsConnectors/compressionlugs.jpg"
import tubularLugs from "../../assets/productImages/lugsConnectors/tubularlugs.jpg"

const LugsConnectors = () => {
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
    'High Conductivity',
    'Precision Manufacturing',
    'Multiple Materials',
    'Custom Sizes',
    'Quality Tested',
    'Competitive Pricing',
  ];

  const products = [
    {
      name: 'Cable Lugs',
      images: cableLugs,
      description: 'High-quality copper/aluminum lugs for secure cable terminations',
      features: ['Copper/Aluminum', 'Crimping Type', 'Various Sizes', 'Tin Plated']
    },
    {
      name: 'Ring Terminals',
      images: ringTerminals,
      description: 'Ring type connectors for reliable bolt connections',
      features: ['Insulated/Non-insulated', 'Multiple Sizes', 'Color Coded', 'High Current']
    },
    {
      name: 'Butt Connectors',
      images: "",
      description: 'Inline splice connectors for secure cable joining',
      features: ['Insulated Types', 'Crimp Style', 'Various AWG', 'Heat Shrink Options']
    },
    {
      name: 'Spade Terminals',
      images: spadeTerminals,
      description: 'Fork type terminals for quick disconnect connections',
      features: ['Multiple Sizes', 'Insulated Options', 'Easy Installation', 'Secure Fit']
    },
    {
      name: 'Bi-metallic Connectors',
      images: bimetallicConnectors,
      description: 'Transition connectors for aluminum to copper joints',
      features: ['Al-Cu Transition', 'Low Resistance', 'Corrosion Proof', 'High Performance']
    },
    {
      name: 'Compression Lugs',
      images: compressionLugs,
      description: 'Heavy-duty compression type lugs for power cables',
      features: ['High Conductivity', 'Die Compression', 'Long Barrel', 'Inspection Window']
    },
    {
      name: 'Tubular Lugs',
      images: tubularLugs,
      description: 'Standard tubular cable lugs for general applications',
      features: ['Electrolytic Copper', 'Palm Type', 'Various Hole Sizes', 'IS Standard']
    }
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
              <Plug className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Lugs & </span>
            <span className="text-[#d4a853]">Connectors</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Establish secure and reliable electrical connections with our extensive range of high-conductivity cable lugs and terminal connectors.
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Lugs & Connectors Products</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Premium quality lugs and connectors for reliable electrical connections in all applications.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="scroll-animate bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={product.images} alt={product.name} className="w-70 h-50 object-cover" />
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

export default LugsConnectors;
