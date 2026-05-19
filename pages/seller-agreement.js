// pages/seller-agreement.js
import Link from 'next/link';

export default function SellerAgreement() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-indigo-600 mb-2">Seller Agreement</h1>
      <p className="text-gray-500 mb-8">Last updated: {new Date().toDateString()}</p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>This Seller Agreement (“Agreement”) is a legal contract between you (“Seller”) and Ziongigi (“Platform”, “we”, “us”). By registering as a seller, you agree to be bound by these terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
          <p>You must be at least 18 years old and have the legal authority to sell digital products. You agree to provide accurate, complete, and current information during registration and verification.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Seller Obligations</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You are solely responsible for the quality, legality, and delivery of your digital products.</li>
            <li>You must clearly describe each product (title, format, license, refund policy).</li>
            <li>You must not upload any prohibited content (see Section 4).</li>
            <li>You must complete identity verification and provide valid payout details before listing products.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Prohibited Items</h2>
          <p>The following digital products are strictly forbidden:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Illegal, fraudulent, or deceptive content.</li>
            <li>Malware, viruses, or any software intended to harm.</li>
            <li>Copyright‑infringing material (unless you own the rights or have a valid license).</li>
            <li>Hate speech, violence, harassment, or adult content without age‑gating.</li>
            <li>Financial scams, “get rich quick” schemes, or unregulated investment products.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Fees & Payouts</h2>
          <p>Ziongigi charges a transaction fee of <strong>5%</strong> per sale (plus applicable payment processor fees). Payouts are processed weekly after the product is delivered and the buyer’s refund period expires. You are responsible for any taxes owed on your earnings.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
          <p>You retain full ownership of your digital products. By listing on Ziongigi, you grant us a non‑exclusive license to display, market, and deliver your products to buyers. You warrant that your products do not infringe any third‑party rights.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Termination & Suspension</h2>
          <p>We may suspend or terminate your seller account immediately for violation of this Agreement, illegal activity, or repeated buyer complaints. Upon termination, pending payouts will be held for 90 days to cover potential refunds or disputes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
          <p>Ziongigi acts as a marketplace and is not responsible for the quality, delivery, or legality of products. Our maximum liability to you is the amount of fees paid by you in the prior 12 months.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
          <p>This Agreement is governed by the laws of Nigeria, and any disputes shall be resolved through binding arbitration in Lagos, Nigeria.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Acceptance</h2>
          <p>By checking the “I agree” box during registration, you acknowledge that you have read, understood, and accepted this Seller Agreement. You also agree to our <Link href="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.</p>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link href="/register/seller" className="btn-primary">← Back to Registration</Link>
      </div>
    </div>
  );
}
