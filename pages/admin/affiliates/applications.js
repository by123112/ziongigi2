// pages/admin/affiliates/applications.js
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AffiliateApplications() {
  const [affiliates, setAffiliates] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('role', 'affiliate').eq('verification_status', 'pending');
      setAffiliates(data || []);
    };
    fetch();
  }, []);

  const verify = async (id, status) => {
    await supabase.from('profiles').update({ verification_status: status }).eq('id', id);
    setAffiliates(affiliates.filter(a => a.id !== id));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Affiliate Applications</h1>
        {affiliates.length === 0 ? <p>No pending applications.</p> : (
          <div className="grid gap-4">
            {affiliates.map(a => (
              <div key={a.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                <div><p className="font-semibold">{a.full_name}</p><p>{a.email}</p><p className="text-sm text-gray-500">Channel: {a.promotion_channel || 'Not specified'}</p></div>
                <div><button onClick={() => verify(a.id, 'verified')} className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2">Approve</button><button onClick={() => verify(a.id, 'rejected')} className="bg-red-600 text-white px-4 py-2 rounded-lg">Reject</button></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}