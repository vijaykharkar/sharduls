import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-500 ${
                index < currentStep
                  ? 'bg-[#d4a853] border-[#d4a853] text-white shadow-gold'
                  : index === currentStep
                  ? 'bg-[#1a3a5c] border-[#1a3a5c] text-white scale-110 shadow-navy animate-pulse-gold'
                  : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {index < currentStep ? <Check size={18} /> : index + 1}
            </div>
            <span
              className={`mt-2.5 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                index < currentStep ? 'text-[#d4a853]' : index === currentStep ? 'text-[#1a3a5c]' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="relative w-16 sm:w-24 h-0.5 mx-2 mb-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4a853] to-[#c49843] rounded-full transition-all duration-700 ${
                  index < currentStep ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
