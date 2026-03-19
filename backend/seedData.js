// seedData.js — Pure data export for use by both seed.js CLI and /api/seed endpoint
// This file must NOT import mongoose or any model — it is pure data.

export const packages = [
  // TIERED PACKAGES (SECTION 1)
  {
    title: 'Luxury Safari Experience',
    country: 'Tanzania',
    description: 'Indulge in the finest African hospitality. Our luxury safari packages place you in exclusive private conservancies, award-winning tented camps, and five-star lodges — where the only interruption to your morning coffee is the herd of elephants passing your deck.',
    image: '/images/packages/luxury.jpg',
    rating: 5.0, reviewCount: 84, packageType: 'Classical', category: 'Safari', duration: '7 Nights',
    highlights: ['Private game drives', 'Gourmet dining under the stars', 'Exclusive bush-plane transfers', 'Luxury tented camp with plunge pool'],
    pricing: { nonRes: '$8,500', res: 'TZS 12,000,000', cit: 'TZS 8,500,000' }
  },
  {
    title: 'Midrange Comfort Safari',
    country: 'Kenya',
    description: 'Adventure meets comfort. Perfect for families and couples, our midrange options feature beautiful permanent tented camps and lodges with full en-suite facilities, swimming pools, and incredible views, ensuring you experience the wild without sacrificing the essentials.',
    image: '/images/packages/midrange.jpg',
    rating: 4.8, reviewCount: 156, packageType: 'Family', category: 'Safari', duration: '6 Nights',
    highlights: ['Comfortable en-suite tents', 'Daily game drives', 'Sundowner experiences', 'Family-friendly atmosphere'],
    pricing: { nonRes: '$3,800', res: 'KES 145,000', cit: 'KES 95,000' }
  },
  {
    title: 'Budget Adventure Safari',
    country: 'Uganda',
    description: 'For the raw and the restless. Our budget safaris are designed for those who want a visceral connection to the African bush. Stay in well-maintained public campsites or affordable rustic lodges, focusing on the quality of wildlife tracking and pure adventure.',
    image: '/images/packages/budget.jpg',
    rating: 4.7, reviewCount: 92, packageType: 'Adventure', category: 'Safari', duration: '5 Nights',
    highlights: ['Authentic camping experience', 'Expert local guides', 'Campfire storytelling', 'Maximum wildlife exposure'],
    pricing: { nonRes: '$1,900', res: 'UGX 2,500,000', cit: 'UGX 1,800,000' }
  },
  {
    title: 'Mountain Trekking & Peaks',
    country: 'Tanzania',
    description: 'Conquer the Roof of Africa. From the snow-capped summit of Kilimanjaro to the dramatic glaciers of Mount Kenya, our trekking packages provide professional guides, safety-first equipment, and all the logistical support needed for a successful summit push.',
    image: '/images/packages/mountain.jpg',
    rating: 4.9, reviewCount: 112, packageType: 'Adventure', category: 'Hiking', duration: '8 Days',
    highlights: ['Qualified lead mountain guides', 'All equipment provided', 'High success rate routes', 'Summit certification'],
    pricing: { nonRes: '$4,200', res: 'TZS 4,800,000', cit: 'TZS 3,200,000' }
  },
  // ADDITIONAL DESTINATIONS
  {
    title: 'Zanzibar White Sands',
    country: 'Zanzibar',
    description: 'Relax on the pristine beaches of the Spice Island. Turquoise waters, ancient architecture, and world-class snorkeling.',
    image: '/images/destinations/zanzibar/beach.jpg',
    rating: 4.9, reviewCount: 204, packageType: 'Couple', category: 'Beach', duration: '5 Nights',
    highlights: ['Stone Town tour', 'Snorkeling at Mnemba Atoll', 'Sunset dhow cruise', 'Spice farm visit'],
    pricing: { nonRes: '$2,400', res: 'TZS 2,800,000', cit: 'TZS 1,800,000' }
  }
];

