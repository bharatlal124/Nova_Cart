'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
      return;
    }

    if (!isLoading && requireAdmin && user?.role !== 'admin') {
      router.replace('/profile');
    }
  }, [isLoading, requireAdmin, router, user]);

  if (isLoading) {
    return <div className="p-10 text-center text-zinc-400">Loading your session…</div>;
  }

  if (!user) {
    return null;
  }

  if (requireAdmin && user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
