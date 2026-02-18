import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/images/shardulslogo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isProductActive = () => {
    const productPaths = ['/cable-management', '/earthing-accessories', '/lugs-connectors', '/switchboard-components', '/electrical-components', '/fixings-fasteners'];
    return productPaths.includes(location.pathname);
  };

  const navLinks = [
    {name: 'Home', href: '/'},
    { name: 'About Us', href: '/about' },
    {
      name: 'Our Products & Services',
      href: '/products',
      hasDropdown: true,
      dropdownSections: [
        {
          title: 'For Business to Business',
          items: [
            { name: 'High Precision Turning Parts', href: '/high-precision-parts' },
            { name: 'CNC Components', href: '/cnc-components' },
            { name: 'Fixings & Fasteners', href: '/fixings-fasteners' },
            { name: 'Switchboard Components', href: '/switchboard-components' },
            { name: 'Cable Management', href: '/cable-management' },
            { name: 'Earthing Accessories', href: '/earthing-accessories' },
            { name: 'Lugs & Connectors', href: '/lugs-connectors' },
            // { name: 'Electrical Components', href: '/electrical-components' },
            { name: 'Thermo Plastic Parts', href: '/thermo-plastic-parts' },
            { name: 'Sub-Assembly Parts', href: '/sub-assembly-parts' },
            { name: 'Kitting Parts', href: '/kitting-parts' },
            { name: '3D Printing', href: '/3d-printing' },
          ]
        },
        {
          title: 'For Business to Distributor',
          items: [
            { name: 'Coming Soon......', href: '/' }
          ]
        }
      ]
    },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Quality System', href: '/quality' },
    { name: 'Contact Us', href: '/contact' },
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
          <a href="/contact" className="text-sm text-[#d4a853] hover:text-white transition-colors font-medium">
            Enquiry Now
          </a>
        </div>
      </div>


      {/* Main Navigation */}
      <nav className="bg-[#102a43]/90 shadow-lg">
        <div className="w-full mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="SHARDUL-GE Logo"
                  className="h-18 w-auto object-contain"
                />
              </div>
              {/* <div className="hidden sm:block">
                <p className="text-gray-300 font-bold text-lg">SHARDUL-GE</p>
                <p className="text-[#d4a853] text-xs font-semibold tracking-wider">TECHNOLOGIES</p>
              </div> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 hover:text-[#d4a853] transition-colors font-medium ${
                        isProductActive() ? 'text-[#d4a853] border-b-2 border-[#d4a853] pb-1' : 'text-gray-300'
                      }`}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      {link.name}
                      <ChevronDown size={16} />
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`hover:text-[#d4a853] transition-colors font-medium ${
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
                        {link.dropdownSections.map((section, sectionIndex) => (
                          <div key={section.title} className="p-4">
                            {/* Section Title */}
                            <div className="mb-3 pb-2 border-b-2 border-[#d4a853]">
                              <h3 className="text-sm font-bold text-[#1a3a5c] uppercase tracking-wider">
                                {section.title}
                              </h3>
                            </div>
                            {/* Section Items */}
                            <div className="space-y-1">
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

              <Link
                to="/contact"
                className="bg-[#d4a853] hover:bg-[#ff8c00] text-white px-6 py-2.5 rounded-md font-bold transition-colors shadow-md"
              >
                Enquiry Now
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
                            <div className="space-y-2">
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
                <Link
                  to="/contacts"
                  className="bg-[#d4a853] hover:bg-[#ff8c00] text-white px-6 py-2.5 rounded-md font-bold transition-colors text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enquiry Now
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
