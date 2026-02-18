import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Wrench, ArrowRight, Phone, Mail } from 'lucide-react';
import bolt from '../../assets/productImages/fixingsFasteners/bolts.jpg'
import screws from '../../assets/productImages/fixingsFasteners/screw.jpg'
import nuts from '../../assets/productImages/fixingsFasteners/nuts.jpg'
import lockwashers from '../../assets/productImages/fixingsFasteners/lockwashers.webp'
import anchors from '../../assets/productImages/fixingsFasteners/anchors.jpg'
import rivets from '../../assets/productImages/fixingsFasteners/rivets.jpg'
import threadedrods from '../../assets/productImages/fixingsFasteners/threadedrods.jpg'
import selfdrillingscrews from '../../assets/productImages/fixingsFasteners/selfdrillingscrews.jpg'
import springchannelnuts from '../../assets/productImages/fixingsFasteners/springchannelnuts.jpg'
import hinges from '../../assets/productImages/fixingsFasteners/hinges.jpg'

const FixingsFasteners = () => {
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
    'High Strength',
    'Corrosion Resistant',
    'Multiple Materials',
    'Custom Sizes',
    'Bulk Availability',
    'Quality Certified',
  ];

  const products = [
    {
      name: 'Bolts',
      description: 'High-grade SS/MS bolts for industrial applications',
      image: bolt,
      features: ['SS/MS/Brass', 'Various Grades', 'Multiple Sizes', 'Custom Threads']
    },
    {
      name: 'Screws',
      description: 'High-grade SS/MS screws for industrial applications',
      image: screws,
      features: ['SS/MS/Brass', 'Various Grades', 'Multiple Sizes', 'Custom Threads']
    },
    {
      name: 'Nuts',
      description: 'Precision hex nuts and lock nuts for secure fastening',
      image: nuts,
      features: ['Hex/Lock Nuts', 'Various Materials', 'DIN Standards']
    },
    {
      name: 'Washers',
      description: 'Precision flat/spring washers for secure fastening',
      image: lockwashers,
      features: ['Flat/Spring Washers', 'Various Materials', 'DIN Standards']
    },
    {
      name: 'Anchors',
      description: 'Heavy-duty expansion and chemical anchors for concrete',
      image: anchors,
      features: ['Expansion Type', 'Chemical Anchors', 'High Load Capacity', 'Various Sizes']
    },
    {
      name: 'Rivets',
      description: 'Industrial blind and solid rivets for permanent joints',
      image: rivets,
      features: ['Blind Rivets', 'Solid Rivets', 'Aluminum/Steel', 'Various Diameters']
    },
    {
      name: 'Threaded Rods',
      description: 'Full thread rods and studs for structural applications',
      image: threadedrods,
      features: ['Various Grades', 'Multiple Lengths', 'Galvanized Options', 'High Tensile']
    },
    {
      name: 'Self Drilling Screws',
      description: 'Self-tapping screws for sheet metal applications',
      image: selfdrillingscrews,
      features: ['Hex Head', 'Pan Head', 'Zinc Plated', 'Various Lengths']
    },
    {
      name: 'Spring Channel Nuts',
      description: 'Channel nuts for strut mounting systems',
      image: springchannelnuts,
      features: ['Spring Loaded', 'Various Sizes', 'Zinc Plated', 'Quick Install']
    },
    {
      name: 'Mounting Brackets',
      description: 'Steel brackets for equipment and cable tray mounting',
      image: hinges,
      features: ['Hot Dip GI', 'Various Types', 'Heavy Duty', 'Custom Sizes']
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
              <Wrench className="text-[#1a3a5c]" size={32} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Fixings & </span>
            <span className="text-[#d4a853]">Fasteners</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Secure your electrical installations with durable fixings and fasteners resistant to
            corrosion for long-lasting performance.
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
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">Fixings & Fasteners Products</h2>
          <p className="scroll-animate text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Quality certified fixings and fasteners for reliable and long-lasting installations.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="scroll-animate bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {product.image ? <img src={product.image} alt={product.name} className="w-80 h-48 object-contain" /> : null}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a3a5c] to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{product.name}</h3>
                  </div>
                </div>
                {/* <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-5">
                    {product.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-[#d4a853] rounded-full"></span>{f}
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="flex items-center justify-center gap-2 w-full bg-[#1a3a5c] hover:bg-[#243b53] text-white py-3 rounded-lg font-medium transition-colors">
                    View Details <ArrowRight size={16} />
                  </a>
                </div> */}
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

export default FixingsFasteners;
