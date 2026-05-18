// pages/how-it-works.js
export default function HowItWorks() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-center">How Ziongigi Works</h1>
      <div className="space-y-8 mt-8">
        <div className="flex gap-4"><span className="text-2xl">🔍</span> <div><strong>Find</strong> – Browse thousands of digital products</div></div>
        <div className="flex gap-4"><span className="text-2xl">💳</span> <div><strong>Buy</strong> – Pay securely with Paystack (card, bank, USSD)</div></div>
        <div className="flex gap-4"><span className="text-2xl">📥</span> <div><strong>Download</strong> – Instant access after purchase</div></div>
      </div>
    </div>
  );
}