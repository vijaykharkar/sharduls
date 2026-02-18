import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Package, ArrowRight, Phone, Mail } from 'lucide-react';
import kitpouch from "../../assets/productImages/kitpouch.jpg"

const KittingParts = () => {
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
    'Custom Kits',
    'Inventory Management',
    'Just-In-Time Delivery',
    'Reduced Handling',
    'Quality Verified',
    'Cost Savings',
  ];

  const products = [
    {
      name: 'Maintenance Kits',
      description: 'Complete maintenance kits for equipment servicing',
      features: ['All Required Parts', 'Organized Packaging', 'Part List Included', 'Regular/Preventive']
    },
    {
      name: 'Installation Kits',
      description: 'Ready-to-install component kits',
      features: ['Complete Set', 'Installation Manual', 'All Fasteners Included', 'Project Specific']
    },
    {
      name: 'Repair Kits',
      description: 'Comprehensive repair kits for quick fixes',
      features: ['Common Spare Parts', 'Emergency Ready', 'Organized Sets', 'Multiple Applications']
    },
    {
      name: 'Assembly Kits',
      description: 'Pre-packaged assembly component kits',
      features: ['Sequence Organized', 'Assembly Instructions', 'Quality Checked', 'Custom Configured']
    },
    {
      name: 'Fastener Kits',
      description: 'Organized fastener kits for specific applications',
      features: ['Bolts/Nuts/Washers', 'Sorted by Size', 'Application Specific', 'Complete Sets']
    },
    {
      name: 'Electrical Kits',
      description: 'Electrical component kits for installations',
      features: ['Connectors/Terminals', 'Wire Accessories', 'Organized Boxes', 'Project Ready']
    },
    {
      name: 'Gasket & Seal Kits',
      description: 'Complete sealing solution kits',
      features: ['Various Sizes', 'Material Specific', 'Application Ready', 'Quality Materials']
    },
    {
      name: 'Tool Kits',
      description: 'Specialized tool kits for maintenance',
      features: ['Job Specific Tools', 'Quality Tools', 'Organized Cases', 'Professional Grade']
    },
    {
      name: 'Custom Project Kits',
      description: 'Tailored kits for your specific projects',
      features: ['Customer Defined', 'Flexible Configuration', 'Labeling Available', 'Volume Discounts']
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
              <Package className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Kitting </span>
            <span className="text-[#d4a853]">Parts</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Customized kitting solutions that simplify inventory management and reduce handling costs for your operations.
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Kitting Solutions</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Organized component kits designed to optimize your workflow and minimize procurement complexity.
          </p>

          <div className="space-y-16">
            {/* Section 1: Content LEFT, Image RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Custom Kitting Services
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our custom kitting services provide <span className="font-semibold text-[#1a3a5c]">organized component sets</span> tailored to your specific 
                    project requirements, reducing handling time and improving operational efficiency.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Package className="text-[#d4a853]" size={20} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Custom configured kits for specific applications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Organized packaging with detailed part lists</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Just-in-time delivery and inventory management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Quality verified and inspection certified</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Optimize your workflow with organized, ready-to-use component kits"
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/4] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-2xl">
                    <img src={kitpouch} alt="Kitting Parts" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Image LEFT, Content RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative overflow-hidden order-2 lg:order-1">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 bg-[#1a3a5c] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="text-[#d4a853]" size={64} />
                      </div>
                      <p className="text-[#1a3a5c] font-bold text-lg">Customize Specialized Kits</p>
                      <p className="text-gray-600 text-sm mt-2">Application Ready</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Customized Application Kits
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Pre-configured kits for <span className="font-semibold text-[#1a3a5c]">maintenance, installation, and repair</span> applications, 
                    with all necessary components organized for immediate deployment.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Package className="text-[#d4a853]" size={20} />
                      Kitting Benefits
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Maintenance, installation, and repair kit options</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Reduced handling and procurement costs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Flexible configuration and labeling options</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Volume discounts and contract pricing available</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Simplify procurement and improve efficiency with tailored kitting solutions"
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready to Optimize Your Inventory?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our kitting services can transform your supply chain efficiency and reduce operational complexity.
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

export default KittingParts;
