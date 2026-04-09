import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-3 border-gold/30 border-t-gold rounded-full animate-spin" />
      <p className="text-xs text-charcoal-lighter font-medium">Chargement…</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-20">{spinner}</div>;
};

export default Loader;
