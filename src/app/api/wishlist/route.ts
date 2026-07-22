import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  getWishlistByUser,
  toggleWishlist,
   removeWishlist,
} from "@/lib/mongo-wishlist";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const userId =
      cookieStore.get("novacart-user-id")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const wishlist = await getWishlistByUser(userId);

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch wishlist",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const userId =
      cookieStore.get("novacart-user-id")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const result = await toggleWishlist(
      userId,
      body.productId
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const userId =
      cookieStore.get("novacart-user-id")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    if (!body.productId) {
      return NextResponse.json(
        {
          message: "Product id is required",
        },
        {
          status: 400,
        }
      );
    }

    await removeWishlist(
      userId,
      body.productId
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to remove wishlist",
      },
      {
        status: 500,
      }
    );
  }
}