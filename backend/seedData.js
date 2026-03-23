// seedData.js — Production seed data with reliable Unsplash image URLs
// All images are direct Unsplash URLs - no local paths

export const packages = [
  {
    title: 'Luxury Safari Experience',
    country: 'Tanzania',
    description: 'Indulge in the finest African hospitality with our Luxury Safari. Witness the Great Migration from the comfort of five-star tented camps, enjoy private game drives with expert silver-level guides, and experience sunset sundowners overlooking the endless plains of the Serengeti.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1600',
    rating: 5.0, reviewCount: 84, packageType: 'Classical', category: 'Safari', duration: '7 Nights',
    pricing: { nonRes: '$8,500', res: 'TZS 12,000,000', cit: 'TZS 8,500,000' }
  },
  {
    title: 'Maasai Mara Safari',
    country: 'Kenya',
    description: 'Adventure meets comfort in this curated journey through Kenya\'s most iconic parks. From the red elephants of Tsavo to the big cats of the Maasai Mara, this safari offers an authentic connection to wildlife without compromising on essential comforts.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1600',
    rating: 4.8, reviewCount: 156, packageType: 'Family', category: 'Safari', duration: '6 Nights',
    pricing: { nonRes: '$3,800', res: 'KES 145,000', cit: 'KES 95,000' }
  },
  {
    title: 'Wellness Safari Experience',
    country: 'Kenya',
    description: 'Designed for relaxation and reconnection, combining wildlife experiences with calm, mindful moments in nature. This unique itinerary focuses on the "Vibe" of the wild, incorporating campfire meditation, nature walks, and digital detox sessions.',
    image: 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=1600',
    rating: 5.0, reviewCount: 32, packageType: 'Inclusive', category: 'Safari', duration: '4 Nights',
    pricing: { nonRes: '$2,500', res: 'KES 95,000', cit: 'KES 75,000' }
  },
  {
    title: 'Uganda Gorilla Trekking',
    country: 'Uganda',
    description: 'An intimate encounter with the gentle giants of Bwindi Impenetrable Forest. This life-changing trek brings you face-to-face with mountain gorillas in their natural habitat, guided by expert trackers and conservationists.',
    image: 'https://images.unsplash.com/photo-1535083311013-bc12b80cf166?auto=format&fit=crop&q=80&w=1600',
    rating: 4.9, reviewCount: 42, packageType: 'Classical', category: 'Safari', duration: '5 Nights',
    pricing: { nonRes: '$4,200', res: 'UGX 5,500,000', cit: 'UGX 4,000,000' }
  },
  {
    title: 'Rwanda Golden Gorillas',
    country: 'Rwanda',
    description: 'Rwanda\'s Volcanoes National Park is home to the rare golden gorillas. Combine luxury lodge accommodation with early morning gorilla permits for an exclusive, once-in-a-lifetime encounter in misty volcanic highlands.',
    image: 'https://images.unsplash.com/photo-1547736083-eb3f8dea0dcd?auto=format&fit=crop&q=80&w=1600',
    rating: 4.9, reviewCount: 28, packageType: 'Couple', category: 'Safari', duration: '4 Nights',
    pricing: { nonRes: '$5,800', res: 'RWF 3,800,000', cit: 'RWF 2,500,000' }
  },
  {
    title: 'Botswana Okavango Delta',
    country: 'Botswana',
    description: 'Drift silently through the pristine channels of the Okavango Delta by mokoro canoe, witnessing elephant, hippo, and rare birds in one of Africa\'s last true wildernesses. Exclusive seasonal camps ensure you share this paradise with very few.',
    image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=1600',
    rating: 5.0, reviewCount: 19, packageType: 'Couple', category: 'Safari', duration: '6 Nights',
    pricing: { nonRes: '$9,200', res: 'BWP 42,000', cit: 'BWP 38,000' }
  }
];

