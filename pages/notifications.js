// pages/notifications.js
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        setNotifications(data || []);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const markRead = async (id) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  return (
    <ProtectedRoute allowedRoles={['buyer', 'seller', 'affiliate', 'admin']}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        {loading ? <p>Loading...</p> : (
          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className={`bg-white rounded-xl shadow p-4 ${!n.is_read ? 'border-l-4 border-indigo-500' : ''}`}>
                <div className="flex justify-between items-start">
                  <div><p className="font-medium">{n.title}</p><p className="text-gray-500 text-sm">{n.message}</p><p className="text-xs text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</p></div>
                  {!n.is_read && <button onClick={() => markRead(n.id)} className="text-indigo-600 text-sm">Mark read</button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}