import { createSlice } from '@reduxjs/toolkit';
import { fetchSupplierProfileThunk } from './supplierThunks';

const DEFAULT_STEPS = {
  businessDetails: false,
  contactDetails: false,
  categoryBrand: false,
  addresses: false,
  bankDetails: false,
  documents: false,
};

const seedFromApiData = (p) => {
  if (!p) return {};

  const result = { apiProfile: p };

  if (p.steps) {
    result.profileSteps = {
      businessDetails: p.steps.business_details,
      contactDetails: p.steps.contact_details,
      categoryBrand: p.steps.category_brand,
      addresses: p.steps.addresses,
      bankDetails: p.steps.bank_details,
      documents: p.steps.documents,
    };
  }

  if (p.business_details) {
    const bd = p.business_details;
    result.businessDetails = {
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
    };
  }

  if (p.contact_details) {
    const cd = p.contact_details;
    const primary = cd.primary
      ? { name: cd.primary.contact_name, phone: cd.primary.phone, email: cd.primary.email, altEmail: cd.primary.alt_email || '', pickupTime: cd.primary.pickup_time || '9AM-12PM' }
      : { name: p.full_name || '', phone: p.phone ? p.phone.replace(/^\+91/, '') : '', email: p.email || '', altEmail: '', pickupTime: '9AM-12PM' };
    result.contactDetails = {
      primary,
      others: (cd.others || []).map((o) => ({ id: o.id, name: o.contact_name, phone: o.phone, email: o.email, location: o.location || '' })),
    };
  } else {
    result.contactDetails = {
      primary: { name: p.full_name || '', phone: p.phone ? p.phone.replace(/^\+91/, '') : '', email: p.email || '', altEmail: '', pickupTime: '9AM-12PM' },
      others: [],
    };
  }

  if (p.category_brand) {
    const cb = p.category_brand;
    result.categoryBrand = {
      categories: cb.categories || [],
      brands: cb.brands || [],
      brandRows: (cb.brand_rows || []).map((r, i) => ({ id: Date.now() + i, name: r.name, nature: r.nature, cert: null, date: r.date || '', status: r.status || 'Pending' })),
    };
  }

  if (p.addresses) {
    const a = p.addresses;
    const mapAddr = (addr) => ({ id: addr.id, country: addr.country, pincode: addr.pincode, state: addr.state, city: addr.city, line1: addr.address_line1, line2: addr.address_line2 || '', phone: addr.phone || '', isDefault: addr.is_default });
    result.addresses = {
      billing: a.billing ? mapAddr(a.billing) : null,
      pickup: (a.pickup || []).map(mapAddr),
    };
  }

  if (p.bank_details) {
    const bk = p.bank_details;
    result.bankDetails = {
      holderName: bk.account_holder_name,
      acctNumber: bk.account_number,
      confirmAcct: bk.account_number,
      acctType: bk.account_type,
      ifsc: bk.ifsc_code,
      bankName: bk.bank_name || '',
      branch: bk.branch || '',
      city: bk.city || '',
    };
  }

  if (p.documents?.items) {
    const docMap = {};
    p.documents.items.forEach((d) => { docMap[d.document_type] = { name: d.file_name, url: d.document_url }; });
    result.documents = docMap;
  }

  return result;
};

const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    profileSteps: { ...DEFAULT_STEPS },
    businessDetails: null,
    contactDetails: null,
    categoryBrand: null,
    addresses: { billing: null, pickup: [] },
    bankDetails: null,
    documents: {},
    apiProfile: null,
    profileLoading: true,
  },
  reducers: {
    seedProfile(state, { payload }) {
      const seeded = seedFromApiData(payload);
      Object.assign(state, seeded);
    },
    markStepComplete(state, { payload }) {
      state.profileSteps[payload] = true;
    },
    saveBusinessDetails(state, { payload }) {
      state.businessDetails = payload;
      state.profileSteps.businessDetails = true;
    },
    saveContactDetails(state, { payload }) {
      state.contactDetails = payload;
      state.profileSteps.contactDetails = true;
    },
    saveCategoryBrand(state, { payload }) {
      state.categoryBrand = payload;
      state.profileSteps.categoryBrand = true;
    },
    saveAddresses(state, { payload }) {
      state.addresses = payload;
      state.profileSteps.addresses = true;
    },
    saveBankDetails(state, { payload }) {
      state.bankDetails = payload;
      state.profileSteps.bankDetails = true;
    },
    saveDocuments(state, { payload }) {
      state.documents = payload;
      const required = ['panCard', 'gstinCert', 'bankLetter', 'bankStatement', 'addressProof', 'pickupAddressProof', 'signature'];
      if (required.every((d) => payload[d])) {
        state.profileSteps.documents = true;
      }
    },
    clearSupplierState(state) {
      state.profileSteps = { ...DEFAULT_STEPS };
      state.businessDetails = null;
      state.contactDetails = null;
      state.categoryBrand = null;
      state.addresses = { billing: null, pickup: [] };
      state.bankDetails = null;
      state.documents = {};
      state.apiProfile = null;
      state.profileLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierProfileThunk.pending, (state) => { state.profileLoading = true; })
      .addCase(fetchSupplierProfileThunk.fulfilled, (state, { payload }) => {
        const seeded = seedFromApiData(payload);
        Object.assign(state, seeded);
        state.profileLoading = false;
      })
      .addCase(fetchSupplierProfileThunk.rejected, (state) => { state.profileLoading = false; });
  },
});

export const {
  seedProfile, markStepComplete,
  saveBusinessDetails, saveContactDetails, saveCategoryBrand,
  saveAddresses, saveBankDetails, saveDocuments, clearSupplierState,
} = supplierSlice.actions;
export default supplierSlice.reducer;
