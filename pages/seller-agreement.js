// pages/seller-agreement.js
import Link from 'next/link';

export default function SellerAgreement() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-indigo-600 mb-2">Seller Legal Agreements</h1>
      <p className="text-gray-500 mb-8">Last updated: {new Date().toDateString()}</p>

      {/* Terms and Conditions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Terms and Conditions</h2>
        <div className="space-y-4 text-gray-700">
          <section><h3 className="font-semibold">1. Acceptance of Terms</h3><p>By creating a seller account, accessing, or using this platform, you agree to comply with and be legally bound by these Terms and Conditions, the Privacy Policy, Refund Policy, and Seller Agreement. If you do not agree, you may not use the platform.</p></section>
          <section><h3 className="font-semibold">2. Eligibility</h3><p>Sellers must: be at least 18 years old or the legal age in their jurisdiction; provide accurate and complete registration information; have the legal right to sell and distribute uploaded digital products.</p></section>
          <section><h3 className="font-semibold">3. Seller Responsibilities</h3><p>Sellers agree to: upload only original or properly licensed content; ensure products do not infringe copyrights, trademarks, or intellectual property rights; maintain accurate product descriptions and pricing; deliver products that function as advertised; respond professionally to customer inquiries and disputes.</p></section>
          <section><h3 className="font-semibold">4. Prohibited Content</h3><p>Sellers may not upload or distribute: illegal, fraudulent, or deceptive materials; malware, viruses, or harmful software; pornographic or explicit content; hate speech, discriminatory, or violent content; copyright‑infringing materials; fake or misleading products.</p></section>
          <section><h3 className="font-semibold">5. Payments and Fees</h3><p>The platform may charge commissions, subscription fees, or transaction fees. Sellers authorize the platform to deduct applicable fees before payouts. Payout schedules and withdrawal minimums are determined by the platform.</p></section>
          <section><h3 className="font-semibold">6. Account Suspension and Termination</h3><p>The platform reserves the right to suspend or terminate seller accounts for: violation of platform policies; fraudulent activity; copyright infringement; excessive customer complaints; abuse of the platform.</p></section>
          <section><h3 className="font-semibold">7. Intellectual Property</h3><p>Sellers retain ownership of their content but grant the platform a non‑exclusive license to display, market, and distribute products for marketplace operations.</p></section>
          <section><h3 className="font-semibold">8. Limitation of Liability</h3><p>The platform shall not be liable for: indirect or consequential damages; loss of profits or business opportunities; unauthorized access caused by third‑party attacks.</p></section>
          <section><h3 className="font-semibold">9. Changes to Terms</h3><p>The platform reserves the right to modify these Terms at any time. Continued use of the platform constitutes acceptance of updated terms.</p></section>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Privacy Policy</h2>
        <div className="space-y-4 text-gray-700">
          <section><h3 className="font-semibold">1. Information We Collect</h3><p>We may collect: full name, email address, phone number, payment information, government‑issued identification, IP address and device information, transaction history.</p></section>
          <section><h3 className="font-semibold">2. How We Use Information</h3><p>Collected information may be used to: create and manage seller accounts; process payments and withdrawals; prevent fraud and unauthorized activity; improve platform functionality and security; communicate important updates and notifications.</p></section>
          <section><h3 className="font-semibold">3. Data Protection</h3><p>We implement industry‑standard security measures including: encrypted data transmission; secure payment processing; access control systems; fraud monitoring technologies.</p></section>
          <section><h3 className="font-semibold">4. Third‑Party Services</h3><p>We may share limited information with trusted third‑party providers such as: payment processors; identity verification providers; analytics and hosting services.</p></section>
          <section><h3 className="font-semibold">5. Seller Rights</h3><p>Sellers may: request access to personal data; correct inaccurate information; request account deletion subject to legal obligations.</p></section>
          <section><h3 className="font-semibold">6. Cookies and Tracking</h3><p>The platform may use cookies and analytics technologies to improve user experience and monitor performance.</p></section>
          <section><h3 className="font-semibold">7. International Compliance</h3><p>The platform aims to comply with applicable data protection regulations including: GDPR, CCPA, international privacy standards where applicable.</p></section>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Refund Policy</h2>
        <div className="space-y-4 text-gray-700">
          <section><h3 className="font-semibold">1. Digital Product Nature</h3><p>Due to the downloadable nature of digital products, all sales are generally final unless otherwise stated.</p></section>
          <section><h3 className="font-semibold">2. Eligible Refund Cases</h3><p>Refunds may be granted if: the product is corrupted or inaccessible; the delivered product significantly differs from its description; duplicate payments occurred; the seller fails to provide promised support or access.</p></section>
          <section><h3 className="font-semibold">3. Non‑Refundable Situations</h3><p>Refunds will not be issued for: buyer remorse; lack of technical knowledge; failure to read product descriptions; compatibility issues clearly disclosed before purchase.</p></section>
          <section><h3 className="font-semibold">4. Dispute Resolution</h3><p>Customers are encouraged to contact sellers first. The platform may intervene in unresolved disputes and issue decisions at its discretion.</p></section>
          <section><h3 className="font-semibold">5. Chargebacks</h3><p>Fraudulent chargebacks may result in: account suspension; permanent bans; legal action where necessary.</p></section>
        </div>
      </div>

      {/* Seller Agreement */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Seller Agreement</h2>
        <div className="space-y-4 text-gray-700">
          <section><h3 className="font-semibold">1. Independent Seller Relationship</h3><p>Sellers operate as independent contractors and are not employees, partners, or representatives of the platform.</p></section>
          <section><h3 className="font-semibold">2. Product Ownership and Licensing</h3><p>Sellers confirm they own or possess valid rights to distribute uploaded products.</p></section>
          <section><h3 className="font-semibold">3. Revenue Distribution</h3><p>The platform will distribute seller earnings according to: applicable commissions; taxes; processing fees; withdrawal policies.</p></section>
          <section><h3 className="font-semibold">4. Taxes and Compliance</h3><p>Sellers are solely responsible for: tax reporting; VAT obligations; local business compliance; licensing requirements.</p></section>
          <section><h3 className="font-semibold">5. Content Moderation</h3><p>The platform reserves the right to: review uploaded content; remove products violating policies; reject misleading or low‑quality products.</p></section>
          <section><h3 className="font-semibold">6. Confidentiality</h3><p>Sellers agree not to misuse customer information or disclose confidential platform operations.</p></section>
          <section><h3 className="font-semibold">7. Indemnification</h3><p>Sellers agree to indemnify and hold harmless the platform from claims arising from: copyright infringement; product misuse; legal disputes caused by seller actions.</p></section>
          <section><h3 className="font-semibold">8. Governing Law</h3><p>These agreements shall be governed by the laws applicable in the platform’s operating jurisdiction unless otherwise required by international law.</p></section>
          <section><h3 className="font-semibold">9. Agreement Acceptance</h3><p>By creating a seller account, sellers acknowledge that they have read, understood, and agreed to all platform policies and agreements.</p></section>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/register/seller" className="btn-primary">← Back to Registration</Link>
      </div>
    </div>
  );
}
