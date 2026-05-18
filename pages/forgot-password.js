// pages/forgot-password.js
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) setError(error.message);
    else setMessage('Password reset link sent to your email.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-gray-500 text-center mt-1">We’ll send you a link to reset your password.</p>
        {message && <div className="bg-green-50 text-green-700 p-3 rounded mt-4">{message}</div>}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded mt-4">{error}</div>}
        <div className="mt-6 space-y-4">
          <input type="email" placeholder="Your email address" className="input" value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={handleReset} className="btn-primary w-full">Send Reset Link</button>
          <div className="text-center text-sm">
            <Link href="/login" className="text-indigo-600">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}