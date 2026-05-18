// pages/seller/reviews.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SellerReviews() {
  const [reviews, setReviews] = useState([]);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: products } = await supabase.from('products').select('id').eq('seller_id', user.id);
      const productIds = products?.map(p => p.id) || [];
      const { data } = await supabase.from('reviews').select('*, products(title)').in('product_id', productIds);
      setReviews(data || []);
    };
    fetch();
  }, []);

  const submitReply = async (reviewId) => {
    await supabase.from('reviews').update({ reply: replyText[reviewId] }).eq('id', reviewId);
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, reply: replyText[reviewId] } : r));
    setReplyText({ ...replyText, [reviewId]: '' });
  };

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Product Reviews</h1>
        <div className="space-y-6">
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-xl shadow p-4">
              <p className="font-semibold">{r.products?.title}</p>
              <p className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</p>
              <p className="mt-1">{r.comment}</p>
              {r.reply && <p className="mt-2 text-indigo-600 bg-gray-50 p-2 rounded">Seller reply: {r.reply}</p>}
              <textarea className="input mt-2" placeholder="Write a reply..." value={replyText[r.id] || ''} onChange={e => setReplyText({ ...replyText, [r.id]: e.target.value })} />
              <button onClick={() => submitReply(r.id)} className="btn-secondary mt-2 text-sm">Post Reply</button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}