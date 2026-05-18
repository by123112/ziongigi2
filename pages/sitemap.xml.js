// pages/sitemap.xml.js
import { supabase } from '../lib/supabase';

const BASE_URL = 'https://ziongigi.com';

function generateSiteMap(posts, products, categories) {
  const staticPages = ['', '/about', '/contact', '/pricing', '/faq', '/affiliate-program', '/how-it-works', '/blog', '/terms', '/privacy', '/refund'];
  const staticUrls = staticPages.map(page => `<url><loc>${BASE_URL}${page}</loc><priority>0.8</priority></url>`);
  const postUrls = posts.map(post => `<url><loc>${BASE_URL}/blog/${post.slug}</loc><priority>0.7</priority></url>`);
  const productUrls = products.map(product => `<url><loc>${BASE_URL}/product/${product.id}</loc><priority>0.9</priority></url>`);
  const categoryUrls = categories.map(cat => `<url><loc>${BASE_URL}/category/${cat.slug}</loc><priority>0.6</priority></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls.join('')}${postUrls.join('')}${productUrls.join('')}${categoryUrls.join('')}</urlset>`;
}

export async function getServerSideProps({ res }) {
  const { data: posts } = await supabase.from('blog_posts').select('slug');
  const { data: products } = await supabase.from('products').select('id').eq('status', 'approved');
  const { data: categories } = await supabase.from('categories').select('slug');
  const sitemap = generateSiteMap(posts || [], products || [], categories || []);
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function Sitemap() {}