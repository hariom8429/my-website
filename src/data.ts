/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExperienceItem, EducationItem, SkillItem, PortfolioItem } from './types';

export const PROFILE_DATA = {
  name: 'Vishal Yadav',
  titles: [
    'YouTube Channel Manager',
    'Graphic Designer',
    'Video Editor',
    'Creative Strategist'
  ],
  bio: 'Creative and detail-oriented professional skilled in thumbnail design, graphic design, video editing, camera handling, and shoot management. Proficient in using AI tools to enhance creativity, streamline workflows, and deliver high-quality designs efficiently.',
  photo: '/assets/images/regenerated_image_1781249769723.png',
  contacts: {
    phone: '8429894565',
    email: 'vishalvisuallab@gmail.com',
    portfolioUrl: 'vishalvisuallab.my.canva.site',
    whatsapp: '918429894565'
  }
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Arts (B.A.) - Arts',
    institution: 'Siddharth University, Kapilvastu',
    duration: '2023',
    details: 'Graduated with focus on visual aesthetics, creative humanities, and communications.'
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'YouTube Channel Manager',
    company: 'Rojgar With Ankit',
    duration: '1 Year (2025 - Present)',
    description: 'Managed complete YouTube ecosystem, uploads, metadata, publishing scheduling, and audience development. Tracked detailed channel analytics to optimize audience satisfaction and overall viewership growth.',
    achievements: [
      'Successfully optimized titles, descriptions, and tag structures to maximize search accessibility and algorithmic promotion.',
      'Designed and coordinated high-CTR thumbnails and video edits driving strong audience click-rates.',
      'Evaluated performance curves, click density, and audience retention metrics to adjust ongoing publishing strategies.'
    ],
    tags: ['YouTube SEO', 'Analytics Tracking', 'SEO Metadata', 'Publishing Coordination', 'CTR Strategy']
  },
  {
    id: 'exp-2',
    role: 'Content Creator & Social Media Manager',
    company: 'Rahul Bhai YT',
    duration: '1.5 Years (2023 - 2025)',
    description: 'Handled video production, shooting, multi-cam edits, and content management. Managed high-traffic Instagram pages, emphasizing visual storytelling and structured social graphics.',
    achievements: [
      'Filmed and edited dynamic video content aligning with the channel’s visual standards.',
      'Maintained consistent social media themes on Instagram to expand digital footprints.',
      'Analyzed trending media frameworks to drive highly sharable digital presentations.'
    ],
    tags: ['Video Editing', 'Instagram Page Management', 'Camera Shooting', 'Creative Direction']
  },
  {
    id: 'exp-3',
    role: 'Camera Handling & Shoot Management',
    company: 'Ayush Digital',
    duration: '3 Years (2020 - 2023)',
    description: 'Spearheaded professional cameras, framing configurations, and general shoot management. Designed immersive environments to support professional talent delivery.',
    achievements: [
      'Expertly configured visual arrangements and dynamic multi-camera tracking layouts.',
      'Managed lightning rigs and professional audio feeds ensuring clear audio-visual sync.',
      'Collaborated on pacing and scene structures to maximize viewer retention during active filming.'
    ],
    tags: ['Camera Setup', 'Lighting Configuration', 'Framing & Angles', 'Production Scheduling']
  }
];

