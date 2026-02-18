import React, { useEffect, useRef } from 'react';
import { ArrowRight, Phone, Mail } from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef(null);

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
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)',
      }}
    >
      {/* Decorative dots pattern
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div> */}

      {/* Decorative dots pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
        radial-gradient(circle, #ffffff 1px, transparent 2.5px),
        radial-gradient(circle, #ffffff 2px, transparent 3.5px),
        radial-gradient(circle, #ffffff 3px, transparent 5px)
      `,
            backgroundSize: `
        20px 15px,
        30px 35px,
        75px 65px
      `,
            //       backgroundPosition: `
            //   0 0,
            //   12px 12px,
            //   24px 24px
            // `
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Label */}
        <p className="scroll-animate text-[#d4a853] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4">
          ENQUIRY NOW
        </p>

        {/* Main Heading */}
        <h2 className="scroll-animate delay-100 text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 italic">
          Let Us Help You
        </h2>

        {/* Subheading */}
        <h3 className="scroll-animate delay-200 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#d4a853] mb-4 md:mb-6 italic">
          Interested in Our Expertise and Services? Let's Connect
        </h3>

        {/* Description */}
        <p className="scroll-animate delay-300 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
          To read and listen to our experts is a shortcut to improve your sourcing, quality
          control and logistics for your supply chain of C-parts.
        </p>

        {/* CTA Buttons */}
        <div className="scroll-animate delay-400 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d4a853] hover:bg-[#ff8c00] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 shadow-lg w-full sm:w-auto"
          >
            Contact Us Today
            <ArrowRight size={18} />
          </a>
          <a
            href="tel:+919175582622"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-all duration-300 border-2 border-white/50 hover:-translate-y-1 w-full sm:w-auto"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>

        {/* Contact Info */}
        <div className="scroll-animate delay-500 flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-300">
          <a
            href="tel:+919175582622"
            className="flex items-center gap-2 hover:text-[#d4a853] transition-colors"
          >
            <Phone size={18} />
            <span>+91 9175582622</span>
          </a>
          <a
            href="mailto:Director@shardulge.com"
            className="flex items-center gap-2 hover:text-[#d4a853] transition-colors"
          >
            <Mail size={18} />
            <span>Director@shardulge.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
