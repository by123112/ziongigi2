// pages/admin/sellers.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function AllSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('role', 'seller');
      setSellers(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const toggleSuspend = async (id, currentStatus) => {
    const newStatus = currentStatus === 'suspended' ? 'verified' : 'suspended';
    await supabase.from('profiles').update({ verification_status: newStatus }).eq('id', id);
    setSellers(sellers.map(s => s.id === id ? { ...s, verification_status: newStatus } : s));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Sellers</h1>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">…
              <th className="p-3 text-left">Name</th><th>Email</th><th>Status</th><th>Joined</th><th>Actions</th>
            </thead>
            <tbody>
              {sellers.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.full_name}</td><td>{s.email}</td><td><span className={`px-2 py-1 rounded text-xs ${s.verification_status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{s.verification_status}</span></td><td>{new Date(s.created_at).toDateString()}</td>
                  <td><button onClick={() => toggleSuspend(s.id, s.verification_status)} className="text-red-600">{s.verification_status === 'suspended' ? 'Unsuspend' : 'Suspend'}</button> <Link href={`/admin/sellers/${s.id}`} className="text-indigo-600 ml-2">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}