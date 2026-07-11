import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, logAction } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const department = searchParams.get('department') || 'All';
    const query = searchParams.get('query') || '';
    const status = searchParams.get('status') || 'active'; // active, all

    let sql = 'SELECT * FROM jobs WHERE 1=1';
    const params: any[] = [];

    if (status === 'all') {
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    } else {
      sql += ' AND status = ?';
      params.push('active');
    }

    if (department !== 'All') {
      sql += ' AND department = ?';
      params.push(department);
    }

    if (query) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }

    sql += ' ORDER BY created_at DESC';

    const res = await db.execute({ sql, args: params });
    const jobs = res.rows as any[];

    // Parse responsibilities and requirements JSON lists
    const parsedJobs = jobs.map(job => ({
      ...job,
      responsibilities: JSON.parse(job.responsibilities),
      requirements: JSON.parse(job.requirements)
    }));

    return NextResponse.json(parsedJobs);
  } catch (error: any) {
    console.error('Fetch jobs error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, department, location, experience, type, description, responsibilities, requirements, status } = await request.json();

    if (!title || !department || !location || !experience || !type || !description || !responsibilities || !requirements) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Slug generation
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    // Check existing slug
    const checkRes = await db.execute({
      sql: 'SELECT slug FROM jobs WHERE slug = ?',
      args: [slug]
    });
    const existing = checkRes.rows[0];
    if (existing) {
      return NextResponse.json({ error: 'A job posting with a similar title already exists' }, { status: 409 });
    }

    const now = new Date().toISOString();

    await db.execute({
      sql: `
        INSERT INTO jobs (slug, title, department, location, experience, type, description, responsibilities, requirements, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        slug,
        title,
        department,
        location,
        experience,
        type,
        description,
        JSON.stringify(responsibilities),
        JSON.stringify(requirements),
        status || 'active',
        now
      ]
    });

    await logAction(user.email, `Created job opening: ${title}`);

    return NextResponse.json({ success: true, slug });
  } catch (error: any) {
    console.error('Create job error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
