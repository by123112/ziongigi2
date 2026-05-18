// pages/admin/disputes.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Disputes() {
  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('disputes').select('*, orders(buyer_email, product_id, products(title))');
      setDisputes(data || []);
    };
    fetch();
  }, []);

  const resolve = async (id, decision) => {
    await supabase.from('disputes').update({ status: 'closed', resolution: decision }).eq('id', id);
    setDisputes(disputes.filter(d => d.id !== id));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dispute Resolution</h1>
        <div className="space-y-4">
          {disputes.map(d => (
            <div key={d.id} className="bg-white rounded-xl shadow p-4">
              <p className="font-semibold">Order: {d.orders?.products?.title} (buyer: {d.orders?.buyer_email})</p>
              <p><strong>Reason:</strong> {d.reason}</p>
              <p><strong>Description:</strong> {d.description}</p>
              <div className="mt-3 space-x-2">
                <button onClick={() => resolve(d.id, 'refund')} className="bg-green-600 text-white px-4 py-2 rounded">Refund Buyer</button>
                <button onClick={() => resolve(d.id, 'reject')} className="bg-red-600 text-white px-4 py-2 rounded">Reject Dispute</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}