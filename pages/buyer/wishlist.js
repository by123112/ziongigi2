// pages/buyer/wishlist.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('wishlists').select('products(*)').eq('user_id', user.id);
        setItems(data?.map(w => w.products) || []);
      }
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('wishlists').delete().eq('user_id', user.id).eq('product_id', productId);
    setItems(items.filter(i => i.id !== productId));
  };

  return (
    <ProtectedRoute allowedRoles={['buyer']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        {loading ? <p>Loading...</p> : (
          <div className="grid gap-6">
            {items.length === 0 && <p className="text-gray-500">Your wishlist is empty.</p>}
            {items.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                <div>
                  <Link href={`/product/${product.id}`} className="font-semibold text-indigo-600">{product.title}</Link>
                  <p className="text-gray-500">${product.price_usd}</p>
                </div>
                <button onClick={() => removeFromWishlist(product.id)} className="text-red-500">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}