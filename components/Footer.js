export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-indigo-400">Twitter</a>
          <a href="#" className="hover:text-indigo-400">Instagram</a>
          <a href="#" className="hover:text-indigo-400">LinkedIn</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Ziongigi – Global Digital Marketplace</p>
        <div className="mt-4 space-x-4 text-sm">
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/refund" className="hover:underline">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}