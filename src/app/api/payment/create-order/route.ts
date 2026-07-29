import { NextRequest, NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount",
        },
        {
          status: 400,
        }
      );
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay uses paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: true,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
      },
      {
        status: 500,
      }
    );
  }
}