import React from 'react';
import { Link } from 'react-router-dom';
let logo;
try { logo = new URL('../../../../assets/logo.jpeg', import.meta.url).href; } catch { logo = null; }

const sections = [
  { title: 'Shop', links: [{ label: 'All Products', to: '/buyer/products' }, { label: 'Mobiles', to: '/buyer/products?category=Mobiles' }, { label: 'Electronics', to: '/buyer/products?category=Electronics' }, { label: 'Fashion', to: '/buyer/products?category=Fashion' }] },
  { title: 'Account', links: [{ label: 'My Profile', to: '/buyer/profile' }, { label: 'Orders', to: '/buyer/orders' }, { label: 'Wishlist', to: '/buyer/wishlist' }, { label: 'Cart', to: '/buyer/cart' }] },
  { title: 'Help', links: [{ label: 'Contact Us', to: '/contact' }, { label: 'FAQs', to: '#' }, { label: 'Shipping', to: '#' }, { label: 'Returns', to: '#' }] },
];

export default function BuyerFooter() {
  return (
    <footer className="bg-[#0a1929] text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-1">
            {logo ? <img src={logo} alt="Shardul-GE" className="h-8 sm:h-9 w-auto object-contain mb-3" /> : <span className="text-white font-bold text-lg block mb-3">Shardul-GE</span>}
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">Global Industrial Solutionist — Your one-stop shop for quality industrial products at the best prices.</p>
          </div>
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-bold text-[#d4a853] mb-3">{s.title}</h4>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l.label}><Link to={l.to} className="text-xs text-gray-400 hover:text-[#d4a853] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Shardul-GE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
