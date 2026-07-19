import { SiteHeader } from '@/components/layout/site-header';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <SiteHeader />
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="text-3xl font-semibold text-white">Admin dashboard</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-300">
            This space will host analytics, inventory, orders, and customer management for store operators.
          </p>
        </section>
      </div>
    </main>
  );
}
