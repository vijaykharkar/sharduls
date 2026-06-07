export const selectAddresses = (state) => state.address.items;
export const selectSelectedAddressId = (state) => state.address.selectedId;
export const selectSelectedAddress = (state) =>
  state.address.items.find((a) => a.id === state.address.selectedId) || null;
