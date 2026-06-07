export const selectSupplier = (state) => state.supplier;
export const selectProfileSteps = (state) => state.supplier.profileSteps;
export const selectApiProfile = (state) => state.supplier.apiProfile;
export const selectProfileLoading = (state) => state.supplier.profileLoading;
export const selectBusinessDetails = (state) => state.supplier.businessDetails;
export const selectContactDetails = (state) => state.supplier.contactDetails;
export const selectCategoryBrand = (state) => state.supplier.categoryBrand;
export const selectSupplierAddresses = (state) => state.supplier.addresses;
export const selectBankDetails = (state) => state.supplier.bankDetails;
export const selectDocuments = (state) => state.supplier.documents;

export const selectCompletionPercentage = (state) => {
  const profile = state.supplier.apiProfile;
  if (profile?.profile_completion != null) return profile.profile_completion;
  const steps = state.supplier.profileSteps;
  const completed = Object.values(steps).filter(Boolean).length;
  return Math.round((completed / 6) * 100);
};

export const selectCompletedCount = (state) =>
  Object.values(state.supplier.profileSteps).filter(Boolean).length;
