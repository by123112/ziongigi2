// pages/admin/blocked.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function BlockedList() {
  const [blocked, setBlocked] = useState([]);
  const [type, setType] = useState('email');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('blocked_items').select('*');
      setBlocked(data || []);
    };
    fetch();
  }, []);

  const addBlocked = async () => {
    await supabase.from('blocked_items').insert([{ type, value }]);
    setValue('');
    const { data } = await supabase.from('blocked_items').select('*');
    setBlocked(data);
  };

  const removeBlocked = async (id) => {
    await supabase.from('blocked_items').delete().eq('id', id);
    setBlocked(blocked.filter(b => b.id !== id));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Blocked List</h1>
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="flex gap-2">
            <select className="input w-32" value={type} onChange={e => setType(e.target.value)}><option value="email">Email</option><option value="ip">IP</option><option value="device">Device ID</option></select>
            <input className="input flex-1" placeholder="Value" value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={addBlocked} className="btn-primary">Block</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow">
          {blocked.map(b => <div key={b.id} className="p-2 border-b flex justify-between"><span>{b.type}: {b.value}</span><button onClick={() => removeBlocked(b.id)} className="text-red-600">Remove</button></div>)}
        </div>
      </div>
    </ProtectedRoute>
  );
}