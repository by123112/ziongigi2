import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function VerifySellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingSellers = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'seller')
        .eq('verification_status', 'pending');
      setSellers(data || []);
      setLoading(false);
    };
    fetchPendingSellers();
  }, []);

  const updateStatus = async (userId, status) => {
    await supabase.from('profiles').update({ verification_status: status }).eq('id', userId);
    setSellers(sellers.filter(s => s.id !== userId));
    alert(`Seller ${status === 'verified' ? 'approved' : 'rejected'}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Verify Sellers</h1>
        {sellers.length === 0 && <p>No pending seller verifications.</p>}
        <div className="grid gap-6">
          {sellers.map(seller => (
            <div key={seller.id} className="bg-white rounded-xl shadow p-6">
              <p><strong>{seller.full_name}</strong> – {seller.email} – {seller.phone}</p>
              <p className="text-sm text-gray-500">Submitted verification docs:</p>
              <div className="flex gap-4 my-2">
                {seller.verification_docs?.id_url && (
                  <a href={seller.verification_docs.id_url} target="_blank" className="text-indigo-600 underline">View ID</a>
                )}
                {seller.verification_docs?.selfie_url && (
                  <a href={seller.verification_docs.selfie_url} target="_blank" className="text-indigo-600 underline">View Selfie</a>
                )}
                {seller.verification_docs?.address_url && (
                  <a href={seller.verification_docs.address_url} target="_blank" className="text-indigo-600 underline">View Address Proof</a>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => updateStatus(seller.id, 'verified')} className="bg-green-600 text-white px-4 py-2 rounded">Approve</button>
                <button onClick={() => updateStatus(seller.id, 'rejected')} className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}