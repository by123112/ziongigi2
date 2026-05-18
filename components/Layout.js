// components/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}