import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white/60 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xs">✦</span>
              </div>
              <div>
                <p className="text-white font-bold text-xs">MandalaLux</p>
                <p className="text-gold text-[7px] tracking-widest uppercase">Artisan Market</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed">Art artisanal indien fait main. Chaque pièce raconte une histoire.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Boutique</h4>
            <div className="space-y-2">
              <Link to="/shop" className="block text-xs hover:text-white transition-colors">Tous les produits</Link>
              <Link to="/shop?cat=Mandala" className="block text-xs hover:text-white transition-colors">Mandala</Link>
              <Link to="/shop?cat=Lippan" className="block text-xs hover:text-white transition-colors">Lippan Art</Link>
              <Link to="/custom-art" className="block text-xs hover:text-white transition-colors">Art sur mesure</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Aide</h4>
            <div className="space-y-2">
              <span className="block text-xs hover:text-white transition-colors cursor-pointer">FAQ</span>
              <span className="block text-xs hover:text-white transition-colors cursor-pointer">Livraison</span>
              <span className="block text-xs hover:text-white transition-colors cursor-pointer">Retours</span>
              <span className="block text-xs hover:text-white transition-colors cursor-pointer">Contact</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Légal</h4>
            <div className="space-y-2">
              <span className="block text-xs hover:text-white transition-colors cursor-pointer">Mentions légales</span>
              <span className="block text-xs hover:text-white transition-colors cursor-pointer">CGV</span>
              <span className="block text-xs hover:text-white transition-colors cursor-pointer">Confidentialité</span>
              <span className="block text-xs hover:text-white transition-colors cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-[11px]">&copy; 2026 MandalaLux — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
