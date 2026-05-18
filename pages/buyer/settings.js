// pages/buyer/settings.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function BuyerSettings() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('full_name, phone').eq('id', user.id).single();
        if (data) {
          setFullName(data.full_name || '');
          setPhone(data.phone || '');
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('profiles').update({ full_name: fullName, phone }).eq('id', user.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <ProtectedRoute allowedRoles={['buyer']}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {saved && <div className="bg-green-50 text-green-700 p-2 rounded">Saved successfully!</div>}
          <div>
            <label className="block">Full name</label>
            <input className="input" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="block">Phone number</label>
            <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <button onClick={handleSave} className="btn-primary">Save Changes</button>
        </div>
      </div>
    </ProtectedRoute>
  );
}