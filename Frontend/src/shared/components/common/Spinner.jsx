import React from 'react';
import { Loader2 } from 'lucide-react';

function Spinner({ size = 28, className = '' }) {
  return (
    <div className={`flex items-center justify-center min-h-[50vh] ${className}`}>
      <Loader2 size={size} className="animate-spin text-[#d4a853]" />
    </div>
  );
}

export default Spinner;
