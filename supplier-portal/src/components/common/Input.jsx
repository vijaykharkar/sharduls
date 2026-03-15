import React from 'react';

const Input = ({ label, error, required, ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 border rounded-lg transition focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-400 focus:border-transparent'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