export const articles = [
  {
    title: 'Inside the Mindful Safari: Why Nature is the Ultimate Healer',
    slug: 'mindful-safari-nature-healer',
    excerpt: 'Beyond the "Big Five," the true power of an African safari lies in its ability to ground us in the present moment and restore mental clarity.',
    body: `In today's hyper-connected world, the silence of the savannah is a rare luxury. At AfriVibe Safaris, we believe that nature is not just a backdrop for photos, but a profound catalyst for mental wellbeing.

A mindful safari isn't just about checking animals off a list — it's about the rhythmic crunch of grass under a 4x4, the haunting call of a fish eagle at dawn, and the absolute clarity that comes when you disconnect from screens and reconnect with the earth.

Scientific studies have long shown that spending time in natural environments reduces cortisol levels and improves focus. We take this further by incorporating quiet reflective time and campfire storytelling into every journey.

Nature challenged us, grounded us, and helped us reconnect with ourselves — and it can do the same for you. Our wellness safaris integrate gentle bush walks at sunrise, journaling sessions, and optional guided meditation at sunset to create a holistic healing experience unlike any other.`,
    author: 'Faith — Founder',
    category: 'Wildlife & Conservation',
    image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=1600',
    country: 'Kenya',
    published: true
  },
  {
    title: 'The Expert\'s Safari Packing Guide: Essentials for the Savvy Traveller',
    slug: 'expert-safari-packing-guide',
    excerpt: 'Packing for the wild requires a balance of practicality, tradition, and respect for the environment. Here is what every safari expert recommends.',
    body: `When preparing for your first African adventure, the temptation is to overpack. However, the true safari expert knows that less is more.

Neutral tones like khaki, stone, and olive aren't just a fashion choice — they help you blend into the bush and avoid attracting biting insects like the Tsetse fly.

Layers are critical; mornings can be biting cold while afternoons are scorching. Don't forget high-quality binoculars (8x42 is the gold standard), a wide-brimmed hat with a chin strap, and eco-friendly sunscreen that doesn't harm local water sources.

## Key Packing Items

Pack light, breathable clothing in neutral colours. Avoid blue and black which attract Tsetse flies. Always bring a fleece for game drive mornings, quality insect repellent with DEET, and a good headlamp with extra batteries.

Most importantly, bring a sense of wonder and a sturdy notebook to record your experiences.`,
    author: 'AfriVibe Lead Guide',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1600',
    country: 'Kenya',
    published: true
  },
  {
    title: 'Conservation: Why Your Journey Matters More Than Ever',
    slug: 'conservation-why-your-journey-matters',
    excerpt: 'Sustainable tourism is the backbone of wildlife protection in East Africa. Your choice to travel responsibly has a direct and lasting impact on conservation.',
    body: `Every booking you make with AfriVibe Safaris contributes directly to the conservation of the landscapes we love. By choosing local, African-led platforms, you ensure that tourism revenue stays within the communities on the front lines of wildlife protection.

We partner with conservancies that prioritize anti-poaching initiatives and community education. In the Serengeti-Mara ecosystem, this "circular" tourism model has proven that wild spaces are most secure when local people derive tangible benefits from their preservation.

Your visit helps pay for ranger salaries, wildlife monitoring programs, and the maintenance of essential corridors for migratory species.

## How We Give Back

10% of every booking goes directly to our Conservation Fund. This supports three programmes: anti-poaching ranger patrols, community school building in Maasai villages, and wildlife corridor maintenance.`,
    author: 'AfriVibe Conservation Dept',
    category: 'Wildlife & Conservation',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1600',
    country: 'Tanzania',
    published: true
  },
  {
    title: 'Climbing Kilimanjaro: The Mental Game No One Talks About',
    slug: 'climbing-kilimanjaro-mental-game',
    excerpt: 'At 5,895m, reaching the roof of Africa is as much a mental battle as it is a physical one. Our guides share the mindset secrets behind successful summits.',
    body: `You've trained. You've got the gear. Your fitness is there. And then, somewhere above 4,500 metres, the mountain whispers "turn back." This is the moment that separates summit success from summit failure — and it's entirely in the mind.

Our lead mountain guide has taken over 200 people to the summit of Kilimanjaro. His secret? "Pole pole" — the Swahili phrase for "slowly, slowly." When altitude robs your lungs of oxygen, your body's instinct is to rush, to fight, to panic. The mountain demands the opposite.

## The Summit Push

The final push from Barafu Camp begins at midnight. By 2 AM, most climbers face the "wall" — a period of intense cold, exhaustion, and doubt. Our guides are trained to recognise this moment and use specific breathing exercises and motivational anchoring techniques to guide climbers through.

The summit at sunrise, however, makes every moment worthwhile.`,
    author: 'James — Lead Mountain Guide',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1600',
    country: 'Tanzania',
    published: true
  },
  {
    title: 'Accessible Safaris: Breaking Down Barriers in the Wild',
    slug: 'accessible-safaris-inclusive-travel',
    excerpt: 'AfriVibe Safaris is pioneering inclusive travel, ensuring that mobility challenges, sensory differences, and age do not limit anyone from experiencing the magic of Africa.',
    body: `The African wilderness should be for everyone. Unfortunately, the travel industry has for too long excluded people with disabilities, the elderly, and those with neurodivergent needs from the transformative experience of a safari.

At AfriVibe, we are changing this. Our inclusive safari packages are designed from the ground up to accommodate wheelchair users, guests with hearing or visual impairments, and individuals who require a slower, more predictable itinerary.

## Our Commitment

Every vehicle in our fleet can be adapted with wheelchair ramps. Our guides are trained in basic sign language and sensory sensitivity. We offer pre-visit virtual tours so guests know exactly what to expect.

We believe that inclusive travel isn't just good ethics — it's good business and it creates richer, more diverse safari experiences for everyone on the vehicle.`,
    author: 'AfriVibe Inclusion Team',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1600',
    country: 'Kenya',
    published: true
  }
];

