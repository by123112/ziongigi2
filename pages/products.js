import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase.from('products').select('*').eq('status', 'approved');
      const { data } = await query;
      setProducts(data || []);
      setFiltered(data || []);
      // Extract unique categories
      const uniqueCats = [...new Set(data?.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCats);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let results = [...products];
    if (search) results = results.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (category) results = results.filter(p => p.category === category);
    if (priceRange.min) results = results.filter(p => p.price_usd >= parseFloat(priceRange.min));
    if (priceRange.max) results = results.filter(p => p.price_usd <= parseFloat(priceRange.max));
    setFiltered(results);
  }, [search, category, priceRange, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Digital Products</h1>

      {/* Search & Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <input type="text" placeholder="Search products..." className="input" value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="number" placeholder="Min price $" className="input" value={priceRange.min} onChange={e => setPriceRange({ ...priceRange, min: e.target.value })} />
          <input type="number" placeholder="Max price $" className="input" value={priceRange.max} onChange={e => setPriceRange({ ...priceRange, max: e.target.value })} />
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">No products found. Try adjusting filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}