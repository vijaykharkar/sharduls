import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Package, Phone, Mail, Zap, Settings, Shield, Award } from 'lucide-react';
import coppercoilmcb from '../../assets/images/coppercoilmcb.jpeg';
import compressionsprings from '../../assets/images/compressionsprings.jpg';
import springsreplacement from '../../assets/images/springsreplacement.jpg';
import oilleveldipstick from '../../assets/images/oilleveldipstick.jpg';
import springstainless from '../../assets/images/springstainless.jpg';
import clipmetalicovarilla from '../../assets/images/clipmetalicovarilla.jpg';

const SpringType = () => {
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
    'Custom Designs',
    'High Durability',
    'Precision Engineered',
    'Multiple Materials',
    'Quality Certified',
    'Bulk Supply',
  ];

  const products = [
    {
      name: 'Compression Springs',
      description: 'Open-coil helical springs designed to resist compressive forces. Widely used in automotive, industrial machinery, and consumer electronics.',
      image: compressionsprings,
    },
    {
      name: 'Tension Springs',
      description: 'Closely wound coil springs that resist pulling forces. Ideal for garage doors, trampolines, farm machinery, and industrial applications.',
      image: springsreplacement,
    },
    {
      name: 'Single & Double Torsion Springs',
      description: 'Springs that exert torque or rotary force. Used in clothespins, clipboards, hinges, counterbalance mechanisms, and door handles.',
      image: springstainless,
    },
    {
      name: 'Copper Coils for MCB',
      description: 'Precision copper coils engineered specifically for Miniature Circuit Breakers (MCB), ensuring reliable electrical performance and safety.',
      image: coppercoilmcb,
    },
    {
      name: 'Wire Form Components',
      description: 'Custom-shaped wire forms for diverse industrial applications including clips, hooks, brackets, rings, and specialized connectors.',
      image: clipmetalicovarilla,
    },
    {
      name: 'Oil Level Check Gauge / Dipsticks',
      description: 'Precision-manufactured dipsticks and oil level gauges for engines, transformers, and industrial equipment monitoring.',
      image: oilleveldipstick,
    }
  ];

  const capabilities = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Custom Engineering',
      description: 'Springs designed to exact specifications with CAD modeling and prototype development.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Material Excellence',
      description: 'Stainless steel, carbon steel, phosphor bronze, copper alloys, and more to match your requirements.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Precision Manufacturing',
      description: 'CNC coiling machines and automated production lines for consistent quality and high volumes.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Quality Assurance',
      description: 'Every spring undergoes load testing, dimensional inspection, and fatigue analysis.',
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="scroll-animate flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#d4a853] rounded-xl flex items-center justify-center">
              <Package className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">All Types of </span>
            <span className="text-[#d4a853]">Springs</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            Precision-engineered springs and wire form components for automotive, electrical, industrial, and consumer applications. From compression springs to custom copper coils — we deliver excellence in every coil.
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

      {/* Products Grid Section */}
      <section className="py-20 bg-white">
        <div className="w-full mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">OUR PRODUCTS</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">All Types of Springs</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Comprehensive range of springs and wire form products manufactured to international quality standards.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <div key={index} className="scroll-animate bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden card-hover group">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a3a5c]/90 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{product.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">PRODUCT DETAILS</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Explore Our Spring Range</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Each product is engineered with precision and manufactured using the finest materials to meet your exact specifications.
          </p>

          <div className="space-y-12">
            {products.map((product, index) => (
              <div key={index} className="scroll-animate">
                <div className={`grid lg:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? '' : ''}`}>
                  {/* Image */}
                  <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`space-y-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div>
                      <span className="inline-block bg-[#d4a853]/10 text-[#d4a853] px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-3">
                        {String(index + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#1a3a5c] mb-3">
                        {product.name}
                      </h3>
                      <div className="w-16 h-1 bg-[#d4a853]"></div>
                    </div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Custom Sizes', 'Multiple Materials', 'Bulk Orders', 'Quality Tested'].map((tag, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700">
                          <CheckCircle className="text-[#d4a853]" size={14} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">WHY CHOOSE US</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-4 text-center italic">Our Spring Manufacturing Capabilities</h2>
          <p className="scroll-animate text-gray-300 text-center max-w-2xl mx-auto mb-12">
            State-of-the-art manufacturing combined with decades of expertise in spring engineering.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((item, index) => (
              <div
                key={index}
                className="scroll-animate bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 bg-[#d4a853]/20 rounded-xl flex items-center justify-center text-[#d4a853] mb-5 group-hover:scale-110 group-hover:bg-[#d4a853]/30 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#d4a853] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">GET STARTED</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Need Custom Springs for Your Project?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            From prototype to mass production — our engineering team can design and manufacture springs to your exact specifications.
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

export default SpringType;
