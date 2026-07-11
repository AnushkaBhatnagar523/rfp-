import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobSlug = formData.get('jobSlug') as string;
    const consent = formData.get('consent') as string;
    const file = formData.get('resume') as File | null;

    if (!name || !email || !phone || !jobSlug || !file) {
      return NextResponse.json({ error: 'Missing required application inputs' }, { status: 400 });
    }

    if (consent !== 'true' && consent !== 'on') {
      return NextResponse.json({ error: 'Privacy data consent is required' }, { status: 400 });
    }

    // 1. Process File Upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.resolve(process.cwd(), 'public', 'uploads', 'resumes');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, uniqueFileName);
    
    fs.writeFileSync(filePath, buffer);
    const resumePath = `/uploads/resumes/${uniqueFileName}`;

    // 2. Save Application details in SQLite
    await db.execute({
      sql: `
        INSERT INTO applications (job_slug, name, email, phone, resume_name, resume_path, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        jobSlug,
        name,
        email,
        phone,
        file.name,
        resumePath,
        'pending',
        new Date().toISOString()
      ]
    });

    return NextResponse.json({ success: true, message: 'Application submitted successfully' });
  } catch (error: any) {
    console.error('Job application error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
