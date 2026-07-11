import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { author, content } = await request.json();

    if (!author || !content) {
      return NextResponse.json({ error: 'Author name and comment content are required' }, { status: 400 });
    }

    // Verify blog exists
    const blogRes = await db.execute({
      sql: 'SELECT slug FROM blogs WHERE slug = ?',
      args: [slug]
    });
    const blog = blogRes.rows[0];

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await db.execute({
      sql: `
        INSERT INTO comments (blog_slug, author, content, status, created_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [slug, author, content, 'pending', new Date().toISOString()]
    });

    return NextResponse.json({ success: true, message: 'Comment submitted for moderation' });
  } catch (error: any) {
    console.error('Submit comment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
