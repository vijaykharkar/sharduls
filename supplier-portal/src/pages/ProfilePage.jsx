import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, ChevronRight } from 'lucide-react';
import { useSupplier } from '../context/SupplierContext';
import { useToast } from '../context/ToastContext';
import BusinessDetailsStep from '../components/profile/BusinessDetailsStep';
import ContactDetailsStep from '../components/profile/ContactDetailsStep';
import CategoryBrandStep from '../components/profile/CategoryBrandStep';
import AddressesStep from '../components/profile/AddressesStep';
import BankDetailsStep from '../components/profile/BankDetailsStep';
import DocumentsStep from '../components/profile/DocumentsStep';

const STEPS = [
  { key: 'businessDetails', label: 'Business Details' },
  { key: 'contactDetails', label: 'Contact Details' },
  { key: 'categoryBrand', label: 'Category & Brand' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'bankDetails', label: 'Bank Details' },
  { key: 'documents', label: 'Documents' },
];

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { profileSteps, completionPercentage } = useSupplier();
  const { addToast } = useToast();

  const goNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };
  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const goToStep = (i) => {
    if (profileSteps[STEPS[i].key] || i <= currentStep) setCurrentStep(i);
  };

  const stepComponents = [
    <BusinessDetailsStep key="s1" onNext={goNext} />,
    <ContactDetailsStep key="s2" onNext={goNext} onPrev={goPrev} />,
    <CategoryBrandStep key="s3" onNext={goNext} onPrev={goPrev} />,
    <AddressesStep key="s4" onNext={goNext} onPrev={goPrev} />,
    <BankDetailsStep key="s5" onNext={goNext} onPrev={goPrev} />,
    <DocumentsStep key="s6" onPrev={goPrev} />,
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* STEPPER — desktop: left vertical, mobile: top horizontal dots */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="lg:sticky lg:top-20 bg-surface rounded-2xl border border-border p-5">
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-highlight">{completionPercentage}%</p>
            <p className="text-[10px] text-muted uppercase tracking-wider">Profile Complete</p>
            <div className="w-full h-1.5 bg-border rounded-full mt-2 overflow-hidden">
              <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${completionPercentage}%` }} transition={{ duration: 0.8 }} />
            </div>
          </div>

          {/* Desktop vertical stepper */}
          <div className="hidden lg:block space-y-1">
            {STEPS.map((step, i) => {
              const done = profileSteps[step.key];
              const active = i === currentStep;
              return (
                <button
                  key={step.key}
                  onClick={() => goToStep(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    active ? 'bg-accent/10 border border-accent/30' : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                    done ? 'bg-accent text-white' : active ? 'chrome-gradient text-background animate-pulseChrome' : 'bg-border text-muted'
                  }`}>
                    {done ? <Check size={14} /> : i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold truncate ${active ? 'text-accent' : 'text-highlight'}`}>{step.label}</p>
                    <p className="text-[9px] text-muted">{done ? 'Complete ✓' : active ? 'In Progress' : 'Pending'}</p>
                  </div>
                  {active && <ChevronRight size={14} className="ml-auto text-accent" />}
                </button>
              );
            })}
          </div>

          {/* Mobile horizontal dots */}
          <div className="flex lg:hidden items-center justify-center gap-2 mt-2">
            {STEPS.map((step, i) => {
              const done = profileSteps[step.key];
              const active = i === currentStep;
              return (
                <button
                  key={step.key}
                  onClick={() => goToStep(i)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all ${
                    done ? 'bg-accent text-white' : active ? 'chrome-gradient text-background' : 'bg-border text-muted'
                  }`}
                >
                  {done ? <Check size={12} /> : i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FORM AREA */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            {stepComponents[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
