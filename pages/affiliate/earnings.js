// pages/affiliate/earnings.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AffiliateEarnings() {
  const [earnings, setEarnings] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from('affiliate_commissions').select('*, products(title)').eq('affiliate_id', user.id);
      setEarnings(data || []);
      setTotal(data?.reduce((s, e) => s + e.amount, 0) || 0);
    };
    fetch();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['affiliate']}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Commission Earnings</h1>
        <div className="bg-white rounded-xl shadow p-4 mb-6"><p className="text-gray-500">Total Earned</p><p className="text-2xl font-bold text-green-600">${total.toFixed(2)}</p></div>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full"><thead className="bg-gray-100"><tr><th className="p-3">Product</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>{earnings.map(e => <tr key={e.id} className="border-t"><td className="p-3">{e.products?.title}</td><td>${e.amount}</td><td>{new Date(e.created_at).toDateString()}</td><td>{e.status}</td></tr>)}</tbody></table>
        </div>
      </div>
    </ProtectedRoute>
  );
}