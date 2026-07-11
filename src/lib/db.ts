import { createClient } from '@libsql/client';
import crypto from 'crypto';

// Hash function matching the one in auth.ts
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

const dbUrl = process.env.TURSO_DATABASE_URL || 'file:database.sqlite';
const dbToken = process.env.TURSO_AUTH_TOKEN || '';

const db = createClient({
  url: dbUrl,
  authToken: dbToken,
});

// Initialize Tables and seed inside an async function
async function initDatabase() {
  try {
    // Check if tables already exist
    const tableCheck = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    if (tableCheck.rows.length === 0) {
      console.log('Database tables do not exist. Creating schema...');

      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL,
          created_at TEXT NOT NULL
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS blogs (
          slug TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          author TEXT NOT NULL,
          date TEXT NOT NULL,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL, -- JSON string of paragraphs
          image TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'published',
          created_at TEXT NOT NULL
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          blog_slug TEXT NOT NULL,
          author TEXT NOT NULL,
          content TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending', -- pending, approved
          created_at TEXT NOT NULL,
          FOREIGN KEY(blog_slug) REFERENCES blogs(slug) ON DELETE CASCADE
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS jobs (
          slug TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          department TEXT NOT NULL,
          location TEXT NOT NULL,
          experience TEXT NOT NULL,
          type TEXT NOT NULL,
          description TEXT NOT NULL,
          responsibilities TEXT NOT NULL, -- JSON string
          requirements TEXT NOT NULL, -- JSON string
          status TEXT NOT NULL DEFAULT 'active', -- active, inactive
          created_at TEXT NOT NULL
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS applications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          job_slug TEXT NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          resume_name TEXT NOT NULL,
          resume_path TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending', -- pending, reviewed
          created_at TEXT NOT NULL,
          FOREIGN KEY(job_slug) REFERENCES jobs(slug) ON DELETE CASCADE
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          form_type TEXT NOT NULL, -- general, volunteer, csr
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          company_or_skills_or_subject TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TEXT NOT NULL
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS donations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id TEXT UNIQUE NOT NULL,
          payment_id TEXT,
          signature TEXT,
          amount REAL NOT NULL,
          currency TEXT NOT NULL,
          donor_name TEXT NOT NULL,
          donor_email TEXT NOT NULL,
          donor_phone TEXT NOT NULL,
          pan_or_passport TEXT NOT NULL,
          project TEXT NOT NULL,
          citizenship TEXT NOT NULL, -- indian, foreign
          status TEXT NOT NULL DEFAULT 'created', -- created, paid, failed
          created_at TEXT NOT NULL
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS impact_stats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          value TEXT NOT NULL,
          label TEXT NOT NULL
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS sessions (
          token TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL,
          expires_at TEXT NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS audit_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_email TEXT NOT NULL,
          action TEXT NOT NULL,
          created_at TEXT NOT NULL
        )
      `);

      await seedInitialData();
    } else {
      // If tables exist, check if we need to seed blogs to verify content
      const blogCountRes = await db.execute('SELECT COUNT(*) as count FROM blogs');
      if (Number(blogCountRes.rows[0].count) === 0) {
        await seedInitialData();
      }
    }
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
}

// Seed Data helper
async function seedInitialData() {
  const now = new Date().toISOString();

  try {
    // 1. Seed Users
    await db.execute({
      sql: 'INSERT OR IGNORE INTO users (email, password, role, created_at) VALUES (?, ?, ?, ?)',
      args: ['admin@thehansfoundation.org', hashPassword('THFAdmin2026!'), 'admin', now]
    });
    await db.execute({
      sql: 'INSERT OR IGNORE INTO users (email, password, role, created_at) VALUES (?, ?, ?, ?)',
      args: ['editor@thehansfoundation.org', hashPassword('THFEditor2026!'), 'editor', now]
    });
    await db.execute({
      sql: 'INSERT OR IGNORE INTO users (email, password, role, created_at) VALUES (?, ?, ?, ?)',
      args: ['viewer@thehansfoundation.org', hashPassword('THFViewer2026!'), 'viewer', now]
    });
    console.log('Seeded users table.');

    // 2. Seed Impact Stats
    await db.execute({
      sql: 'INSERT OR IGNORE INTO impact_stats (key, value, label) VALUES (?, ?, ?)',
      args: ['lives_impacted', '40M+', 'Lives Impacted']
    });
    await db.execute({
      sql: 'INSERT OR IGNORE INTO impact_stats (key, value, label) VALUES (?, ?, ?)',
      args: ['states_covered', '23', 'States Covered']
    });
    await db.execute({
      sql: 'INSERT OR IGNORE INTO impact_stats (key, value, label) VALUES (?, ?, ?)',
      args: ['districts_outreach', '133', 'Districts Outreach']
    });
    await db.execute({
      sql: 'INSERT OR IGNORE INTO impact_stats (key, value, label) VALUES (?, ?, ?)',
      args: ['years_service', '15+', 'Years of Service']
    });
    console.log('Seeded impact_stats table.');

    // 3. Seed Blogs
    await db.execute({
      sql: 'INSERT OR IGNORE INTO blogs (slug, title, category, author, date, excerpt, content, image, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'hearing-loss-to-classroom-stars',
        "From Severe Hearing Loss to Classroom Stars: Shreya's Story",
        'Disability Inclusion',
        'Aarti Negi',
        'June 24, 2026',
        "How our cochlear implants program helped a six-year-old girl gain her hearing back and join regular primary schooling.",
        JSON.stringify([
          "Shreya was diagnosed with profound bilateral sensorineural hearing loss at the age of three. In the remote village of Uttarakhand where her family lives, specialized diagnostic support and therapies were nonexistent. Her parents had given up hope of her ever going to school or speaking.",
          "Through a local health screening camp organized by The Hans Foundation in 2023, Shreya was identified for our Cochlear Implant Program. The foundation funded the entire clinical surgery and provided support for her post-operative recovery.",
          "Following a successful surgery, Shreya underwent 18 months of rigorous auditory-verbal therapy sessions at our specialized rehabilitation center. The results have been remarkable.",
          "Today, six-year-old Shreya can speak fluently and hear clearly. She was recently enrolled in a local model school, where she is already topping her class quizzes. Her story stands as a testament to how specialized early detection programs can transform lives completely."
        ]),
        'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
        'published',
        now
      ]
    });

    await db.execute({
      sql: 'INSERT OR IGNORE INTO blogs (slug, title, category, author, date, excerpt, content, image, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'mobile-medical-clinics-redefining-healthcare',
        'Mobile Medical Units: Redefining Primary Healthcare Access in Hills',
        'Healthcare',
        'Dr. Vivek Rawat',
        'May 12, 2026',
        'An inside look at how our clinical fleets navigate tough weather to deliver free diagnostic checkups weekly.',
        JSON.stringify([
          "For communities residing in the rugged terrains of the Himalayas, reaching a primary health center often requires hours of trekking. Dilapidated paths and expensive transportation prevent elderly or pregnant patients from seeking clinical care.",
          "The Hans Foundation bridged this gap by launching our specialized Mobile Medical Unit (MMU) fleet. Each MMU is a custom clinical van staffed with a doctor, a nurse, a lab technician, and a pharmacist.",
          "The vans visit designated village points on a fixed weekly schedule. Patients receive free clinical consultations, blood testing services, and generic medicines without leaving their habitations.",
          "By offering preventive care and early chronic disease management (for diabetes and hypertension), our MMUs have significantly reduced emergency hospitalizations and saved rural families from crippling health debts."
        ]),
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
        'published',
        now
      ]
    });

    await db.execute({
      sql: 'INSERT OR IGNORE INTO blogs (slug, title, category, author, date, excerpt, content, image, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'women-micro-entrepreneurs-lead-the-way',
        'How Women Micro-Entrepreneurs are Redefining Livelihoods in Jharkhand',
        'Livelihoods',
        'Meera Soren',
        'April 05, 2026',
        'Meet the self-help groups starting processing businesses and driving rural village financial self-reliance.',
        JSON.stringify([
          "Rural women in Jharkhand often rely on seasonal agricultural labor, leaving them financially vulnerable during dry months. To solve this, THF introduced local vocational skill setups and entrepreneurial coaching.",
          "Under the Hans Udhyamita Mission, we mobilized women into self-help groups (SHGs) and provided structural training in bookkeeping, business management, and trade.",
          "We then backed them with seed grants to set up local micro-enterprises, including community spice-grinding mills, tailoring blocks, and sustainable poultry farming.",
          "The results are visible: over 65,000 women have established stable incomes, helping them fund their children's education, purchase assets, and actively participate in household decision-making."
        ]),
        'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=600&q=80',
        'published',
        now
      ]
    });

    await db.execute({
      sql: 'INSERT OR IGNORE INTO blogs (slug, title, category, author, date, excerpt, content, image, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'smart-classrooms-bridge-digital-divide',
        'Smart Classrooms: Bridging the Digital Divide in Public Schools',
        'Education',
        'Rajesh Sen',
        'March 18, 2026',
        'Upgrading village public schools with modern digital learning screens, solar backups, and local software packages.',
        JSON.stringify([
          "Village public schools often lack the tools to prepare children for a digital future. Interactive screens, offline learning tools, and solar units have been provided to over 200 schools across India.",
          "The Hans Foundation's education program aims to provide children from remote areas with identical facilities to their urban counterparts. Smart boards, e-books, and science kits are distributed to make learning fun and comprehensive.",
          "Teacher training is also key. We conduct orientation workshops for teachers to adopt modern learning formats.",
          "The result has been a 35% increase in student retention rates and visible improvement in standard science and math test scores."
        ]),
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
        'published',
        now
      ]
    });

    await db.execute({
      sql: 'INSERT OR IGNORE INTO blogs (slug, title, category, author, date, excerpt, content, image, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'spring-recharge-secures-clean-water',
        'Spring-Shed Recharge: Securing year-round Clean Water in Villages',
        'Climate Action',
        'Amit Bisht',
        'February 10, 2026',
        'Recharging natural spring supplies to restore piped tap connections for dry dryland mountain habitations.',
        JSON.stringify([
          "Many Himalayan communities depend entirely on natural springs for drinking and agriculture. Climate changes and soil erosion have caused these springs to dry up.",
          "The Hans Foundation initiated Spring-Shed development projects using geo-hydrological mapping to identify groundwater recharge zones and construct trenches and check dams.",
          "This project has successfully recharged 15 critical spring systems, restoring water flow to over 1000 mountain households.",
          "Community-led sanitation committees manage these pipelines and ensure water purification and testing schedules."
        ]),
        'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=600&q=80',
        'published',
        now
      ]
    });

    // Seed Comments
    await db.execute({
      sql: 'INSERT OR IGNORE INTO comments (blog_slug, author, content, status, created_at) VALUES (?, ?, ?, ?, ?)',
      args: ['hearing-loss-to-classroom-stars', 'Rajesh Pathak', 'Incredible work by the THF team. Early childhood screening is truly critical for disability inclusion.', 'approved', now]
    });
    console.log('Seeded blogs and comments tables.');

    // 4. Seed Jobs
    await db.execute({
      sql: 'INSERT OR IGNORE INTO jobs (slug, title, department, location, experience, type, description, responsibilities, requirements, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'program-manager-healthcare',
        'Program Manager — Healthcare Services',
        'Healthcare',
        'Dehradun, Uttarakhand',
        '5+ Years',
        'Full-Time',
        'Lead the operations of 15+ Mobile Medical Units and coordinate clinical dialysis centers partnerships in Uttarakhand.',
        JSON.stringify([
          'Manage day-to-day operational schedules, fuel inventories, and clinical staffing logs of 15+ Mobile Medical Units (MMUs).',
          'Coordinate regional partnerships with state health ministries, private specialized hospitals, and community stakeholders.',
          'Prepare weekly and monthly output metrics sheets (beneficiaries treated, critical referrals, drug stock balances).',
          'Perform frequent monitoring site visits to ensure adherence to clinical safety and sanitation parameters.'
        ]),
        JSON.stringify([
          'Master of Public Health (MPH), MBA in Healthcare, or Master of Social Work (MSW) from a recognized university.',
          'Minimum 5 years of active field operations experience in rural primary healthcare projects or NGO clinical management.',
          'Excellent verbal and written communication skills in both Hindi and English.',
          'Willingness to travel extensively across remote mountainous regions of Uttarakhand.'
        ]),
        'active',
        now
      ]
    });

    await db.execute({
      sql: 'INSERT OR IGNORE INTO jobs (slug, title, department, location, experience, type, description, responsibilities, requirements, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'field-coordinator-education',
        'Field Coordinator — Primary Education',
        'Education',
        'Ranchi, Jharkhand',
        '2+ Years',
        'Full-Time',
        'Oversee school infrastructure upgrades and coordinate with local community leaders and smart classroom trainers.',
        JSON.stringify([
          'Coordinate school renovation projects, science laboratory setups, and classroom painting contracts locally.',
          'Liaise with government school headmasters, local panchayats, and block education officers to implement smart classroom setups.',
          'Supervise smart-board software training sessions for rural teachers and track students attendance records.',
          'Assist local field audits and supply school bags, library books, and learning kits distributions.'
        ]),
        JSON.stringify([
          "Bachelor's degree in Social Work (BSW), Education, or a related developmental studies discipline.",
          'At least 2 years of on-ground experience running primary learning support or rural community coordination campaigns.',
          'Conversant with local languages and regional development challenges in tribal areas of Jharkhand.',
          'Candidate must possess a valid driver\'s license and a personal two-wheeler for field travel.'
        ]),
        'active',
        now
      ]
    });

    await db.execute({
      sql: 'INSERT OR IGNORE INTO jobs (slug, title, department, location, experience, type, description, responsibilities, requirements, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'senior-analyst-grant-management',
        'Senior Analyst — Grant Management',
        'Finance & Operations',
        'New Delhi (HQ)',
        '4+ Years',
        'Full-Time',
        'Review NGO grant applications, manage fund allocations tracking, and coordinate Ernst & Young financial audits compliance.',
        JSON.stringify([
          'Evaluate project proposals from partner NGOs for structural compliance and strategic alignment.',
          'Monitor monthly funding disbursements, track utilization certificates, and manage reporting dashboards.',
          'Liaise with external audit teams (Ernst & Young) to complete legal audit requirements.'
        ]),
        JSON.stringify([
          'Master of Commerce (M.Com), MBA in Finance, or Chartered Accountant (CA) intermediate level.',
          '4+ years of grant administration, financial analysis, or public finance auditing experience.',
          'Proficiency in Microsoft Excel (Pivot tables, VLOOKUP, data visualization) and ERP accounting software.'
        ]),
        'active',
        now
      ]
    });

    await db.execute({
      sql: 'INSERT OR IGNORE INTO jobs (slug, title, department, location, experience, type, description, responsibilities, requirements, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        'livelihoods-expert',
        'Vocational Livelihood Expert',
        'Livelihoods',
        'Alwar, Rajasthan',
        '3+ Years',
        'Full-Time',
        'Provide technical assistance and small business training models to rural women self-help groups (SHGs).',
        JSON.stringify([
          'Design and deploy vocational curricula in sewing, organic composting, and community food processing.',
          'Establish direct linkages between rural micro-enterprises and local regional market associations.',
          'Train self-help groups in financial literacy, digital UPI banking payments, and simple profit-loss bookkeeping.'
        ]),
        JSON.stringify([
          "Bachelor's or Master's degree in Social Entrepreneurship, Agriculture, Rural Development, or Livelihoods.",
          '3+ years training rural co-operatives or self-help groups in agricultural/non-farm businesses.',
          'Strong commanding presence and command of local Rajasthani dialects and conversational Hindi.'
        ]),
        'active',
        now
      ]
    });

    console.log('Seeded jobs table.');
  } catch (seedErr) {
    console.error('Database seeding failed:', seedErr);
  }
}

// Self-invoking database initializer
initDatabase();

export default db;