export const gallery = [
  { image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1200', title: 'King of the Savanna', location: 'Serengeti, Tanzania' },
  { image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=1200', title: 'Gentle Giants of Amboseli', location: 'Amboseli, Kenya' },
  { image: 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=1200', title: 'Zanzibar Sunset', location: 'Nungwi, Zanzibar' },
  { image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eeaec?auto=format&fit=crop&q=80&w=1200', title: 'Mount Kilimanjaro at Sunrise', location: 'Amboseli View, Kenya' },
  { image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=1200', title: 'Zebra Plains', location: 'Maasai Mara, Kenya' },
  { image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200', title: 'Morning Safari Light', location: 'Ngorongoro Crater, Tanzania' },
  { image: 'https://images.unsplash.com/photo-1535083311013-bc12b80cf166?auto=format&fit=crop&q=80&w=1200', title: 'Mountain Gorilla', location: 'Bwindi, Uganda' },
  { image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=1200', title: 'Cheetah on the Prowl', location: 'Maasai Mara, Kenya' },
  { image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1200', title: 'African Sunset', location: 'Serengeti, Tanzania' },
  { image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=1200', title: 'Flamingos at Nakuru', location: 'Lake Nakuru, Kenya' },
  { image: 'https://images.unsplash.com/photo-1547736083-eb3f8dea0dcd?auto=format&fit=crop&q=80&w=1200', title: 'Savanna at Golden Hour', location: 'Tsavo, Kenya' },
  { image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200', title: 'Ocean Dhow at Sunset', location: 'Lamu, Kenya' }
];

export const destinations = [
  {
    id: 'kenya',
    name: 'Kenya',
    subtitle: 'The Pride of Africa',
    description: 'The birthplace of the safari. Kenya combines diverse landscapes, rich tribal cultures, and world-famous wildlife reserves like the Maasai Mara and Amboseli.',
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eeaec?auto=format&fit=crop&q=80&w=1600',
    categories: ['Safari', 'Hiking', 'Nature']
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    subtitle: 'Home of Kilimanjaro & the Serengeti',
    description: 'Witness the Great Migration in the Serengeti and encounter the wildlife-rich Ngorongoro Crater. Tanzania is the most majestic safari destination in Africa.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1600',
    categories: ['Safari', 'Hiking', 'Beach']
  },
  {
    id: 'uganda',
    name: 'Uganda',
    subtitle: 'The Pearl of Africa',
    description: 'Uganda is home to nearly half the world\'s mountain gorilla population in Bwindi Impenetrable Forest and stunning source-of-the-Nile whitewater rafting.',
    image: 'https://images.unsplash.com/photo-1535083311013-bc12b80cf166?auto=format&fit=crop&q=80&w=1600',
    categories: ['Experiences', 'Nature']
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    subtitle: "Africa's Land of a Thousand Hills",
    description: "Rwanda combines luxury lodges, world-class gorilla trekking in Volcanoes National Park, and a remarkable story of resilience and inspired growth.",
    image: 'https://images.unsplash.com/photo-1547736083-eb3f8dea0dcd?auto=format&fit=crop&q=80&w=1600',
    categories: ['Experiences', 'Nature']
  },
  {
    id: 'botswana',
    name: 'Botswana',
    subtitle: "Africa's Last Untouched Wilderness",
    description: 'Botswana offers pristine, uncrowded wildlife experiences in the Okavango Delta and Moremi Game Reserve — Africa\'s finest water wilderness.',
    image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=1600',
    categories: ['Safari', 'Nature']
  }
];

export const aboutContent = {
  whoWeAre: "AfriVibe Safaris is an African-led travel and wellbeing platform acting as a bridge between Africa and the world.",
  ourStory: "AfriVibe was born from lived experience. As founders, we went through moments of pressure, stress, and uncertainty. What changed us was not comfort, but nature.",
  mission: "To bridge Africa with the world through meaningful travel experiences that connect people to nature, culture, and themselves.",
  vision: "To position Africa as a global destination not only for travel, but for connection, wellbeing, education, and transformative human experiences."
};
