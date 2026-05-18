// pages/refund.js
export default function Refund() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: {new Date().toDateString()}</p>
      <div className="prose max-w-none space-y-6">
        <p>Because digital products are delivered instantly, <strong>all sales are final</strong> unless the product is defective or not as described.</p>
        <section><h2>When a Refund is Granted</h2><ul><li>The file is corrupted or cannot be opened.</li><li>The product is materially different from what was described.</li><li>You did not receive a download link within 24 hours (after contacting support).</li></ul></section>
        <section><h2>When Refunds are Not Granted</h2><ul><li>Change of mind after download.</li><li>Incompatibility with your software/hardware (e.g., wrong file format).</li><li>You lost the file and cannot re‑download (you can re‑download from your account).</li></ul></section>
        <section><h2>How to Request a Refund</h2><ol><li>Go to your Order History and click "Open Dispute".</li><li>Provide evidence (screenshot, error message).</li><li>Our team will review within 48 hours.</li><li>If approved, refund will be issued to your original payment method within 5‑7 business days.</li></ol></section>
        <p>For questions, contact <a href="mailto:support@ziongigi.com" className="text-indigo-600">support@ziongigi.com</a></p>
      </div>
    </div>
  );
}