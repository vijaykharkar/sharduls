import React, { useEffect, useRef, useState } from 'react';
import { Package, Search, Warehouse, Settings, CheckCircle2, Boxes, ClipboardCheck, Truck, Shield, FileCheck } from 'lucide-react';
import qualitycontrol from '../../assets/images/qualitycontrol.jpg';

const ProcessFlow = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollLocked, setScrollLocked] = useState(false);

  const processSteps = [
    { icon: Search, label: 'Supplier Evaluation', color: 'white' },
    { icon: Package, label: 'Vendor Registration', color: 'blue' },
    { icon: Shield, label: 'Purchase', color: 'white' },
    { icon: Settings, label: 'Production', color: 'blue' },
    { icon: FileCheck, label: 'Quality Inspection', color: 'white' },
    { icon: Warehouse, label: 'Storage & Warehousing', color: 'blue' },
    { icon: CheckCircle2, label: 'Pre-Dispatch Inspection & Packaging', color: 'white' },
    { icon: Truck, label: 'Delivery & Logistics', color: 'blue' },
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const section = sectionRef.current;

    if (!scrollContainer || !section) return;

    const handleWheel = (e) => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const maxScrollLeft = scrollWidth - clientWidth;

      const rect = section.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;

      if (inView) {
        if (e.deltaY > 0 && scrollLeft < maxScrollLeft) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY;
          setScrollLocked(true);
        } else if (e.deltaY < 0 && scrollLeft > 0) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY;
          setScrollLocked(true);
        } else {
          setScrollLocked(false);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

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

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            HOW WE WORK
          </p>
          <h2 className="scroll-animate delay-100 text-xl md:text-2xl lg:text-3xl font-bold text-[#1a3a5c] mb-4">
            Our Contract Manufacturing Process Flow
          </h2>
          <p className="scroll-animate delay-200 text-gray-600 text-base max-w-3xl mx-auto">
            From sourcing to delivery - a comprehensive workflow ensuring excellence at every stage
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          className="scroll-animate delay-300 relative overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-[#d4a853] scrollbar-track-gray-200"
          style={{
            scrollbarWidth: 'thin',
          }}
        >
          <div className="flex gap-6 md:gap-8 px-4 min-w-max pb-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={index}>
                  <div
                    className={`process-card flex flex-col items-center justify-center w-24 h-24 md:w-44 md:h-44 rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-3 ${step.color === 'blue'
                      ? 'bg-[#0052a3] text-white'
                      : 'bg-white text-[#0052a3] border-2 border-[#0052a3]'
                      }`}
                    style={{
                      animation: `slideInProcess 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className={`mb-4 ${step.color === 'blue' ? 'text-white' : 'text-[#0052a3]'}`}>
                      <Icon className="w-8 h-8 md:w-16 md:h-16" strokeWidth={2} />
                    </div>
                    <p className={`text-xs md:text-base font-bold text-center px-3 leading-tight ${step.color === 'blue' ? 'text-white' : 'text-[#0052a3]'}`}>
                      {step.label}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="flex items-center">
                      <svg width="50" height="20" className="text-[#d4a853]">
                        <line
                          x1="0"
                          y1="10"
                          x2="50"
                          y2="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="6 6"
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            {scrollLocked ? (
              <span className="text-[#d4a853] font-semibold animate-pulse">⟷ Scrolling through process steps ⟷</span>
            ) : (
              <span>↕ Scroll down to navigate through our process flow ↕</span>
            )}
          </p>
        </div>

        {/* Quality Process Section */}

        

        <div className="mt-16">
          <div className="bg-gradient-to-br from-[#f8f9fa] to-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16">

            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">

              {/* LEFT — Content */}
              <div>
                <h3 className="scroll-animate text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-8">
                  Our Quality Approach...
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="scroll-animate delay-100 text-base md:text-md leading-relaxed">
                    At SHARDUL-GE TECHNOLOGIES, quality is embedded into every stage of our operations — from initial design and sourcing to final delivery and after-sales support. Our unwavering focus on excellence in products, processes, and people enables us to consistently deliver reliable solutions that meet and exceed industry standards.
                  </p>

                  <p className="scroll-animate delay-200 text-base md:text-md leading-relaxed">
                    Quality assurance and control form the foundation of our business philosophy. Through ISO-certified systems and strict adherence to approved industry specifications, we maintain a disciplined and transparent quality framework. Our comprehensive inspection and testing programs are carefully structured to ensure product integrity, performance consistency, and complete customer confidence.
                  </p>

                  <p className="scroll-animate delay-300 text-base md:text-md leading-relaxed">
                    Our dedicated quality team implements rigorous evaluation procedures across all operational phases. These standards are continuously strengthened through ongoing training, audits, and process improvements — ensuring continuous enhancement across manufacturing, procurement, and management levels.
                  </p>
                  <p className="scroll-animate delay-300 text-base md:text-md leading-relaxed">
                    This commitment to continuous improvement allows SHARDUL-GE TECHNOLOGIES to deliver superior value, long-term reliability, and trusted partnerships to every client we serve.
                  </p>
                </div>
              </div>

              {/* RIGHT — Image */}
              <div className="flex justify-center">
                <img
                  src={qualitycontrol}
                  alt="Quality Control"
                  className="rounded-2xl shadow-lg w-full max-w-md object-cover"
                />
              </div>

            </div>
          </div>
        </div>


      </div>

      <style jsx>{`
        @keyframes slideInProcess {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .scroll-animate.delay-100 {
          transition-delay: 0.1s;
        }
        .scroll-animate.delay-200 {
          transition-delay: 0.2s;
        }
        .scroll-animate.delay-300 {
          transition-delay: 0.3s;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thumb-[#d4a853]::-webkit-scrollbar-thumb {
          background-color: #d4a853;
          border-radius: 10px;
        }
        .scrollbar-track-gray-200::-webkit-scrollbar-track {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default ProcessFlow;
