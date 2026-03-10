import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Phone, Mail, Sparkles, Shield, Zap, Award, Droplet, Layers, Clock, TestTube } from 'lucide-react';

const SilverPlating = () => {
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
    'Premium Finish',
    'Corrosion Resistant',
    'Low Contact Resistance',
    'RoHS Compliant',
    'Custom Thickness',
    'Bulk Capacity',
  ];

  const products = [
    {
      name: 'Electrical Contacts',
      description: 'Silver-plated electrical contacts for switches, relays, and circuit breakers with superior conductivity.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
    },
    {
      name: 'Bus Bars & Terminals',
      description: 'High-conductivity silver-plated bus bars and terminals for power distribution and electrical panels.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
    },
    {
      name: 'Connector Pins',
      description: 'Precision silver-plated connector pins and sockets ensuring reliable electrical connections with minimal resistance.',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80',
    },
    {
      name: 'PCB Components',
      description: 'Silver-plated PCB components including pins, terminals, and through-hole connectors for electronics manufacturing.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    },
    {
      name: 'Switchgear Parts',
      description: 'Industrial-grade silver-plated components for switchgear assemblies and high-voltage applications.',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80',
    },
    {
      name: 'Automotive Components',
      description: 'Silver-plated automotive electrical components for enhanced durability and performance in harsh environments.',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    },
    {
      name: 'Decorative Hardware',
      description: 'Premium silver-plated decorative hardware and architectural fittings with brilliant aesthetic finish.',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80',
    },
    {
      name: 'Custom Plating Services',
      description: 'Bespoke silver plating services for specialized components and unique customer requirements.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f6d5e5?w=600&q=80',
    },
  ];

  const processSteps = [
    {
      icon: <TestTube className="w-6 h-6" />,
      title: 'Surface Preparation',
      description: 'Thorough cleaning, degreasing, and surface activation to ensure optimal adhesion.',
    },
    {
      icon: <Droplet className="w-6 h-6" />,
      title: 'Electroplating Bath',
      description: 'Precision-controlled silver electroplating with consistent current density and bath chemistry.',
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Thickness Control',
      description: 'Accurate plating thickness measurement using XRF and other advanced metrology tools.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Quality Inspection',
      description: 'Comprehensive testing including adhesion tests, thickness verification, and visual inspection.',
    },
  ];

  const advantages = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Superior Conductivity',
      description: 'Silver offers the highest electrical conductivity of all metals, ensuring minimal power loss.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Corrosion Resistance',
      description: 'Excellent protection against oxidation and environmental degradation for long-lasting performance.',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Premium Aesthetics',
      description: 'Bright, lustrous finish that maintains its appearance over time, ideal for decorative applications.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Extended Service Life',
      description: 'Silver plating significantly extends component lifespan by preventing wear and corrosion.',
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
              <Sparkles className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            SURFACE FINISHING
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Premium </span>
            <span className="text-[#d4a853]">Silver Plating</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            High-quality silver electroplating services delivering superior electrical conductivity, corrosion resistance, and aesthetic excellence for industrial, automotive, and electronic applications.
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
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">OUR SERVICES</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Silver Plating Applications</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Precision silver plating services for diverse industrial and commercial applications ensuring optimal performance and longevity.
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
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">APPLICATION AREAS</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Where We Apply Silver Plating</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Our silver plating expertise spans across multiple industries, delivering consistent quality and performance.
          </p>

          <div className="space-y-12">
            {products.slice(0, 4).map((product, index) => (
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
                        APPLICATION {String(index + 1).padStart(2, '0')}
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
                      {['High Quality', 'Fast Turnaround', 'Certified Process', 'Volume Production'].map((tag, idx) => (
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

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">OUR PROCESS</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Silver Plating Process Excellence</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our state-of-the-art electroplating facility ensures consistent, high-quality silver deposits on every component.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="scroll-animate bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-[#d4a853]/40 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a3a5c] mb-3 group-hover:text-[#d4a853] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">WHY CHOOSE SILVER</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-4 text-center italic">Advantages of Silver Plating</h2>
          <p className="scroll-animate text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Silver plating provides unmatched performance characteristics for demanding electrical and mechanical applications.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, index) => (
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

      {/* Technical Specifications */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="scroll-animate bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1a3a5c] to-[#102a43] p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Technical Specifications</h2>
              <p className="text-gray-300">Industry-leading plating standards and capabilities</p>
            </div>
            
            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#1a3a5c] mb-4">Plating Capabilities</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Thickness Range: 0.5 to 50 microns</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Substrate Materials: Copper, Brass, Steel, Aluminum</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Batch & Continuous Processing Available</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Component Size: Small pins to large bus bars</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1a3a5c] mb-4">Quality Standards</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">ISO 9001 Certified Process</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">RoHS & REACH Compliant</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Thickness Measurement: XRF & Micrometer</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Full Traceability & Documentation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-[#d4a853]/10 rounded-xl p-6 border-l-4 border-[#d4a853]">
                <p className="text-[#1a3a5c] font-semibold italic text-center">
                  "Delivering precision silver plating with superior conductivity and corrosion resistance"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">GET STARTED</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Need Silver Plating Services?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our technical team is ready to discuss your silver plating requirements and provide expert solutions for your components.
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

export default SilverPlating;
