import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message, formType, company, skills, captcha, consent } = await request.json();

    if (!name || !email || !phone || !message || !formType) {
      return NextResponse.json({ error: 'Missing required inputs' }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: 'Privacy compliance consent is required under DPDP Act 2023' }, { status: 400 });
    }

    // Verify Spam math Captcha (Expected 7 + 4 = 11)
    if (captcha !== '11') {
      return NextResponse.json({ error: 'Security math CAPTCHA verification failed' }, { status: 400 });
    }

    // Determine field inputs based on active form
    let companyOrSkillsOrSubject = subject || '';
    if (formType === 'csr') {
      companyOrSkillsOrSubject = company || '';
    } else if (formType === 'volunteer') {
      companyOrSkillsOrSubject = skills || '';
    }

    await db.execute({
      sql: `
        INSERT INTO contacts (form_type, name, email, phone, company_or_skills_or_subject, message, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        formType,
        name,
        email,
        phone,
        companyOrSkillsOrSubject,
        message,
        new Date().toISOString()
      ]
    });

    // Secure routing simulation: In production, details would route via nodemailer or an API gateway.
    console.log(`[Contact SECURE ROUTING] Inbound Form [${formType.toUpperCase()}] submitted by ${name} (${email}) - Routed to respective program lead email.`);

    return NextResponse.json({ success: true, message: 'Message logged and routed successfully' });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
