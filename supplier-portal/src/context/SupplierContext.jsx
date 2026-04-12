import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import profileService from '../api/profileService';

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
  const [apiProfile, setApiProfile] = useState(null);

  const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  useEffect(() => { save('sp_profileSteps', profileSteps); }, [profileSteps]);
  useEffect(() => { save('sp_businessDetails', businessDetails); }, [businessDetails]);
  useEffect(() => { save('sp_contactDetails', contactDetails); }, [contactDetails]);
  useEffect(() => { save('sp_categoryBrand', categoryBrand); }, [categoryBrand]);
  useEffect(() => { save('sp_addresses', addresses); }, [addresses]);
  useEffect(() => { save('sp_bankDetails', bankDetails); }, [bankDetails]);
  useEffect(() => { save('sp_documents', documents); }, [documents]);

  // Fetch real profile from API on mount to seed step completion
  useEffect(() => {
    const token = localStorage.getItem('supplier_access_token');
    if (!token) return;
    profileService.getProfile()
      .then((res) => {
        const p = res?.data;
        if (!p) return;
        setApiProfile(p);
        // Pre-mark steps that have data from registration
        setProfileSteps((prev) => ({
          ...prev,
          contactDetails: prev.contactDetails || Boolean(p.phone),
          businessDetails: prev.businessDetails || Boolean(p.business_profile?.company_name || p.business_profile?.business_type),
          categoryBrand: prev.categoryBrand || Boolean(p.business_profile?.product_categories?.length),
        }));
        // Seed business details if not already stored locally
        if (!businessDetails && p.business_profile) {
          const bp = p.business_profile;
          setBusinessDetails({
            legalName: bp.company_name || '',
            tradeName: '',
            gstin: bp.gst_number || '',
            country: 'India',
            pincode: '',
            state: '',
            city: '',
            tan: '',
            entityType: bp.business_type || '',
            hasUdyam: 'no',
            udyamFile: null,
          });
        }
        // Seed contact details if not already stored locally
        if (!contactDetails) {
          setContactDetails({
            primary: {
              name: p.full_name || '',
              phone: p.phone ? p.phone.replace(/^\+91/, '') : '',
              email: p.email || '',
              altEmail: '',
              pickupTime: '9AM-12PM',
            },
            others: [],
          });
        }
      })
      .catch(() => {}); // silently ignore if not logged in
  }, []);

  const completedCount = STEP_KEYS.filter((k) => profileSteps[k]).length;
  // Use API-computed completion if available, otherwise fall back to local step count
  const completionPercentage = apiProfile?.profile_completion ?? Math.round((completedCount / 6) * 100);

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
      profileSteps, completionPercentage, completedCount, apiProfile,
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
