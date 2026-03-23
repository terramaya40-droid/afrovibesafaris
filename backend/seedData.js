// seedData.js — Pure data export for use by both seed.js CLI and /api/seed endpoint
// Cloudinary Base: https://res.cloudinary.com/di5eh8f2y/image/upload/q_auto,f_auto/afrovibesafaris/

export const packages = [
  {
    title: 'Luxury Safari Experience',
    country: 'Tanzania',
    description: 'Indulge in the finest African hospitality...',
    image: 'afrovibesafaris/packages/luxury',
    rating: 5.0, reviewCount: 84, packageType: 'Classical', category: 'Safari', duration: '7 Nights',
    pricing: { nonRes: '$8,500', res: 'TZS 12,000,000', cit: 'TZS 8,500,000' }
  },
  {
    title: 'Midrange Comfort Safari',
    country: 'Kenya',
    description: 'Adventure meets comfort...',
    image: 'afrovibesafaris/packages/midrange',
    rating: 4.8, reviewCount: 156, packageType: 'Family', category: 'Safari', duration: '6 Nights',
    pricing: { nonRes: '$3,800', res: 'KES 145,000', cit: 'KES 95,000' }
  },
  {
    title: 'Wellness Safari Experience',
    country: 'Kenya',
    description: 'Designed for relaxation and reconnection, combining wildlife experiences with calm, mindful moments in nature.',
    image: 'afrovibesafaris/packages/wellness',
    rating: 5.0, reviewCount: 12, packageType: 'Wellness', category: 'Wellness', duration: '4 Nights',
    pricing: { nonRes: '$2,500', res: 'KES 95,000', cit: 'KES 75,000' },
    isFeatured: true
  }
];

export const articles = [
  {
    title: 'Safari Savvy: Essential Tips',
    slug: 'safari-savvy-essential-tips',
    excerpt: 'Your first safari is a life-changing event...',
    body: '...',
    author: 'AfriVibe Expert',
    category: 'Travel Tips',
    image: 'afrovibesafaris/blog/wildlife-tips',
    published: true
  }
];

export const gallery = [
  { image: 'afrovibesafaris/gallery/lion-thumb', title: 'King of the Savanna', location: 'Serengeti, Tanzania' },
  { image: 'afrovibesafaris/gallery/elephants-thumb', title: 'Gentle Giants', location: 'Amboseli, Kenya' }
];

export const destinations = [
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    subtitle: 'The Spice Island',
    description: '...',
    image: 'afrovibesafaris/destinations/zanzibar/beach'
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    subtitle: 'The Land of the Serengeti',
    description: '...',
    image: 'afrovibesafaris/destinations/tanzania/serengeti'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    subtitle: 'The Pride of Africa',
    description: '...',
    image: 'afrovibesafaris/destinations/kenya/masai-mara'
  }
];

export const aboutContent = {
  whoWeAre: "AfriVibe Safaris is an African-led travel and wellbeing platform acting as a bridge between Africa and the world.",
  ourStory: "AfriVibe was born from lived experience. As founders, we went through moments of pressure, stress, and uncertainty. What changed us was not comfort, but nature.",
  mission: "To bridge Africa with the world through meaningful travel experiences that connect people to nature, culture, and themselves.",
  vision: "To position Africa as a global destination not only for travel, but for connection, wellbeing, education, and transformative human experiences."
};
