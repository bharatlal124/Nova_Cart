export type UserRole = 'customer' | 'admin';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: 'credentials' | 'google';
  createdAt: string;
}
