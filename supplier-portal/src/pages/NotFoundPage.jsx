import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4">
    <div className="text-center">
      <div className="relative w-40 h-40 mx-auto mb-8">
        <svg className="w-full h-full animate-gearSpin" viewBox="0 0 100 100" fill="none" stroke="rgba(168,178,192,0.2)" strokeWidth="1.5">
          <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" />
        </svg>
        <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] animate-gearSpinReverse" viewBox="0 0 100 100" fill="none" stroke="rgba(168,178,192,0.15)" strokeWidth="1.5">
          <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-highlight">404</span>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-highlight mb-2">Page Not Found</h1>
      <p className="text-muted text-sm mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 chrome-gradient text-background rounded-xl font-bold hover:shadow-chrome transition-shadow">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
