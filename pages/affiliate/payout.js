// pages/affiliate/payout.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AffiliatePayout() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('paypal');

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from('affiliate_commissions').select('amount').eq('affiliate_id', user.id).eq('status', 'paid');
      const totalPaid = data?.reduce((s, d) => s + d.amount, 0) || 0;
      const { data: earnings } = await supabase.from('affiliate_commissions').select('amount').eq('affiliate_id', user.id);
      const totalEarned = earnings?.reduce((s, d) => s + d.amount, 0) || 0;
      setBalance(totalEarned - totalPaid);
    };
    fetch();
  }, []);

  const requestPayout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('payout_requests').insert([{ user_id: user.id, amount, method, role: 'affiliate', status: 'pending' }]);
    alert('Request submitted');
  };

  return (
    <ProtectedRoute allowedRoles={['affiliate']}>
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Request Payout</h1>
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <p>Available: <span className="font-bold">${balance.toFixed(2)}</span></p>
          {balance >= 10 && (
            <>
              <input type="number" placeholder="Amount" className="input" value={amount} onChange={e => setAmount(e.target.value)} />
              <select className="input" value={method} onChange={e => setMethod(e.target.value)}><option value="paypal">PayPal</option><option value="bank">Bank Transfer</option></select>
              <button onClick={requestPayout} className="btn-primary w-full">Request Withdrawal</button>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}