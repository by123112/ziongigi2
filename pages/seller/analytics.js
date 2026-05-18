// pages/seller/analytics.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SellerAnalytics() {
  const [salesData, setSalesData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: products } = await supabase.from('products').select('id').eq('seller_id', user.id);
      const productIds = products?.map(p => p.id) || [];
      const { data: orders } = await supabase.from('orders').select('amount, created_at').in('product_id', productIds);
      setSalesData(orders || []);
      setTotal(orders?.reduce((s, o) => s + o.amount, 0) || 0);
    };
    fetchData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sales Analytics</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">Total Revenue: <span className="font-bold text-2xl">${total.toFixed(2)}</span></p>
          <p className="mt-2">Total Transactions: {salesData.length}</p>
          <div className="mt-6 h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Chart will appear here]</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}