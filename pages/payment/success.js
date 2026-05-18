// pages/payment/success.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentSuccess() {
  const router = useRouter();
  const { reference } = router.query;

  useEffect(() => {
    if (reference) {
      // Optionally verify payment with Paystack, then redirect to order confirmation
      router.push(`/order-confirmation?ref=${reference}`);
    }
  }, [reference]);

  return <div className="p-10 text-center">Verifying payment...</div>;
}