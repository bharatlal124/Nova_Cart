import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = await cookies();
  cookieStore.set('novacart-user-id', body.userId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ success: true });
}
