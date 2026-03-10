import React, { useEffect, useRef } from 'react';
import { Leaf, Globe, CheckCircle, Shield, Users, TrendingUp, Factory, BarChart3, FileCheck, Phone, Mail, Recycle, Heart, DollarSign, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SustainabilityCBAM = () => {
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

  const sustainabilityPillars = [
    {
      icon: <Recycle className="w-7 h-7" />,
      title: 'Environmental Responsibility',
      color: 'from-green-500 to-emerald-600',
      items: [
        'Reducing carbon emissions and energy consumption',
        'Minimizing waste through circular economy principles',
        'Responsible sourcing and supply chain transparency',
      ],
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: 'Social Responsibility',
      color: 'from-blue-500 to-indigo-600',
      items: [
        'Fair labour practices and employee well-being',
        'Community engagement and inclusive growth',
        'Ethical governance and transparency',
      ],
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      title: 'Economic Sustainability',
      color: 'from-[#d4a853] to-[#c49843]',
      items: [
        'Long-term value creation over short-term gains',
        'Sustainable innovation and green investments',
        'ESG (Environmental, Social & Governance) alignment',
      ],
    },
  ];

  const whySustainabilityMatters = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      text: 'Global CO₂ levels demand urgent action from businesses',
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: 'Consumers and investors increasingly prefer sustainable brands',
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      text: 'Regulatory frameworks worldwide are mandating ESG compliance',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      text: 'Sustainable businesses demonstrate long-term resilience and profitability',
    },
  ];

  const cbamFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      text: 'Embedded carbon monitoring across supply chains',
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: 'Proactive supplier communication & data collection',
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      text: 'Dedicated compliance & regulatory reporting team',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      text: 'Aligned with EU Green Deal objectives',
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="scroll-animate flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#d4a853] rounded-2xl flex items-center justify-center">
              <Leaf className="text-[#1a3a5c]" size={40} />
            </div>
          </div>

          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-5 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 border border-[#d4a853]/30">
            SUSTAINABILITY & CBAM
          </span>

          <h1 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Sustainability at the Heart of </span>
            <span className="text-[#d4a853]">Everything We Do</span>
          </h1>

          <p className="scroll-animate text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            We also provide consultancy & services on Sustainability & CBAM from certified and expert professionals.
          </p>

          <div className="scroll-animate flex flex-wrap justify-center gap-3">
            {['ESG Compliance', 'Carbon Monitoring', 'EU Green Deal', 'Supplier Development'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                <CheckCircle className="text-[#d4a853]" size={16} />
                <span className="text-white text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: Sustainability */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              SECTION 1
            </p>
            <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6">
              Sustainability
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mx-auto mb-8"></div>
            <p className="scroll-animate text-gray-700 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              Sustainability is no longer a choice — it is a responsibility. At SHARDUL-GE, we are committed to integrating environmentally and socially responsible practices into every aspect of our business, helping create a future that is cleaner, fairer, and more resilient. We ensure supplier development those are well aware about sustainability responsibility and practice in regular work.
            </p>
          </div>

          {/* Key Sustainability Pillars */}
          <div className="mb-16">
            <h3 className="scroll-animate text-2xl md:text-3xl font-bold text-[#1a3a5c] text-center mb-12">
              Key Sustainability Pillars We Ensure in Our Supply Chain
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {sustainabilityPillars.map((pillar, index) => (
                <div
                  key={index}
                  className="scroll-animate bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                >
                  <div className={`bg-gradient-to-r ${pillar.color} p-6`}>
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      {pillar.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white">{pillar.title}</h4>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {pillar.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="text-[#d4a853] flex-shrink-0 mt-0.5" size={18} />
                          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Sustainability Matters */}
          <div className="scroll-animate bg-gradient-to-br from-[#1a3a5c] to-[#102a43] rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Why Sustainability Matters at <span className="text-[#d4a853]">SHARDUL-GE</span>
              </h3>
              <div className="w-16 h-1 bg-[#d4a853] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {whySustainabilityMatters.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white/10 rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-[#d4a853]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-[#d4a853]">{item.icon}</div>
                  </div>
                  <p className="text-gray-200 text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CBAM */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              SECTION 2
            </p>
            <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6">
              CBAM <span className="text-[#d4a853] italic">(Carbon Border Adjustment Mechanism)</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mx-auto mb-8"></div>
          </div>

          {/* What is CBAM */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="scroll-animate space-y-6">
              <div>
                <span className="inline-block bg-[#d4a853]/10 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  NAVIGATING CBAM WITH CONFIDENCE
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4">
                  What is CBAM?
                </h3>
                <div className="w-20 h-1 bg-[#d4a853] mb-6"></div>
              </div>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                The Carbon Border Adjustment Mechanism (CBAM) is a landmark European Union regulation designed to put a fair carbon price on imports of certain goods from outside the EU. It ensures that ambitious EU climate policies are not undermined by importing goods produced with higher carbon emissions in non-EU countries.
              </p>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                At SHARDUL-GE, we proactively monitor regulatory developments and ensure full compliance with CBAM requirements. Our carbon tracking systems, supplier engagement programs, and transparent reporting processes ensure we are ahead of the curve — protecting our clients and partners from compliance risks.
              </p>
            </div>

            <div className="scroll-animate">
              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#102a43] rounded-2xl p-8 md:p-10">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-[#d4a853]/20 rounded-2xl flex items-center justify-center">
                    <Globe className="text-[#d4a853]" size={40} />
                  </div>
                </div>
                <h4 className="text-white text-xl font-bold text-center mb-2">EU Regulation</h4>
                <p className="text-gray-300 text-center text-sm mb-6">Carbon Border Adjustment Mechanism</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <Shield className="text-[#d4a853] flex-shrink-0" size={20} />
                    <span className="text-gray-200 text-sm">Fair carbon pricing on imports</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <Factory className="text-[#d4a853] flex-shrink-0" size={20} />
                    <span className="text-gray-200 text-sm">Prevents carbon leakage</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <TrendingUp className="text-[#d4a853] flex-shrink-0" size={20} />
                    <span className="text-gray-200 text-sm">Supports EU climate goals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CBAM Compliance Features */}
          <div className="scroll-animate">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1a3a5c] text-center mb-10">
              Our CBAM Compliance Approach
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cbamFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-[#d4a853]/40 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    {feature.icon}
                  </div>
                  <p className="text-[#1a3a5c] font-semibold text-base leading-relaxed group-hover:text-[#d4a853] transition-colors duration-300">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">GET IN TOUCH</p>
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">
            Need Sustainability & CBAM Consultancy?
          </h2>
          <p className="scroll-animate text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Our certified experts can guide your organization through sustainability best practices and CBAM compliance requirements.
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

export default SustainabilityCBAM;
