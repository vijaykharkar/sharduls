import { useCallback } from 'react';
import { useAppContext, A } from '../store/AppContext';

let nextId = Date.now();

export default function useAddress() {
  const { state, dispatch, addToast } = useAppContext();

  const addAddress = useCallback((addr) => {
    const newAddr = { ...addr, id: nextId++ };
    dispatch({ type: A.ADD_ADDRESS, payload: newAddr });
    addToast('Address added', 'success');
    return newAddr;
  }, [dispatch, addToast]);

  const updateAddress = useCallback((addr) => {
    dispatch({ type: A.UPDATE_ADDRESS, payload: addr });
    addToast('Address updated', 'success');
  }, [dispatch, addToast]);

  const removeAddress = useCallback((id) => {
    dispatch({ type: A.REMOVE_ADDRESS, payload: id });
    addToast('Address removed', 'info');
  }, [dispatch, addToast]);

  const selectAddress = useCallback((id) => {
    dispatch({ type: A.SELECT_ADDRESS, payload: id });
  }, [dispatch]);

  return {
    addresses: state.addresses,
    selectedAddressId: state.selectedAddressId,
    selectedAddress: state.addresses.find((a) => a.id === state.selectedAddressId) || null,
    addAddress,
    updateAddress,
    removeAddress,
    selectAddress,
  };
}
