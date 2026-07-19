'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AppUser } from '@/types/auth';

interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (user: AppUser) => void;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      try {
        const storedUser = window.localStorage.getItem('novacart-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser) as AppUser);
        }

        const response = await fetch('/api/auth/me', { cache: 'no-store' });
        if (!response.ok) {
          if (active) {
            setUser(null);
            window.localStorage.removeItem('novacart-user');
          }
          return;
        }

        const data = await response.json();
        if (active) {
          setUser(data.user as AppUser | null);
          if (data.user) {
            window.localStorage.setItem('novacart-user', JSON.stringify(data.user));
          }
        }
      } catch {
        if (active) {
          setUser(null);
          window.localStorage.removeItem('novacart-user');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadSession();

    return () => {
      active = false;
    };
  }, []);

  const signIn = (nextUser: AppUser) => {
    setUser(nextUser);
    window.localStorage.setItem('novacart-user', JSON.stringify(nextUser));
  };

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // keep the UI responsive even if the request fails
    }

    setUser(null);
    window.localStorage.removeItem('novacart-user');
    router.push('/login');
  };

  const refreshUser = async () => {
    try {
      const response = await fetch('/api/auth/me', { cache: 'no-store' });
      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data.user as AppUser | null);
    } catch {
      setUser(null);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      signIn,
      signOut,
      refreshUser,
    }),
    [isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
