import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  CheckCircle, 
  Cable,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import product1 from '../../assets/productImages/cableManagement/cableglandimg.jpg';
import product2 from '../../assets/productImages/cableManagement/cabletrays.jpg';
import product3 from '../../assets/productImages/cableManagement/cabletie.jpg';
import product4 from '../../assets/productImages/cableManagement/cablecleats.jpg';
import product5 from '../../assets/productImages/cableManagement/cableconduits.jpg';
import product6 from '../../assets/productImages/cableManagement/cablemarkers.jpg';
import product7 from '../../assets/productImages/cableManagement/cableclips.jpg';
import product8 from '../../assets/productImages/cableManagement/cableprotectors.jpg';
import product9 from '../../assets/productImages/cableManagement/cableglandaccessories.jpg';

const CableManagement = () => {
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

    const elements = pageRef.current?.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    'High-Quality Materials',
    'International Standards',
    'Corrosion Resistant',
    'Easy Installation',
    'Custom Solutions Available',
    'Competitive Pricing',
  ];

  const products = [
    {
      name: 'Cable Glands',
      image: product1,
      description: 'High-quality cable glands for secure cable entry and sealing',
      features: ['Brass & Aluminum', 'IP68 Rated', 'Multiple Sizes', 'Corrosion Resistant'],
    },
    {
      name: 'Cable Trays',
      image: product2,
      description: 'Durable cable trays for organized cable routing',
      features: ['Galvanized Steel', 'Ladder Type', 'Perforated', 'Custom Lengths'],
    },
    {
      name: 'Cable Ties',
      image: product3,
      description: 'Heavy-duty cable ties for bundling and securing cables',
      features: ['Nylon Material', 'UV Resistant', 'Various Sizes', 'High Tensile Strength'],
    },
    {
      name: 'Cable Cleats',
      image: product4,
      description: 'Robust cable cleats for securing cables in harsh environments',
      features: ['Aluminum & Plastic', 'Short Circuit Proof', 'Easy Installation', 'IEC Compliant'],
    },
    {
      name: 'Cable Conduits',
      image: product5,
      description: 'Flexible and rigid conduits for cable protection',
      features: ['PVC & Metal', 'Flexible/Rigid', 'Fire Resistant', 'Multiple Diameters'],
    },
    {
      name: 'Cable Markers',
      image: product6,
      description: 'Clear identification markers for cable management',
      features: ['Pre-printed', 'Custom Text', 'Weather Resistant', 'Easy Application'],
    },
    {
      name: 'Cable Clips',
      image: product7,
      description: 'Secure mounting clips for cable installation',
      features: ['Plastic & Metal', 'Single/Multi Cable', 'Screw/Nail Fix', 'Various Sizes'],
    },
    {
      name: 'Cable Protectors',
      image: product8,
      description: 'Heavy duty protectors for floor and outdoor cable routing',
      features: ['Rubber Material', 'High Load Capacity', 'Multiple Channels', 'Anti Slip Surface'],
    },
    {
      name: 'Cable Gland Accessories',
      image: product9,
      description: 'Complete range of accessories for cable gland installation',
      features: ['Lock Nuts', 'Washers', 'Reducers', 'Adaptors'],
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Icon */}
          <div className="scroll-animate flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#d4a853] rounded-xl flex items-center justify-center">
              <Cable className="text-[#1a3a5c]" size={32} />
            </div>
          </div>
          
          <span className="scroll-animate delay-100 inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            PRODUCT CATEGORY
          </span>
          
          <h1 className="scroll-animate delay-200 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Cable </span>
            <span className="text-[#d4a853]">Management</span>
          </h1>
          
          <p className="scroll-animate delay-300 text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Keep your wires organized, protected, and easily accessible with our comprehensive
            cable management systems including conduits, trays, cable glands and accessories.
          </p>
          
          {/* Feature Badges */}
          <div className="scroll-animate delay-400 flex flex-wrap justify-center gap-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2"
              >
                <CheckCircle className="text-[#d4a853]" size={16} />
                <span className="text-white text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="w-full mx-auto px-4">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">
            OUR PRODUCTS
          </p>
          <h2 className="scroll-animate delay-100 text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">
            Cable Management Products
          </h2>
          <p className="scroll-animate delay-200 text-gray-600 text-center max-w-2xl mx-auto mb-12">
            At SHARDUL-GE, quality is of utmost importance. Our products are designed and
            manufactured under a quality system complying with international standards.
          </p>
          
          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={index}
                className="scroll-animate bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a3a5c] to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{product.name}</h3>
                  </div>
                </div>
                
                {/* Product Content */}
                {/* <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <ul className="space-y-2 mb-5">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-[#d4a853] rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href={`/cable-management/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#1a3a5c] hover:bg-[#243b53] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </a>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Ready to Experience Excellence */}
      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            GET STARTED
          </p>
          <h2 className="scroll-animate delay-100 text-3xl md:text-4xl font-bold text-white mb-6 italic">
            Ready to Experience Excellence?
          </h2>
          <p className="scroll-animate delay-200 text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Don't settle for anything less than the best. Our knowledgeable engineers are available to assist you
            in designing and producing high-quality products.
          </p>
          
          {/* CTA Buttons */}
          <div className="scroll-animate delay-300 flex flex-wrap justify-center gap-4">
            <a 
              href="/contact"
              className="flex items-center gap-2 bg-[#d4a853] hover:bg-[#c49843] text-white px-6 py-3 rounded font-semibold transition-colors"
            >
              <Phone size={18} />
              Contact Us
            </a>
            <a 
              href="mailto:director@shardulge.com"
              className="flex items-center gap-2 bg-transparent border-2 border-white hover:border-[#d4a853] hover:text-[#d4a853] text-white px-6 py-3 rounded font-semibold transition-colors"
            >
              <Mail size={18} />
              Email Inquiry
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CableManagement;
