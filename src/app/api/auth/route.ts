import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { authenticateUser, createUser } from '@/lib/mongo-auth';
import { loginSchema, registerSchema } from '@/schemas/auth';

async function setSessionCookie(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set('novacart-user-id', userId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body.mode === 'register') {
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid input' }, { status: 400 });
    }

    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      provider: 'credentials',
    });

    if (!user) {
      return NextResponse.json({ error: 'An account already exists for this email.' }, { status: 409 });
    }

    await setSessionCookie(user.id);
    return NextResponse.json({ user }, { status: 201 });
  }

  if (body.mode === 'login') {
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid input' }, { status: 400 });
    }

    const user = await authenticateUser(parsed.data.email, parsed.data.password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    await setSessionCookie(user.id);
    return NextResponse.json({ user });
  }

  if (body.mode === 'google') {
    const user = await createUser({
      name: 'Google User',
      email: `google-${Date.now()}@novacart.dev`,
      password: 'temporary-google-password',
      provider: 'google',
    });

    if (!user) {
      return NextResponse.json({ error: 'Unable to continue with Google sign-in.' }, { status: 400 });
    }

    await setSessionCookie(user.id);
    return NextResponse.json({ user });
  }

  return NextResponse.json({ error: 'Unsupported auth mode' }, { status: 400 });
}
