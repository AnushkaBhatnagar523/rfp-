import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, logAction } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blogRes = await db.execute({
      sql: 'SELECT * FROM blogs WHERE slug = ?',
      args: [slug]
    });
    const blog = blogRes.rows[0] as any;

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Parse content JSON
    const parsedBlog = {
      ...blog,
      content: JSON.parse(blog.content)
    };

    // Get approved comments
    const commentsRes = await db.execute({
      sql: 'SELECT * FROM comments WHERE blog_slug = ? AND status = "approved" ORDER BY created_at DESC',
      args: [slug]
    });
    const comments = commentsRes.rows as any[];

    return NextResponse.json({
      blog: parsedBlog,
      comments
    });
  } catch (error: any) {
    console.error('Fetch blog detail error:', error);
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
    const { title, category, author, excerpt, content, image, status } = await request.json();

    const checkRes = await db.execute({
      sql: 'SELECT * FROM blogs WHERE slug = ?',
      args: [slug]
    });
    const existing = checkRes.rows[0];

    if (!existing) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await db.execute({
      sql: `
        UPDATE blogs 
        SET title = ?, category = ?, author = ?, excerpt = ?, content = ?, image = ?, status = ?
        WHERE slug = ?
      `,
      args: [
        title,
        category,
        author,
        excerpt,
        JSON.stringify(content),
        image,
        status,
        slug
      ]
    });

    await logAction(user.email, `Updated blog post: ${title}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update blog error:', error);
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
      sql: 'SELECT title FROM blogs WHERE slug = ?',
      args: [slug]
    });
    const blog = checkRes.rows[0] as any;

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await db.execute({
      sql: 'DELETE FROM blogs WHERE slug = ?',
      args: [slug]
    });

    await logAction(user.email, `Deleted blog post: ${blog.title}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete blog error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
