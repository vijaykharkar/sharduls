import React, { useEffect, useRef, useState } from 'react';
import { Link2, Package, Lightbulb, ArrowRight, Award, Target, TrendingUp, Shield, Users, Zap, Globe } from 'lucide-react';

const WhyChooseUsPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  const competitiveAdvantages = [
    { title: "Supply Chain Management", description: "Planning & Forecasting | Procurement & Sourcing | Warehouse Managements | Logistics & Distribution | Inventory Management", icon: <Users className="w-6 h-6" /> },
    { title: "Customer Relationship Management (CRM)", description: "Contract Management | Advance Software to handle leads & projects | Sales Pipeline tracking | Marketing automation | Customer Support & Services", icon: <Users className="w-6 h-6" /> },
    { title: "Enterprise Resource Planning (ERP)", description: "Advanced Software | Project Management | RFQ Tracking | Sales & Distribution | Supply Chain & Logistics", icon: <Users className="w-6 h-6" /> },
    { title: "Supplier Performance Management", description: "Defining Performance Criterias | Measurement & Data Collection | Analysis & Evaluation | Feedback & Communication | Corrective Action & Development", icon: <Users className="w-6 h-6" /> },
    { title: "Quality-First Approach", description: "First Sample Approval | Storage Of Golden Samples | On-site Inspection Before Dispatch of Each Shipment", icon: <Shield className="w-6 h-6" /> },
    { title: "Global Standards Compliance", description: "All suppliers are carefully audited for international compliance, including Non-disclosure agreement and business ethics standards.", icon: <Globe className="w-6 h-6" /> },
    { title: "Strategic Location in India", description: "Positioned at the heart of India's Automobile Manufacturing hub in Pune, Just 130km from Nhava Sheva sea port.", icon: <Target className="w-6 h-6" /> },
    { title: "Best-in-Class Supplier Base", description: "Wide approved supplier base of tiny, small, medium, large scale suppliers for all product categories.", icon: <Link2 className="w-6 h-6" /> },
    { title: "Consolidation for Your Suppliers & Components", description: "We can be your single contact point to co-ordinate with multiple suppliers and components within India.", icon: <Package className="w-6 h-6" /> },
    { title: "Quality Assurance & Control", description: "Assure quality at every stage from supplier selection to final delivery. All items offered with EN10204 3.1 certifications.", icon: <Lightbulb className="w-6 h-6" /> },
    { title: "Sustainability & CBAM", description: "We are committed to environmental responsibility and sustainable practices in all our operations till 2030 following UN Sustainable Development Goals.", icon: <Lightbulb className="w-6 h-6" /> },
  ];

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = sectionRefs.current.indexOf(entry.target);
        if (entry.isIntersecting && index !== -1) setIsVisible(prev => ({ ...prev, [index]: true }));
      });
    }, observerOptions);
    const scrollObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, observerOptions);
    sectionRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    document.querySelectorAll('.scroll-animate').forEach(el => { scrollObserver.observe(el); });
    return () => { observer.disconnect(); scrollObserver.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23ffffff' text-anchor='middle' dominant-baseline='central'%3E+%3C/text%3E%3C/svg%3E\")", backgroundSize: '35px 35px' }}></div></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 border border-[#d4a853]/30">Your Trusted Partner</span>
          <h1 className="scroll-animate delay-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6"><span className="text-white">Why Choose</span><br /><span className="text-[#d4a853]">SHARDUL-GE?</span></h1>
          <p className="scroll-animate delay-200 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">Experience the perfect blend of quality, reliability, and innovation with India's best in-class sourcing partner</p>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section ref={el => sectionRefs.current[0] = el} className={`py-20 bg-white transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">OUR COMPETITIVE EDGE</p>
            <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-4">What Sets Us Apart & Our Capabilities</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#d4a853] to-[#1a3a5c] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <div key={index} className="scroll-animate bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-[#d4a853]/40 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-14 h-14 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">{advantage.icon}</div>
                <h3 className="text-xl font-bold text-[#1a3a5c] mb-3 group-hover:text-[#d4a853] transition-colors duration-300">{advantage.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section ref={el => sectionRefs.current[3] = el} className={`py-20 text-white transition-all duration-1000 ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="scroll-animate text-3xl lg:text-4xl font-bold mb-6">"We Believe, in Long-Term Partnerships Built on Trust"</h2>
            <h3 className="text-[#d4a853] scroll-animate delay-100 text-xl font-bold leading-relaxed mb-8">"Complete peace of mind to our customers"</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="scroll-animate delay-200 text-center"><div className="w-16 h-16 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"><Award className="w-8 h-8 text-white" /></div><h3 className="text-2xl font-bold text-[#d4a853] mb-2">Best-in-Class</h3><p className="text-gray-300 text-sm">Audited suppliers meeting international standards</p></div>
              <div className="scroll-animate delay-300 text-center"><div className="w-16 h-16 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"><Zap className="w-8 h-8 text-white" /></div><h3 className="text-2xl font-bold text-[#d4a853] mb-2">Rapid Response</h3><p className="text-gray-300 text-sm">Prototype to production in record time</p></div>
              <div className="scroll-animate delay-400 text-center"><div className="w-16 h-16 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"><TrendingUp className="w-8 h-8 text-white" /></div><h3 className="text-2xl font-bold text-[#d4a853] mb-2">Cost Efficiency</h3><p className="text-gray-300 text-sm">Long-term price stability and savings</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUsPage;
