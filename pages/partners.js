// pages/partners.js
import { useState } from 'react';

export default function Partners() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Partner with Us</h1>
      <p className="text-gray-600 mb-8">Enterprise, educational, or reseller partnerships – let's grow together.</p>
      {submitted ? <div className="bg-green-50 text-green-700 p-4 rounded">Thank you! We'll contact you within 3 business days.</div> : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <input type="text" placeholder="Organization name" className="input" required />
          <input type="email" placeholder="Your email" className="input" required />
          <select className="input" required><option value="">Partnership type</option><option>Enterprise</option><option>Educational</option><option>Reseller</option><option>API Integration</option></select>
          <textarea rows="4" placeholder="Tell us about your goals" className="input" required></textarea>
          <button type="submit" className="btn-primary w-full">Submit Inquiry</button>
        </form>
      )}
    </div>
  );
}