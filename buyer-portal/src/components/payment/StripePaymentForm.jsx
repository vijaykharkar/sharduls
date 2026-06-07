import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';

const STRIPE_ERROR_MESSAGES = {
  card_declined: 'Your card was declined. Please try a different card.',
  expired_card: 'Your card has expired. Please use a different card.',
  incorrect_cvc: 'The CVC number is incorrect. Please check and retry.',
  insufficient_funds: 'Insufficient funds. Please try a different card.',
  processing_error: 'An error occurred while processing. Please retry.',
  invalid_request_error: 'Something went wrong. Please try again.',
};

function friendlyError(stripeError) {
  if (!stripeError) return 'Payment failed. Please try again.';
  const mapped = STRIPE_ERROR_MESSAGES[stripeError.decline_code] ||
                 STRIPE_ERROR_MESSAGES[stripeError.code];
  if (mapped) return mapped;
  return stripeError.message || 'Payment failed. Please try again.';
}

export default function StripePaymentForm({ orderNumber, totalAmount, currency, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const fmt = (paise) => (paise / 100).toLocaleString('en-IN');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(friendlyError(submitError));
      setProcessing(false);
      return;
    }

    const returnUrl = `${window.location.origin}/orders`;

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(friendlyError(confirmError));
      setProcessing(false);
      if (onError) onError(confirmError);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      if (onSuccess) onSuccess(paymentIntent);
    } else if (paymentIntent && paymentIntent.status === 'requires_action') {
      setError('Additional authentication required. Please complete verification.');
      setProcessing(false);
    } else {
      if (onSuccess) onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <PaymentElement
          options={{
            layout: 'tabs',
            business: { name: 'SHARDUL-GE' },
          }}
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3">
          <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-3 bg-[#0a1929] text-white rounded-xl text-sm font-bold hover:bg-[#102a43] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing Payment…
          </>
        ) : (
          <>Pay ₹{fmt(totalAmount)}</>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
        <ShieldCheck size={12} />
        <span>Secured by Stripe · Your card details never touch our servers</span>
      </div>
    </form>
  );
}
