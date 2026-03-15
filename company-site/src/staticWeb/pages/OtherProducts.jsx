import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Package, Phone, Mail, Layers, Cog, Shield, Award } from 'lucide-react';
import clampsandnuts from '../../assets/images/clampsandnuts.png'
import hoseclipsclamps from '../../assets/images/hoseclipsclamps.png'
import copperbraidstripconnector from '../../assets/images/copperbraidstripconnector.jpg'
import cableclips from '../../assets/images/cableclips.png'

const OtherProducts = () => {
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
    'Custom Manufacturing',
    'High Quality Standards',
    'Precision Engineering',
    'Wide Material Range',
    'ISO Certified',
    'Competitive Pricing',
  ];

  const products = [
    {
      name: 'Clamps & Nuts',
      description: 'Precision-engineered metal components tailored to your specifications. Including brackets, plates, housings, and specialized hardware for industrial applications.',
      image: clampsandnuts,
    },
    {
      name: 'Hose Clips & MCB Termial Box',
      description: 'High-quality injection molded plastic components for automotive, electronics, and consumer goods. Available in various materials including ABS, PP, PC, and engineering plastics.',
      image: hoseclipsclamps,
    },
    {
      name: 'Copper Braid Strip Connector',
      description: 'Custom sheet metal fabrication services including cutting, bending, welding, and finishing. Suitable for enclosures, panels, brackets, and structural components.',
      image: copperbraidstripconnector,
    },
    {
      name: 'Cable Clips',
      description: 'Custom sheet metal fabrication services including cutting, bending, welding, and finishing. Suitable for enclosures, panels, brackets, and structural components.',
      image: cableclips,
    }
  ];

  const capabilities = [
    {
      icon: <Cog className="w-12 h-12 text-[#d4a853]" />,
      title: 'Advanced Manufacturing',
      description: 'State-of-the-art manufacturing facilities with modern equipment and experienced technicians.',
    },
    {
      icon: <Shield className="w-12 h-12 text-[#d4a853]" />,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes ensuring every product meets international standards.',
    },
    {
      icon: <Award className="w-12 h-12 text-[#d4a853]" />,
      title: 'ISO Certified',
      description: 'ISO 9001:2015 certified manufacturing processes for consistent quality and reliability.',
    },
    {
      icon: <Layers className="w-12 h-12 text-[#d4a853]" />,
      title: 'Custom Solutions',
      description: 'Tailored manufacturing solutions to meet your specific requirements and applications.',
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24">
        <div className="relative bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8c] text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Other Products & Components
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
                Comprehensive range of engineered components for diverse industrial applications
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                  >
                    <CheckCircle size={16} className="text-[#d4a853]" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
              Our Product Range
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              High-quality components manufactured to your exact specifications with precision and reliability
            </p>
          </div>

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
      </div>

      <Footer />

      <style jsx>{`
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default OtherProducts;
