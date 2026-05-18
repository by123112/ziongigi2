import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function CompleteVerification() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [addressFile, setAddressFile] = useState(null);
  const [payoutMethod, setPayoutMethod] = useState('bank');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [mobileMoney, setMobileMoney] = useState('');
  const [existingStatus, setExistingStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('verification_status').eq('id', user.id).single();
        setExistingStatus(data?.verification_status);
        if (data?.verification_status === 'verified') router.push('/seller/dashboard');
      }
    };
    fetchStatus();
  }, []);

  const uploadFile = async (file, folder) => {
    const { data: { user } } = await supabase.auth.getUser();
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${folder}-${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('verification').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('verification').getPublicUrl(fileName);
    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!idFile) {
      setMessage('Please upload a government ID.');
      setLoading(false);
      return;
    }

    try {
      const idUrl = await uploadFile(idFile, 'id');
      const selfieUrl = selfieFile ? await uploadFile(selfieFile, 'selfie') : null;
      const addressUrl = addressFile ? await uploadFile(addressFile, 'address') : null;

      const payoutDetails = {};
      if (payoutMethod === 'bank') payoutDetails.bank = { bankName, accountNumber };
      else if (payoutMethod === 'paypal') payoutDetails.paypal = paypalEmail;
      else payoutDetails.mobileMoney = mobileMoney;

      const { data: { user } } = await supabase.auth.getUser();
      const { error: updateError } = await supabase.from('profiles').update({
        verification_docs: {
          id_url: idUrl,
          selfie_url: selfieUrl,
          address_url: addressUrl,
        },
        payout_details: payoutDetails,
        verification_status: 'pending',
      }).eq('id', user.id);

      if (updateError) throw updateError;
      setMessage('Verification submitted. Admin will review within 48 hours.');
      setTimeout(() => router.push('/seller/dashboard'), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Complete Seller Verification</h1>
        <p className="text-gray-600 mb-6">To start selling, please provide the following documents and payout information.</p>
        {message && <div className="bg-blue-50 p-3 rounded mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="block font-medium mb-1">Government ID (passport/driver's license) *</label>
            <input type="file" accept="image/*" required onChange={e => setIdFile(e.target.files[0])} />
            <p className="text-xs text-gray-500 mt-1">Upload a clear photo or scan</p>
          </div>
          <div>
            <label className="block font-medium mb-1">Selfie with ID (recommended)</label>
            <input type="file" accept="image/*" onChange={e => setSelfieFile(e.target.files[0])} />
          </div>
          <div>
            <label className="block font-medium mb-1">Proof of address (utility bill, bank statement)</label>
            <input type="file" accept="image/*" onChange={e => setAddressFile(e.target.files[0])} />
            <p className="text-xs text-gray-500">Required after $500 earnings threshold – optional for now</p>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Payout Details</h3>
            <select className="input mb-3" value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="mobile">Mobile Money</option>
            </select>
            {payoutMethod === 'bank' && (
              <div className="space-y-3">
                <input type="text" placeholder="Bank Name" className="input" value={bankName} onChange={e => setBankName(e.target.value)} required />
                <input type="text" placeholder="Account Number" className="input" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} required />
              </div>
            )}
            {payoutMethod === 'paypal' && (
              <input type="email" placeholder="PayPal Email" className="input" value={paypalEmail} onChange={e => setPaypalEmail(e.target.value)} required />
            )}
            {payoutMethod === 'mobile' && (
              <input type="text" placeholder="Mobile Money Number" className="input" value={mobileMoney} onChange={e => setMobileMoney(e.target.value)} required />
            )}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Submitting...' : 'Submit Verification'}</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}