// pages/seller/dashboard.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SellerDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [payoutMethod, setPayoutMethod] = useState('bank');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [mobileMoney, setMobileMoney] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  // If email was just verified, show a welcome message
  useEffect(() => {
    if (router.query.verified === 'true') {
      setMessage('✅ Email verified! Please complete your seller verification to start listing products.');
    }
  }, [router.query]);

  const uploadFile = async (file, folder) => {
    const { data: { user } } = await supabase.auth.getUser();
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${folder}-${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('verification').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('verification').getPublicUrl(fileName);
    return publicUrl;
  };

  const handleSubmitVerification = async () => {
    if (!idFile) {
      alert('Please upload a government ID.');
      return;
    }
    setUploading(true);
    try {
      const idUrl = await uploadFile(idFile, 'id');
      const selfieUrl = selfieFile ? await uploadFile(selfieFile, 'selfie') : null;

      // Prepare payout details based on method
      let payoutDetails = {};
      if (payoutMethod === 'bank') payoutDetails = { bankName, accountNumber };
      else if (payoutMethod === 'paypal') payoutDetails = { paypalEmail };
      else if (payoutMethod === 'mobile') payoutDetails = { mobileMoney };

      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('profiles').update({
        verification_docs: { id_url: idUrl, selfie_url: selfieUrl },
        payout_details: payoutDetails,
        verification_status: 'pending', // admin will review
        full_name: profile?.full_name || 'Seller', // keep existing name
        phone: profile?.phone || '',
      }).eq('id', user.id);

      if (error) throw error;
      setMessage('Verification submitted. Admin will review within 48 hours.');
      setProfile({ ...profile, verification_status: 'pending' });
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + err.message);
    }
    setUploading(false);
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!profile) return <div className="p-10 text-center">Profile not found.</div>;

  // Case 1: Not yet verified (pending admin approval after submission)
  if (profile.verification_status === 'pending' && profile.verification_docs?.id_url) {
    return (
      <ProtectedRoute allowedRoles={['seller']}>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            ⏳ Your verification is pending. We'll notify you once approved.
          </div>
          <Link href="/" className="text-indigo-600">Go to Home</Link>
        </div>
      </ProtectedRoute>
    );
  }

  // Case 2: Verified (admin approved)
  if (profile.verification_status === 'verified') {
    return (
      <ProtectedRoute allowedRoles={['seller']}>
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
            <div className="bg-green-100 p-4 rounded-lg mb-6">
              ✅ Your account is verified. You can now list products.
            </div>
            <Link href="/seller/products" className="btn-primary">Manage Products</Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Case 3: New seller (no verification submitted yet)
  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Complete Your Seller Verification</h1>
        {message && <div className="bg-blue-100 p-3 rounded mb-4">{message}</div>}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div>
            <label className="block font-medium">Government ID (passport/driver's license)</label>
            <input type="file" accept="image/*" onChange={e => setIdFile(e.target.files[0])} required />
          </div>
          <div>
            <label className="block font-medium">Selfie with ID (recommended)</label>
            <input type="file" accept="image/*" onChange={e => setSelfieFile(e.target.files[0])} />
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Payout Details</h3>
            <select className="input mb-2" value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="mobile">Mobile Money</option>
            </select>
            {payoutMethod === 'bank' && (
              <>
                <input type="text" placeholder="Bank Name" className="input mb-2" value={bankName} onChange={e => setBankName(e.target.value)} required />
                <input type="text" placeholder="Account Number" className="input" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} required />
              </>
            )}
            {payoutMethod === 'paypal' && (
              <input type="email" placeholder="PayPal Email" className="input" value={paypalEmail} onChange={e => setPaypalEmail(e.target.value)} required />
            )}
            {payoutMethod === 'mobile' && (
              <input type="text" placeholder="Mobile Money Number" className="input" value={mobileMoney} onChange={e => setMobileMoney(e.target.value)} required />
            )}
          </div>
          <button onClick={handleSubmitVerification} disabled={uploading} className="btn-primary w-full">
            {uploading ? 'Submitting...' : 'Submit Verification'}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
