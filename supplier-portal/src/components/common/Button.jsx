import React from 'react';

const Button = ({ children, variant = 'primary', loading, disabled, className = '', ...props }) => {
  const base = 'px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-md',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
