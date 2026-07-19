import { promises as fs } from 'fs';
import path from 'path';
import type { AppUser, UserRole } from '@/types/auth';

interface StoredUser extends AppUser {
  passwordHash: string;
}

const storeDir = path.join(process.cwd(), '.data');
const storePath = path.join(storeDir, 'users.json');

function createHash(value: string) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(value).digest('hex');
}

async function readUsers(): Promise<StoredUser[]> {
  try {
    const file = await fs.readFile(storePath, 'utf8');
    return JSON.parse(file) as StoredUser[];
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  await fs.mkdir(storeDir, { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(users, null, 2));
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  provider: AppUser['provider'];
  role?: UserRole;
}) {
  const users = await readUsers();
  const existing = users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());

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

  users.push(user);
  await writeUsers(users);

  const { passwordHash, ...safeUser } = user;
  return safeUser as AppUser;
}

export async function authenticateUser(email: string, password: string) {
  const users = await readUsers();
  const user = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

  if (!user || user.passwordHash !== createHash(password)) {
    return null;
  }

  const { passwordHash, ...safeUser } = user;
  return safeUser as AppUser;
}

export async function getUserById(id: string) {
  const users = await readUsers();
  const user = users.find((entry) => entry.id === id);

  if (!user) {
    return null;
  }

  const { passwordHash, ...safeUser } = user;
  return safeUser as AppUser;
}
