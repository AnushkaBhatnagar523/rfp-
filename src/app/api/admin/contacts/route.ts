import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    const contacts = res.rows as any[];

    return NextResponse.json(contacts);
  } catch (error: any) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
