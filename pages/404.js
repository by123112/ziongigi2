// pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-indigo-600">404</h1>
        <p className="text-2xl mt-4">Oops! Page not found.</p>
        <p className="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn-primary inline-block mt-6">Go Home</Link>
      </div>
    </div>
  );
}