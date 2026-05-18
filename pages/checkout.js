// pages/checkout.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function Checkout() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      const { data } = await supabase.from('products').select('*').eq('id', productId).single();
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  const initializePayment = () => {
    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: product.price_usd * 100,
      currency: 'USD',
      onSuccess: async (transaction) => {
        // Save order
        await supabase.from('orders').insert([{
          buyer_email: email,
          product_id: product.id,
          amount: product.price_usd,
          payment_reference: transaction.reference,
          status: 'completed'
        }]);
        router.push(`/order-confirmation?ref=${transaction.reference}`);
      },
      onCancel: () => alert('Payment cancelled'),
    });
  };

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4 text-white">
          <h2 className="text-xl font-bold">Complete Your Purchase</h2>
        </div>
        <div className="p-6 space-y-5">
          <div className="border-b pb-4">
            <p className="text-gray-600">Product</p>
            <p className="font-semibold">{product.title}</p>
            <p className="text-indigo-600 text-lg font-bold mt-1">${product.price_usd}</p>
          </div>
          <div>
            <label className="block text-gray-700">Full name</label>
            <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700">Email address</label>
            <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <button
            onClick={initializePayment}
            disabled={!email || !name || loading}
            className="btn-primary w-full py-3"
          >
            Pay ${product.price_usd} with Paystack
          </button>
        </div>
      </div>
    </div>
  );
}