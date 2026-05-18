// pages/verify-email.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmail() {
  const [status, setStatus] = useState('verifying');
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const { error } = await supabase.auth.updateUser({ data: {} }); // just checks session
      if (!error) setStatus('success');
      else setStatus('error');
    };
    verify();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === 'verifying' && <div>Verifying your email...</div>}
        {status === 'success' && (
          <>
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold">Email Verified!</h2>
            <p className="mt-2">You can now log in to your account.</p>
            <Link href="/login" className="btn-primary inline-block mt-6">Go to Login</Link>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold">Verification Failed</h2>
            <p className="mt-2">The link may be expired or invalid. Please register again.</p>
            <Link href="/register/buyer" className="btn-primary inline-block mt-6">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}