export const SKILL_DATA: SkillItem[] = [
  // Graphic Design / Thumbnail
  { id: 'sk-1', name: 'High CTR Thumbnail Design', category: 'design', level: 5 },
  { id: 'sk-2', name: 'Graphic Designing', category: 'design', level: 5 },
  { id: 'sk-3', name: 'Social Media Creatives', category: 'design', level: 5 },
  
  // YouTube / Management
  { id: 'sk-4', name: 'YouTube Content Management', category: 'management', level: 5 },
  { id: 'sk-5', name: 'Instagram Management', category: 'management', level: 4 },
  { id: 'sk-6', name: 'Audience Engagement', category: 'management', level: 5 },
  
  // Video and Camera
  { id: 'sk-7', name: 'Video Editing', category: 'video', level: 5 },
  { id: 'sk-8', name: 'Video Shooting', category: 'video', level: 4 },
  { id: 'sk-9', name: 'Camera Handling', category: 'video', level: 5 },
  { id: 'sk-10', name: 'Shoot Management', category: 'video', level: 5 },
  { id: 'sk-11', name: 'Visual Framing', category: 'video', level: 5 },
  
  // General
  { id: 'sk-12', name: 'AI Tools Usage', category: 'general', level: 5 },
  { id: 'sk-13', name: 'Workflow Streamlining', category: 'general', level: 4 }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'High CTR Gaming Thumbnail',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781247616458.png',
    description: 'Vibrant custom gaming thumbnail styled to maximize watch click probability. Highlights contrasting purple/orange glows and clear bold reactions.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-2',
    title: 'Financial Wealth Thumbnail',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781247622500.png',
    description: 'Clean financial infographic-style thumbnail focused on wealth progression, custom 3D element rendering, and readability under ultra-mobile screens.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-3',
    title: 'Apex Agency Social Banner',
    category: 'graphic',
    image: '/assets/images/branding_banner_1781246356687.jpg',
    description: 'Corporate advertising creative optimized for high digital awareness, tailored utilizing crisp teal hues and clean structured text layout.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-4',
    title: 'Creative Cooking Vlog Thumbnail',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781247629650.png',
    description: 'High-contrast lifestyle food category thumbnail showcasing brilliant framing, color saturation, and immediate food appeal.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-5',
    title: 'Cinematic Travel Reel Edit',
    category: 'video',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
    description: 'Slick fast-cut visual edit mapping dynamic transitions and speed-ramps synced to premium music beats for digital travel creators.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'port-6',
    title: 'Product Commercial Promo Video',
    category: 'video',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    description: 'High-energy e-commerce commercial social video advertisement utilizing zoom cuts, glowing typography transitions, and custom color grading.',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },
  {
    id: 'port-7',
    title: 'Corporate Brand Guidelines Poster',
    category: 'graphic',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    description: 'A structural poster set outlining typography pairings and color theories developed for high corporate environments.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-8',
    title: 'Educational YouTube Course Edit',
    category: 'video',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    description: 'Interactive course edit pacing detailed overlay graphics and illustrative pop-up diagrams to retain student focus throughout lessons.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'port-9',
    title: 'Minimalist Work Routine Vlog Thumbnail',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781248066943.png',
    description: 'Clean productivity aesthetic with bold dual-tone focal text designed to attract casual lifestyle and self-improvement viewers.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-10',
    title: 'SaaS Startup Business Case Study',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781323654849.png',
    description: 'Highly clickable financial infographic design emphasizing explosive growth vector elements and structural readability.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-11',
    title: 'Future of AI Tech & Dev Talk',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781323660501.jpg',
    description: 'Abstract futuristic neon glows combined with expressive reaction frames to boost watch probability for tech discussions.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-12',
    title: 'Ultimate Home Studio Gear Setup',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781323663106.jpg',
    description: 'A cozy audio/visual setup thumbnail highlighting product contrast overlays and crisp yellow accent annotations.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-13',
    title: 'Wanderlust Solo Adventure Vlog',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781248088307.jpg',
    description: 'Splendid coastal landscape frame optimized with HDR color mapping and minimal white overlay text for cinematic travel vlogs.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-14',
    title: 'Deep House Midnight DJ Podcast',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781248090654.png',
    description: 'High-contrast club lighting accenting bold serif typography tailored especially for podcasters and musical artists.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-15',
    title: '30-Day Fitness & Strength Transformation',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781248096572.png',
    description: 'Intense background lighting highlighting powerful focus expressions, crafted for fitness channels looking to raise engagement.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-16',
    title: 'Retro Photography Masterclass Guide',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781248103691.jpg',
    description: 'Sophisticated composition utilizing retro camera graphics and balanced lighting overlays designed for creative tutorials.',
    link: 'https://vishalvisuallab.my.canva.site'
  },
  {
    id: 'port-17',
    title: 'Advanced Keyboard & Developer Setup',
    category: 'thumbnail',
    image: '/assets/images/regenerated_image_1781248107421.jpg',
    description: 'Cyberpunk neon desk lighting emphasizing key action zones, perfect for software walkthroughs and design reviews.',
    link: 'https://vishalvisuallab.my.canva.site'
  }
];
