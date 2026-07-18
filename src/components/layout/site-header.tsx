import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <Link href="/" className="text-lg font-semibold tracking-wide text-white">
        NovaCart
      </Link>
      <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
        <Link href="/products" className="transition hover:text-white">
          Products
        </Link>
        <Link href="/about" className="transition hover:text-white">
          About
        </Link>
        <Link href="/contact" className="transition hover:text-white">
          Contact
        </Link>
      </nav>
      <Link href="/products" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600">
        Shop Now
      </Link>
    </header>
  );
}
