import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Car, Zap, Waves, Circle, Radio, Eye, Flame, Sun } from 'lucide-react';

const imgUrl = (name) => { try { return new URL(`../../../assets/images/${name}`, import.meta.url).href; } catch { return ''; } };

const Sectors = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, { threshold: 0.1 });
    const elements = sectionRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectors = [
    { name: t('sectors.list.automotive.name'), icon: Car, img: imgUrl('automotive.jpg'), description: t('sectors.list.automotive.description') },
    { name: t('sectors.list.electrical.name'), icon: Zap, img: imgUrl('msbc.jpg'), description: t('sectors.list.electrical.description') },
    { name: t('sectors.list.hydraulic.name'), icon: Waves, img: imgUrl('hydraulic.jpg'), description: t('sectors.list.hydraulic.description') },
    { name: t('sectors.list.plastics.name'), icon: Circle, img: imgUrl('plasticrubber.jpg'), description: t('sectors.list.plastics.description') },
    { name: t('sectors.list.communication.name'), icon: Radio, img: imgUrl('electrical.jpg'), description: t('sectors.list.communication.description') },
    { name: t('sectors.list.solar.name'), icon: Sun, img: imgUrl('solar.jpg'), description: t('sectors.list.solar.description') },
    { name: t('sectors.list.furniture.name'), icon: Eye, img: imgUrl('furniture.jpg'), description: t('sectors.list.furniture.description') },
    { name: t('sectors.list.gasOil.name'), icon: Flame, img: imgUrl('gasandoil.jpg'), description: t('sectors.list.gasOil.description') },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <p className="scroll-animate text-[#d4a853] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4">{t('sectors.label')}</p>
          <h2 className="scroll-animate delay-100 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#1a3a5c] mb-4 md:mb-6">{t('sectors.title')}</h2>
          <p className="scroll-animate delay-200 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">{t('sectors.description')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon;
            return (
              <div key={index} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" style={{ backgroundImage: `url(${sector.img})` }}>
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative z-10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-[#0052a3] group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <IconComponent className="text-white group-hover:text-[#0052a3]" size={28} />
                    </div>
                    <div className="w-24 h-24 rounded-2xl overflow-hidden opacity-100 group-hover:opacity-0 transition-opacity duration-300 ml-2">
                      <img src={sector.img} alt={sector.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h3 className="text-[#1a3a5c] group-hover:text-white font-bold text-lg mb-3 transition-colors duration-300">{sector.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
