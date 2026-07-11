import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, logAction } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const res = await db.execute({
      sql: 'SELECT * FROM jobs WHERE slug = ?',
      args: [slug]
    });
    const job = res.rows[0] as any;

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const parsedJob = {
      ...job,
      responsibilities: JSON.parse(job.responsibilities),
      requirements: JSON.parse(job.requirements)
    };

    return NextResponse.json(parsedJob);
  } catch (error: any) {
    console.error('Fetch job detail error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const { title, department, location, experience, type, description, responsibilities, requirements, status } = await request.json();

    const checkRes = await db.execute({
      sql: 'SELECT * FROM jobs WHERE slug = ?',
      args: [slug]
    });
    const existing = checkRes.rows[0];

    if (!existing) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    await db.execute({
      sql: `
        UPDATE jobs 
        SET title = ?, department = ?, location = ?, experience = ?, type = ?, description = ?, responsibilities = ?, requirements = ?, status = ?
        WHERE slug = ?
      `,
      args: [
        title,
        department,
        location,
        experience,
        type,
        description,
        JSON.stringify(responsibilities),
        JSON.stringify(requirements),
        status,
        slug
      ]
    });

    await logAction(user.email, `Updated job opening: ${title}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update job error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;

    const checkRes = await db.execute({
      sql: 'SELECT title FROM jobs WHERE slug = ?',
      args: [slug]
    });
    const job = checkRes.rows[0] as any;

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    await db.execute({
      sql: 'DELETE FROM jobs WHERE slug = ?',
      args: [slug]
    });

    await logAction(user.email, `Deleted job opening: ${job.title}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete job error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
