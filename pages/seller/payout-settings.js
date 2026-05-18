// pages/seller/payout-settings.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function PayoutSettings() {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('payout_details').eq('id', user.id).single();
        if (data?.payout_details) {
          setBankName(data.payout_details.bankName || '');
          setAccountNumber(data.payout_details.accountNumber || '');
          setPaypalEmail(data.payout_details.paypalEmail || '');
        }
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const saveSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('profiles').update({
      payout_details: { bankName, accountNumber, paypalEmail }
    }).eq('id', user.id);
    alert('Payout settings saved');
  };

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Payout Settings</h1>
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div><label>Bank Name</label><input className="input" value={bankName} onChange={e => setBankName(e.target.value)} /></div>
          <div><label>Account Number</label><input className="input" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} /></div>
          <div><label>PayPal Email</label><input className="input" value={paypalEmail} onChange={e => setPaypalEmail(e.target.value)} /></div>
          <button onClick={saveSettings} className="btn-primary w-full">Save</button>
        </div>
      </div>
    </ProtectedRoute>
  );
}