export const articles = [
  {
    title: 'Safari Savvy: Essential Tips for Your First African Adventure',
    slug: 'safari-savvy-essential-tips',
    excerpt: 'Your first safari is a life-changing event. Here is how to make the most of it with our expert tips.',
    body: `Your first safari is more than a holiday; it is a sensory awakening. The smell of wild sage at dawn, the distant roar of a lion under a canopy of stars, and the thrill of spotting a leopard in its natural habitat are experiences that stay with you forever. However, to ensure your adventure is as smooth as it is spectacular, a little preparation goes a long way.

## 1. Timing is Everything
Wildlife viewing in East and Southern Africa is heavily influenced by the seasons. The **Dry Season (June to October)** is widely considered the best time for game viewing as animals congregate around water sources and the vegetation is sparse, making spotting easier. If you want to witness the Great Migration, aim for July through September.

## 2. Respect the Wild
Remember, you are a guest in the animals' home. Always follow your guide’s instructions. Stay inside the vehicle, keep noise levels to a minimum, and never attempt to attract an animal's attention.

## 3. Binoculars are Your Best Friend
While your guide will get you as close as safely possible, many of the most fascinating behaviors—like a bird of prey nesting or a cheetah stalking in the distance—are best seen through high-quality binoculars.

## 4. Embrace the Slow Safari
Do not rush to see the "Big Five" in the first hour. Some of the most rewarding moments come from patience—watching a herd of elephants interact for forty minutes is often more memorable than a five-minute drive-by of a sleeping lion.`,
    author: 'AfriVibe Expert',
    category: 'Travel Tips',
    image: '/images/blog/wildlife-tips.jpg',
    published: true
  },
  {
    title: 'What to Pack for Your Safari: The Ultimate Checklist',
    slug: 'safari-packing-checklist',
    excerpt: 'Avoid overpacking and ensure you have the essentials with our comprehensive safari gear guide.',
    body: `Packing for a safari requires a balance of practicality and constraint, especially if you are taking small bush planes with strict weight limits. The rule of thumb is: **Neutral colours and layers.**

## The Safari Color Palette
Avoid bright whites (scares animals), dark blues or blacks (attracts Tsetse flies), and camouflage (reserved for the military in many African countries). Stick to "bush tones"—khaki, tan, olive green, and brown.

## Essential Gear
- **Layered Clothing**: Early mornings are freezing; midday is scorching. Bring light shirts and a warm fleece or windbreaker.
- **Sun Protection**: A wide-brimmed hat with a chin strap, high-SPF sunscreen, and polarized sunglasses.
- **Footwear**: Comfortable, closed-toe walking shoes or light hiking boots.
- **Personal Kit**: Insect repellent (with DEET), a basic first-aid kit, and any personal medications.

## Technology
- **Camera Gear**: A lens with at least 300mm reach is recommended for wildlife.
- **Power Bank**: While most lodges have charging stations, a portable battery is vital for long days in the bush.`,
    author: 'David L.',
    category: 'Packing Guide',
    image: '/images/blog/packing.jpg',
    published: true
  },
  {
    title: 'Sustainable Safari: How Your Visit Protects Africa’s Wildlife',
    slug: 'sustainable-safari-wildlife-protection',
    excerpt: 'Tourism is a powerful tool for conservation. Learn how your booking contributes to a thriving ecosystem.',
    body: `At AfriVibe Safaris, we believe that tourism must be a force for good. When done correctly, your safari is a direct investment in the protection of Africa’s fragile ecosystems and the empowerment of its beautiful people.

## Conservation through Commerce
National Park fees and conservancy levies are the primary source of funding for anti-poaching units, wildlife research, and habitat restoration. By visiting these areas, you provide the financial incentive to keep the land wild rather than converting it to agricultural use.

## Community Empowerment
Sustainability is not just about animals; it is about people. We partner with lodges that prioritize local employment and support community projects like schools and clean water initiatives. When a community benefits from wildlife, they become its most fierce protectors.

## Our Footprint
We encourage "low-impact, high-value" tourism. This means staying in eco-certified camps that use solar power, minimize plastic waste, and treat greywater, ensuring that the only thing we leave behind are footprints.`,
    author: 'Sarah Jenkins',
    category: 'Conservation',
    image: '/images/blog/sustainable-travel.jpg',
    published: true
  },
  {
    title: 'Safety First: Navigating the Wild with Confidence',
    slug: 'safari-safety-guide',
    excerpt: 'Wildlife is unpredictable, but your safari does not have to be. Stay safe with our core bush rules.',
    body: `While the African bush is a place of raw beauty, it is also an environment of professional-grade unpredictability. Safety is our absolute priority, and it starts with understanding a few simple rules.

## Listen to Your Guide
Your professional guide has spent years studying animal behavior. If they tell you to sit still or keep quiet, there is a very good reason for it. They can read subtle shifts in an animal’s posture that an untrained eye would miss.

## Staying in the Vehicle
In most parks, your vehicle is seen as a non-threatening object by predators. The moment you step out, you become a recognizable (and potentially threatening or edible) figure. Never exit the vehicle unless at a designated "safe zone" or picnic spot confirmed by your guide.

## Night Safety in Camp
Many of our camps are unfenced, meaning wildlife can move through at night. Always use the provided escort service (often local Maasai or Samburu warriors) when walking to your tent after dinner. Never wander alone after dark.

## Health and Hydration
The African sun is intense. Drink plenty of filtered water throughout the day, even if you do not feel thirsty. If you are in a malaria-prevalent area, ensure you have taken your prophylactics as prescribed.`,
    author: 'AfriVibe Team',
    category: 'Safety',
    image: '/images/blog/travel-safety.jpg',
    published: true
  }
];

