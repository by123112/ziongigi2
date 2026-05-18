// pages/product/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const { data } = await supabase.from('products').select('*, seller_id').eq('id', id).single();
      if (data) {
        setProduct(data);
        const { data: sellerData } = await supabase.from('profiles').select('full_name, avatar_url').eq('id', data.seller_id).single();
        setSeller(sellerData);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <img src={product.preview_url || '/placeholder.png'} alt={product.title} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500 mt-1">by {seller?.full_name || 'Unknown'}</p>
          <div className="mt-4 text-2xl font-bold text-indigo-600">${product.price_usd}</div>
          <p className="mt-4">{product.description}</p>
          <div className="mt-6">
            <button className="btn-primary w-full">Buy Now</button>
          </div>
          <div className="mt-4 text-sm text-gray-500">License: {product.license || 'Standard'}</div>
        </div>
      </div>
    </div>
  );
}