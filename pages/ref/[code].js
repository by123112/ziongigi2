// pages/ref/[code].js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AffiliateRedirect() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;
    const handleRedirect = async () => {
      // Increment click count
      await supabase.rpc('increment_affiliate_clicks', { link_code: code });
      // Get the product ID from the affiliate link
      const { data: link } = await supabase.from('affiliate_links').select('product_id').eq('code', code).single();
      if (link?.product_id) {
        // Set a cookie for 30 days to track affiliate
        document.cookie = `affiliate_code=${code}; path=/; max-age=2592000`;
        router.push(`/product/${link.product_id}`);
      } else {
        router.push('/');
      }
    };
    handleRedirect();
  }, [code]);

  return <div className="p-10 text-center">Redirecting...</div>;
}