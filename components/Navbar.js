import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        setUserRole(data?.role);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        setUserRole(data?.role);
      } else {
        setUser(null);
        setUserRole(null);
      }
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (userRole === 'admin') return '/admin/dashboard';
    if (userRole === 'seller') return '/seller/dashboard';
    if (userRole === 'affiliate') return '/affiliate/dashboard';
    return '/';
  };

  const navLinks = [
    { href: '/products', label: 'Products' },
    { href: '/affiliate-program', label: 'Affiliate' },
    { href: '/register/seller', label: 'Sell' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            <img src="/images/logo.png" alt="Ziongigi" className="h-8 w-auto" />
            Ziongigi
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-indigo-600 transition">{link.label}</Link>
            ))}
            {!user ? (
              <>
                <Link href="/login" className="hover:text-indigo-600">Login</Link>
                <Link href="/register/buyer" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
              </>
            ) : (
              <>
                <Link href={getDashboardLink()} className="hover:text-indigo-600">Dashboard</Link>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-700">Logout</button>
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl focus:outline-none">
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile slide‑out menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <button onClick={() => setMobileMenuOpen(false)} className="self-end text-2xl">✕</button>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">{link.label}</Link>
            ))}
            {!user ? (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">Login</Link>
                <Link href="/register/buyer" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center">Sign Up</Link>
              </>
            ) : (
              <>
                <Link href={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">Dashboard</Link>
                <button onClick={handleLogout} className="text-red-600 text-left">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}