import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await db.execute(`
      SELECT a.*, j.title as job_title 
      FROM applications a 
      JOIN jobs j ON a.job_slug = j.slug 
      ORDER BY a.created_at DESC
    `);
    const applications = res.rows as any[];

    return NextResponse.json(applications);
  } catch (error: any) {
    console.error('Fetch applications error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
