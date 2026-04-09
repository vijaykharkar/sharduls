import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 border-2 border-gold/20 rounded-full animate-spinSlow" />
          <div className="absolute inset-4 border-2 border-gold/15 rounded-full animate-spinSlow" style={{ animationDirection: 'reverse' }} />
          <div className="absolute inset-8 border-2 border-gold/10 rounded-full animate-spinSlow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-serif font-bold text-charcoal">404</span>
          </div>
        </div>
        <h1 className="text-2xl font-serif font-bold text-charcoal mb-2">Page non trouvée</h1>
        <p className="text-charcoal-lighter text-sm mb-8 max-w-sm mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-white rounded-xl font-semibold hover:shadow-gold transition-shadow"
        >
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
