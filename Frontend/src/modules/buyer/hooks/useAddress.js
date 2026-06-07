import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress as addAddressAction, updateAddress as updateAddressAction, removeAddress as removeAddressAction, selectAddress as selectAddressAction } from '@features/address/addressSlice';
import { selectAddresses, selectSelectedAddressId, selectSelectedAddress } from '@features/address/addressSelectors';
import { useToast } from '@shared/context/ToastContext';

let nextId = Date.now();

export default function useAddress() {
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const addresses = useSelector(selectAddresses);
  const selectedAddressId = useSelector(selectSelectedAddressId);
  const selectedAddress = useSelector(selectSelectedAddress);

  const addAddress = useCallback((addr) => {
    const newAddr = { ...addr, id: nextId++ };
    dispatch(addAddressAction(newAddr));
    addToast('Address added', 'success');
    return newAddr;
  }, [dispatch, addToast]);

  const updateAddress = useCallback((addr) => {
    dispatch(updateAddressAction(addr));
    addToast('Address updated', 'success');
  }, [dispatch, addToast]);

  const removeAddress = useCallback((id) => {
    dispatch(removeAddressAction(id));
    addToast('Address removed', 'info');
  }, [dispatch, addToast]);

  const setSelectedAddress = useCallback((id) => {
    dispatch(selectAddressAction(id));
  }, [dispatch]);

  return {
    addresses,
    selectedAddressId,
    selectedAddress,
    addAddress,
    updateAddress,
    removeAddress,
    selectAddress: setSelectedAddress,
  };
}
