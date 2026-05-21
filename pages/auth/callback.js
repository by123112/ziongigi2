import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const handleConfirmation = async () => {
      // Supabase automatically exchanges the token if the URL contains '#access_token'
      // But we also handle manual token exchange using the query parameters.
      const { error } = await supabase.auth.getSession();
      if (error) {
        setMessage('Verification failed. Please try logging in manually.');
        setTimeout(() => router.push('/login'), 3000);
        return;
      }

      // Check if user is now authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setMessage('Email verified! Redirecting to your seller dashboard...');
        setTimeout(() => router.push('/seller/dashboard'), 2000);
      } else {
        // If not automatically logged in, try to get the token from the URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        if (accessToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get('refresh_token'),
          });
          if (!sessionError) {
            setMessage('Logged in! Redirecting...');
            setTimeout(() => router.push('/seller/dashboard'), 2000);
            return;
          }
        }
        setMessage('Email confirmed! Please log in.');
        setTimeout(() => router.push('/login'), 3000);
      }
    };

    handleConfirmation();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}