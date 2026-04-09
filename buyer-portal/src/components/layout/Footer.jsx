import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <p className="text-white font-bold text-xs">SHARDUL-GE</p>
                <p className="text-gold-400 text-[7px] tracking-widest">MARKETPLACE</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">India's leading B2B marketplace for industrial supplies and components.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Company</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 text-xs hover:text-white transition-colors">Home</Link>
              <Link to="/bulk-enquiry" className="block text-gray-400 text-xs hover:text-white transition-colors">Bulk Enquiry</Link>
              <Link to="/become-supplier" className="block text-gray-400 text-xs hover:text-white transition-colors">Become a Supplier</Link>
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">About Us</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Support</h4>
            <div className="space-y-2">
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">Help Center</span>
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">Contact Us</span>
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">Returns & Refunds</span>
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">Shipping Info</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Policies</h4>
            <div className="space-y-2">
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">Terms of Use</span>
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">Cookie Policy</span>
              <span className="block text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">Shipping Policy</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-gray-500 text-xs">&copy; 2026 SHARDUL-GE Technologies Pvt. Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
