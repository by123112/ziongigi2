// pages/admin/dashboard.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pendingSellers, setPendingSellers] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'seller')
        .eq('verification_status', 'pending');
      setPendingSellers(count || 0);
    };
    fetchCount();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-4">
              <p className="text-gray-500">Pending Seller Verifications</p>
              <p className="text-3xl font-bold text-orange-500">{pendingSellers}</p>
              <Link href="/admin/verify-sellers" className="text-indigo-600 text-sm block mt-2">Review →</Link>
            </div>
            {/* Add more admin stats here if needed */}
          </div>
          <div className="text-center">
            <Link href="/admin/verify-sellers" className="btn-primary">Go to Verify Sellers</Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}