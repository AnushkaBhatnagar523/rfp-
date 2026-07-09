export interface ProgramItem {
  title: string;
  desc: string;
  icon: string;
  link: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  location: string;
  image: string;
}

export interface UpdateCard {
  title: string;
  description: string;
  link: string;
  cta: string;
}

export const programs: ProgramItem[] = [
  {
    title: 'Healthcare Services',
    desc: 'Deploying Mobile Medical Units, providing free dialysis sessions, and conducting cochlear implant surgeries.',
    icon: '❤️',
    link: '/programs/health',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Inclusive Education',
    desc: 'Enhancing primary school infrastructure, distributing learning kits, and running non-formal education systems.',
    icon: '📚',
    link: '/programs/education',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Livelihood & Skills',
    desc: 'Empowering rural women through vocational training, small business grants, and agricultural farm support.',
    icon: '💼',
    link: '/programs/livelihood',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Disability Rehabilitation',
    desc: 'Distributing custom prosthetics, assistive aids, and offering early diagnosis and therapy services.',
    icon: '♿',
    link: '/programs/disability-inclusion',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Climate & Clean Water',
    desc: 'Constructing rural sanitation blocks, rainwater harvesting grids, and clean water filtration systems.',
    icon: '💧',
    link: '/programs/climate-action',
    image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Disaster Emergency Relief',
    desc: 'Delivering urgent food supplies, medical kits, and post-disaster house reconstruction packages.',
    icon: '🆘',
    link: '/programs/disaster-relief',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Thanks to the Hans Foundation's cochlear implant surgery program, my daughter heard my voice for the first time. It has completely transformed her future.",
    name: 'Ramesh Sharma',
    designation: 'Parent of Beneficiary',
    location: 'Dehradun, Uttarakhand',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    quote: 'The Mobile Medical Unit visits our remote village every single week. We no longer have to walk 15 kilometers just to get simple diagnostic checkups.',
    name: 'Sunita Devi',
    designation: 'Community Member',
    location: 'Alwar, Rajasthan',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
  {
    quote: 'With the agricultural vocational training and seeds support, I doubled my farm yields. My family is now self-reliant and financially secure.',
    name: 'Manoj Kumar',
    designation: 'Beneficiary Farmer',
    location: 'Ranchi, Jharkhand',
    image: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80',
  },
];

export const impactStats = [
  { value: '40M+', label: 'Lives Impacted' },
  { value: '23', label: 'States Covered' },
  { value: '133', label: 'Districts Outreach' },
  { value: '15+', label: 'Years of Service' },
];

export const updateCards: UpdateCard[] = [
  {
    title: 'Annual Report 2025-26',
    description: 'Read the latest impact report, audited financial statements, and program progress updates.',
    link: '/resources/annual-reports',
    cta: 'View Report',
  },
  {
    title: 'Volunteer Opportunities',
    description: 'Join our field teams, story creation network, or community outreach programs.',
    link: '/volunteer',
    cta: 'Join Us',
  },
  {
    title: 'Corporate Partnerships',
    description: 'Explore meaningful CSR collaborations that align with your social impact goals.',
    link: '/partner/csr',
    cta: 'Partner Now',
  },
];
