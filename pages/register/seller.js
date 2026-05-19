import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterSeller() {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [taxId, setTaxId] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    setSuccess('');

    // 1. Sign up with Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setError('User ID missing. Please try again.');
      setLoading(false);
      return;
    }

    // 2. Profile will be auto-created by database trigger.
    //    After email verification, redirect to login.
    setSuccess('Seller account created! Please verify your email. After verification, log in to complete your seller profile.');
    setTimeout(() => router.push('/login'), 5000);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Ziongigi</h1>
          <h2 className="text-xl font-semibold mt-2">Become a Seller</h2>
          <p className="text-gray-500 text-sm mt-1">Reach global customers and sell your digital products</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business / Display name *</label>
            <input type="text" required className="input" placeholder="Your Brand Name" value={businessName} onChange={e => setBusinessName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
            <input type="email" required className="input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number *</label>
            <input type="tel" required className="input" placeholder="+234 123 456 7890" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <input type="password" required minLength={6} className="input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / VAT (optional)</label>
            <input type="text" className="input" placeholder="e.g., VAT number" value={taxId} onChange={e => setTaxId(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website (optional)</label>
            <input type="url" className="input" placeholder="https://yourstore.com" value={website} onChange={e => setWebsite(e.target.value)} />
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            ⚠️ After email verification, log in and complete your seller profile to start listing products.
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account...' : 'Register as Seller'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already selling? <Link href="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
