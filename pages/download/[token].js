// pages/download/[token].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function DownloadPage() {
  const router = useRouter();
  const { token } = router.query;
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    const verifyToken = async () => {
      const { data, error } = await supabase.from('orders').select('product_id').eq('download_token', token).single();
      if (error || !data) {
        setError(true);
        return;
      }
      const { data: product } = await supabase.from('products').select('file_url').eq('id', data.product_id).single();
      setFileUrl(product.file_url);
    };
    verifyToken();
  }, [token]);

  if (error) return <div className="p-10 text-center text-red-600">Invalid or expired download link.</div>;
  if (!fileUrl) return <div className="p-10 text-center">Verifying...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold">Your download is ready</h1>
        <a href={fileUrl} download className="btn-primary mt-4 inline-block">Download File</a>
        <p className="text-gray-500 text-sm mt-4">This link expires in 24 hours.</p>
      </div>
    </div>
  );
}