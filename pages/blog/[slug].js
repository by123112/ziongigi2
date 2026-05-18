// pages/blog/[slug].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
      setPost(data);
    };
    fetch();
  }, [slug]);

  if (!post) return <div className="p-10 text-center">Loading...</div>;
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{new Date(post.created_at).toDateString()}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-8"><a href="/blog" className="text-indigo-600">← Back to Blog</a></div>
    </div>
  );
}