import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function SellerDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');
  const [message, setMessage] = useState('');

  // Phone OTP
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtpCode, setPhoneOtpCode] = useState('');
  const [verifyingPhone, setVerifyingPhone] = useState(false);

  // Address
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  // Documents
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Withdrawal method
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [mobileMoney, setMobileMoney] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
        if (data?.country) setCountry(data.country);
        if (data?.state) setState(data.state);
        if (data?.city) setCity(data.city);
        if (data?.address) setAddress(data.address);
        if (data?.withdrawal_method) {
          // prefill withdrawal method if exists
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  // Send phone OTP
  const sendPhoneOtp = async () => {
    // This requires a backend endpoint. For demo, we'll simulate.
    // In production, use Twilio or similar.
    alert('Simulated: OTP sent to ' + profile?.phone);
    setPhoneOtpSent(true);
  };

  const verifyPhoneOtp = async () => {
    setVerifyingPhone(true);
    // Simulate verification – in real app, call your API
    if (phoneOtpCode === '123456') { // demo code
      await supabase.from('profiles').update({ phone_verified: true }).eq('id', profile.id);
      setProfile({ ...profile, phone_verified: true });
      setMessage('Phone verified!');
    } else {
      alert('Invalid OTP (demo uses 123456)');
    }
    setVerifyingPhone(false);
  };

  const saveAddress = async () => {
    const { error } = await supabase.from('profiles').update({
      country, state, city, address
    }).eq('id', profile.id);
    if (error) alert('Error saving address');
    else {
      setProfile({ ...profile, country, state, city, address });
      setMessage('Address saved');
    }
  };

  const uploadFile = async (file, type) => {
    const fileName = `${profile.id}-${type}-${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('verification').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('verification').getPublicUrl(fileName);
    return publicUrl;
  };

  const submitDocuments = async () => {
    if (!idFile) {
      alert('Please upload Government ID');
      return;
    }
    setUploading(true);
    try {
      const idUrl = await uploadFile(idFile, 'id');
      const selfieUrl = selfieFile ? await uploadFile(selfieFile, 'selfie') : null;
      await supabase.from('profiles').update({
        verification_docs: { id_url: idUrl, selfie_url: selfieUrl }
      }).eq('id', profile.id);
      setMessage('Documents uploaded. Admin will review.');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
    setUploading(false);
  };

  const saveWithdrawal = async () => {
    let details = {};
    if (withdrawalMethod === 'bank') details = { bankName, accountNumber };
    else if (withdrawalMethod === 'paypal') details = { paypalEmail };
    else details = { mobileMoney };
    const { error } = await supabase.from('profiles').update({
      withdrawal_method: { method: withdrawalMethod, details }
    }).eq('id', profile.id);
    if (error) alert('Error saving withdrawal method');
    else {
      setMessage('Withdrawal method saved');
      setProfile({ ...profile, withdrawal_method: { method: withdrawalMethod, details } });
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!profile) return <div className="p-10 text-center">Profile not found.</div>;

  // Admin approval check
  if (profile.verification_status === 'approved') {
    return (
      <ProtectedRoute allowedRoles={['seller']}>
        <div className="p-8">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="mt-2">Your account is verified. You can now upload products.</p>
          <Link href="/seller/products" className="btn-primary mt-4 inline-block">Manage Products</Link>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Seller Verification</h1>
        {message && <div className="bg-green-100 p-3 rounded mb-4">{message}</div>}
        <div className="flex border-b mb-6">
          <button className={`px-4 py-2 ${activeTab === 'basic' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`} onClick={() => setActiveTab('basic')}>Basic Info</button>
          <button className={`px-4 py-2 ${activeTab === 'phone' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`} onClick={() => setActiveTab('phone')}>Phone Verification</button>
          <button className={`px-4 py-2 ${activeTab === 'address' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`} onClick={() => setActiveTab('address')}>Address</button>
          <button className={`px-4 py-2 ${activeTab === 'docs' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`} onClick={() => setActiveTab('docs')}>ID & Selfie</button>
          <button className={`px-4 py-2 ${activeTab === 'withdrawal' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`} onClick={() => setActiveTab('withdrawal')}>Withdrawal Method</button>
        </div>

        {activeTab === 'basic' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <p><strong>Name:</strong> {profile.full_name}</p>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Email Verified:</strong> {profile.email_confirmed_at ? 'Yes' : 'No – check your inbox'}</p>
          </div>
        )}

        {activeTab === 'phone' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <p>Phone: {profile.phone} {profile.phone_verified ? '(verified)' : ''}</p>
            {!profile.phone_verified && (
              <div className="mt-2">
                <button onClick={sendPhoneOtp} className="btn-secondary">Send OTP</button>
                {phoneOtpSent && (
                  <div className="mt-2">
                    <input type="text" placeholder="Enter 6-digit OTP" className="input" value={phoneOtpCode} onChange={e => setPhoneOtpCode(e.target.value)} />
                    <button onClick={verifyPhoneOtp} disabled={verifyingPhone} className="btn-primary mt-2">Verify</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'address' && (
          <div className="bg-white p-6 rounded-xl shadow space-y-3">
            <input placeholder="Country" className="input" value={country} onChange={e => setCountry(e.target.value)} />
            <input placeholder="State/Province" className="input" value={state} onChange={e => setState(e.target.value)} />
            <input placeholder="City" className="input" value={city} onChange={e => setCity(e.target.value)} />
            <input placeholder="Street Address" className="input" value={address} onChange={e => setAddress(e.target.value)} />
            <button onClick={saveAddress} className="btn-primary">Save Address</button>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="bg-white p-6 rounded-xl shadow space-y-3">
            <div><label>Government ID (passport/driver's license)</label><input type="file" accept="image/*" onChange={e => setIdFile(e.target.files[0])} /></div>
            <div><label>Selfie with ID</label><input type="file" accept="image/*" onChange={e => setSelfieFile(e.target.files[0])} /></div>
            <button onClick={submitDocuments} disabled={uploading} className="btn-primary">{uploading ? 'Uploading...' : 'Submit Documents'}</button>
          </div>
        )}

        {activeTab === 'withdrawal' && (
          <div className="bg-white p-6 rounded-xl shadow space-y-3">
            <select className="input" value={withdrawalMethod} onChange={e => setWithdrawalMethod(e.target.value)}>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="mobile">Mobile Money</option>
            </select>
            {withdrawalMethod === 'bank' && (
              <>
                <input placeholder="Bank Name" className="input" value={bankName} onChange={e => setBankName(e.target.value)} />
                <input placeholder="Account Number" className="input" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
              </>
            )}
            {withdrawalMethod === 'paypal' && (
              <input placeholder="PayPal Email" className="input" value={paypalEmail} onChange={e => setPaypalEmail(e.target.value)} />
            )}
            {withdrawalMethod === 'mobile' && (
              <input placeholder="Mobile Money Number" className="input" value={mobileMoney} onChange={e => setMobileMoney(e.target.value)} />
            )}
            <button onClick={saveWithdrawal} className="btn-primary">Save Withdrawal Method</button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
