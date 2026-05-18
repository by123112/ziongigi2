// pages/admin/orders.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('orders').select('*, products(title)');
      setOrders(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Orders</h1>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100"><tr><th className="p-3">Order ID</th><th>Product</th><th>Buyer Email</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map(o => <tr key={o.id} className="border-t"><td className="p-3">{o.id.slice(0,8)}</td><td>{o.products?.title}</td><td>{o.buyer_email}</td><td>${o.amount}</td><td>{new Date(o.created_at).toDateString()}</td><td>{o.status}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}