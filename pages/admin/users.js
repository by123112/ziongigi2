// pages/admin/users.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('profiles').select('*, auth.users(email)').limit(100);
      setUsers(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const deleteUser = async (id) => {
    if (confirm('Permanently delete user? This also deletes all associated data.')) {
      await supabase.auth.admin.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100"><tr><th className="p-3">Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.full_name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.verification_status}</td><td><button onClick={() => deleteUser(u.id)} className="text-red-600">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}