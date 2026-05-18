// pages/about.js
import Link from 'next/link';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-6">About Ziongigi</h1>
      <div className="prose max-w-none text-gray-700 space-y-6">
        <p className="text-lg">Ziongigi is a global digital marketplace founded with a simple mission: <strong>empower creators and buyers to connect, transact, and grow – anywhere in the world.</strong></p>
        <div className="bg-indigo-50 p-6 rounded-xl my-8">
          <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
          <p>Born in 2025, Ziongigi started as a vision to break down borders for digital commerce. Today, we serve thousands of sellers, buyers, and affiliates across Africa, Europe, and the Americas – providing a secure, fast, and fair platform for digital goods.</p>
        </div>
        <h2 className="text-2xl font-semibold mt-8">What We Stand For</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Transparency:</strong> Clear fees, no surprises.</li>
          <li><strong>Security:</strong> Escrow payments, RLS, and fraud protection.</li>
          <li><strong>Global Access:</strong> Multiple currencies, local payment methods (Paystack, mobile money).</li>
          <li><strong>Creator First:</strong> Low commissions, fast payouts, and tools to grow.</li>
        </ul>
        <p>Join thousands of happy customers and creators. Whether you're buying your first eBook or scaling a business with digital courses – Ziongigi is your partner.</p>
        <div className="text-center mt-8">
          <Link href="/register/buyer" className="btn-primary">Start Your Journey</Link>
        </div>
      </div>
    </div>
  );
}