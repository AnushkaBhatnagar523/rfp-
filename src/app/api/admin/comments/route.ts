import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, logAction } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all'; // all, pending, approved

    let sql = 'SELECT c.*, b.title as blog_title FROM comments c JOIN blogs b ON c.blog_slug = b.slug';
    const params: any[] = [];

    if (status !== 'all') {
      sql += ' WHERE c.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY c.created_at DESC';

    const res = await db.execute({ sql, args: params });
    const comments = res.rows as any[];

    return NextResponse.json(comments);
  } catch (error: any) {
    console.error('Fetch comments error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Comment ID and status are required' }, { status: 400 });
    }

    // Verify comment exists
    const checkRes = await db.execute({
      sql: 'SELECT author FROM comments WHERE id = ?',
      args: [id]
    });
    const comment = checkRes.rows[0] as any;

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    await db.execute({
      sql: 'UPDATE comments SET status = ? WHERE id = ?',
      args: [status, id]
    });

    await logAction(user.email, `Updated comment status (ID: ${id}) to: ${status}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update comment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    const checkRes = await db.execute({
      sql: 'SELECT author FROM comments WHERE id = ?',
      args: [id]
    });
    const comment = checkRes.rows[0] as any;

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    await db.execute({
      sql: 'DELETE FROM comments WHERE id = ?',
      args: [id]
    });

    await logAction(user.email, `Deleted comment by ${comment.author} (ID: ${id})`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete comment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
