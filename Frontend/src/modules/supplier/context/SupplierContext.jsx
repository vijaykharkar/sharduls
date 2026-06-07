import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSupplierProfileThunk } from '@features/supplier/supplierThunks';
import {
  markStepComplete as markStepCompleteAction,
  saveBusinessDetails as saveBusinessDetailsAction,
  saveContactDetails as saveContactDetailsAction,
  saveCategoryBrand as saveCategoryBrandAction,
  saveAddresses as saveAddressesAction,
  saveBankDetails as saveBankDetailsAction,
  saveDocuments as saveDocumentsAction,
  seedProfile,
} from '@features/supplier/supplierSlice';
import {
  selectProfileSteps, selectApiProfile, selectProfileLoading,
  selectBusinessDetails, selectContactDetails, selectCategoryBrand,
  selectSupplierAddresses, selectBankDetails, selectDocuments,
  selectCompletionPercentage, selectCompletedCount,
} from '@features/supplier/supplierSelectors';

/**
 * SupplierProvider — dispatches the profile fetch thunk on mount.
 * All state lives in Redux; provider is kept so SupplierLayout doesn't change.
 */
export const SupplierProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(fetchSupplierProfileThunk());
    }
  }, [dispatch]);

  return children;
};

/**
 * useSupplier — identical external API to the old Context-based hook.
 * Reads from Redux supplier slice; wraps dispatch for save actions.
 */
export const useSupplier = () => {
  const dispatch = useDispatch();

  const profileSteps = useSelector(selectProfileSteps);
  const apiProfile = useSelector(selectApiProfile);
  const profileLoading = useSelector(selectProfileLoading);
  const businessDetails = useSelector(selectBusinessDetails);
  const contactDetails = useSelector(selectContactDetails);
  const categoryBrand = useSelector(selectCategoryBrand);
  const addresses = useSelector(selectSupplierAddresses);
  const bankDetails = useSelector(selectBankDetails);
  const documents = useSelector(selectDocuments);
  const completionPercentage = useSelector(selectCompletionPercentage);
  const completedCount = useSelector(selectCompletedCount);

  const markStepComplete = useCallback((step) => dispatch(markStepCompleteAction(step)), [dispatch]);
  const saveBusinessDetails = useCallback((data) => dispatch(saveBusinessDetailsAction(data)), [dispatch]);
  const saveContactDetails = useCallback((data) => dispatch(saveContactDetailsAction(data)), [dispatch]);
  const saveCategoryBrand = useCallback((data) => dispatch(saveCategoryBrandAction(data)), [dispatch]);
  const saveAddresses = useCallback((data) => dispatch(saveAddressesAction(data)), [dispatch]);
  const saveBankDetails = useCallback((data) => dispatch(saveBankDetailsAction(data)), [dispatch]);
  const saveDocuments = useCallback((data) => dispatch(saveDocumentsAction(data)), [dispatch]);
  const seedFromApi = useCallback((data) => dispatch(seedProfile(data)), [dispatch]);
  const refreshProfile = useCallback(() => dispatch(fetchSupplierProfileThunk()), [dispatch]);

  return {
    profileSteps, completionPercentage, completedCount, apiProfile, profileLoading,
    businessDetails, contactDetails, categoryBrand, addresses, bankDetails, documents,
    saveBusinessDetails, saveContactDetails, saveCategoryBrand, saveAddresses,
    saveBankDetails, saveDocuments, markStepComplete, refreshProfile, seedFromApi,
  };
};

export default SupplierProvider;
