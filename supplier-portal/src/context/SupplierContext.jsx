import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SupplierContext = createContext(null);

const DEFAULT_STEPS = {
  businessDetails: false,
  contactDetails: false,
  categoryBrand: false,
  addresses: false,
  bankDetails: false,
  documents: false,
};

const STEP_KEYS = Object.keys(DEFAULT_STEPS);

const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};

export const SupplierProvider = ({ children }) => {
  const [profileSteps, setProfileSteps] = useState(() => load('sp_profileSteps', DEFAULT_STEPS));
  const [businessDetails, setBusinessDetails] = useState(() => load('sp_businessDetails', null));
  const [contactDetails, setContactDetails] = useState(() => load('sp_contactDetails', null));
  const [categoryBrand, setCategoryBrand] = useState(() => load('sp_categoryBrand', null));
  const [addresses, setAddresses] = useState(() => load('sp_addresses', { billing: null, pickup: [] }));
  const [bankDetails, setBankDetails] = useState(() => load('sp_bankDetails', null));
  const [documents, setDocuments] = useState(() => load('sp_documents', {}));

  const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  useEffect(() => { save('sp_profileSteps', profileSteps); }, [profileSteps]);
  useEffect(() => { save('sp_businessDetails', businessDetails); }, [businessDetails]);
  useEffect(() => { save('sp_contactDetails', contactDetails); }, [contactDetails]);
  useEffect(() => { save('sp_categoryBrand', categoryBrand); }, [categoryBrand]);
  useEffect(() => { save('sp_addresses', addresses); }, [addresses]);
  useEffect(() => { save('sp_bankDetails', bankDetails); }, [bankDetails]);
  useEffect(() => { save('sp_documents', documents); }, [documents]);

  const completedCount = STEP_KEYS.filter((k) => profileSteps[k]).length;
  const completionPercentage = Math.round((completedCount / 6) * 100);

  const markStepComplete = useCallback((step) => {
    setProfileSteps((prev) => ({ ...prev, [step]: true }));
  }, []);

  const saveBusinessDetails = useCallback((data) => {
    setBusinessDetails(data);
    markStepComplete('businessDetails');
  }, [markStepComplete]);

  const saveContactDetails = useCallback((data) => {
    setContactDetails(data);
    markStepComplete('contactDetails');
  }, [markStepComplete]);

  const saveCategoryBrand = useCallback((data) => {
    setCategoryBrand(data);
    markStepComplete('categoryBrand');
  }, [markStepComplete]);

  const saveAddresses = useCallback((data) => {
    setAddresses(data);
    markStepComplete('addresses');
  }, [markStepComplete]);

  const saveBankDetails = useCallback((data) => {
    setBankDetails(data);
    markStepComplete('bankDetails');
  }, [markStepComplete]);

  const saveDocuments = useCallback((data) => {
    setDocuments(data);
    const requiredDocs = ['panCard', 'gstinCert', 'bankLetter', 'bankStatement', 'addressProof', 'pickupAddressProof', 'signature'];
    const allUploaded = requiredDocs.every((d) => data[d]);
    if (allUploaded) markStepComplete('documents');
  }, [markStepComplete]);

  return (
    <SupplierContext.Provider value={{
      profileSteps, completionPercentage, completedCount,
      businessDetails, contactDetails, categoryBrand, addresses, bankDetails, documents,
      saveBusinessDetails, saveContactDetails, saveCategoryBrand, saveAddresses, saveBankDetails, saveDocuments,
      markStepComplete,
    }}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => {
  const ctx = useContext(SupplierContext);
  if (!ctx) throw new Error('useSupplier must be inside SupplierProvider');
  return ctx;
};
