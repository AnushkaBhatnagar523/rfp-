import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';

interface SearchResult {
  title: string;
  category: string;
  url: string;
  description: string;
}

// Static Program references
const staticPrograms: SearchResult[] = [
  { title: 'Mobile Medical Units (MMUs)', category: 'Healthcare Program', url: '/programs/health', description: 'Weekly diagnostic checkups, free consultations, and medicines delivered to doorsteps in rural mountain villages.' },
  { title: 'Free Dialysis Renal Clinics', category: 'Healthcare Program', url: '/programs/health', description: 'Operating specialized clinical centers in partnership with state governments, offering free dialysis services.' },
  { title: 'Smart Classrooms Setup', category: 'Education Program', url: '/programs/education', description: 'Equipping rural primary schools with interactive digital screens, curated regional educational software, and solar backup systems.' },
  { title: 'Hans Udhyamita Mission', category: 'Livelihoods Program', url: '/programs/livelihood', description: 'Empowering rural women through vocational tailoring skills, micro-grants, agricultural input support, and market links.' },
  { title: 'Prosthetics & Assistive Aids Camp', category: 'Disability Inclusion', url: '/programs/disability-inclusion', description: 'Manufacturing and distributing custom high-grade prosthetic limbs, wheelchairs, and tricycles in remote camps.' },
  { title: 'Cochlear Implant Surgery Assistance', category: 'Disability Inclusion', url: '/programs/disability-inclusion', description: 'Funding critical ear surgeries and speech-therapy sessions for children under 5 to mainstream them into regular schools.' },
  { title: 'Hans Jal Dhara Clean Water Grid', category: 'Climate Action', url: '/programs/climate-action', description: 'Constructing village piped drinking water networks, gravity-fed water supplies, and spring-shed recharge zones.' },
  { title: 'Disaster Emergency Ration Relief', category: 'Disaster Relief', url: '/programs/disaster-relief', description: 'Delivering urgent food supplies, medical kits, and post-disaster house reconstruction packages.' }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = (searchParams.get('q') || '').toLowerCase().trim();

    if (!query) {
      return NextResponse.json([]);
    }

    const results: SearchResult[] = [];

    // 1. Search Static Programs
    const matchedStatic = staticPrograms.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
    results.push(...matchedStatic);

    // 2. Search Blogs from DB
    const blogRes = await db.execute({
      sql: `
        SELECT slug, title, category, excerpt 
        FROM blogs 
        WHERE status = 'published' AND (title LIKE ? OR excerpt LIKE ? OR category LIKE ?)
      `,
      args: [`%${query}%`, `%${query}%`, `%${query}%`]
    });
    const matchedBlogs = blogRes.rows as any[];
    matchedBlogs.forEach(blog => {
      results.push({
        title: blog.title,
        category: `${blog.category} (Story)`,
        url: `/blog/${blog.slug}`,
        description: blog.excerpt
      });
    });

    // 3. Search Jobs from DB
    const jobRes = await db.execute({
      sql: `
        SELECT slug, title, department, description 
        FROM jobs 
        WHERE status = 'active' AND (title LIKE ? OR description LIKE ? OR department LIKE ?)
      `,
      args: [`%${query}%`, `%${query}%`, `%${query}%`]
    });
    const matchedJobs = jobRes.rows as any[];
    matchedJobs.forEach(job => {
      results.push({
        title: job.title,
        category: `${job.department} (Vacancy)`,
        url: `/careers/${job.slug}`,
        description: job.description
      });
    });

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Unified search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
