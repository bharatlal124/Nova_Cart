"use client";

import { Dispatch, SetStateAction } from "react";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface ShippingFormProps {
  shipping: ShippingAddress;
  setShipping: Dispatch<SetStateAction<ShippingAddress>>;
}

export default function ShippingForm({
  shipping,
  setShipping,
}: ShippingFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setShipping((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">
          Shipping Details
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Delivery Address
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Enter your shipping details before completing the payment.
        </p>
      </div>

      <div className="grid gap-5">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={shipping.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-brand-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={shipping.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-brand-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={shipping.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-brand-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Address
          </label>

          <textarea
            rows={4}
            name="address"
            value={shipping.address}
            onChange={handleChange}
            placeholder="House No, Street, Area"
            className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-brand-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            City
          </label>

          <input
            type="text"
            name="city"
            value={shipping.city}
            onChange={handleChange}
            placeholder="New Delhi"
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-brand-500"
          />
        </div>

        {/* State */}
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            State
          </label>

          <input
            type="text"
            name="state"
            value={shipping.state}
            onChange={handleChange}
            placeholder="Delhi"
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-brand-500"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Pincode
          </label>

          <input
            type="text"
            name="pincode"
            value={shipping.pincode}
            onChange={handleChange}
            placeholder="110001"
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-brand-500"
          />
        </div>
      </div>
    </div>
  );
}