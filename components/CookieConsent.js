// components/CookieConsent.js
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm">We use cookies to improve your experience. By using Ziongigi, you accept our <a href="/privacy" className="underline">Privacy Policy</a>.</p>
      <button onClick={accept} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-sm">Accept</button>
    </div>
  );
}