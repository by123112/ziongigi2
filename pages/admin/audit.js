// pages/admin/audit.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(200);
      setLogs(data || []);
    };
    fetch();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Audit Log</h1>
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100"><tr><th className="p-3">Admin</th><th>Action</th><th>Target</th><th>Details</th><th>Time</th></tr></thead>
            <tbody>
              {logs.map(log => <tr key={log.id} className="border-t"><td className="p-3">{log.admin_email}</td><td>{log.action}</td><td>{log.target_type}:{log.target_id}</td><td>{log.details}</td><td>{new Date(log.created_at).toLocaleString()}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}