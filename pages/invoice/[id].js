// pages/invoice/[id].js
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function Invoice() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data: orderData } = await supabase.from('orders').select('*, product_id').eq('id', id).single();
      if (orderData) {
        setOrder(orderData);
        const { data: productData } = await supabase.from('products').select('title, price_usd').eq('id', orderData.product_id).single();
        setProduct(productData);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading invoice...</div>;
  if (!order) return <div className="p-10 text-center">Order not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Ziongigi</h1>
          <p className="text-gray-500">Invoice</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div><p className="text-gray-500">Invoice #</p><p className="font-semibold">{order.id.slice(0,8)}</p></div>
          <div><p className="text-gray-500">Date</p><p>{new Date(order.created_at).toDateString()}</p></div>
          <div><p className="text-gray-500">Buyer Email</p><p>{order.buyer_email}</p></div>
          <div><p className="text-gray-500">Payment Ref</p><p>{order.payment_reference}</p></div>
        </div>
        <div className="border-t pt-4">
          <p className="font-semibold">Product: {product?.title}</p>
          <p className="text-xl font-bold mt-2">Amount: ${order.amount}</p>
          <p className="text-gray-500 text-sm mt-1">Status: {order.status}</p>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">Thank you for shopping at Ziongigi</div>
      </div>
    </div>
  );
}