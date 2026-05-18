// pages/unsubscribe.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Unsubscribe() {
  const router = useRouter();
  const { email } = router.query;
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    if (!email) return;
    const unsubscribe = async () => {
      const { error } = await supabase.from('newsletter_subscribers').delete().eq('email', email);
      if (!error) setStatus('success');
      else setStatus('error');
    };
    unsubscribe();
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        {status === 'processing' && <p>Unsubscribing...</p>}
        {status === 'success' && <div><p className="text-green-600">You have been unsubscribed.</p><a href="/" className="text-indigo-600">Return to Ziongigi</a></div>}
        {status === 'error' && <p className="text-red-600">Invalid request.</p>}
      </div>
    </div>
  );
}