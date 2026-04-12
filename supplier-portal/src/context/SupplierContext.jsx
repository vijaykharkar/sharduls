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

export const SupplierProvider = ({ children }) => {
  const [profileSteps, setProfileSteps] = useState(DEFAULT_STEPS);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);
  const [categoryBrand, setCategoryBrand] = useState(null);
  const [addresses, setAddresses] = useState({ billing: null, pickup: [] });
  const [bankDetails, setBankDetails] = useState(null);
  const [documents, setDocuments] = useState({});
  const [apiProfile, setApiProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const seedFromApi = useCallback((p) => {
    if (!p) return;
    setApiProfile(p);

    // Steps from API
    if (p.steps) {
      setProfileSteps({
        businessDetails: p.steps.business_details,
        contactDetails: p.steps.contact_details,
        categoryBrand: p.steps.category_brand,
        addresses: p.steps.addresses,
        bankDetails: p.steps.bank_details,
        documents: p.steps.documents,
      });
    }

    // Business details
    if (p.business_details) {
      const bd = p.business_details;
      setBusinessDetails({
        legalName: bd.legal_name || '',
        tradeName: bd.trade_name || '',
        gstin: bd.gstin || '',
        country: bd.country || 'India',
        pincode: bd.pincode || '',
        state: bd.state || '',
        city: bd.city || '',
        tan: bd.tan || '',
        entityType: bd.entity_type || '',
        hasUdyam: bd.has_udyam ? 'yes' : 'no',
        udyamFile: null,
      });
    }

    // Contact details
    if (p.contact_details) {
      const cd = p.contact_details;
      const primary = cd.primary
        ? { name: cd.primary.contact_name, phone: cd.primary.phone, email: cd.primary.email, altEmail: cd.primary.alt_email || '', pickupTime: cd.primary.pickup_time || '9AM-12PM' }
        : { name: p.full_name || '', phone: p.phone ? p.phone.replace(/^\+91/, '') : '', email: p.email || '', altEmail: '', pickupTime: '9AM-12PM' };
      const others = (cd.others || []).map((o) => ({
        id: o.id, name: o.contact_name, phone: o.phone, email: o.email, location: o.location || '',
      }));
      setContactDetails({ primary, others });
    } else {
      setContactDetails({
        primary: { name: p.full_name || '', phone: p.phone ? p.phone.replace(/^\+91/, '') : '', email: p.email || '', altEmail: '', pickupTime: '9AM-12PM' },
        others: [],
      });
    }

    // Category & Brand
    if (p.category_brand) {
      const cb = p.category_brand;
      setCategoryBrand({
        categories: cb.categories || [],
        brands: cb.brands || [],
        brandRows: (cb.brand_rows || []).map((r, i) => ({ id: Date.now() + i, name: r.name, nature: r.nature, cert: null, date: r.date || '', status: r.status || 'Pending' })),
      });
    }

    // Addresses
    if (p.addresses) {
      const a = p.addresses;
      const mapAddr = (addr) => ({
        id: addr.id, country: addr.country, pincode: addr.pincode, state: addr.state,
        city: addr.city, line1: addr.address_line1, line2: addr.address_line2 || '',
        phone: addr.phone || '', isDefault: addr.is_default,
      });
      setAddresses({
        billing: a.billing ? mapAddr(a.billing) : null,
        pickup: (a.pickup || []).map(mapAddr),
      });
    }

    // Bank details
    if (p.bank_details) {
      const bk = p.bank_details;
      setBankDetails({
        holderName: bk.account_holder_name, acctNumber: bk.account_number,
        confirmAcct: bk.account_number, acctType: bk.account_type,
        ifsc: bk.ifsc_code, bankName: bk.bank_name || '', branch: bk.branch || '',
        city: bk.city || '', cheque: null,
      });
    }

    // Documents
    if (p.documents?.items) {
      const docMap = {};
      p.documents.items.forEach((d) => { docMap[d.document_type] = { name: d.file_name, url: d.document_url }; });
      setDocuments(docMap);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const res = await profileService.getProfile();
      seedFromApi(res?.data);
      return res?.data;
    } catch { return null; }
  }, [seedFromApi]);

  useEffect(() => {
    const token = localStorage.getItem('supplier_access_token');
    if (!token) { setProfileLoading(false); return; }
    refreshProfile().finally(() => setProfileLoading(false));
  }, [refreshProfile]);

  const completedCount = STEP_KEYS.filter((k) => profileSteps[k]).length;
  const completionPercentage = apiProfile?.profile_completion ?? Math.round((completedCount / 6) * 100);

  const markStepComplete = useCallback((step) => {
    setProfileSteps((prev) => ({ ...prev, [step]: true }));
  }, []);

  const saveBusinessDetails = useCallback((data) => { setBusinessDetails(data); markStepComplete('businessDetails'); }, [markStepComplete]);
  const saveContactDetails = useCallback((data) => { setContactDetails(data); markStepComplete('contactDetails'); }, [markStepComplete]);
  const saveCategoryBrand = useCallback((data) => { setCategoryBrand(data); markStepComplete('categoryBrand'); }, [markStepComplete]);
  const saveAddresses = useCallback((data) => { setAddresses(data); markStepComplete('addresses'); }, [markStepComplete]);
  const saveBankDetails = useCallback((data) => { setBankDetails(data); markStepComplete('bankDetails'); }, [markStepComplete]);
  const saveDocuments = useCallback((data) => {
    setDocuments(data);
    const requiredDocs = ['panCard', 'gstinCert', 'bankLetter', 'bankStatement', 'addressProof', 'pickupAddressProof', 'signature'];
    const allUploaded = requiredDocs.every((d) => data[d]);
    if (allUploaded) markStepComplete('documents');
  }, [markStepComplete]);

  return (
    <SupplierContext.Provider value={{
      profileSteps, completionPercentage, completedCount, apiProfile, profileLoading,
      businessDetails, contactDetails, categoryBrand, addresses, bankDetails, documents,
      saveBusinessDetails, saveContactDetails, saveCategoryBrand, saveAddresses, saveBankDetails, saveDocuments,
      markStepComplete, refreshProfile, seedFromApi,
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
