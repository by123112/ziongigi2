// pages/compare.js
import Link from 'next/link';

export default function Compare() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-6">Compare Plans</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100"><tr><th className="p-4">Feature</th><th className="p-4">Buyer</th><th className="p-4">Seller</th><th className="p-4">Affiliate</th></tr></thead>
          <tbody className="divide-y">
            <tr><td className="p-4 font-semibold">Registration fee</td><td className="p-4">Free</td><td className="p-4">Free</td><td className="p-4">Free</td></tr>
            <tr><td className="p-4 font-semibold">Transaction fee</td><td className="p-4">0%</td><td className="p-4">5%</td><td className="p-4">N/A</td></tr>
            <tr><td className="p-4 font-semibold">Earn commission</td><td className="p-4">–</td><td className="p-4">–</td><td className="p-4">20% per sale</td></tr>
            <tr><td className="p-4 font-semibold">List products</td><td className="p-4">–</td><td className="p-4">Unlimited</td><td className="p-4">–</td></tr>
            <tr><td className="p-4 font-semibold">Payout schedule</td><td className="p-4">–</td><td className="p-4">Weekly</td><td className="p-4">Monthly</td></tr>
            <tr><td className="p-4 font-semibold">Support priority</td><td className="p-4">Standard</td><td className="p-4">Priority</td><td className="p-4">Standard</td></tr>
          </tbody>
        </table>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-8 text-center">
        <Link href="/register/buyer" className="btn-primary">Join as Buyer</Link>
        <Link href="/register/seller" className="btn-primary">Start Selling</Link>
        <Link href="/register/affiliate" className="btn-primary">Become Affiliate</Link>
      </div>
    </div>
  );
}