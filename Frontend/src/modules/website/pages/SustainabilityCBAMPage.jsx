import React, { useEffect, useRef } from 'react';
import { Globe, CheckCircle, Recycle, Heart, TrendingUp, Phone, Mail } from 'lucide-react';

const prodImg = (name) => { try { return new URL(`../../../assets/productImages/${name}`, import.meta.url).href; } catch { return ''; } };

const SustainabilityCBAMPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, { threshold: 0.1 });
    const elements = pageRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sustainabilityGoals = [
    { icon: Recycle, title: 'Carbon Neutral Operations', description: 'Committed to reducing carbon footprint across all supply chain operations by 2030.' },
    { icon: Heart, title: 'Ethical Sourcing', description: 'All suppliers evaluated for labor practices, environmental compliance, and ethical standards.' },
    { icon: Globe, title: 'Environmental Compliance', description: 'Full compliance with CBAM regulations and EU environmental directives.' },
    { icon: TrendingUp, title: 'Continuous Improvement', description: 'Regular sustainability audits and improvement targets aligned with UN SDGs.' },
  ];

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="scroll-animate flex justify-center mb-6"><div className="w-16 h-16 bg-[#d4a853] rounded-xl flex items-center justify-center"><Globe className="text-[#1a3a5c]" size={32} /></div></div>
          <span className="scroll-animate delay-100 inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">OUR COMMITMENT</span>
          <h1 className="scroll-animate delay-200 text-4xl md:text-5xl lg:text-6xl font-bold mb-6"><span className="text-white">Sustainability & </span><span className="text-[#d4a853]">CBAM</span></h1>
          <p className="scroll-animate delay-300 text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">Our commitment to environmental responsibility and compliance with the Carbon Border Adjustment Mechanism (CBAM) regulations.</p>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">SUSTAINABILITY GOALS</p>
            <h2 className="scroll-animate delay-100 text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">Our Environmental Commitment</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {sustainabilityGoals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <div key={index} className="scroll-animate bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform"><Icon className="w-7 h-7" /></div>
                  <h3 className="text-xl font-bold text-[#1a3a5c] mb-3">{goal.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CBAM Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">CBAM COMPLIANCE</p>
              <h2 className="scroll-animate delay-100 text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-6">Carbon Border Adjustment Mechanism</h2>
              <div className="space-y-4">
                <p className="scroll-animate delay-200 text-gray-600 leading-relaxed">The EU's Carbon Border Adjustment Mechanism (CBAM) puts a fair price on carbon emitted during the production of carbon-intensive goods entering the EU.</p>
                <p className="scroll-animate delay-300 text-gray-600 leading-relaxed">At SHARDUL-GE, we are fully prepared to support our customers with CBAM compliance, including carbon emission reporting and documentation for all supplied products.</p>
                <div className="scroll-animate delay-400 space-y-3 mt-6">
                  {['Full carbon emission documentation', 'Supplier carbon footprint tracking', 'CBAM reporting support', 'Sustainable sourcing practices'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3"><CheckCircle className="text-[#d4a853] flex-shrink-0" size={20} /><span className="text-gray-700">{item}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="scroll-animate"><img src={prodImg('cbam.jpg')} alt="CBAM" className="rounded-2xl shadow-lg w-full object-cover" /></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">Partner with a Sustainable Future</h2>
          <p className="scroll-animate delay-100 text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">Join us in building a greener supply chain. Contact us to learn more about our sustainability initiatives.</p>
          <div className="scroll-animate delay-200 flex flex-wrap justify-center gap-4">
            <a href="/contact" className="flex items-center gap-2 bg-[#d4a853] hover:bg-[#c49843] text-white px-6 py-3 rounded font-semibold transition-colors"><Phone size={18} />Contact Us</a>
            <a href="mailto:director@shardulge.com" className="flex items-center gap-2 bg-transparent border-2 border-white hover:border-[#d4a853] hover:text-[#d4a853] text-white px-6 py-3 rounded font-semibold transition-colors"><Mail size={18} />Email Inquiry</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityCBAMPage;
