// pages/contact.js
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Store in a 'contacts' table (create it in Supabase)
    const { error } = await supabase.from('contacts').insert([{ name, email, message }]);
    if (!error) setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-6 py-8 text-white text-center">
          <h1 className="text-3xl font-bold">Contact Ziongigi</h1>
          <p className="mt-2">We’d love to hear from you</p>
        </div>
        <div className="p-8">
          {submitted ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
              Thank you! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium">Full name</label>
                <input type="text" required className="input" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email address</label>
                <input type="email" required className="input" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea rows="5" required className="input" value={message} onChange={e => setMessage(e.target.value)} />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}