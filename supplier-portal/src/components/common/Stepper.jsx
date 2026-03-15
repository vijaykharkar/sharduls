import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                index < currentStep
                  ? 'bg-green-500 border-green-500 text-white'
                  : index === currentStep
                  ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {index < currentStep ? <Check size={18} /> : index + 1}
            </div>
            <span
              className={`mt-2 text-xs font-medium whitespace-nowrap ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mx-2 mb-6 transition-all duration-500 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
