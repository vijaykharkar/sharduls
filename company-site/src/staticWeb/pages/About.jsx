import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import founder from '../../assets/images/founder.jpeg';
import director from '../../assets/images/director.jpeg';
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
  const { t } = useTranslation();

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
            {t('about.label')}
          </span>
          <h1 className="scroll-animate delay-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {/* <span className="text-white">About </span>
            <span className="text-[#d4a853]">SHARDUL-GE</span> */}
            <p className="text-[#d4a853]">{t('about.hero.title')}</p>
          </h1>
          <p className="scroll-animate delay-200 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('about.hero.description')}
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
                {t('about.whoWeAre.label')}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6">
                {t('about.whoWeAre.title')}
              </h2>
              <div className="space-y-5">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {t('about.whoWeAre.paragraph1')}
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {t('about.whoWeAre.paragraph2')}
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {t('about.whoWeAre.paragraph3')}
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {t('about.whoWeAre.paragraph4')}
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
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
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
              {t('about.leadership.label')}
            </p>
            <h2 className="scroll-animate delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-4">
              {t('about.leadership.title')} <span className="text-[#d4a853] italic">{t('about.leadership.titleHighlight')}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mx-auto mb-6"></div>
            <p className="scroll-animate delay-200 text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {t('about.leadership.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Founder Card */}
            <div className="scroll-animate delay-200 text-center">
              <div className="rounded-2xl p-6">

                {/* Image */}
                <div className="mb-6">
                  <img
                    src={founder}
                    alt="Founder & Director"
                    className="w-full h-100 max-w-[350px] mx-auto object-contain rounded-2xl"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a3a5c] mb-2">
                    {t('about.leadership.founder.name')}
                  </h3>

                  <p className="text-[#d4a853] text-lg font-semibold mb-3">
                    {t('about.leadership.founder.position')}
                  </p>

                  <div className="w-16 h-1 bg-[#d4a853] mx-auto"></div>
                </div>

              </div>
            </div>


            {/* Director Card */}
            <div className="scroll-animate delay-200 text-center">
              <div className="rounded-2xl p-6">

                {/* Image */}
                <div className="mb-6">
                  <img
                    src={director}
                    alt="Director"
                    className="w-full h-100 max-w-[350px] mx-auto object-contain rounded-2xl"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a3a5c] mb-2">
                    {t('about.leadership.director.name')}
                  </h3>

                  <p className="text-[#d4a853] text-lg font-semibold mb-3">
                    {t('about.leadership.director.position')}
                  </p>

                  <div className="w-16 h-1 bg-[#d4a853] mx-auto"></div>
                </div>

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
