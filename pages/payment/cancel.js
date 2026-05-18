// pages/payment/cancel.js
import Link from 'next/link';

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Payment Cancelled</h1>
        <p className="mt-2">Your transaction was not completed. You can try again.</p>
        <Link href="/" className="btn-primary inline-block mt-6">Return Home</Link>
      </div>
    </div>
  );
}