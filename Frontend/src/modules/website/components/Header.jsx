import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, ChevronDown, LogIn, UserPlus, FileText } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

let logo;
try { logo = new URL('../../../assets/images/shardulslogo.png', import.meta.url).href; } catch { logo = null; }

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const businessDropdownRef = useRef(null);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target)) {
        setIsBusinessOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isProductActive = () => location.pathname.startsWith('/products/');

  const navLinks = [
    {name: t('header.menu.home'), href: '/'},
    { name: t('header.menu.aboutUs'), href: '/about' },
    {
      name: t('header.menu.productsServices'),
      href: '/products',
      hasDropdown: true,
      dropdownSections: [
        {
          title: t('header.b2b.title'),
          items: [
            { name: t('header.b2b.highPrecision'), href: '/products/high-precision-parts' },
            { name: t('header.b2b.cnc'), href: '/products/cnc-components' },
            { name: t('header.b2b.fixings'), href: '/products/fixings-fasteners' },
            { name: t('header.b2b.switchboard'), href: '/products/switchboard-components' },
            { name: t('header.b2b.cable'), href: '/products/cable-management' },
            { name: t('header.b2b.earthing'), href: '/products/earthing-accessories' },
            { name: t('header.b2b.lugs'), href: '/products/lugs-connectors' },
            { name: t('header.b2b.thermo'), href: '/products/thermo-plastic' },
            { name: t('header.b2b.subAssembly'), href: '/products/sub-assembly' },
            { name: t('header.b2b.kitting'), href: '/products/kitting' },
            { name: t('header.b2b.3dPrinting'), href: '/products/3d-printing' },
            { name: t('header.b2b.springs', 'All type of springs'), href: '/products/springs' },
            { name: t('header.b2b.otherProducts', 'Other Products'), href: '/products/other' }
          ]
        },
        {
          title: t('header.b2c.title'),
          items: [
            { name: t('header.b2c.comingSoon'), href: '/buyer' }
          ]
        }
      ]
    },
    { name: t('header.menu.whyChooseUs'), href: '/why-choose-us' },
    { name: t('header.menu.qualitySystem'), href: '/quality-systems' },
    { name: t('header.menu.sustainabilityCbam', 'Sustainability & CBAM'), href: '/sustainability' },
    { name: t('header.menu.contactUs'), href: '/contact' }
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#102a43] w-full mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
          <a href="tel:+919175582622" className="flex items-center gap-2 text-gray-300 hover:text-[#d4a853] transition-colors">
            <Phone size={14} />
            <span>+91 9175582622</span>
          </a>
          <a href="mailto:Director@shardulge.com" className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-[#d4a853] transition-colors">
            <Mail size={14} />
            <span>Director@shardulge.com</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link to="/contact" className="text-sm text-[#d4a853] hover:text-white transition-colors font-medium">
            {t('header.enquiryNow')}
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-[#102a43]/90 shadow-lg">
        <div className="w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="flex items-center h-16 overflow-hidden">
                {logo ? (
                  <img
                    src={logo}
                    alt="SHARDUL-GE Logo"
                    className="h-full w-auto max-w-[180px] object-contain object-left"
                  />
                ) : (
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-xl leading-tight">SHARDUL-GE</span>
                    <span className="text-[#d4a853] text-xs tracking-widest">TECHNOLOGIES</span>
                  </div>
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 flex-1 justify-end">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.hasDropdown ? (
                    <button
                      className={`flex items-center hover:text-[#d4a853] transition-colors font-medium text-[16px] whitespace-nowrap ${
                        isProductActive() ? 'text-[#d4a853] border-b-2 border-[#d4a853] pb-1' : 'text-gray-300'
                      }`}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      {link.name}
                      <ChevronDown size={14} />
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`hover:text-[#d4a853] transition-colors font-medium text-[16px] whitespace-nowrap ${
                        isActive(link.href) ? 'text-[#d4a853] border-b-2 border-[#d4a853] pb-1' : 'text-gray-300'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}

                  {link.hasDropdown && link.dropdownSections && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white shadow-2xl rounded-xl overflow-hidden transition-all duration-200 z-50 ${isProductsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      <div className="grid grid-cols-2 divide-x divide-gray-200">
                        {link.dropdownSections.map((section) => (
                          <div key={section.title} className="p-4">
                            <div className="mb-3 pb-2 border-b-2 border-[#d4a853]">
                              <h3 className="text-sm font-bold text-[#1a3a5c] uppercase tracking-wider">
                                {section.title}
                              </h3>
                            </div>
                            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#d4a853] scrollbar-track-gray-200">
                              {section.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className={`block px-3 py-2 rounded-md hover:text-[#d4a853] transition-colors text-sm font-medium ${
                                    isActive(item.href) ? 'text-[#d4a853] font-bold' : 'text-[#1a3a5c]'
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Business Dropdown */}
              <div className="relative" ref={businessDropdownRef}>
                <button
                  onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                  className="flex items-center gap-1 text-gray-300 hover:text-[#d4a853] transition-colors font-medium text-[16px] whitespace-nowrap"
                >
                  <UserPlus size={14} />
                  Business
                  <ChevronDown size={12} className={`transition-transform ${isBusinessOpen ? 'rotate-180' : ''}`} />
                </button>
                {isBusinessOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-2xl rounded-xl overflow-hidden z-50 border border-gray-100">
                    <Link
                      to="/supplier/register"
                      className="flex items-center gap-3 px-4 py-3 text-[#1a3a5c] hover:bg-[#d4a853]/10 hover:text-[#d4a853] transition-colors text-[16px] font-medium border-b border-gray-100"
                      onClick={() => setIsBusinessOpen(false)}
                    >
                      <UserPlus size={16} />
                      Become a Supplier
                    </Link>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <Link
                to="/buyer"
                className="flex items-center gap-1.5 text-[#d4a853] hover:text-white px-3 py-1.5 rounded-md font-semibold transition-colors text-[16px] whitespace-nowrap"
              >
                <LogIn size={14} />
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/20">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      to={link.href}
                      className={`block hover:text-[#d4a853] transition-colors font-medium py-2 ${
                        isActive(link.href) || (link.hasDropdown && isProductActive()) ? 'text-[#d4a853] font-bold' : 'text-gray-300'
                      }`}
                      onClick={() => !link.hasDropdown && setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && link.dropdownSections && (
                      <div className="pl-4 mt-2 space-y-4">
                        {link.dropdownSections.map((section) => (
                          <div key={section.title}>
                            <p className="text-[#d4a853] font-bold text-xs uppercase tracking-wider mb-2">
                              {section.title}
                            </p>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#d4a853] scrollbar-track-gray-700">
                              {section.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className={`block hover:text-[#d4a853] transition-colors py-1 text-sm ${
                                    isActive(item.href) ? 'text-[#d4a853] font-bold' : 'text-gray-300'
                                  }`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {/* Mobile Business Links */}
                <div className="border-t border-white/20 pt-4 mt-2 space-y-2">
                  <p className="text-[#d4a853] font-bold text-xs uppercase tracking-wider mb-2">Business</p>
                  <Link
                    to="/supplier/register"
                    className="flex items-center gap-2 text-gray-300 hover:text-[#d4a853] transition-colors py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus size={14} />
                    Become a Supplier
                  </Link>
                  <Link
                    to="/bulk-enquiry"
                    className="flex items-center gap-2 text-gray-300 hover:text-[#d4a853] transition-colors py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText size={14} />
                    Bulk Enquiry
                  </Link>
                </div>

                <Link
                  to="/buyer"
                  className="flex items-center justify-center gap-2 border-2 border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853] hover:text-white px-6 py-2.5 rounded-md font-bold transition-colors text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={16} />
                  Login
                </Link>

                <Link
                  to="/contact"
                  className="bg-[#d4a853] hover:bg-[#ff8c00] text-white px-6 py-2.5 rounded-md font-bold transition-colors text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.enquiryNow')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
