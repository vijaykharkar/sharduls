import { useState, useCallback, useRef } from 'react';
import paymentApi from '../api/paymentApi';

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function usePayment() {
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);
  const [success,   setSuccess]   = useState(false);
  const [orderData, setOrderData] = useState(null);
  const rzpInstanceRef = useRef(null);

  const initiateOnlinePayment = useCallback(async ({
    cartItems, shippingAddress, user, rzpMethod, prefillData, onSuccess, onError,
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Failed to load Razorpay SDK. Check your internet connection.');

      const res = await paymentApi.createOrder({
        items:           cartItems.map((i) => ({ product_id: i.id, quantity: i.qty })),
        shipping_address: shippingAddress,
        payment_method:  'online',
      });
      const data = res.data.data;
      setOrderData(data);

      const options = {
        key:         data.razorpay_key_id,
        amount:      data.amount,
        currency:    data.currency,
        name:        'Sharduls',
        description: `Order ${data.order_number}`,
        order_id:    data.razorpay_order_id,
        prefill: {
          name:    user?.full_name || '',
          email:   user?.email     || '',
          contact: user?.phone     || '',
          ...(prefillData || {}),
        },
        theme: { color: '#0a1929' },
        ...(rzpMethod && {
          config: {
            display: {
              blocks: { [rzpMethod]: { name: rzpMethod, instruments: [{ method: rzpMethod }] } },
              sequence: [`block.${rzpMethod}`],
              preferences: { show_default_blocks: true },
            },
          },
        }),

        handler: async (response) => {
          setLoading(true);
          try {
            const verifyRes = await paymentApi.verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            });
            setSuccess(true);
            onSuccess?.(verifyRes.data.data);
          } catch (verifyErr) {
            const msg = verifyErr.response?.data?.message || 'Payment verification failed';
            setError(msg);
            onError?.(msg);
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      rzpInstanceRef.current = new window.Razorpay(options);
      rzpInstanceRef.current.on('payment.failed', (response) => {
        const msg = response.error?.description || 'Payment failed';
        setError(msg);
        setLoading(false);
        onError?.(msg);
      });
      rzpInstanceRef.current.open();
      setLoading(false);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Checkout failed';
      setError(msg);
      setLoading(false);
      onError?.(msg);
    }
  }, []);

  const initiateCOD = useCallback(async ({ cartItems, shippingAddress, onSuccess, onError }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await paymentApi.createOrder({
        items:           cartItems.map((i) => ({ product_id: i.id, quantity: i.qty })),
        shipping_address: shippingAddress,
        payment_method:  'cod',
      });
      const data = res.data.data;
      setOrderData(data);
      setSuccess(true);
      onSuccess?.(data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Order failed';
      setError(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setOrderData(null);
  }, []);

  return { initiateOnlinePayment, initiateCOD, loading, error, success, orderData, reset };
}
