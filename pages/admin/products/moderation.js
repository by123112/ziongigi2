// pages/admin/products/moderation.js
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export default function ProductModeration() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('products').select('*, profiles(full_name)').eq('status', 'pending');
      setProducts(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from('products').update({ status }).eq('id', id);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Product Moderation Queue</h1>
        {loading ? <p>Loading...</p> : products.length === 0 ? <p>No pending products.</p> : (
          <div className="grid gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-start">
                  <div><h2 className="text-xl font-semibold">{p.title}</h2><p className="text-gray-500">by {p.profiles?.full_name} | ${p.price_usd}</p><p className="mt-2">{p.description}</p></div>
                  <div className="space-x-2">
                    <button onClick={() => updateStatus(p.id, 'approved')} className="bg-green-600 text-white px-4 py-2 rounded-lg">Approve</button>
                    <button onClick={() => updateStatus(p.id, 'rejected')} className="bg-red-600 text-white px-4 py-2 rounded-lg">Reject</button>
                  </div>
                </div>
                {p.file_url && <a href={p.file_url} target="_blank" className="text-indigo-600 text-sm">Preview File</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}