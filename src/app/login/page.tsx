import { SiteHeader } from '@/components/layout/site-header';
import { AuthForm } from '@/components/auth/auth-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <SiteHeader />
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
