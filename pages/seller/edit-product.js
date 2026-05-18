// pages/seller/edit-product.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await supabase.from('products').select('*').eq('id', id).single();
      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price_usd);
        setCategory(data.category);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await supabase.from('products').update({ title, description, price_usd: parseFloat(price), category, status: 'pending' }).eq('id', id);
    router.push('/seller/products');
  };

  if (loading) return <div>Loading...</div>;
  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow space-y-4">
          <div><label>Title</label><input className="input" value={title} onChange={e => setTitle(e.target.value)} required /></div>
          <div><label>Description</label><textarea className="input" rows="4" value={description} onChange={e => setDescription(e.target.value)} required /></div>
          <div><label>Price (USD)</label><input type="number" step="0.01" className="input" value={price} onChange={e => setPrice(e.target.value)} required /></div>
          <div><label>Category</label><input className="input" value={category} onChange={e => setCategory(e.target.value)} /></div>
          <button type="submit" className="btn-primary w-full">Update Product</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}