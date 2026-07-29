"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { useCartStore } from "@/lib/cart-store";
import { useAuth } from "@/components/providers/auth-provider";

import ShippingForm, {
  ShippingAddress,
} from "./components/ShippingForm";

import OrderSummary from "./components/OrderSummary";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();

  const { user, isAuthenticated } = useAuth();

  const {
    items,
    getCartSubtotal,
    clearCart,
  } = useCartStore();

  const subtotal = getCartSubtotal();

  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  //-------------------------------------------------------
  // Validate Shipping Details
  //-------------------------------------------------------

  const validateShipping = () => {
    if (!isAuthenticated) {
      alert("Please login first.");
      return false;
    }

    if (!items.length) {
      alert("Your cart is empty.");
      return false;
    }

    if (!shipping.fullName.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!shipping.email.trim()) {
      alert("Please enter your email.");
      return false;
    }

    if (!shipping.phone.trim()) {
      alert("Please enter your phone number.");
      return false;
    }

    if (!shipping.address.trim()) {
      alert("Please enter your address.");
      return false;
    }

    if (!shipping.city.trim()) {
      alert("Please enter your city.");
      return false;
    }

    if (!shipping.state.trim()) {
      alert("Please enter your state.");
      return false;
    }

    if (!shipping.pincode.trim()) {
      alert("Please enter your pincode.");
      return false;
    }

    return true;
  };

  //-------------------------------------------------------
  // Razorpay Payment
  //-------------------------------------------------------

  const handlePayment = async () => {
    if (!validateShipping()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/payment/create-order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: subtotal,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setLoading(false);

        alert("Unable to create payment.");

        return;
      }

      //-------------------------------------------------------
      // Razorpay Options
      //-------------------------------------------------------

      const options = {
        // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key: process.env.RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Nova Cart",

        description: "Order Payment",

        image: "/logo.png",

        order_id: data.order.id,

        prefill: {
          name: shipping.fullName,

          email: shipping.email,

          contact: shipping.phone,
        },

        notes: {
          address: shipping.address,
        },

        theme: {
          color: "#6366F1",
        },

        // Payment Success Handler
       handler: async function (response: any) {
  try {
    const verifyResponse = await fetch("/api/payment/verify", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,

        razorpay_payment_id: response.razorpay_payment_id,

        razorpay_signature: response.razorpay_signature,

        userId: user?.id,

        products: items.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          image: item.product.image || "",
          quantity: item.quantity,
          price: item.product.price,
        })),

        totalAmount: subtotal,

        shipping,
      }),
    });

    const result = await verifyResponse.json();

    if (!result.success) {
      alert("Payment verification failed.");
      setLoading(false);
      return;
    }

    clearCart();

    alert("Payment Successful 🎉");

    router.push("/order-success");
  } catch (error) {
    console.error(error);

    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
},      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response: any) {
      console.error(response.error);

      alert(response.error.description || "Payment Failed");

      setLoading(false);
    });

    razorpay.open();
  } catch (error) {
    console.error(error);

    alert("Unable to process payment.");

    setLoading(false);
  }
};
return (
  <main className="min-h-screen bg-zinc-950 px-4 py-6 lg:px-8">
    <div className="mx-auto max-w-7xl space-y-8">
      <SiteHeader />

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <ShippingForm
          shipping={shipping}
          setShipping={setShipping}
        />

        <OrderSummary
          items={items}
          subtotal={subtotal}
          loading={loading}
          onPayment={handlePayment}
        />
      </section>
    </div>
  </main>
);
}