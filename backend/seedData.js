// seedData.js — Pure data export for use by both seed.js CLI and /api/seed endpoint
// Mix of high-quality Unsplash and local assets

export const packages = [
  {
    title: 'Luxury Safari Experience',
    country: 'Tanzania',
    description: 'Indulge in the finest African hospitality with our Luxury Safari. Witness the Great Migration from the comfort of five-star tented camps, enjoy private game drives with expert silver-level guides, and experience sunset sundowners overlooking the endless plains of the Serengeti.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000',
    rating: 5.0, reviewCount: 84, packageType: 'Classical', category: 'Safari', duration: '7 Nights',
    pricing: { nonRes: '$8,500', res: 'TZS 12,000,000', cit: 'TZS 8,500,000' }
  },
  {
    title: 'Midrange Comfort Safari',
    country: 'Kenya',
    description: 'Adventure meets comfort in this curated journey through Kenya\'s most iconic parks. From the red elephants of Tsavo to the big cats of the Maasai Mara, this safari offers an authentic connection to wildlife without compromising on essential comforts.',
    image: 'images/packages/midrange.jpg',
    rating: 4.8, reviewCount: 156, packageType: 'Family', category: 'Safari', duration: '6 Nights',
    pricing: { nonRes: '$3,800', res: 'KES 145,000', cit: 'KES 95,000' }
  },
  {
    title: 'Wellness Safari Experience',
    country: 'Kenya',
    description: 'Designed for relaxation and reconnection, combining wildlife experiences with calm, mindful moments in nature. This unique itinerary focuses on the "Vibe" of the wild, incorporating campfire meditation, nature walks, and digital detox sessions.',
    image: 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=2000',
    rating: 5.0, reviewCount: 12, packageType: 'Wellness', category: 'Wellness', duration: '4 Nights',
    pricing: { nonRes: '$2,500', res: 'KES 95,000', cit: 'KES 75,000' },
    isFeatured: true
  },
  {
    title: 'Uganda Gorilla Trekking',
    country: 'Uganda',
    description: 'An intimate encounter with the gentle giants of Bwindi Impenetrable Forest. This life-changing trek brings you face-to-face with mountain gorillas in their natural habitat, guided by expert trackers and conservationists.',
    image: 'images/destinations/uganda/bwindi.jpg',
    rating: 4.9, reviewCount: 42, packageType: 'Classical', category: 'Safari', duration: '5 Nights',
    pricing: { nonRes: '$4,200', res: 'UGX 5,500,000', cit: 'UGX 4,000,000' }
  }
];

export const articles = [
  {
    title: 'Inside the Mindful Safari: Why Nature is the Ultimate Healer',
    slug: 'mindful-safari-nature-healer',
    excerpt: 'Beyond the "Big Five," the true power of an African safari lies in its ability to ground us in the present moment.',
    body: 'In today\'s hyper-connected world, the silence of the savannah is a rare luxury. At AfriVibe Safaris, we believe that nature is not just a backdrop for photos, but a profound catalyst for mental wellbeing. A mindful safari isn\'t just about checking animals off a list; it\'s about the rhythmic crunch of grass under a 4x4, the haunting call of a fish eagle at dawn, and the absolute clarity that comes when you disconnect from screens and reconnect with the earth. Scientific studies have long shown that spending time in natural environments reduces cortisol levels and improves focus. We take this further by incorporating quiet reflective time and campfire storytelling into every journey.',
    author: 'Faith — Founder',
    category: 'Wildlife & Conservation',
    image: 'images/blog/wildlife-tips.jpg',
    published: true
  },
  {
    title: 'The Expert\'s Safari Packing Guide: Essentials for the Savvy Traveller',
    slug: 'expert-safari-packing-guide',
    excerpt: 'Packing for the wild requires a balance of practicality, tradition, and respect for the environment.',
    body: 'When preparing for your first African adventure, the temptation is to overpack. However, the true safari expert knows that less is more. Neutral tones like khaki, stone, and olive aren\'t just a fashion choice—they help you blend into the bush and avoid attracting biting insects like the Tsetse fly. Layers are critical; mornings can be biting cold while afternoons are scorching. Don\'t forget high-quality binoculars (8x42 is the gold standard), a wide-brimmed hat with a chin strap, and eco-friendly sunscreen that doesn\'t harm local water sources. Most importantly, bring a sense of wonder and a sturdy notebook to record your experiences.',
    author: 'AfriVibe Lead Guide',
    category: 'Packing Guide',
    image: 'images/blog/packing.jpg',
    published: true
  },
  {
    title: 'Conservation: Why Your Journey Matters More Than Ever',
    slug: 'conservation-why-your-journey-matters',
    excerpt: 'Sustainable tourism is the backbone of wildlife protection in East Africa.',
    body: 'Every booking you make with AfriVibe Safaris contributes directly to the conservation of the landscapes we love. By choosing local, African-led platforms, you ensure that tourism revenue stays within the communities on the front lines of wildlife protection. We partner with conservancies that prioritize anti-poaching initiatives and community education. In the Serengeti-Mara ecosystem, this "circular" tourism model has proven that wild spaces are most secure when local people derive tangible benefits from their preservation. Your visit helps pay for ranger salaries, wildlife monitoring programs, and the maintenance of essential corridors for migratory species.',
    author: 'AfriVibe Conservation Dept',
    category: 'Conservation',
    image: 'images/blog/sustainable-travel.jpg',
    published: true
  }
];

export const gallery = [
  { image: 'images/gallery/lion-thumb.jpg', title: 'King of the Savanna', location: 'Serengeti, Tanzania' },
  { image: 'images/gallery/elephants-thumb.jpg', title: 'Gentle Giants', location: 'Amboseli, Kenya' },
  { image: 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=2000', title: 'Zanzibar Sunset', location: 'Nungwi, Zanzibar' },
  { image: 'images/gallery/giraffe-thumb.jpg', title: 'Grace in Motion', location: 'Maasai Mara, Kenya' },
  { image: 'images/gallery/zanzibar-thumb.jpg', title: 'Coastal Dreams', location: 'Nungwi, Zanzibar' },
  { image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000', title: 'Safari Morning', location: 'Ngorongoro, Tanzania' }
];

export const destinations = [
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    subtitle: 'The Spice Island',
    description: 'Crystal clear turquoise waters meet white sandy beaches and ancient stone architecture. Zanzibar is a sensory explosion of spices, culture, and coastal relaxation.',
    image: 'images/destinations/zanzibar/beach.jpg'
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    subtitle: 'The Land of the Serengeti',
    description: 'Home to the Great Migration and Mount Kilimanjaro, Tanzania offers the quintessential African safari experience with unmatched wildlife density.',
    image: 'images/destinations/tanzania/serengeti.jpg'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    subtitle: 'The Pride of Africa',
    description: 'The birthplace of the safari. Kenya combines diverse landscapes, rich tribal cultures, and world-famous wildlife reserves like the Maasai Mara.',
    image: 'images/destinations/kenya/masai-mara.jpg'
  }
];

export const aboutContent = {
  whoWeAre: "AfriVibe Safaris is an African-led travel and wellbeing platform acting as a bridge between Africa and the world.",
  ourStory: "AfriVibe was born from lived experience. As founders, we went through moments of pressure, stress, and uncertainty. What changed us was not comfort, but nature.",
  mission: "To bridge Africa with the world through meaningful travel experiences that connect people to nature, culture, and themselves.",
  vision: "To position Africa as a global destination not only for travel, but for connection, wellbeing, education, and transformative human experiences."
};
