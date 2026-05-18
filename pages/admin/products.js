// pages/admin/products.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('products').select('*, profiles(full_name)');
      setProducts(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const deleteProduct = async (id) => {
    if (confirm('Permanently delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">…
              <th className="p-3">Title</th><th>Seller</th><th>Price</th><th>Status</th><th>Action</th>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.title}</td><td>{p.profiles?.full_name}</td><td>${p.price_usd}</td><td>{p.status}</td>
                  <td><button onClick={() => deleteProduct(p.id)} className="text-red-600">Delete</button></td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}