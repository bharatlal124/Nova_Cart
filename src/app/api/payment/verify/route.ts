import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      products,
      totalAmount,
    } = await req.json();

    // Check required fields
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing payment details",
        },
        { status: 400 }
      );
    }

    // Generate expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Verify signature
    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        { status: 400 }
      );
    }

    // Save order in MongoDB
    const db = await getDb();

    const result = await db.collection("orders").insertOne({
      userId,
      products,
      totalAmount,

      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,

      status: "Paid",
      paymentStatus: "Success",

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      orderId: result.insertedId,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}