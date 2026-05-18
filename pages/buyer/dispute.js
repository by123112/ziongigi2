// pages/buyer/dispute.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Dispute() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('orders').select('id, product_id, products(title)').eq('buyer_email', user.email);
        setOrders(data || []);
      }
    };
    fetchOrders();
  }, []);

  const handleSubmit = async () => {
    await supabase.from('disputes').insert([{
      order_id: selectedOrder,
      reason,
      description,
      status: 'open',
    }]);
    setSubmitted(true);
  };

  return (
    <ProtectedRoute allowedRoles={['buyer']}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Open a Dispute</h1>
        {submitted ? (
          <div className="bg-green-50 p-4 rounded">Dispute submitted. Admin will review within 48 hours.</div>
        ) : (
          <div className="space-y-4 bg-white p-6 rounded-xl shadow">
            <div>
              <label className="block">Select order</label>
              <select className="input" value={selectedOrder} onChange={e => setSelectedOrder(e.target.value)}>
                <option value="">-- Choose --</option>
                {orders.map(o => <option key={o.id} value={o.id}>{o.products?.title} - {o.id}</option>)}
              </select>
            </div>
            <div>
              <label className="block">Reason</label>
              <input className="input" placeholder="e.g., File not working" value={reason} onChange={e => setReason(e.target.value)} />
            </div>
            <div>
              <label className="block">Description</label>
              <textarea rows="4" className="input" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <button onClick={handleSubmit} className="btn-primary">Submit Dispute</button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}