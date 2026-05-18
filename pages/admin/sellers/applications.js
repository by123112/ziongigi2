// pages/admin/sellers/applications.js
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function SellerApplications() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('role', 'seller').eq('verification_status', 'pending');
      setSellers(data || []);
    };
    fetch();
  }, []);

  const verify = async (id, status) => {
    await supabase.from('profiles').update({ verification_status: status }).eq('id', id);
    setSellers(sellers.filter(s => s.id !== id));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Seller Applications</h1>
        {sellers.length === 0 ? <p>No pending applications.</p> : (
          <div className="grid gap-4">
            {sellers.map(s => (
              <div key={s.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                <div><p className="font-semibold">{s.full_name}</p><p>{s.email}</p><p className="text-sm text-gray-500">Phone: {s.phone || 'N/A'}</p></div>
                <div><button onClick={() => verify(s.id, 'verified')} className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2">Approve</button><button onClick={() => verify(s.id, 'rejected')} className="bg-red-600 text-white px-4 py-2 rounded-lg">Reject</button></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}