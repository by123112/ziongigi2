import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterSeller() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const validatePassword = (pwd) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return pwd.length >= minLength && hasUpper && hasLower && hasSpecial;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!acceptedTerms) {
      setError('You must accept the Terms & Policies.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters, include uppercase, lowercase, and a special character.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: username,
          phone: phone,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess('Account created! Please verify your email. After confirmation, log in to complete your seller profile.');
      setTimeout(() => router.push('/login'), 5000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Ziongigi</h1>
        <h2 className="text-xl font-semibold text-center mt-2">Become a Seller</h2>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm my-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm my-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input type="text" placeholder="Full Name *" className="input" value={fullName} onChange={e => setFullName(e.target.value)} required />
          <input type="text" placeholder="Username *" className="input" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email Address *" className="input" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="tel" placeholder="Phone Number *" className="input" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input type="password" placeholder="Password *" className="input" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password *" className="input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          <div className="flex items-start">
            <input type="checkbox" id="terms" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the <a href="/seller-agreement" target="_blank" className="text-indigo-600">Terms, Privacy, Refund Policy & Seller Agreement</a>
            </label>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">Register</button>
        </form>
        <p className="text-center text-sm mt-4">Already have an account? <Link href="/login" className="text-indigo-600">Log in</Link></p>
      </div>
    </div>
  );
}
