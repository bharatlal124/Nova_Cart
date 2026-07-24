import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/product/product-card";
import { getProducts } from "@/lib/mongo-products";

async function getFeaturedProducts() {
  try {
    return await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-zinc-950 px-3 py-6 sm:px-5 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">

        <SiteHeader />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6 lg:p-8">

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div className="max-w-2xl">

              <p className="text-xs font-medium uppercase tracking-[0.35em] text-brand-300 sm:text-sm">
                Curated essentials
              </p>

              <h1 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                Discover products built for modern living
              </h1>

            </div>

            <p className="max-w-xl text-sm leading-7 text-zinc-400">
              Premium, minimal, and crafted for performance — from everyday
              staples to statement pieces.
            </p>

          </div>

          {featuredProducts.length === 0 ? (
            <div className="py-20 text-center text-zinc-400">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id?.toString()}
                  product={{
                    ...product,
                    _id: product._id?.toString(),
                  }}
                />
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}