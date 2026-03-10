import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n/config';
import { ChevronDown, Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage = languages[i18n.language] || languages.en;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#d4a853] transition-colors"
      >
        <Globe size={20} />
        <span>{currentLanguage.name}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          <div className="max-h-96 overflow-y-auto">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 ${
                  i18n.language === code ? 'text-[#d4a853] font-semibold' : 'text-gray-700'
                }`}
              >
                <img
                  src={`https://flagcdn.com/24x18/${lang.country}.png`}
                  alt={`${lang.name} flag`}
                  className="w-6 h-4 object-cover rounded"
                />
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
