import React, { useEffect, useRef } from 'react';
import { CheckCircle, Phone, Mail } from 'lucide-react';

const ProductCategoryLayout = ({ icon: Icon, label, title, titleHighlight, description, features, products }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, { threshold: 0.1 });
    const elements = pageRef.current?.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {Icon && (
            <div className="scroll-animate flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#d4a853] rounded-xl flex items-center justify-center">
                <Icon className="text-[#1a3a5c]" size={32} />
              </div>
            </div>
          )}
          <span className="scroll-animate delay-100 inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">{label || 'PRODUCT CATEGORY'}</span>
          <h1 className="scroll-animate delay-200 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{title} </span>
            {titleHighlight && <span className="text-[#d4a853]">{titleHighlight}</span>}
          </h1>
          <p className="scroll-animate delay-300 text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">{description}</p>
          {features && features.length > 0 && (
            <div className="scroll-animate delay-400 flex flex-wrap justify-center gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                  <CheckCircle className="text-[#d4a853]" size={16} />
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      {products && products.length > 0 && (
        <section className="py-20 bg-white">
          <div className="w-full mx-auto px-4">
            <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">OUR PRODUCTS</p>
            <h2 className="scroll-animate delay-100 text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">{title} {titleHighlight} Products</h2>
            <p className="scroll-animate delay-200 text-gray-600 text-center max-w-2xl mx-auto mb-12">
              At SHARDUL-GE, quality is of utmost importance. Our products are designed and manufactured under a quality system complying with international standards.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div key={index} className="scroll-animate bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden card-hover group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="aspect-square relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a3a5c]/90 to-transparent p-4">
                      <h3 className="text-white font-bold text-lg">{product.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">GET STARTED</p>
          <h2 className="scroll-animate delay-100 text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready to Experience Excellence?</h2>
          <p className="scroll-animate delay-200 text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">Don't settle for anything less than the best. Our knowledgeable engineers are available to assist you in designing and producing high-quality products.</p>
          <div className="scroll-animate delay-300 flex flex-wrap justify-center gap-4">
            <a href="/contact" className="flex items-center gap-2 bg-[#d4a853] hover:bg-[#c49843] text-white px-6 py-3 rounded font-semibold transition-colors"><Phone size={18} />Contact Us</a>
            <a href="mailto:director@shardulge.com" className="flex items-center gap-2 bg-transparent border-2 border-white hover:border-[#d4a853] hover:text-[#d4a853] text-white px-6 py-3 rounded font-semibold transition-colors"><Mail size={18} />Email Inquiry</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCategoryLayout;
