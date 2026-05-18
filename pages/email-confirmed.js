import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EmailConfirmed() {
  const router = useRouter();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const { error, type } = router.query;
    if (type === 'confirmation' && !error) {
      setMessage('✅ Email verified successfully! You can now log in.');
    } else if (error) {
      setMessage('❌ Verification failed. The link may be expired or invalid.');
    }
  }, [router.query]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        {message.includes('verified') && (
          <Link href="/login" className="btn-primary inline-block">Log In Now →</Link>
        )}
      </div>
    </div>
  );
}