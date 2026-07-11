import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, logAction } from '@/lib/auth';

export async function GET() {
  try {
    const res = await db.execute('SELECT * FROM impact_stats');
    const stats = res.rows as any[];
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Fetch impact stats error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { key, value, label } = await request.json();

    if (!key || !value || !label) {
      return NextResponse.json({ error: 'Key, value, and label are required' }, { status: 400 });
    }

    const checkRes = await db.execute({
      sql: 'SELECT id FROM impact_stats WHERE key = ?',
      args: [key]
    });
    const existing = checkRes.rows[0];

    if (!existing) {
      return NextResponse.json({ error: 'Impact statistic key not found' }, { status: 404 });
    }

    await db.execute({
      sql: 'UPDATE impact_stats SET value = ?, label = ? WHERE key = ?',
      args: [value, label, key]
    });

    await logAction(user.email, `Updated impact metric [${key}] to value: ${value}, label: ${label}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update impact stats error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
