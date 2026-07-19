import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/mongo-auth';

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('novacart-user-id')?.value;

  if (!userId) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
