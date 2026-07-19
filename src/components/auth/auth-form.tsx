'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '@/schemas/auth';
import { useAuth } from '@/components/providers/auth-provider';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === 'register';
  const router = useRouter();
  const { signIn } = useAuth();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput | LoginInput>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const registerErrors = isRegister ? (errors as Partial<Record<'name' | 'email' | 'password' | 'confirmPassword', { message?: string }>>) : undefined;

  const onSubmit = async (values: RegisterInput | LoginInput) => {
    setServerMessage(null);

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: isRegister ? 'register' : 'login',
        ...(values as RegisterInput & LoginInput),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setServerMessage(data.error ?? 'Unable to continue with authentication.');
      return;
    }

    signIn(data.user);
    router.push('/profile');
  };

  const handleGoogle = async () => {
    setServerMessage(null);
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'google' }),
    });

    const data = await response.json();
    if (!response.ok) {
      setServerMessage(data.error ?? 'Google sign-in is unavailable right now.');
      return;
    }

    signIn(data.user);
    router.push('/profile');
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-zinc-900/70 p-8 shadow-soft backdrop-blur">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-300">NovaCart account</p>
        <h1 className="text-3xl font-semibold text-white">{isRegister ? 'Create your account' : 'Welcome back'}</h1>
        <p className="text-sm leading-6 text-zinc-400">
          {isRegister
            ? 'Create a secure account to save addresses, manage orders, and keep shopping effortlessly.'
            : 'Sign in to access your wishlist, saved addresses, and recent orders.'}
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        Continue with Google
      </button>

      <div className="mb-4 flex items-center gap-3 text-sm text-zinc-500">
        <div className="h-px flex-1 bg-white/10" />
        <span>or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {isRegister ? (
          <div>
            <label className="mb-2 block text-sm text-zinc-300" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              {...register('name')}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none ring-0"
            />
            {registerErrors?.name ? <p className="mt-2 text-sm text-rose-400">{registerErrors.name.message}</p> : null}
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm text-zinc-300" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none ring-0"
          />
          {errors.email ? <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p> : null}
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none ring-0"
          />
          {errors.password ? <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p> : null}
        </div>

        {isRegister ? (
          <div>
            <label className="mb-2 block text-sm text-zinc-300" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none ring-0"
            />
            {registerErrors?.confirmPassword ? <p className="mt-2 text-sm text-rose-400">{registerErrors.confirmPassword.message}</p> : null}
          </div>
        ) : null}

        {serverMessage ? <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">{serverMessage}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-brand-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-400">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link href={isRegister ? '/login' : '/register'} className="font-medium text-brand-300 transition hover:text-white">
          {isRegister ? 'Sign in instead' : 'Create one'}
        </Link>
      </p>
    </div>
  );
}
