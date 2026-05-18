// pages/blog/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      setPosts(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Ziongigi Blog</h1>
      <div className="space-y-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-md p-6">
            <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold text-indigo-600 hover:underline">{post.title}</Link>
            <p className="text-gray-500 text-sm mt-1">{new Date(post.created_at).toDateString()}</p>
            <p className="mt-2">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-indigo-600 text-sm mt-2 inline-block">Read more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}