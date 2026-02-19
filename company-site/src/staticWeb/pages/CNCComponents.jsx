import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Settings, ArrowRight, Phone, Mail } from 'lucide-react';
import cncMachine from '../../assets/productImages/cncmachine.jpg';
import cncMachineComponent from '../../assets/productImages/cncmachinecomponent.jpg';

const CNCComponents = () => {
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
    'CNC Machined',
    'High Precision',
    'Multiple Materials',
    'Complex Geometries',
    'Quick Turnaround',
    'Quality Assured',
  ];

  const products = [
    {
      name: 'CNC Turned Parts',
      description: 'Precision turned components for various industries',
      features: ['Multi-axis Turning', 'Tight Tolerances', 'SS/MS/Brass/Aluminum', 'Complex Profiles']
    },
    {
      name: 'CNC Milled Components',
      description: 'Complex milled parts with superior accuracy',
      features: ['3/4/5 Axis Milling', 'Intricate Designs', 'Various Materials', 'Fine Surface Finish']
    },
    {
      name: 'CNC Drilled Parts',
      description: 'Precision drilling for accurate hole positioning',
      features: ['Deep Hole Drilling', 'Multiple Angles', 'Tight Positional Tolerance', 'Various Diameters']
    },
    {
      name: 'CNC Tapped Components',
      description: 'Threaded components with precise thread quality',
      features: ['Internal/External Threads', 'Metric/Imperial', 'Multiple Materials', 'Thread Inspection']
    },
    {
      name: 'CNC Engraved Parts',
      description: 'Laser and mechanical engraving for marking',
      features: ['Text/Logo/Serial No.', 'Deep/Light Engraving', 'Various Materials', 'Permanent Marking']
    },
    {
      name: 'CNC Shaped Components',
      description: 'Complex shaped parts for specialized applications',
      features: ['Contoured Surfaces', '3D Profiling', 'Custom Designs', 'High Accuracy']
    },
    {
      name: 'CNC Slotted Parts',
      description: 'Precision slots and keyways machining',
      features: ['Keyways', 'T-Slots', 'Custom Slots', 'Tight Width Tolerance']
    },
    {
      name: 'CNC Bored Components',
      description: 'Internal boring for precise inner diameters',
      features: ['Large Bore Capacity', 'Tight Tolerance', 'Fine Finish', 'Various Depths']
    },
    {
      name: 'CNC Chamfered Parts',
      description: 'Precision chamfers and edge breaks',
      features: ['Multiple Angles', 'Consistent Quality', 'Deburring', 'Various Materials']
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
              <Settings className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">CNC Machined </span>
            <span className="text-[#d4a853]">Components</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Advanced CNC machining capabilities for complex components with exceptional precision and repeatability.
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">CNC Components Portfolio</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-16">
            State-of-the-art CNC machining centers delivering precision components for demanding applications.
          </p>

          <div className="space-y-16">
            {/* Section 1: Content LEFT, Image RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      CNC Turned Components
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our CNC turning capabilities deliver precision turned parts with <span className="font-semibold text-[#1a3a5c]">multi-axis machining</span>, 
                    ensuring exceptional accuracy and surface finish for complex cylindrical components.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Settings className="text-[#d4a853]" size={20} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Multi-axis CNC turning for complex geometries</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Materials: SS/MS/Brass/Aluminum with various grades</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Complex thread profiles and precision boring</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Quick turnaround for prototypes and production runs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Advanced CNC turning delivering precision components with tight tolerances"
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={cncMachine}
                    alt="CNC Turned Components"
                    className="w-full h-auto aspect-[4/3] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Image LEFT, Content RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative overflow-hidden order-2 lg:order-1 rounded-xl">
                  <img
                    src={cncMachineComponent}
                    alt="CNC Milled Parts"
                    className="w-full h-auto aspect-[4/3] object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Advanced CNC Milling
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    State-of-the-art <span className="font-semibold text-[#1a3a5c]">3/4/5-axis CNC milling</span> capabilities 
                    for intricate designs, complex surfaces, and tight tolerance requirements across various materials.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Settings className="text-[#d4a853]" size={20} />
                      Manufacturing Capabilities
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">3/4/5-axis simultaneous machining</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Intricate designs with precision pockets and slots</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">High-speed machining for aluminum and exotic materials</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Fine surface finishes and dimensional accuracy</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Bringing complex designs to life with unmatched CNC milling precision"
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready to Leverage CNC Precision?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our advanced CNC machining capabilities can bring your complex designs to life with unmatched accuracy.
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

export default CNCComponents;