export const gallery = [
  { image: '/images/gallery/lion-thumb.jpg', title: 'King of the Savanna', location: 'Serengeti, Tanzania' },
  { image: '/images/gallery/elephants-thumb.jpg', title: 'Gentle Giants', location: 'Amboseli, Kenya' },
  { image: '/images/gallery/giraffe-thumb.jpg', title: 'High Reaches', location: 'Mikumi, Tanzania' },
  { image: '/images/gallery/serengeti-thumb.jpg', title: 'Endless Horizons', location: 'Serengeti, Tanzania' },
  { image: '/images/gallery/bwindi-thumb.jpg', title: 'Mountain Guardian', location: 'Bwindi, Uganda' },
  { image: '/images/gallery/zanzibar-thumb.jpg', title: 'Island Bliss', location: 'Nungwi, Zanzibar' },
  { image: '/images/gallery/masai-mara-thumb.jpg', title: 'River Crossing', location: 'Masai Mara, Kenya' },
  { image: '/images/gallery/ngorongoro-thumb.jpg', title: 'Crater Life', location: 'Ngorongoro, Tanzania' },
  { image: '/images/gallery/mount-kenya-thumb.jpg', title: 'Glacier Peak', location: 'Mount Kenya' },
  { image: '/images/gallery/uganda-sunset-thumb.jpg', title: 'Dramatic Dusk', location: 'Queen Elizabeth NP, Uganda' }
];

export const destinations = [
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    subtitle: 'The Spice Island',
    description: 'An archipelago off the coast of Tanzania, Zanzibar is a tapestry of white-sand beaches, turquoise waters, and the historic winding alleys of Stone Town. Perfect for post-safari relaxation or cultural immersion.',
    image: '/images/destinations/zanzibar/beach.jpg'
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    subtitle: 'The Land of the Serengeti',
    description: 'Home to the Great Migration, the Ngorongoro Crater, and the majestic Mount Kilimanjaro. Tanzania offers the most iconic safari landscapes in Africa alongside its rich cultural heritage.',
    image: '/images/destinations/tanzania/serengeti.jpg'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    subtitle: 'The Pride of Africa',
    description: 'The birthplace of the safari. From the rolling plains of the Maasai Mara to the flamingos of Lake Nakuru and the red elephants of Tsavo, Kenya is a wildlife enthusiast’s paradise.',
    image: '/images/destinations/kenya/masai-mara.jpg'
  },
  {
    id: 'uganda',
    name: 'Uganda',
    subtitle: 'The Pearl of Africa',
    description: 'Where the savannah meets the rainforest. Uganda is world-renowned for mountain gorilla trekking in Bwindi, chimpanzee tracking, and the thunderous Murchison Falls.',
    image: '/images/destinations/uganda/bwindi.jpg'
  }
];
