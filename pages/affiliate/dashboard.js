// pages/affiliate/dashboard.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AffiliateDashboard() {
  const [stats, setStats] = useState({ clicks: 0, sales: 0, earnings: 0 });
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: affiliateLinks } = await supabase.from('affiliate_links').select('*, products(title)').eq('affiliate_id', user.id);
      setLinks(affiliateLinks || []);
      const totalClicks = affiliateLinks?.reduce((s, l) => s + (l.clicks || 0), 0) || 0;
      const totalSales = affiliateLinks?.reduce((s, l) => s + (l.sales || 0), 0) || 0;
      const totalEarnings = affiliateLinks?.reduce((s, l) => s + (l.commission_earned || 0), 0) || 0;
      setStats({ clicks: totalClicks, sales: totalSales, earnings: totalEarnings });
    };
    fetch();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['affiliate']}>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Affiliate Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow"><p className="text-gray-500">Clicks</p><p className="text-2xl font-bold">{stats.clicks}</p></div>
            <div className="bg-white p-4 rounded-xl shadow"><p className="text-gray-500">Sales</p><p className="text-2xl font-bold">{stats.sales}</p></div>
            <div className="bg-white p-4 rounded-xl shadow"><p className="text-green-600">Earnings</p><p className="text-2xl font-bold">${stats.earnings.toFixed(2)}</p></div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Referral Links</h2>
            {links.map(link => (
              <div key={link.id} className="border-b py-3">
                <p className="font-medium">{link.products?.title || 'Product'}</p>
                <p className="text-sm text-gray-500 break-all">https://ziongigi.com/ref/{link.code}</p>
                <p className="text-sm">Clicks: {link.clicks || 0} | Sales: {link.sales || 0} | Earned: ${link.commission_earned || 0}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}