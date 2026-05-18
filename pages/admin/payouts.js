// pages/admin/payouts.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function PayoutManagement() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('payout_requests').select('*').eq('status', 'pending');
      setRequests(data || []);
    };
    fetch();
  }, []);

  const approve = async (id) => {
    await supabase.from('payout_requests').update({ status: 'paid' }).eq('id', id);
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Payout Requests</h1>
        {requests.length === 0 ? <p>No pending requests.</p> : (
          <div className="space-y-3">
            {requests.map(r => (
              <div key={r.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                <div><p className="font-semibold">User ID: {r.user_id}</p><p>Amount: ${r.amount}</p><p>Method: {r.method}</p></div>
                <button onClick={() => approve(r.id)} className="btn-primary">Mark as Paid</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}