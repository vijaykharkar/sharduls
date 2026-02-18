import logo from '../../assets/images/logo.jpeg';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  const exploreLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Quality Systems', href: '/quality' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const aboutLinks = [
    { name: 'Company Profile', href: '/about' }
  ];

  const servicesLinks = [
    { name: 'Cable Management', href: '/cable-management' },
    { name: 'Earthing Accessories', href: '/earthing-accessories' },
    { name: 'Lugs & Connectors', href: '/lugs-connectors' },
    { name: 'Electrical Components', href: '/electrical-components' },
  ];

  const socials = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-[#0a1929] text-white font-sans">
      {/* Main Footer */}
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className='flex items-center gap-3 mb-6'>
              <img
                alt="SHARDUL-GE"
                className="h-12 w-auto"
                src={logo}
              />
              <div className="inline-block mb-4">
                <span className="text-white font-bold text-xl tracking-wide">SHARDUL-GE</span>
                <p className="block text-[#d4a853] text-xs tracking-widest">TECHNOLOGIES</p>
              </div>
            </div>
            <p className="text-gray-400 text-[15px] leading-relaxed mb-8 font-normal">
              Your trusted sourcing office in India, backed by experienced professionals delivering quality industrial solutions.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-auto">
              {socials.map((Item, index) => (
                <a
                  key={index}
                  className="w-12 h-12 bg-gradient-to-br from-[#102a43] to-[#d4a853] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 hover:rotate-14 transition-all duration-500 shadow-lg"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  aria-label={Item.label}
                >
                  <Item.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-2xl mb-6 relative">
              Explore
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#d4a853] -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#d4a853] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us & Services */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-2xl mb-6 relative">
              About Us
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#d4a853] -mb-2"></span>
            </h3>
            <ul className="space-y-3 mb-8">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#d4a853] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* <h3 className="text-white font-bold text-2xl mb-6 mt-8 relative">
              Services
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#d4a853] -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#d4a853] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Get in Touch */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-2xl mb-6 relative">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#d4a853] -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#102a43] to-[#d4a853] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 hover:rotate-14 transition-all duration-500 shadow-lg">
                  <MapPin className="text-gold-primary flex-shrink-0 mt-1" size={18} />
                </div>
                <div className="text-gray-400 text-sm leading-relaxed font-normal">
                  <span className="text-white font-semibold block mb-1">Shardul-GE Technologies Pvt. Ltd.</span>
                  Office No. 16, Upper Ground Floor,<br />
                  A Wing, Jay Ganesh Samrajya,<br />
                  Spine Road, Bhosari,<br />
                  Pune 411039
                </div>
              </li>
              <li>
                <a
                  href="tel:+919175582622"
                  className="flex items-center gap-3 text-gray-400 hover:text-gold-primary transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#102a43] to-[#d4a853] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 hover:rotate-14 transition-all duration-500 shadow-lg">
                    <Phone className="text-gold-primary flex-shrink-0" size={18} />
                  </div>
                  <span className="text-sm font-normal mb-5">+91 9175582622</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:director@shardulge.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-gold-primary transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#102a43] to-[#d4a853] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 hover:rotate-14 transition-all duration-500 shadow-lg">
                    <Mail className="text-gold-primary flex-shrink-0" size={18} />
                  </div>
                  <span className="text-sm font-normal break-all leading-none mb-5">director@shardulge.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-[14px] font-normal">
              © 2026 SHARDUL-GE Technologies. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-gold-primary text-[14px] font-normal transition-all duration-300 hover:underline underline-offset-4"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-gold-primary text-[14px] font-normal transition-all duration-300 hover:underline underline-offset-4"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
