import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAddress as addAddressAction,
  updateAddress as updateAddressAction,
  removeAddress as removeAddressAction,
  selectAddress as selectAddressAction,
  setAddresses,
} from '@features/address/addressSlice';
import { selectAddresses, selectSelectedAddressId, selectSelectedAddress } from '@features/address/addressSelectors';
import { useToast } from '@shared/context/ToastContext';
import { useAuth } from '@shared/context/AuthContext';
import addressApi from '../api/addressApi';

export default function useAddress() {
  const dispatch  = useDispatch();
  const { addToast } = useToast();
  const { user }  = useAuth();

  const addresses         = useSelector(selectAddresses);
  const selectedAddressId = useSelector(selectSelectedAddressId);
  const selectedAddress   = useSelector(selectSelectedAddress);

  useEffect(() => {
    if (!user?.id) return;
    addressApi.getAll()
      .then((res) => {
        const list = res.data?.data ?? [];
        dispatch(setAddresses(list));
        if (list.length > 0 && !selectedAddressId) {
          const def = list.find((a) => a.is_default) || list[0];
          dispatch(selectAddressAction(def.id));
        }
      })
      .catch(() => {});
  }, [user?.id]);

  const addAddress = useCallback(async (addr) => {
    try {
      const first = addresses.length === 0;
      const res = await addressApi.create({ ...addr, is_default: first });
      const newAddr = res.data?.data;
      if (newAddr) {
        dispatch(addAddressAction(newAddr));
        addToast('Address saved', 'success');
        return newAddr;
      }
    } catch {
      addToast('Failed to save address', 'error');
    }
  }, [dispatch, addToast, addresses.length]);

  const updateAddress = useCallback(async (addr) => {
    try {
      const { id, ...rest } = addr;
      const res = await addressApi.update(id, rest);
      const updated = res.data?.data;
      if (updated) {
        dispatch(updateAddressAction(updated));
        addToast('Address updated', 'success');
      }
    } catch {
      addToast('Failed to update address', 'error');
    }
  }, [dispatch, addToast]);

  const removeAddress = useCallback(async (id) => {
    try {
      await addressApi.remove(id);
      dispatch(removeAddressAction(id));
      addToast('Address removed', 'info');
    } catch {
      addToast('Failed to remove address', 'error');
    }
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
