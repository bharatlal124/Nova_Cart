import { SiteHeader } from '@/components/layout/site-header';
import ProductForm from '@/components/dashboard/ProductForm';

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <SiteHeader />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="mb-8 text-3xl font-semibold text-white">
            Add Product
          </h1>

          <ProductForm mode="create" />
        </section>
      </div>
    </main>
  );
}