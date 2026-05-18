// pages/pricing.js
import Link from 'next/link';

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
      <p className="text-center text-gray-600 mb-12">Start selling or buying instantly – no hidden fees</p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-xl font-bold">Buyer</h2>
          <p className="text-3xl font-bold mt-2">Free</p>
          <p className="text-gray-500 text-sm">No transaction fees</p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✅ Instant downloads</li>
            <li>✅ 30‑day refund policy</li>
            <li>✅ Secure payments</li>
          </ul>
          <Link href="/register/buyer" className="btn-primary mt-6 inline-block">Sign Up Free</Link>
        </div>
        <div className="bg-indigo-50 rounded-2xl shadow-lg p-6 text-center border-2 border-indigo-600">
          <h2 className="text-xl font-bold">Seller</h2>
          <p className="text-3xl font-bold mt-2">5%</p>
          <p className="text-gray-500 text-sm">per transaction</p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✅ List unlimited products</li>
            <li>✅ Analytics dashboard</li>
            <li>✅ Weekly payouts</li>
          </ul>
          <Link href="/register/seller" className="btn-primary mt-6 inline-block">Start Selling</Link>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-xl font-bold">Affiliate</h2>
          <p className="text-3xl font-bold mt-2">20%</p>
          <p className="text-gray-500 text-sm">commission on each sale</p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✅ Custom referral links</li>
            <li>✅ Real‑time tracking</li>
            <li>✅ Monthly payouts</li>
          </ul>
          <Link href="/register/affiliate" className="btn-primary mt-6 inline-block">Become Affiliate</Link>
        </div>
      </div>
    </div>
  );
}