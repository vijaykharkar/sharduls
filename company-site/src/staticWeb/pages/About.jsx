import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import founder from '../../assets/images/founder.png';
import director from '../../assets/images/director.png';
import director1 from '../../assets/images/director1.png';
import outsourcing from '../../assets/images/outsourcing.jpg';
import homeimg from '../../assets/images/homeimg.jpg';
import {
  CheckCircle,
  Handshake,
  Users,
  FlaskConical,
  Warehouse,
  Globe,
  Award,
  Shield
} from 'lucide-react';

const About = () => {
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

    const elements = pageRef.current?.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);



  return (
    <div ref={pageRef} className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-24 overflow-hidden"
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* <img src={outsourcing} alt="outsourcing" className="h-100 w-auto object-contain flex items-center" /> */}
          <span className="scroll-animate inline-block bg-[#d4a853]/20 text-[#d4a853] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6 mt-10">
            ABOUT US
          </span>
          <h1 className="scroll-animate delay-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {/* <span className="text-white">About </span>
            <span className="text-[#d4a853]">SHARDUL-GE</span> */}
            <p className="text-[#d4a853]">Industrial Solutionist...</p>
          </h1>
          <p className="scroll-animate delay-200 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your trusted sourcing office in India backed with experienced professionals delivering
            quality industrial solutions.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="scroll-animate-left">
              <p className="text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                OUR STORY
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6">
                Who We Are
              </h2>
              <div className="space-y-5">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  We are your <span className="text-[#d4a853] font-semibold">trusted sourcing partner in India</span>, supported by a team of experienced{' '}
                  <span className="text-[#1a3a5c] font-semibold">Global Supply Chain Management (SCM) professionals</span> committed to simplifying procurement and ensuring consistent quality.
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  Our capabilities cover a wide range of products including <span className="text-[#1a3a5c] font-semibold">fasteners, plastics, sheet metal components, turned parts, sub-assemblies</span>, and more. We support customers from{' '}
                  <span className="text-[#d4a853] font-semibold">prototype development to bulk production</span>, offering flexibility at every stage.
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  We collaborate exclusively with carefully audited, <span className="text-[#1a3a5c] font-semibold">best-in-class suppliers</span> who comply with international business standards and strict confidentiality requirements. Through rigorous supplier evaluations and ongoing audits, we ensure dependable quality and delivery.
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  By taking <span className="text-[#d4a853] font-semibold">full ownership of quality, cost, and timelines</span>, we provide cost-effective sourcing solutions and long-term price contract options, helping our customers achieve{' '}
                  <span className="text-[#1a3a5c] font-semibold">stability, savings, and sustainable growth</span>.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="scroll-animate-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#d4a853] to-[#1a3a5c] rounded-2xl opacity-20 blur-xl"></div>
                <img
                  src={homeimg}
                  alt="Industrial Solutions"
                  className="relative rounded-2xl shadow-2xl w-full h-150 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Leadership Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <p className="scroll-animate text-[#d4a853] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              LEADERSHIP
            </p>
            <h2 className="scroll-animate delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-4">
              Meet Our <span className="text-[#d4a853] italic">Leadership Team</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mx-auto mb-6"></div>
            <p className="scroll-animate delay-200 text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Experienced professionals driving excellence and innovation at SHARDUL-GE Technologies
            </p>
          </div>

          <div className="space-y-5">
            {/* Founder & Director - Image LEFT, Content RIGHT */}
            <div className="scroll-animate delay-200">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={founder}
                    alt="Founder & Director"
                    className="w-full max-w-[300px] mx-auto object-cover rounded-2xl"
                  />
                </div>

                {/* Content */}
                <div className="py-4">

                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-2">
                      Mr. Bhanudas Shardul
                    </h3>
                    <p className="text-[#d4a853] text-lg font-semibold mb-4">
                      Founder & Director, STPL
                    </p>
                    <div className="w-16 h-1 bg-[#d4a853]"></div>
                  </div>

                  <div className="space-y-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Award size={24} className="text-[#d4a853] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">
                          Experience & Achievements
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          Former owner of <span className="font-semibold text-[#1a3a5c]">
                            Guruprasad Engineering Works.
                          </span>Over 30 years of experience in tool room operations, industrial fabrication, and commercial carpentry products.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] text-lg italic font-medium leading-relaxed">
                      "Quality is not an act, it is a habit. Excellence in manufacturing comes from dedication, precision, and commitment to customers."
                    </p>
                  </div>

                </div>
              </div>
            </div>


            {/* Director HR & Finance - Image RIGHT, Content LEFT */}
            <div className="scroll-animate delay-200">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Content */}
                <div className="py-4 order-2 lg:order-1">
                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-2">
                      Mrs. Rupali S. Shardul
                    </h3>
                    <p className="text-[#d4a853] text-lg font-semibold mb-4">
                      Director HR & Finance, STPL
                    </p>
                    <div className="w-16 h-1 bg-[#d4a853]"></div>
                  </div>

                  <div className="space-y-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Award size={24} className="text-[#d4a853] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">
                          Qualifications & Background
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700"><span className="font-semibold text-[#1a3a5c]">Masters in Economics</span>, India</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700"><span className="font-semibold text-[#1a3a5c]">Diploma in Hairdressing</span>, France</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Former Director of <span className="font-semibold text-[#1a3a5c]">La France Salon</span>, India</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold text-base leading-relaxed">
                      Leading HR & Finance Excellence with strategic vision and operational expertise
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl order-1 lg:order-2">
                  <img
                    src={director}
                    alt="Mrs. Rupali S. Shardul"
                    className="w-full max-w-[300px] mx-auto object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Director - Image LEFT, Content RIGHT */}
            <div className="scroll-animate delay-200">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Image */}
                {/* <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={director1}
                    alt="Mr. Sachin B. Shardul"
                    className="w-full max-w-[300px] mx-auto object-cover rounded-2xl"
                  />
                </div> */}

                {/* Content */}
                {/* <div className="py-4">
                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-2">
                      Mr. Sachin B. Shardul
                    </h3>
                    <p className="text-[#d4a853] text-lg font-semibold mb-4">
                      Director, STPL
                    </p>
                    <div className="w-16 h-1 bg-[#d4a853]"></div>
                  </div>

                  <div className="space-y-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Award size={24} className="text-[#d4a853] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">
                          Expertise & Global Experience
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700"><span className="font-semibold text-[#1a3a5c]">Mechanical Engineer</span></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">PG in <span className="font-semibold text-[#1a3a5c]">Corporate Strategies & Business Leadership</span>, IIM Indore</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700"><span className="font-semibold text-[#1a3a5c]">20+ Years</span> in Global Supply Chain Management</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#d4a853]/10 rounded-xl p-5 border-l-4 border-[#d4a853]">
                    <p className="text-[#1a3a5c] font-semibold text-base mb-2">
                      Global Supply Chain Expert
                    </p>
                    <p className="text-gray-600 text-sm">
                      International experience: <span className="font-semibold text-[#1a3a5c]">6.5 years Gulf</span> | <span className="font-semibold text-[#1a3a5c]">2 years Europe</span> | <span className="font-semibold text-[#1a3a5c]">13+ years India</span>
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Philosophy Section */}
      <section className="py-16 bg-[#1a3a5c]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white mb-6 italic">
            Our Corporate Philosophy
          </h2>
          <p className="scroll-animate delay-100 text-gray-300 text-base md:text-lg leading-relaxed">
            We believe in building lasting partnerships with our clients, delivering innovative
            solutions, and maintaining unwavering commitment to quality. Our success is
            measured by the trust our customers place in us and the excellence we deliver in every
            project.
          </p>
        </div>
      </section>

      {/* <CTASection /> */}
      <Footer />
    </div>
  );
};

export default About;
