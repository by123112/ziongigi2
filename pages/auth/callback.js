import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase automatically stores the session if the URL contains #access_token
      // But we also manually handle the case where the hash is present.
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!sessionError) {
          setMessage('✅ Email verified! Redirecting to your dashboard...');
          setTimeout(() => router.push('/seller/dashboard'), 2000);
          return;
        }
      }

      // Fallback: check if user already has a session (e.g., after manual login)
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setMessage('✅ Already logged in. Redirecting...');
        setTimeout(() => router.push('/seller/dashboard'), 1500);
        return;
      }

      // If we reach here, something went wrong
      setError(true);
      setMessage('❌ Verification failed. Please try logging in manually.');
      setTimeout(() => router.push('/login'), 3000);
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-6">
        {!error && <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>}
        <p className="mt-4 text-gray-700">{message}</p>
        {error && (
          <a href="/login" className="btn-primary inline-block mt-4">Go to Login</a>
        )}
      </div>
    </div>
  );
}
