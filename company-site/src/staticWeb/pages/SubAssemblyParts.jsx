import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Layers, ArrowRight, Phone, Mail } from 'lucide-react';
import subassemblyImg from "../../assets/productImages/mechassembly.jpg";
import electricalsubassemblt from "../../assets/productImages/electricalassmebly.jpg";

const SubAssemblyParts = () => {
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
    'Pre-Assembled',
    'Quality Tested',
    'Reduced Lead Time',
    'Cost Optimization',
    'Supply Chain Management',
    'Documentation Included',
  ];

  const products = [
    {
      name: 'Mechanical Sub-Assemblies',
      description: 'Pre-assembled mechanical components ready to install',
      features: ['Multiple Components', 'Tested Units', 'Installation Ready', 'Custom Design']
    },
    {
      name: 'Electrical Sub-Assemblies',
      description: 'Wired and tested electrical assemblies',
      features: ['Wire Harnesses', 'Pre-Wired', 'Tested Circuits', 'Quality Certified']
    },
    {
      name: 'Fastener Assemblies',
      description: 'Pre-matched fastener sets for specific applications',
      features: ['Complete Sets', 'Matched Components', 'Application Specific', 'Ready to Use']
    },
    {
      name: 'Bearing Assemblies',
      description: 'Pre-assembled bearing units with housings',
      features: ['Housing Included', 'Pre-Lubricated', 'Installation Ready', 'Various Sizes']
    },
    {
      name: 'Valve Assemblies',
      description: 'Complete valve assemblies with actuators',
      features: ['Valve + Actuator', 'Tested Units', 'Ready to Install', 'Multiple Types']
    },
    {
      name: 'Motor Assemblies',
      description: 'Motor and gearbox pre-assembled units',
      features: ['Motor + Gearbox', 'Wired & Tested', 'Multiple Ratios', 'Custom Mounting']
    },
    {
      name: 'Sensor Assemblies',
      description: 'Sensor modules with mounting brackets',
      features: ['Sensor + Bracket', 'Pre-Calibrated', 'Wired Ready', 'Various Types']
    },
    {
      name: 'Panel Assemblies',
      description: 'Control panel sub-assemblies',
      features: ['Components Mounted', 'Wired Internally', 'Tested Units', 'Custom Layout']
    },
    {
      name: 'Pipe Assemblies',
      description: 'Pre-fabricated piping sub-assemblies',
      features: ['Cut to Length', 'Fittings Attached', 'Threaded/Welded', 'Pressure Tested']
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
              <Layers className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Sub-Assembly </span>
            <span className="text-[#d4a853]">Parts</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Complete pre-assembled solutions that reduce your installation time and streamline your production process.
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Sub-Assembly Solutions</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Pre-assembled and tested units ready for immediate installation, saving you time and reducing complexity.
          </p>

          <div className="space-y-16">
            {/* Section 1: Content LEFT, Image RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Mechanical Sub-Assemblies
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our mechanical sub-assemblies are <span className="font-semibold text-[#1a3a5c]">pre-assembled and tested</span>,
                    ready for immediate installation, reducing your assembly time and ensuring consistent quality across all units.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Layers className="text-[#d4a853]" size={20} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Complete pre-assembled units ready for installation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">100% functionality testing before delivery</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Reduced installation time and labor costs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Custom configurations available</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Streamline your production with tested, ready-to-install sub-assemblies"
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="aspect-[4/4] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <img src={subassemblyImg} alt="Subassembly Image" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Image LEFT, Content RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative overflow-hidden order-2 lg:order-1 rounded-2xl">
                  <div className="aspect-[4/4] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <img src={electricalsubassemblt} alt="Electrical Sub-Assembly Image" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Electrical Sub-Assemblies
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Pre-wired electrical assemblies with <span className="font-semibold text-[#1a3a5c]">complete circuit testing</span> and
                    <span className="font-semibold text-[#1a3a5c]"> quality certification</span>, reducing installation complexity and ensuring safety compliance.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Layers className="text-[#d4a853]" size={20} />
                      Assembly Benefits
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Pre-wired harnesses and tested circuits</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Quality certified and documentation included</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Plug-and-play installation ready</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Supply chain management for all components</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Simplify your electrical installations with pre-tested assemblies"
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready to Streamline Your Assembly?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our sub-assembly solutions can significantly reduce your installation time and overall project costs.
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

export default SubAssemblyParts;
