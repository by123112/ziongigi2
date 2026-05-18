// components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      if (!profile || (allowedRoles.length && !allowedRoles.includes(profile.role))) {
        router.replace('/');
        return;
      }
      setAuthorized(true);
      setLoading(false);
    };
    checkAuth();
  }, [router, allowedRoles]);

  if (loading) return <div className="flex justify-center p-10">Loading...</div>;
  return authorized ? children : null;
}