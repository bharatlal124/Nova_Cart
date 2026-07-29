"use client";

import { CartItem } from "@/lib/cart-store";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  loading?: boolean;
  onPayment: () => void;
}

export default function OrderSummary({
  items,
  subtotal,
  loading = false,
  onPayment,
}: OrderSummaryProps) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sticky top-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">
          Order Summary
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Review your order
        </h2>
      </div>

      {/* Products */}

      <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2">
        {items.length === 0 ? (
          <p className="text-zinc-400 text-sm">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-xl bg-zinc-900">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                      No Image
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-white">
                    {item.product.name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    Qty : {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-semibold text-white">
                ₹
                {(item.product.price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Price */}

      <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>

          <span className="text-white">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>Shipping</span>

          <span className="text-green-400">
            Free
          </span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>GST</span>

          <span className="text-white">
            ₹0
          </span>
        </div>

        <div className="mt-5 flex justify-between border-t border-white/10 pt-5 text-lg font-semibold text-white">
          <span>Total</span>

          <span>
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Payment Button */}

      <button
        onClick={onPayment}
        disabled={loading || items.length === 0}
        className="mt-8 w-full rounded-full bg-brand-500 px-5 py-3 font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>

      <p className="mt-4 text-center text-xs text-zinc-500">
        Secure payments powered by Razorpay.
      </p>
    </aside>
  );
}