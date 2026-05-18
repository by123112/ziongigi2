// pages/order-confirmation.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function OrderConfirmation() {
  const router = useRouter();
  const { ref } = router.query;
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!ref) return;
    const fetchOrder = async () => {
      const { data: orderData } = await supabase.from('orders').select('*, product_id').eq('payment_reference', ref).single();
      if (orderData) {
        setOrder(orderData);
        const { data: productData } = await supabase.from('products').select('title, file_url').eq('id', orderData.product_id).single();
        setProduct(productData);
      }
    };
    fetchOrder();
  }, [ref]);

  if (!order) return <div className="p-10 text-center">Loading order...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-green-500 text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Your order has been confirmed.</p>
        <div className="bg-gray-100 p-4 rounded-lg my-6">
          <p className="font-semibold">{product?.title}</p>
          <p className="text-indigo-600">${order.amount}</p>
        </div>
        <a href={product?.file_url} download className="btn-primary inline-block">Download Now</a>
        <p className="text-sm text-gray-500 mt-4">We also sent the download link to your email.</p>
        <Link href="/" className="text-indigo-600 mt-6 inline-block">Continue Shopping</Link>
      </div>
    </div>
  );
}