// pages/affiliate/links.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function LinkGenerator() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('id, title').eq('status', 'approved');
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  const generateLink = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const code = `${user.id}_${selectedProduct}_${Date.now()}`;
    await supabase.from('affiliate_links').insert([{ affiliate_id: user.id, product_id: selectedProduct, code }]);
    setGeneratedLink(`${window.location.origin}/ref/${code}`);
  };

  return (
    <ProtectedRoute allowedRoles={['affiliate']}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Generate Referral Link</h1>
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <select className="input" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
            <option value="">Select a product</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          <button onClick={generateLink} className="btn-primary w-full">Generate Link</button>
          {generatedLink && <div className="mt-4 p-3 bg-gray-100 rounded break-all"><p className="text-sm">Your link:</p><code>{generatedLink}</code></div>}
        </div>
      </div>
    </ProtectedRoute>
  );
}