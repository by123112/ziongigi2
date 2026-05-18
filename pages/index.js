import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'approved')
        .limit(8);
      setFeaturedProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'eBooks', slug: 'ebooks', icon: '📚' },
    { name: 'Design', slug: 'design-graphics', icon: '🎨' },
    { name: 'Software', slug: 'software-dev', icon: '💻' },
    { name: 'Courses', slug: 'courses', icon: '🎓' },
    { name: 'Templates', slug: 'templates', icon: '📄' },
    { name: 'Music', slug: 'audio-music', icon: '🎵' },
  ];

  const testimonials = [
    { name: 'Amina K.', role: 'Seller', text: 'Ziongigi helped me reach customers worldwide. My sales tripled in 3 months!', image: '/avatar1.png' },
    { name: 'David O.', role: 'Affiliate', text: 'The 20% commission is real. I earn passive income every month.', image: '/avatar2.png' },
    { name: 'Sarah J.', role: 'Buyer', text: 'Instant downloads and secure payments – best marketplace for digital goods.', image: '/avatar3.png' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Slider / Carousel */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[500px] md:h-[600px]"
      >
        <SwiperSlide>
          <div className="relative h-full bg-gradient-to-r from-indigo-700 to-purple-800 text-white flex items-center justify-center flex-col text-center p-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Sell Digital Products</h1>
            <p className="text-xl md:text-2xl mb-8">Reach millions of customers globally</p>
            <Link href="/register/seller" className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow-lg">Start Selling →</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full bg-gradient-to-r from-pink-600 to-orange-500 text-white flex items-center justify-center flex-col text-center p-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Earn 20% Commission</h1>
            <p className="text-xl md:text-2xl mb-8">Join our affiliate program – no product creation needed</p>
            <Link href="/register/affiliate" className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold shadow-lg">Become Affiliate →</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full bg-gradient-to-r from-green-600 to-teal-500 text-white flex items-center justify-center flex-col text-center p-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Buy & Download Instantly</h1>
            <p className="text-xl md:text-2xl mb-8">Thousands of high‑quality digital products</p>
            <Link href="/products" className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold shadow-lg">Shop Now →</Link>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Category Icons Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {categories.map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="text-4xl mb-2">{cat.icon}</div>
              <p className="font-semibold">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sell & Affiliate Promo Cards */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        <Link href="/register/seller" className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl flex items-center gap-6 hover:scale-105 transition">
          <div className="text-6xl">🚀</div>
          <div><h3 className="text-2xl font-bold">Sell Your Products</h3><p>Reach millions of customers. Zero listing fees. 5% commission.</p></div>
        </Link>
        <Link href="/register/affiliate" className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-8 rounded-2xl shadow-xl flex items-center gap-6 hover:scale-105 transition">
          <div className="text-6xl">💰</div>
          <div><h3 className="text-2xl font-bold">Earn 20% Commission</h3><p>Promote products and get paid monthly. No investment needed.</p></div>
        </Link>
      </section>

      {/* Featured Products Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">🔥 Featured Products</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 rounded-3xl mx-4 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Creators Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="text-4xl mb-2">“</div>
                <p className="text-gray-600 italic">{t.text}</p>
                <p className="font-bold mt-4">— {t.name}, {t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}