// pages/seller/add-product.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    let fileUrl = '';
    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from('products').upload(fileName, file);
      if (error) alert('Upload failed');
      else fileUrl = data.path;
    }
    const { error } = await supabase.from('products').insert([{
      seller_id: user.id,
      title,
      description,
      price_usd: parseFloat(price),
      category,
      file_url: fileUrl,
      status: 'pending',
    }]);
    if (error) alert(error.message);
    else router.push('/seller/products');
    setUploading(false);
  };

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <div><label>Title</label><input className="input" value={title} onChange={e => setTitle(e.target.value)} required /></div>
          <div><label>Description</label><textarea className="input" rows="4" value={description} onChange={e => setDescription(e.target.value)} required /></div>
          <div><label>Price (USD)</label><input type="number" step="0.01" className="input" value={price} onChange={e => setPrice(e.target.value)} required /></div>
          <div><label>Category</label><input className="input" value={category} onChange={e => setCategory(e.target.value)} /></div>
          <div><label>Product File</label><input type="file" onChange={e => setFile(e.target.files[0])} required /></div>
          <button type="submit" disabled={uploading} className="btn-primary w-full">{uploading ? 'Uploading...' : 'Submit for Approval'}</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}