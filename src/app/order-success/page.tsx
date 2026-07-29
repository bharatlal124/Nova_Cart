"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShoppingBag, Package } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Prevent users from directly opening this page without placing an order.
    // Later we'll replace this with proper order validation.
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SiteHeader />

        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur">

            {/* Success Icon */}

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-14 w-14 text-green-400" />
            </div>

            <h1 className="mt-8 text-4xl font-bold text-white">
              Payment Successful 🎉
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-zinc-400 leading-7">
              Thank you for shopping with <span className="text-white font-medium">Nova Cart</span>.
              Your order has been placed successfully and your payment has been received.
            </p>

            {/* Order Status */}

            <div className="mt-10 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
                <ShoppingBag className="mx-auto h-8 w-8 text-brand-400" />

                <h3 className="mt-3 font-semibold text-white">
                  Order Confirmed
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  We've received your order.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
                <Package className="mx-auto h-8 w-8 text-brand-400" />

                <h3 className="mt-3 font-semibold text-white">
                  Preparing
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Your items are being packed.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
                <CheckCircle2 className="mx-auto h-8 w-8 text-brand-400" />

                <h3 className="mt-3 font-semibold text-white">
                  Ready to Ship
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  You'll receive tracking details soon.
                </p>
              </div>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

              <Link
                href="/products"
                className="rounded-full bg-brand-500 px-6 py-3 font-medium text-white transition hover:bg-brand-600"
              >
                Continue Shopping
              </Link>

              <Link
                href="/profile"
                className="rounded-full border border-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                View My Orders
              </Link>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}