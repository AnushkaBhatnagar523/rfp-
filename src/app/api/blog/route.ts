import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, logAction } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'All';
    const query = searchParams.get('query') || '';
    const status = searchParams.get('status') || 'published'; // Can fetch draft if authenticated in admin panel

    let sql = 'SELECT * FROM blogs WHERE 1=1';
    const params: any[] = [];

    if (status === 'all') {
      // Admin dashboard query
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    } else {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (query) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }

    sql += ' ORDER BY date DESC, created_at DESC';

    const res = await db.execute({ sql, args: params });
    const posts = res.rows as any[];

    // Parse JSON contents
    const parsedPosts = posts.map(post => ({
      ...post,
      content: JSON.parse(post.content)
    }));

    return NextResponse.json(parsedPosts);
  } catch (error: any) {
    console.error('Fetch blogs error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, category, author, excerpt, content, image, status } = await request.json();

    if (!title || !category || !author || !excerpt || !content || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Slug generation
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    // Check if slug exists
    const checkRes = await db.execute({
      sql: 'SELECT slug FROM blogs WHERE slug = ?',
      args: [slug]
    });
    const existing = checkRes.rows[0];
    if (existing) {
      return NextResponse.json({ error: 'A blog post with a similar title already exists' }, { status: 409 });
    }

    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const displayDate = new Date().toLocaleDateString('en-US', dateOptions);
    const now = new Date().toISOString();

    await db.execute({
      sql: `
        INSERT INTO blogs (slug, title, category, author, date, excerpt, content, image, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        slug,
        title,
        category,
        author,
        displayDate,
        excerpt,
        JSON.stringify(content), // Accept either array or string, store as array JSON
        image,
        status || 'published',
        now
      ]
    });

    await logAction(user.email, `Created blog post: ${title}`);

    return NextResponse.json({ success: true, slug });
  } catch (error: any) {
    console.error('Create blog error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
