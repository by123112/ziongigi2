// pages/register/affiliate.js
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterAffiliate() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [promotionChannel, setPromotionChannel] = useState('');
  const [password, setPassword] = useState('');
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

    // 2. Insert profile into 'profiles' table
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: userId,
        full_name: fullName,
        phone: phone,
        role: 'affiliate',
        promotion_channel: promotionChannel || null,
        verification_status: 'pending',
      },
    ]);

    if (profileError) {
      console.error('Profile insert error details:', profileError);
      setError(`Profile error: ${profileError.message}. Please contact support.`);
    } else {
      setSuccess('Affiliate account created! Please verify your email to start earning commissions.');
      setTimeout(() => router.push('/login'), 5000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Ziongigi</h1>
          <h2 className="text-xl font-semibold mt-2">Join Affiliate Program</h2>
          <p className="text-gray-500 text-sm mt-1">Earn commissions by referring customers</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input type="text" required className="input" placeholder="Jane Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input type="email" required className="input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
            <input type="tel" required className="input" placeholder="+234 123 456 7890" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Promotion channel (optional)</label>
            <select className="input" value={promotionChannel} onChange={e => setPromotionChannel(e.target.value)}>
              <option value="">Select how you'll promote</option>
              <option value="blog">Blog / Website</option>
              <option value="youtube">YouTube</option>
              <option value="social">Social Media</option>
              <option value="email">Email List</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required minLength={6} className="input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account...' : 'Become an Affiliate'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already an affiliate? <Link href="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}