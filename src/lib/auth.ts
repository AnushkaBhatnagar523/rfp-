import crypto from 'crypto';
import { cookies } from 'next/headers';
import db from './db';

export interface UserSession {
  id: number;
  email: string;
  role: string;
}

// Security: Hash password using PBKDF2
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
  } catch (error) {
    return false;
  }
}

// Create a session in DB and return the token
export async function createSession(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  // Sessions expire in 2 hours
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  const now = new Date().toISOString();

  await db.execute({
    sql: 'INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)',
    args: [token, userId, expiresAt, now]
  });

  return token;
}

// Get user session from token
export async function getSession(token: string): Promise<UserSession | null> {
  try {
    const sessionRes = await db.execute({
      sql: `
        SELECT s.token, s.expires_at, u.id, u.email, u.role 
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ?
      `,
      args: [token]
    });
    
    const session = sessionRes.rows[0] as any;

    if (!session) return null;

    // Check expiration
    if (new Date(session.expires_at) < new Date()) {
      // Clean up expired session
      await db.execute({
        sql: 'DELETE FROM sessions WHERE token = ?',
        args: [token]
      });
      return null;
    }

    return {
      id: Number(session.id),
      email: String(session.email),
      role: String(session.role)
    };
  } catch (error) {
    return null;
  }
}

// Fetch user from Request context (via Cookies)
export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('admin_session');
    if (!tokenCookie || !tokenCookie.value) return null;

    return await getSession(tokenCookie.value);
  } catch (error) {
    return null;
  }
}

// Log audit activities
export async function logAction(userEmail: string, action: string): Promise<void> {
  try {
    await db.execute({
      sql: 'INSERT INTO audit_logs (user_email, action, created_at) VALUES (?, ?, ?)',
      args: [userEmail, action, new Date().toISOString()]
    });
  } catch (error) {
    console.error('Audit log failed:', error);
  }
}

// Logout session
export async function logoutSession(token: string): Promise<void> {
  try {
    await db.execute({
      sql: 'DELETE FROM sessions WHERE token = ?',
      args: [token]
    });
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
