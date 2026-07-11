import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCurrentUser, logoutSession, logAction } from '@/lib/auth';

export async function POST() {
  try {
    const user = await getCurrentUser();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    if (token) {
      await logoutSession(token);
    }

    // Clear cookie
    cookieStore.delete('admin_session');

    if (user) {
      await logAction(user.email, 'Logged out');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
