import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Box, ArrowRight, Phone, Mail } from 'lucide-react';
import fdmPrinting from '../../assets/productImages/fdm.png';
import vacumcasting from '../../assets/productImages/vacumcasting.png';
import multijetFusion from '../../assets/productImages/multijet.png';
import dmls from '../../assets/productImages/dmls.png';

const ThreeDPrinting = () => {
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
    'Rapid Prototyping',
    'Complex Geometries',
    'Multiple Materials',
    'Low Volume Production',
    'Cost Effective',
    'Quick Turnaround',
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
            <span className="text-white">3D Printing </span>
            <span className="text-[#d4a853]">Services</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Transform your ideas into reality with our advanced 3D printing capabilities.
            From rapid prototyping to low-volume production, we deliver precision parts with exceptional detail.
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
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">OUR SERVICES</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">3D Printing Technologies</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Advanced additive manufacturing solutions for prototyping, production, and custom applications.
          </p>

          <div className="space-y-16">
            {/* Section 1: Content LEFT, Image RIGHT */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      FDM 3D Printing
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Fused Deposition Modeling (FDM) technology for <span className="font-semibold text-[#1a3a5c]">functional prototypes</span> and
                    <span className="font-semibold text-[#1a3a5c]"> durable end-use parts</span>, offering cost-effective solutions for various applications.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Box className="text-[#d4a853]" size={20} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Wide material selection: Nylon Grey PA12, Colour Nylon, PA12</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Large build volume up to 300x300x400mm</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Cost-effective for functional prototypes and fixtures</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Quick turnaround with 24-48 hour delivery</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Rapid prototyping and functional parts with excellent mechanical properties"
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/2] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-xl">
                    <img src={fdmPrinting} alt="FDM 3D Printing" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Image LEFT, Content RIGHT - Vacuum Casting */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative overflow-hidden order-2 lg:order-1">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-xl">
                    <img src={vacumcasting} alt="Vacuum Casting" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Vacuum Casting (VC)
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    A <span className="font-semibold text-[#1a3a5c]">rapid prototyping</span> process that creates high-quality polyurethane parts from 
                    silicone molds, ideal for <span className="font-semibold text-[#1a3a5c]">low-volume production</span> and functional testing.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Box className="text-[#d4a853]" size={20} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Excellent surface finish and detail reproduction</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Wide range of polyurethane materials and colors</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Cost-effective for low to medium volume production (10-50 units)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Quick turnaround for functional prototypes and testing</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Perfect for rapid prototyping and low-volume production with production-like parts"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Content LEFT, Image RIGHT - Multijet Fusion */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Multijet Fusion (MJF)
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold text-[#1a3a5c]">Powder-based 3D printing</span> technology without laser, 
                    ideal for <span className="font-semibold text-[#1a3a5c]">batch production</span> with excellent mechanical properties and fast build times.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Box className="text-[#d4a853]" size={20} />
                      Recommended Materials
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700"><span className="font-semibold">Nylon Grey PA12</span> - Durable and strong for functional parts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700"><span className="font-semibold">Colour Nylon PA12</span> - Full-color options for visual prototypes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">Uniform mechanical properties in all directions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">High productivity and cost-effective for batch production</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Laser-free powder printing ideal for batch production with exceptional speed and quality"
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[5/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-xl">
                    <img src={multijetFusion} alt="Multijet Fusion" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Image LEFT, Content RIGHT - DMLS */}
            <div className="scroll-animate">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative overflow-hidden order-2 lg:order-1">
                  <div className="aspect-[5/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-xl">
                    <img src={dmls} alt="DMLS" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                      Direct Metal Laser Sintering (DMLS)
                    </h3>
                    <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Advanced <span className="font-semibold text-[#1a3a5c]">metal 3D printing</span> technology that creates fully dense metal parts 
                    with <span className="font-semibold text-[#1a3a5c]">complex geometries</span> for aerospace, medical, and industrial applications.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="font-bold text-[#1a3a5c] mb-4 flex items-center gap-2">
                      <Box className="text-[#d4a853]" size={20} />
                      Recommended Materials
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700"><span className="font-semibold">Aluminium</span> - Lightweight and strong for aerospace applications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700"><span className="font-semibold">Stainless Steel</span> - Corrosion resistant for industrial parts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700"><span className="font-semibold">Nickel Base Alloys</span> - High-temperature applications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700"><span className="font-semibold">Titanium</span> - Biocompatible for medical implants</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700"><span className="font-semibold">Cobalt Chrome</span> - High strength for dental and medical devices</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold italic">
                      "Precision metal 3D printing for mission-critical components in aerospace, medical, and industrial sectors"
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready to Bring Your Ideas to Life?</h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our 3D printing experts are ready to help you create prototypes, tools, and production parts with precision and speed.
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

export default ThreeDPrinting;
