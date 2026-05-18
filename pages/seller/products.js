// pages/seller/products.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('products').select('*').eq('seller_id', user.id);
        setProducts(data || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Products</h1>
          <Link href="/seller/add-product" className="btn-primary">+ Add New Product</Link>
        </div>
        {loading ? <p>Loading...</p> : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100"><tr><th className="p-3 text-left">Title</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">{p.title}</td>
                    <td>${p.price_usd}</td>
                    <td><span className={`px-2 py-1 rounded text-xs ${p.status === 'approved' ? 'bg-green-100 text-green-800' : p.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{p.status}</span></td>
                    <td className="space-x-2">
                      <Link href={`/seller/edit-product?id=${p.id}`} className="text-indigo-600">Edit</Link>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}