import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Target, ArrowRight, Phone, Mail } from 'lucide-react';
import highPrecisionFirst from '../../assets/productImages/high-precicion-parts-first.jpg';
import turningParts from '../../assets/productImages/turning-parts.jpg';

const HighPrecisionParts = () => {
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
    'Tight Tolerances',
    'Advanced Materials',
    'Quality Inspection',
    'Custom Specifications',
    'ISO Certified',
    'Global Standards',
  ];

  const products = [
    {
      name: 'Precision Shafts',
      description: 'High-precision machined shafts for critical applications',
      features: ['Tolerance: ±0.001mm', 'Surface Finish: Ra 0.4', 'Various Materials', 'Heat Treatment Available']
    },
    {
      name: 'Precision Pins',
      description: 'Dowel and locating pins with ultra-tight tolerances',
      features: ['Hardened Steel', 'Ground Finish', 'Multiple Diameters', 'Custom Lengths']
    },
    {
      name: 'Precision Bushings',
      description: 'High-accuracy bushings for machinery and equipment',
      features: ['Bronze/Steel', 'Self-Lubricating Options', 'Tight Bore Tolerance', 'Various Wall Thickness']
    },
    {
      name: 'Precision Gears',
      description: 'High-quality gears for power transmission systems',
      features: ['Spur/Helical/Bevel', 'Precision Ground Teeth', 'Various Modules', 'Custom Tooth Profile']
    },
    {
      name: 'Precision Sleeves',
      description: 'Machined sleeves for bearing and shaft applications',
      features: ['ID/OD Ground', 'Multiple Materials', 'Custom Dimensions', 'Heat Treated Options']
    },
    {
      name: 'Precision Spacers',
      description: 'High-precision spacers for accurate positioning',
      features: ['Parallel Faces', 'Ground Surfaces', 'Various Thickness', 'SS/MS/Brass']
    },
    {
      name: 'Thread Gauges',
      description: 'Precision thread gauges for quality control',
      features: ['Go/No-Go Type', 'Calibrated', 'Metric/Imperial', 'Master Quality']
    },
    {
      name: 'Precision Screws',
      description: 'High-precision machine screws for critical assemblies',
      features: ['Close Tolerance', 'Various Thread Types', 'Multiple Materials', 'Clean Room Compatible']
    },
    {
      name: 'Precision Washers',
      description: 'Ground washers for precision applications',
      features: ['Parallel Faces', 'Tight Thickness Control', 'Various Materials', 'Ground Finish']
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
              <Target className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">High Precision </span>
            <span className="text-[#d4a853]">Turning Parts</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Engineered with ultra-tight tolerances and superior accuracy for critical applications where precision is paramount.
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">High Precision Turning Parts Range</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Manufactured to exacting standards with state-of-the-art machinery and rigorous quality control.
          </p>

          <div className="space-y-16">
            {/* Section 1: Content LEFT, Image RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Precision Turned Components
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our precision turned components are manufactured using state-of-the-art CNC turning centers, 
                    ensuring tight tolerances of <span className="font-semibold text-[#1a3a5c]">±0.001mm</span> and 
                    exceptional surface finishes of <span className="font-semibold text-[#1a3a5c]">Ra 0.4</span> or better.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Target className="text-[#d4a853]" size={20} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Multi-axis CNC turning capabilities for complex geometries</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Materials: Stainless Steel, Mild Steel, Aluminum, Brass, Bronze</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Custom thread profiles and precision boring operations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Heat treatment and surface coating available</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Precision turned parts manufactured to global standards including ISO, DIN, and ANSI specifications"
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={highPrecisionFirst}
                    alt="Precision Turned Components"
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
                    alt="Precision Milled Parts"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Advanced Milled Components
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our advanced CNC milling capabilities deliver complex components with <span className="font-semibold text-[#1a3a5c]">3/4/5-axis machining</span>, 
                    enabling intricate geometries and superior dimensional accuracy for demanding industrial applications.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Target className="text-[#d4a853]" size={20} />
                      Manufacturing Capabilities
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">5-axis simultaneous machining for complex contours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Precision pockets, slots, and intricate surface profiles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">High-speed machining for aluminum and exotic alloys</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">CMM inspection and detailed quality documentation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "From prototypes to production runs, delivering precision milled components with consistent quality"
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready to Experience Precision Excellence?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our precision engineering experts are ready to deliver components that meet your exact specifications.
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

export default HighPrecisionParts;
