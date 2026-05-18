// pages/affiliate-program.js
import Link from 'next/link';
export default function AffiliateProgram() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-center">Ziongigi Affiliate Program</h1>
      <p className="text-center text-gray-600 mt-2">Earn 20% recurring commission on every sale you refer</p>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="card p-6 text-center">🔗 1. Generate unique links</div>
        <div className="card p-6 text-center">📣 2. Share with your audience</div>
        <div className="card p-6 text-center">💰 3. Get paid monthly</div>
      </div>
      <div className="text-center mt-8">
        <Link href="/register/affiliate" className="btn-primary">Become an Affiliate</Link>
      </div>
    </div>
  );
}