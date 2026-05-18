// pages/admin/settings.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function SystemSettings() {
  const [platformFee, setPlatformFee] = useState(5);
  const [affiliateCommission, setAffiliateCommission] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('settings').select('value').eq('key', 'platform_fee').single();
      if (data) setPlatformFee(parseFloat(data.value));
      const { data: affData } = await supabase.from('settings').select('value').eq('key', 'affiliate_commission').single();
      if (affData) setAffiliateCommission(parseFloat(affData.value));
      setLoading(false);
    };
    fetch();
  }, []);

  const save = async () => {
    await supabase.from('settings').upsert([{ key: 'platform_fee', value: platformFee.toString() }, { key: 'affiliate_commission', value: affiliateCommission.toString() }]);
    alert('Settings saved');
  };

  if (loading) return <div>Loading...</div>;
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">System Settings</h1>
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div><label className="block">Platform Fee (%)</label><input type="number" step="0.5" className="input" value={platformFee} onChange={e => setPlatformFee(e.target.value)} /></div>
          <div><label className="block">Affiliate Commission (%)</label><input type="number" step="0.5" className="input" value={affiliateCommission} onChange={e => setAffiliateCommission(e.target.value)} /></div>
          <button onClick={save} className="btn-primary w-full">Save Changes</button>
        </div>
      </div>
    </ProtectedRoute>
  );
}