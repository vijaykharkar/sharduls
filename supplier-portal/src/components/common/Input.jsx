import React from 'react';

const Input = ({ label, error, required, className = '', ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-[#1a3a5c] mb-1.5">
          {label} {required && <span className="text-[#d4a853]">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 bg-white text-sm ${
          error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-gray-200 focus:ring-[#d4a853]/40 focus:border-[#d4a853] hover:border-[#d4a853]/50'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
