// pages/seller/dashboard.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function SellerDashboard() {
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [stats, setStats] = useState({ products: 0, sales: 0, revenue: 0, pending: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchSellerData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Get profile and verification status
      const { data: profile } = await supabase.from('profiles').select('verification_status').eq('id', user.id).single();
      setVerificationStatus(profile?.verification_status);

      // If not verified, stop further loading
      if (profile?.verification_status !== 'verified') {
        setLoading(false);
        return;
      }

      // Fetch seller stats
      const { data: products } = await supabase.from('products').select('id, status').eq('seller_id', user.id);
      const productIds = products?.map(p => p.id) || [];
      const { data: orders } = await supabase.from('orders').select('*, products(price_usd)').in('product_id', productIds);
      const totalRevenue = orders?.reduce((sum, o) => sum + (o.products?.price_usd || 0), 0) || 0;
      setStats({
        products: products?.length || 0,
        sales: orders?.length || 0,
        revenue: totalRevenue,
        pending: products?.filter(p => p.status === 'pending').length || 0,
      });
      setRecentOrders(orders?.slice(0, 5) || []);
      setLoading(false);
    };

    fetchSellerData();
  }, []);

  // Block unverified sellers
  if (!loading && verificationStatus !== 'verified') {
    return (
      <ProtectedRoute allowedRoles={['seller']}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Required</h2>
            <p className="text-gray-600 mb-6">You must complete your identity verification before you can list products and access your seller dashboard.</p>
            <Link href="/seller/complete-verification" className="btn-primary inline-block">Complete Verification →</Link>
            <div className="mt-4 text-sm text-gray-500">
              Already submitted? Our team will review within 48 hours.
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={['seller']}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Seller Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-indigo-500">
              <p className="text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">{stats.products}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-green-500">
              <p className="text-gray-500">Sales</p>
              <p className="text-2xl font-bold">{stats.sales}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-yellow-500">
              <p className="text-gray-500">Revenue</p>
              <p className="text-2xl font-bold">${stats.revenue.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-red-500">
              <p className="text-gray-500">Pending Approval</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr><th className="text-left py-2">Product</th><th>Amount</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2">{order.products?.title || 'N/A'}</td>
                      <td>${order.products?.price_usd}</td>
                      <td>{new Date(order.created_at).toDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/seller/products" className="btn-primary">Manage Products</Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}