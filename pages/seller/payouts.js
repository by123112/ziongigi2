// pages/seller/payouts.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SellerPayouts() {
  const [balance, setBalance] = useState(0);
  const [payouts, setPayouts] = useState([]);
  const [requestAmount, setRequestAmount] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: products } = await supabase.from('products').select('id').eq('seller_id', user.id);
      const productIds = products?.map(p => p.id) || [];
      const { data: orders } = await supabase.from('orders').select('amount').in('product_id', productIds);
      const totalEarned = orders?.reduce((s, o) => s + o.amount, 0) || 0;
      const { data: paid } = await supabase.from('payouts').select('amount').eq('user_id', user.id).eq('role', 'seller');
      const totalPaid = paid?.reduce((s, p) => s + p.amount, 0) || 0;
      setBalance(totalEarned - totalPaid);
      const { data: payoutsList } = await supabase.from('payouts').select('*').eq('user_id', user.id).eq('role', 'seller');
      setPayouts(payoutsList || []);
    };
    fetch();
  }, []);

  const requestPayout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('payouts').insert([{ user_id: user.id, amount: parseFloat(requestAmount), role: 'seller', status: 'pending' }]);
    alert('Request sent for approval');
    setRequestAmount('');
  };

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Payouts</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <p className="text-gray-500">Available Balance</p>
          <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
          {balance > 10 && (
            <div className="mt-4 flex gap-2">
              <input type="number" placeholder="Amount" className="input" value={requestAmount} onChange={e => setRequestAmount(e.target.value)} />
              <button onClick={requestPayout} className="btn-primary">Request Withdrawal</button>
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-3">Payout History</h2>
          {payouts.length === 0 && <p className="text-gray-400">No payouts yet.</p>}
          {payouts.map(p => <div key={p.id} className="border-b py-2 flex justify-between"><span>${p.amount}</span><span className="capitalize">{p.status}</span></div>)}
        </div>
      </div>
    </ProtectedRoute>
  );
}