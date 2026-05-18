// pages/faq.js
import { useState } from 'react';

const faqs = [
  { q: "What is Ziongigi?", a: "Ziongigi is a global marketplace for digital products like eBooks, templates, software, and courses." },
  { q: "How do I buy a product?", a: "Browse products, click 'Buy Now', complete payment via Paystack, and download instantly." },
  { q: "Is my purchase secure?", a: "Yes, all payments are encrypted and we use escrow to protect buyers." },
  { q: "How do I become a seller?", a: "Register as a seller, submit KYC, and start listing your digital products." },
  { q: "What commission does Ziongigi take?", a: "Sellers pay 5% transaction fee. Affiliates earn 20% commission." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-4 font-semibold text-gray-800 hover:bg-indigo-50 transition flex justify-between items-center"
              >
                {faq.q}
                <span className="text-indigo-600">{openIndex === i ? '▲' : '▼'}</span>
              </button>
              {openIndex === i && <div className="px-6 pb-4 text-gray-600 border-t">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}