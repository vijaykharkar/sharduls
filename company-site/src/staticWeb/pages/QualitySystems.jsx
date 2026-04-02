import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Award, Shield, FileCheck, Users, Target, Microscope, ClipboardCheck, FileText, BadgeCheck, Eye, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import charts from '../../assets/images/charts.jpg';

import measurementtools from '../../assets/images/measumentstool.jpg';
import mannatechceoresponds from '../../assets/productImages/mannatechceoresponds.jpg';
import isoCertificate from '../../assets/images/iso.jpeg';

const QualitySystems = () => {
  const [isVisible, setIsVisible] = useState({});
  const [isIsoModalOpen, setIsIsoModalOpen] = useState(false);
  const sectionRefs = useRef([]);

  const certifications = [
    {
      id: 'iso',
      title: 'ISO 9001:2015',
      subtitle: 'Quality Management System',
      description: 'Certified for Trading, Supply and Export of C-Class Industrial Items',
      hasImage: true,
      image: isoCertificate,
      icon: <Award className="w-8 h-8" />,
      certNo: 'QCC/6C4B/0326',
      validity: 'Valid until March 2029',
    },
    {
      id: 'incorporation',
      title: 'Company Incorporation Certificate',
      subtitle: 'Ministry of Corporate Affairs',
      description: 'Registered under the Companies Act as a Private Limited Company',
      hasImage: false,
      icon: <FileText className="w-8 h-8" />,
      color: 'from-[#1a3a5c] to-[#0f2540]',
    },
    {
      id: 'gst',
      title: 'GST Tax Certificate',
      subtitle: 'Goods & Services Tax',
      description: 'Registered under GST for inter-state and intra-state supply of goods',
      hasImage: false,
      icon: <FileCheck className="w-8 h-8" />,
      color: 'from-[#2d6a4f] to-[#1b4332]',
    },
    {
      id: 'msme',
      title: 'MSME Certificate',
      subtitle: 'Micro, Small & Medium Enterprises',
      description: 'Registered under MSME Development Act for enterprise recognition',
      hasImage: false,
      icon: <Shield className="w-8 h-8" />,
      color: 'from-[#7b2d8e] to-[#5a1d6b]',
    },
    {
      id: 'import-export',
      title: 'Import & Export Certificate',
      subtitle: 'Directorate General of Foreign Trade',
      description: 'Licensed for international trade and cross-border transactions',
      hasImage: false,
      icon: <BadgeCheck className="w-8 h-8" />,
      color: 'from-[#c2410c] to-[#9a3412]',
    },
  ];

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.1 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    // Scroll animation observer for .scroll-animate elements
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      scrollObserver.observe(el);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
      scrollObserver.disconnect();
    };
  }, []);

  const qualityPoints = [
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Material Traceability",
      description: "Raw material traceability is maintained from mill to finished product through supplier documentation and verified records."
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Comprehensive Inspections",
      description: "Incoming, in-process, and final inspections are carried out at supplier premises as per agreed inspection and control plans."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Documentation Validation",
      description: "SHARDUL-GE reviews and validates inspection reports, test certificates, and EN10204 3.1 documentation prior to dispatch."
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Calibrated Instruments",
      description: "We ensure Use of calibrated measuring instruments by our suppilers."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Third-Party Inspection",
      description: "Third-party inspection agencies. can be arranged upon customer request."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Customer-Specific Documentation",
      description: "PPAP level 3, APQP, and customer-specific documentation can be coordinated through suppliers wherever applicable."
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "CAPA Management",
      description: "Non-conformance handling, corrective and preventive actions (CAPA) are driven and closed in coordination with suppliers."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Single Point Responsibility",
      description: "SHARDUL-GE acts as a single point of responsibility, ensuring customer specifications are fully met across the complete supply chain."
    }
  ];

  const additionalProcesses = [
    {
      title: "CAPA Management",
      description: "Non-conformance handling, corrective and preventive actions (CAPA) are driven and closed in coordination with suppliers."
    },
    {
      title: "Single Point Responsibility",
      description: "SHARDUL-GE acts as a single point of responsibility, ensuring customer specifications are fully met across the complete supply chain."
    }
  ];

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
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23ffffff' text-anchor='middle' dominant-baseline='central'%3E+%3C/text%3E%3C/svg%3E\")",
              backgroundSize: '35px 35px'
            }}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 border border-[#d4a853]/30">
              Quality Excellence
            </span>
            <h1 className="scroll-animate delay-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Your Partner for</span>
              <br />
              <span className="text-[#d4a853]">Precision Components</span>
            </h1>
            <p className="scroll-animate delay-200 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Delivering unmatched quality through advanced systems and rigorous standards
            </p>
          </div>
        </section>

        {/* Calibration Image Section */}
        <section
          ref={el => sectionRefs.current[0] = el}
          className={`py-15 bg-white transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#d4a853]/20 to-[#1a3a5c]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
                  <img
                    src={mannatechceoresponds}
                    alt="Precision Calibration Equipment"
                    className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover transform group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102a43]/60 to-transparent rounded-2xl"></div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-6">
                  Quality System
                </h2>
                <p className="scroll-animate delay-200 text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                  As an innovative contract manufacturer, we are adept at developing custom inspection procedures that allow us to supply parts with a high degree of <span className="text-[#1a3a5c] font-semibold">complexity and precision</span> that is unmatched by our industry peers in India.
                </p>
                <p className="scroll-animate delay-300 text-gray-600 text-base md:text-lg leading-relaxed">
                  Our customers' appreciation for the level of <span className="text-[#d4a853] font-semibold">quality, service, and reliability</span> that SHARDUL-GE provides is most important for us to maintained long term partnerships with them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section
          ref={el => sectionRefs.current[2] = el}
          className={`py-20 bg-gradient-to-b from-white to-gray-50 transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                CERTIFICATIONS & ACCREDITATIONS
              </p>
              <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-4">
                Our Certifications
              </h2>
              <p className="scroll-animate delay-200 text-gray-600 text-lg max-w-3xl mx-auto mb-5">
                Backed by internationally recognized certifications ensuring the highest standards of quality, compliance, and trust
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#d4a853] to-[#1a3a5c] mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* ISO Certificate - Featured Card (Clean White) */}
              <div
                className="scroll-animate lg:col-span-1 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-gray-100 hover:border-[#d4a853]/50 group overflow-hidden"
              >
                <div className="px-6 pb-2 mt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-[#d4a853] rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a3a5c]">ISO 9001:2015</h3>
                      <p className="text-[#d4a853] text-xs font-semibold tracking-wide uppercase">Quality Management System</p>
                    </div>
                  </div>
                </div>
                <div className="relative bg-white p-4 cursor-pointer" onClick={() => setIsIsoModalOpen(true)}>
                  <img
                    src={isoCertificate}
                    alt="ISO 9001:2015 Certificate"
                    className="w-full h-auto rounded-xl border border-gray-200 transform group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6 w-10 h-10 bg-[#1a3a5c]/70 hover:bg-[#d4a853] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Certified for Trading, Supply and Export of C-Class Industrial Items Including Fasteners, Threaded Components, Fabricated Items and Turned Parts.
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-[#d4a853]/10 text-[#b8922e] px-3 py-1.5 rounded-full font-semibold">Cert: QCC/6C4B/0326</span>
                    <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Valid until 2029
                    </span>
                  </div>
                </div>
              </div>

              {/* Other Certificates - Numbered Pill Cards */}
              <div className="lg:col-span-2 flex flex-col gap-5 justify-center py-4">
                {certifications.filter(cert => !cert.hasImage).map((cert, index) => (
                  <div
                    key={cert.id}
                    className="scroll-animate flex items-center gap-0 group"
                    style={{ paddingLeft: index % 2 === 0 ? '0px' : '28px', transitionDelay: `${index * 0.1}s` }}
                  >
                    {/* Numbered circle badge */}
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${cert.color} rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg z-10 group-hover:scale-110 transition-transform duration-400 border-4 border-white`}
                      style={{ minWidth: '3.5rem' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Pill-shaped content */}
                    <div
                      className="flex-1 -ml-3 flex items-center justify-between bg-white border border-gray-200 group-hover:border-[#d4a853]/60 group-hover:shadow-lg shadow-sm transition-all duration-500 pl-7 pr-5 py-3.5"
                      style={{ borderRadius: '0 50px 50px 0' }}
                    >
                      <div>
                        <h3 className="text-sm font-bold text-[#1a3a5c] group-hover:text-[#d4a853] transition-colors duration-300 leading-snug">
                          {cert.title}
                        </h3>
                        <p className="text-gray-400 text-xs mt-0.5">{cert.subtitle}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-gray-200 group-hover:text-[#d4a853] flex-shrink-0 ml-4 transition-colors duration-300" />
                    </div>
                  </div>
                ))}

                {/* Trust strip */}
                <div className="mt-3 bg-gradient-to-r from-[#1a3a5c]/5 to-[#d4a853]/10 rounded-2xl p-4 flex items-center gap-3 border border-[#d4a853]/20">
                  <div className="w-9 h-9 bg-[#1a3a5c] rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[#d4a853]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">All Documents Government Verified</p>
                    <p className="text-xs text-gray-500 mt-0.5">Registered & certified with relevant Indian authorities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ISO Certificate Modal */}
        {isIsoModalOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setIsIsoModalOpen(false)}
          >
            <div
              className="relative max-w-2xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl animate-[scaleIn_0.3s_ease-out]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsIsoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#1a3a5c]/80 hover:bg-[#d4a853] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={isoCertificate}
                alt="ISO 9001:2015 Certificate - SHARDUL-GE Technologies"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* Quality Points Grid */}
        <section
          ref={el => sectionRefs.current[1] = el}
          className={`py-12 bg-gray-50 transition-all duration-1000 ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                QUALITY FRAMEWORK
              </p>
              <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-4">
                Our Quality Assurance Framework
              </h2>
              <p className="scroll-animate delay-200 text-gray-600 text-lg max-w-3xl mx-auto mb-5">
                End-to-end quality control ensuring excellence at every stage
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#d4a853] to-[#1a3a5c] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {qualityPoints.map((point, index) => (
                <div
                  key={index}
                  className="scroll-animate bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-[#d4a853]/40 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    {point.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a3a5c] mb-3 group-hover:text-[#d4a853] transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calibration Equipment Showcase */}
        <section
          ref={el => sectionRefs.current[3] = el}
          className={`py-20 text-white transition-all duration-1000 ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)',
          }}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
              <div className="lg:col-span-1 flex flex-col justify-center">
                <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                  ADVANCED FACILITIES
                </p>
                <h2 className="scroll-animate delay-100 text-4xl lg:text-2xl font-bold mb-6">
                  <span className="text-white">Precision Calibration & Testing</span>
                </h2>
                <p className="scroll-animate delay-200 text-gray-300 text-lg leading-relaxed">
                  State-of-the-art calibration equipment and testing facilities ensure every component meets exact specifications.
                </p>
              </div>
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                <div className="scroll-animate delay-300 group relative overflow-hidden rounded-xl shadow-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-700">
                  <img
                    src={measurementtools}
                    alt="Measurement Tools"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102a43] via-[#102a43]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">Measurement Tools</h3>
                    <p className="text-gray-200 text-sm">High-precision instruments</p>
                  </div>
                </div>
                <div className="scroll-animate delay-400 group relative overflow-hidden rounded-xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-700">
                  <img
                    src={charts}
                    alt="Quality Control"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102a43] via-[#102a43]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">Quality Control</h3>
                    <p className="text-gray-200 text-sm">Rigorous testing protocols</p>
                  </div>
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

export default QualitySystems;
