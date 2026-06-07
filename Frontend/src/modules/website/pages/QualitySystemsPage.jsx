import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Award, Shield, FileCheck, Users, Target, Microscope, ClipboardCheck, X } from 'lucide-react';

const imgUrl = (name) => { try { return new URL(`../../../assets/images/${name}`, import.meta.url).href; } catch { return ''; } };
const prodImg = (name) => { try { return new URL(`../../../assets/productImages/${name}`, import.meta.url).href; } catch { return ''; } };

const QualitySystemsPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [isIsoModalOpen, setIsIsoModalOpen] = useState(false);
  const sectionRefs = useRef([]);

  const qualityPillars = [
    { icon: Microscope, title: 'In-House Quality Lab', description: 'Advanced quality lab with calibrated instruments for comprehensive testing and inspection.' },
    { icon: ClipboardCheck, title: 'Process Audits', description: 'Regular process audits at supplier facilities to ensure consistent quality output.' },
    { icon: FileCheck, title: 'Documentation', description: 'Complete traceability with EN10204 3.1 certificates from mill to final product.' },
    { icon: Shield, title: 'Pre-Dispatch Inspection', description: 'Every shipment undergoes thorough inspection before dispatch to customers.' },
    { icon: Users, title: 'Supplier Evaluation', description: 'Rigorous supplier assessment and periodic performance evaluation.' },
    { icon: Target, title: 'Zero Defect Goal', description: 'Committed to continuous improvement and zero-defect manufacturing.' },
  ];

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { const index = sectionRefs.current.indexOf(entry.target); if (entry.isIntersecting && index !== -1) setIsVisible(prev => ({ ...prev, [index]: true })); }); }, observerOptions);
    const scrollObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, observerOptions);
    sectionRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));
    return () => { observer.disconnect(); scrollObserver.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 border border-[#d4a853]/30">QUALITY FIRST</span>
          <h1 className="scroll-animate delay-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6"><span className="text-white">Quality </span><span className="text-[#d4a853]">Systems</span></h1>
          <p className="scroll-animate delay-200 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">Our quality management system ensures excellence at every stage of the supply chain — from sourcing to delivery.</p>
        </div>
      </section>

      {/* Quality Pillars */}
      <section ref={el => sectionRefs.current[0] = el} className={`py-20 bg-white transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">OUR QUALITY FRAMEWORK</p>
            <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-4">Six Pillars of Quality</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#d4a853] to-[#1a3a5c] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualityPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="scroll-animate bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-[#d4a853]/40 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform"><Icon className="w-7 h-7" /></div>
                  <h3 className="text-xl font-bold text-[#1a3a5c] mb-3 group-hover:text-[#d4a853] transition-colors">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ISO Certification */}
      <section ref={el => sectionRefs.current[1] = el} className={`py-20 bg-gray-50 transition-all duration-1000 ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">CERTIFICATIONS</p>
              <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-6">ISO 9001:2015 Certified</h2>
              <p className="scroll-animate delay-200 text-gray-600 leading-relaxed mb-6">Our quality management system is certified to ISO 9001:2015 standards, ensuring consistent quality, customer satisfaction, and continuous improvement across all processes.</p>
              <div className="space-y-3">
                {['Documented quality procedures', 'Regular management reviews', 'Continual improvement process', 'Customer feedback integration', 'Risk-based thinking approach'].map((item, i) => (
                  <div key={i} className="scroll-animate flex items-center gap-3"><CheckCircle2 className="text-[#d4a853] flex-shrink-0" size={20} /><span className="text-gray-700">{item}</span></div>
                ))}
              </div>
              <button onClick={() => setIsIsoModalOpen(true)} className="mt-8 bg-[#d4a853] hover:bg-[#c49843] text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"><Award size={18} />View Certificate</button>
            </div>
            <div className="scroll-animate cursor-pointer" onClick={() => setIsIsoModalOpen(true)}>
              <img src={imgUrl('iso.jpeg')} alt="ISO Certificate" className="rounded-2xl shadow-lg w-full max-w-md mx-auto object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Lab */}
      <section ref={el => sectionRefs.current[2] = el} className={`py-20 bg-white transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1"><img src={imgUrl('measumentstool.jpg')} alt="Measurement Tools" className="rounded-2xl shadow-lg w-full object-cover" /></div>
            <div className="order-1 lg:order-2">
              <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">QUALITY LAB</p>
              <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-6">Advanced Inspection Equipment</h2>
              <p className="scroll-animate delay-200 text-gray-600 leading-relaxed mb-6">Our in-house quality lab is equipped with state-of-the-art measurement and testing instruments for dimensional inspection, material testing, and surface quality verification.</p>
              <div className="grid grid-cols-2 gap-4">
                {['CMM Machines', 'Profile Projectors', 'Surface Roughness Testers', 'Hardness Testers', 'Height Gauges', 'Thread Gauges'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2"><CheckCircle2 className="text-[#d4a853] flex-shrink-0" size={16} /><span className="text-gray-700 text-sm">{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Modal */}
      {isIsoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setIsIsoModalOpen(false)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsIsoModalOpen(false)} className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10"><X size={20} /></button>
            <img src={imgUrl('iso.jpeg')} alt="ISO Certificate" className="w-full rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default QualitySystemsPage;
