import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Award, Shield, FileCheck, Users, Target, Microscope, ClipboardCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import charts from '../../assets/images/charts.jpg';

import measurementtools from '../../assets/images/measumentstool.jpg';

const QualitySystems = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

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
    },
    // {
    //   icon: <Shield className="w-6 h-6" />,
    //   title: "Best-in-Class Supplier Base",
    //   description: "SHARDUL-GE ensures all quality requirements are fulfilled through an identified, evaluated, and approved best-in-class supplier base."
    // },
    // {
    //   icon: <Award className="w-6 h-6" />,
    //   title: "International Standards Compliance",
    //   description: "All suppliers are selected based on manufacturing capability, quality systems, past performance, and compliance with international standards."
    // }
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
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
                    alt="Precision Calibration Equipment"
                    className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover transform group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102a43]/60 to-transparent rounded-2xl"></div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-6">
                  Quality Systems
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

        {/* Additional Processes Section */}
        {/* <section
          ref={el => sectionRefs.current[2] = el}
          className={`py-20 bg-white transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto"> */}
        {/* <div className="text-center mb-16">
                <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                  QUALITY PROCESSES
                </p>
                <h2 className="scroll-animate delay-100 text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-4">
                  Comprehensive Quality Management
                </h2>
                <p className="scroll-animate delay-200 text-gray-600 text-lg max-w-3xl mx-auto">
                  End-to-end quality control ensuring excellence at every stage
                </p>
              </div> */}

        {/* <div className="space-y-5">
                {additionalProcesses.map((process, index) => (
                  <div
                    key={index}
                    className="scroll-animate group bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border-l-4 border-[#d4a853] hover:border-[#1a3a5c] transform hover:translate-x-3"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#d4a853]/20 to-[#1a3a5c]/20 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                          <CheckCircle2 className="w-6 h-6 text-[#d4a853]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1a3a5c] mb-3 group-hover:text-[#d4a853] transition-colors duration-300">
                          {process.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-base">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
        {/* </div>
          </div>
        </section> */}

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
