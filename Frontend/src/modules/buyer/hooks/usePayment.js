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
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [success,  setSuccess]  = useState(false);
  const [orderData, setOrderData] = useState(null);
  const rzpInstanceRef = useRef(null);

  const initiateCheckout = useCallback(async ({ cartItems, shippingAddress, user, onSuccess, onError }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK. Check your internet connection.');
      }

      const res = await paymentApi.createOrder({
        items: cartItems.map((item) => ({ product_id: item.id, quantity: item.qty })),
        shipping_address: shippingAddress,
      });
      const data = res.data.data;
      setOrderData(data);

      const options = {
        key:          data.razorpay_key_id,
        amount:       data.amount,
        currency:     data.currency,
        name:         'Sharduls',
        description:  `Order ${data.order_number}`,
        order_id:     data.razorpay_order_id,
        prefill: {
          name:  user?.full_name  || '',
          email: user?.email      || '',
          contact: user?.phone    || '',
        },
        theme: { color: '#0a1929' },

        handler: async (response) => {
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
            setError('Payment was cancelled.');
            onError?.('Payment was cancelled.');
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
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Checkout failed';
      setError(msg);
      setLoading(false);
      onError?.(msg);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setOrderData(null);
  }, []);

  return { initiateCheckout, loading, error, success, orderData, reset };
}
