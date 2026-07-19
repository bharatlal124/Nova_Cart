import { getDb } from '@/lib/mongodb';
import type { AppUser, UserRole } from '@/types/auth';
import crypto from 'crypto';

interface StoredUser extends AppUser {
  passwordHash: string;
}

function createHash(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function toSafeUser(user: StoredUser): AppUser {
  const { passwordHash, ...safeUser } = user;
  return safeUser as AppUser;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  provider: AppUser['provider'];
  role?: UserRole;
}) {
  const db = await getDb();
  const users = db.collection<StoredUser>('users');

  const existing = await users.findOne({ email: input.email.toLowerCase() });
  if (existing) {
    return null;
  }

  const user: StoredUser = {
    id: `user_${Date.now()}`,
    name: input.name,
    email: input.email.toLowerCase(),
    role: input.role ?? 'customer',
    provider: input.provider,
    createdAt: new Date().toISOString(),
    passwordHash: createHash(input.password),
  };

  await users.insertOne(user);
  return toSafeUser(user);
}

export async function authenticateUser(email: string, password: string) {
  const db = await getDb();
  const users = db.collection<StoredUser>('users');
  const user = await users.findOne({ email: email.toLowerCase() });

  if (!user || user.passwordHash !== createHash(password)) {
    return null;
  }

  return toSafeUser(user);
}

export async function getUserById(id: string) {
  const db = await getDb();
  const users = db.collection<StoredUser>('users');
  const user = await users.findOne({ id });

  if (!user) {
    return null;
  }

  return toSafeUser(user);
}
