// pages/seller/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';

export default function SellerProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', id).single();
      setSeller(profile);
      const { data: prods } = await supabase.from('products').select('*').eq('seller_id', id).eq('status', 'approved');
      setProducts(prods || []);
    };
    fetch();
  }, [id]);

  if (!seller) return <div className="p-10 text-center">Loading...</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-xl shadow mb-8 text-center">
        <img src={seller.avatar_url || '/default-avatar.png'} className="w-24 h-24 rounded-full mx-auto" />
        <h1 className="text-2xl font-bold mt-2">{seller.full_name}</h1>
        <p className="text-gray-500">Joined {new Date(seller.created_at).toDateString()}</p>
      </div>
      <h2 className="text-xl font-bold mb-4">Products by this seller</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}