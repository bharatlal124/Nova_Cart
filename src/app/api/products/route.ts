// import { NextResponse } from 'next/server';
// import { createProduct, getProducts } from '@/lib/mongo-products';

// export async function GET() {
//   const products = await getProducts();
//   return NextResponse.json(products);
// }

// export async function POST(request: Request) {
//   const body = await request.json();
//   const product = await createProduct(body);
//   return NextResponse.json(product, { status: 201 });
// }

import { NextResponse } from "next/server";
import { createProduct, getProducts } from "@/lib/mongo-products";

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await createProduct(body);

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}