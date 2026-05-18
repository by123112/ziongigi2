// pages/terms.js
export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-500 mb-8">Last updated: {new Date().toDateString()}</p>
      <div className="prose max-w-none space-y-6">
        <section><h2>1. Acceptance of Terms</h2><p>By accessing Ziongigi, you agree to these terms. If you do not agree, do not use the platform.</p></section>
        <section><h2>2. Digital Products</h2><p>All products are digital and delivered instantly after payment. Refunds are governed by our Refund Policy.</p></section>
        <section><h2>3. Seller Obligations</h2><p>Sellers must provide accurate descriptions, legal files, and respect intellectual property. Ziongigi may remove infringing content.</p></section>
        <section><h2>4. Affiliate Program</h2><p>Affiliates earn 20% commission on referred sales. Spam or fraudulent referrals will result in account termination and forfeiture of commissions.</p></section>
        <section><h2>5. Fees & Payouts</h2><p>Platform fee for sellers is 5% per transaction. Payouts are processed weekly. Affiliate payouts are monthly for earnings above $10.</p></section>
        <section><h2>6. Prohibited Items</h2><p>Illegal content, malware, copyrighted material without license, hate speech, adult content without age gate, and financial scams are forbidden.</p></section>
        <section><h2>7. Limitation of Liability</h2><p>Ziongigi is a marketplace – we are not responsible for product quality or buyer‑seller disputes beyond our dispute resolution process.</p></section>
        <section><h2>8. Governing Law</h2><p>These terms are governed by the laws of Nigeria, with arbitration in Lagos.</p></section>
        <section><h2>9. Changes to Terms</h2><p>We may update these terms. Continued use constitutes acceptance.</p></section>
      </div>
    </div>
  );
}