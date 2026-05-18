// pages/privacy.js
export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Effective: {new Date().toDateString()}</p>
      <div className="prose max-w-none space-y-6">
        <p>Ziongigi respects your privacy. This policy describes what data we collect, how we use it, and your rights.</p>
        <section><h2>1. Data We Collect</h2><ul><li><strong>Account data:</strong> name, email, phone (for sellers/affiliates).</li><li><strong>Transaction data:</strong> purchase history, payment reference (no card details).</li><li><strong>Usage data:</strong> IP address, device info, cookies.</li></ul></section>
        <section><h2>2. How We Use Data</h2><ul><li>To process orders and provide digital downloads.</li><li>To prevent fraud and enforce platform policies.</li><li>To send transactional emails (order confirmations, password reset).</li><li>With your consent, to send marketing newsletters (you can unsubscribe).</li></ul></section>
        <section><h2>3. Data Sharing</h2><p>We do not sell your data. We share with:</p><ul><li><strong>Service providers:</strong> Supabase (database), Paystack (payments), Backblaze (file storage), Cloudflare (security).</li><li><strong>Legal authorities:</strong> when required by law.</li></ul></section>
        <section><h2>4. Your Rights (GDPR / CCPA)</h2><ul><li>Access, correct, or delete your personal data.</li><li>Export your data (contact support).</li><li>Withdraw consent for marketing.</li></ul></section>
        <section><h2>5. Security</h2><p>We use encryption, RLS policies, and secure APIs. However, no internet transmission is 100% secure.</p></section>
        <section><h2>6. Cookies</h2><p>We use essential cookies for authentication and analytics. You can disable non‑essential cookies via our cookie banner.</p></section>
        <section><h2>7. Contact</h2><p>For privacy questions: <a href="mailto:privacy@ziongigi.com" className="text-indigo-600">privacy@ziongigi.com</a></p></section>
      </div>
    </div>
  );
}