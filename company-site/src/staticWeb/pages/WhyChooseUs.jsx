import React, { useEffect, useRef, useState } from 'react';
import {
  Link2, Package, Lightbulb, ArrowRight, Award, Target, TrendingUp, Shield, Users, Zap, CheckCircle2, Clock, Globe, Handshake, CheckCircle,
  FlaskConical,
  Warehouse
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import Specialists from '../components/Specialists';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  const commitments = [
    'Supplier Evolution & Accessments',
    'Periodic Sourcing & Quality Audits',
    'Supplier Approval & Classification',
    'Cost Improvements & Price Contracts'
  ];

  const capabilities = [
    {
      icon: Users,
      title: 'Experienced SCM Professionals',
      description: 'Strong & experienced Supply Chain Management team to ease your procurement',
    },
    {
      icon: FlaskConical,
      title: 'Advanced Quality Lab',
      description: 'Well-equipped quality lab with advanced instruments ensuring excellence',
    },
    {
      icon: Warehouse,
      title: 'Warehouse Facility',
      description: 'Modern warehouse infrastructure for efficient inventory management',
    },
    {
      icon: Globe,
      title: 'Best Supplier Base',
      description: "World's best suppliers through proper evaluation & onsite audits",
    },
  ];

  const competitiveAdvantages = [
    {
      title: "Supply Chain Management",
      description: "Planning & Forecasting | Procurement & Sourcing | Warehouse Managements | Logistics & Distribution | Inventory Management",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Customer Relationship Management (CRM)",
      description: "Contract Management | Advance Software to handle leads & projects | Sales Pipeline tracking | Marketing automation | Customer Support & Services | Analytics & Reporting | Task & Activity Management",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Enterprise Resource Planning (ERP)",
      description: "Advanced Software | Project Management | RFQ Tracking | Sales & Distribution | Supply Chain & Logistics",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Supplier Performance Management",
      description: "Defining Performance Criterias | Measurement & Data Collection | Analysis & Evaluation | Feedback & Communication | Corrective Action & Development | Risk Management | Continuous Monitoring",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Quality-First Approach",
      description: "First Sample Approval | Storage Of Golden Samples | On-site Inspection Before Dispatch of Each Shipment",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Global Standards Compliance",
      description: "All suppliers are carefully audited for international compliance, including Non-disclosere aggrement and business ethics standards and Complete confidentiality and protection of your intellectual property.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Strategic Location in India",
      description: "Positioned at the heart of India's Automobile Manufacturing hub in Pune, Just 130km from Nhava Sheva sea port, well connected by National High-way. providing cost advantages and access to world-class suppliers.",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: 'Best-in-Class Supplier Base',
      description: 'Wide approved suppiler base of tiny, small, medium, large scale suppilers for all product categories.',
      icon: <Link2 className="w-6 h-6" />
    },
    {
      title: 'Consolidation for Your Suppliers & Components',
      description: 'We can be your single contact point to co-ordinate with multiple suppliers and components within India. We can represent you here and ensure right quality supply, consolidation of shipments to avoid any last moment rejection at your end.',
      icon: <Package className="w-6 h-6" />
    },
    {
      title: 'Quality Assurance & Control',
      description: 'Assure quality at every stage from supplier selection to final delivery. All items offered with EN10204 3.1 certifications featuring full traceability from the mill till secondary operation. 3rd party inspections are available upon request. Surface coatings: Plain, Hot Dip Galvanizing, Zinc Flake, Phosphate, Zinc Plate, Nickel, Chrome etc..',
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      title: 'Sustainability',
      description: 'In addition to our financial targets, we are committed to environmental responsibility and sustainable practices in all our operations till 2030 following UN Sustainable Development Goals.',
      icon: <Lightbulb className="w-6 h-6" />
    }
  ];

  const specialties = [
    {
      title: "Precision Engineering",
      description: "Custom machining and inspection procedures for complex, high-precision components that exceed industry standards.",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
    },
    {
      title: "Diverse Product Portfolio",
      description: "Comprehensive sourcing of fasteners, plastics, sheet metal, turned parts, sub-assemblies, and electrical components.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
    },
    {
      title: "End-to-End Solutions",
      description: "Complete supply chain management from supplier selection to quality control, warehousing, and timely delivery.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
    }
  ];

  const promises = [
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "Guaranteed quality through rigorous inspection and testing protocols"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "On-time delivery with transparent tracking and communication"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "Competitive pricing with no hidden costs or surprises"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "Full ownership of quality, cost, and timelines for your peace of mind"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "Complete confidentiality and protection of your intellectual property"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "Dedicated support throughout the entire sourcing and production lifecycle"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = sectionRefs.current.indexOf(entry.target);
        if (entry.isIntersecting && index !== -1) {
          setIsVisible(prev => ({ ...prev, [index]: true }));
        }
      });
    }, observerOptions);

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    document.querySelectorAll('.scroll-animate').forEach(el => {
      scrollObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      scrollObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section
          className="relative py-24 lg:py-32 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23ffffff' text-anchor='middle' dominant-baseline='central'%3E+%3C/text%3E%3Csvg%3E\")",
              backgroundSize: '35px 35px'
            }}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 border border-[#d4a853]/30">
              Your Trusted Partner
            </span>
            <h1 className="scroll-animate delay-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Why Choose</span>
              <br />
              <span className="text-[#d4a853]">SHARDUL-GE?</span>
            </h1>
            <p className="scroll-animate delay-200 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of quality, reliability, and innovation with India's best in-class sourcing partner
            </p>
          </div>
        </section>

        {/* Competitive Advantages Section */}
        <section
          ref={el => sectionRefs.current[0] = el}
          className={`py-20 bg-white transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                OUR COMPETITIVE EDGE
              </p>
              <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-4">
                What Sets Us Apart & Our Capabilities
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#d4a853] to-[#1a3a5c] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {competitiveAdvantages.map((advantage, index) => (
                <div
                  key={index}
                  className="scroll-animate bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-[#d4a853]/40 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3a5c] mb-3 group-hover:text-[#d4a853] transition-colors duration-300">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Specialties Section */}
        {/* <section
          ref={el => sectionRefs.current[1] = el}
          className={`py-20 bg-gray-50 transition-all duration-1000 ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                CORE EXPERTISE
              </p>
              <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-4">
                Our Specialties
              </h2>
              <p className="scroll-animate delay-200 text-gray-600 text-lg max-w-3xl mx-auto">
                Delivering excellence across diverse manufacturing domains
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="scroll-animate group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={specialty.image}
                      alt={specialty.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102a43]/90 via-[#102a43]/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {specialty.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">
                      {specialty.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Our Commitments Section */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="scroll-animate bg-[#1a3a5c] rounded-2xl p-8 md:p-12">
              
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-[#d4a853]/20 rounded-full flex items-center justify-center">
                  <Handshake className="text-[#d4a853]" size={28} />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
                Supplier Performance Management
              </h3>

             
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {commitments.map((commitment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-[#243b53] rounded-lg p-4"
                  >
                    <CheckCircle className="text-[#d4a853] flex-shrink-0" size={20} />
                    <span className="text-white text-sm">{commitment}</span>
                  </div>
                ))}
              </div>

              <p className="text-[#d4a853] text-center text-sm md:text-base italic">
                Partner with us to experience seamless procurement, guaranteed quality, and cost-effective solutions tailored to your business needs.
              </p>
            </div>
          </div>
        </section> */}

        {/* Our Promise Section */}
        {/* <section
          ref={el => sectionRefs.current[2] = el}
          className={`py-20 bg-white transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                  OUR COMMITMENT
                </p>
                <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-4">
                  What We Promise
                </h2>
                <p className="scroll-animate delay-200 text-gray-600 text-lg max-w-3xl mx-auto">
                  Your success is our priority. Here's what you can always count on
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {promises.map((promise, index) => (
                  <div
                    key={index}
                    className="scroll-animate flex items-start gap-4 bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border-l-4 border-[#d4a853] group hover:border-[#1a3a5c] transform hover:translate-x-2"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#d4a853]/20 to-[#1a3a5c]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <span className="text-[#d4a853]">{promise.icon}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base font-medium pt-2">
                      {promise.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Our Capabilities Section */}
        {/* <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4 text-center">
              WHAT WE OFFER
            </p>
            <h2 className="scroll-animate delay-100 text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 text-center italic">
              Our Capabilities
            </h2>
            <p className="scroll-animate delay-200 text-gray-600 text-center mb-12">
              Comprehensive infrastructure and expertise to serve your needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((capability, index) => {
                const IconComponent = capability.icon;
                const isLast = index === capabilities.length - 1;
                return (
                  <div
                    key={index}
                    className={`scroll-animate delay-${(index + 1) * 100} p-6 rounded-xl text-center card-hover ${isLast
                      ? 'bg-[#d4a853]/10 border-2 border-[#d4a853]'
                      : 'bg-white shadow-lg border border-gray-100'
                      }`}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${isLast ? 'bg-[#d4a853]/20' : 'bg-[#1a3a5c]'
                      }`}>
                      <IconComponent className={isLast ? 'text-[#d4a853]' : 'text-[#d4a853]'} size={28} />
                    </div>
                    <h3 className="text-[#1a3a5c] font-bold mb-2">{capability.title}</h3>
                    <p className="text-gray-500 text-sm">{capability.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section> */}

        {/* Why Partner Section */}
        <section
          ref={el => sectionRefs.current[3] = el}
          className={`py-20 text-white transition-all duration-1000 ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)',
          }}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="scroll-animate text-3xl lg:text-4xl font-bold mb-6">
                "We Believe, in Long-Term Partnerships Built on Trust"
              </h2>
              <h3 className="text-[#d4a853] scroll-animate delay-100 text-xl font-bold leading-relaxed mb-8">
                "Complete peace of mind to our customers"
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="scroll-animate delay-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#d4a853] mb-2">Best-in-Class</h3>
                  <p className="text-gray-300 text-sm">Audited suppliers meeting international standards</p>
                </div>
                <div className="scroll-animate delay-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#d4a853] mb-2">Rapid Response</h3>
                  <p className="text-gray-300 text-sm">Prototype to production in record time</p>
                </div>
                <div className="scroll-animate delay-400 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#d4a853] mb-2">Cost Efficiency</h3>
                  <p className="text-gray-300 text-sm">Long-term price stability and savings</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default WhyChooseUs;
