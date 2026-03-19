// seedData.js — Pure data export for use by both seed.js CLI and /api/seed endpoint
// This file must NOT import mongoose or any model — it is pure data.

export const packages = [
  // KENYA (3)
  {
    title: 'Maasai Mara Great Migration',
    country: 'Kenya',
    description: '7 Nights | Masai Mara. Witness millions of wildebeest crossing the Mara River in the world\'s greatest wildlife spectacle. Stay in luxury tented camps at the river crossing points.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    rating: 4.9, reviewCount: 212, packageType: 'Classical', category: 'Safari', duration: '7 Nights',
    highlights: ['River crossing viewpoint camps', 'Expert Maasai guides', 'Sundowner in the bush', 'Day visit to a Maasai village'],
    pricing: { nonRes: '$3,800', res: 'KES 145,000', cit: 'KES 95,000' }
  },
  {
    title: 'Amboseli Elephant Safari',
    country: 'Kenya',
    description: '5 Nights | Amboseli National Park. Large herds of elephant against the backdrop of snow-capped Mount Kilimanjaro. Family-friendly with Big Five game drives.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80',
    rating: 4.8, reviewCount: 134, packageType: 'Family', category: 'Safari', duration: '5 Nights',
    highlights: ['Big Five game drives', 'Photographic blind at elephant waterhole', 'Kilimanjaro sunrise views', 'Cultural visit to Maasai manyatta'],
    pricing: { nonRes: '$2,200', res: 'KES 82,000', cit: 'KES 55,000' }
  },
  {
    title: 'Diani Beach & Safari Combo',
    country: 'Kenya',
    description: '8 Nights | Tsavo East + Diani Beach. The perfect bush-and-beach combination — two days of game drives in red-elephant country then five days on the white sands of the Indian Ocean.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    rating: 4.7, reviewCount: 98, packageType: 'Couple', category: 'Beach', duration: '8 Nights',
    highlights: ['Tsavo East red elephants', 'Diani Beach 5-star resort', 'Snorkeling at Wasini Island', 'Dhow sunset cruise'],
    pricing: { nonRes: '$3,100', res: 'KES 120,000', cit: 'KES 78,000' }
  },
  // TANZANIA (3)
  {
    title: 'Serengeti & Ngorongoro Explorer',
    country: 'Tanzania',
    description: '8 Nights | Serengeti + Ngorongoro Crater. Africa\'s most iconic safari combination. Endless plains, resident predators, and a volcano crater teeming with 25,000 animals.',
    image: 'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?auto=format&fit=crop&w=800&q=80',
    rating: 5.0, reviewCount: 178, packageType: 'Classical', category: 'Safari', duration: '8 Nights',
    highlights: ['Full-day Ngorongoro Crater descent', 'Central Serengeti game drives', 'Hot air balloon safari (optional)', 'Luxury mobile camp'],
    pricing: { nonRes: '$6,200', res: 'TZS 7,200,000', cit: 'TZS 4,800,000' }
  },
  {
    title: 'Zanzibar Spice & Ruins Retreat',
    country: 'Tanzania',
    description: '6 Nights | Stone Town + Zanzibar coastline. Walk the UNESCO-listed Stone Town alleys, visit historic spice farms, and relax in turquoise lagoons at the northern beaches.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    rating: 4.8, reviewCount: 145, packageType: 'Couple', category: 'Beach', duration: '6 Nights',
    highlights: ['Stone Town UNESCO walking tour', 'Spice farm tour & cooking class', 'Dolphin watching at Kizimkazi', 'Sandbank picnic'],
    pricing: { nonRes: '$2,600', res: 'TZS 3,000,000', cit: 'TZS 1,900,000' }
  },
  {
    title: 'Mount Kilimanjaro Climb (Lemosho)',
    country: 'Tanzania',
    description: '8 Days | Lemosho Route. Africa\'s highest summit. The Lemosho route offers the highest success rate with gradual altitude gain through five distinct ecological zones.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    rating: 4.9, reviewCount: 67, packageType: 'Adventure', category: 'Hiking', duration: '8 Days',
    highlights: ['Lemosho 8-day route', 'Qualified lead mountain guides', 'Full service crew & equipment', 'Summit certificate & celebration dinner'],
    pricing: { nonRes: '$3,900', res: 'TZS 4,500,000', cit: 'TZS 2,900,000' }
  },
  // UGANDA (3)
  {
    title: 'Mountain Gorilla Trekking',
    country: 'Uganda',
    description: '5 Nights | Bwindi Impenetrable Forest. An hour in the presence of a habituated gorilla family — one of the most profound wildlife encounters on earth. Includes gorilla permit.',
    image: 'https://images.unsplash.com/photo-1577744226961-fb38df6440fd?auto=format&fit=crop&w=800&q=80',
    rating: 5.0, reviewCount: 93, packageType: 'Adventure', category: 'Nature', duration: '5 Nights',
    highlights: ['Gorilla trekking permit included', 'Expert tracker-guided forest walks', 'Batwa cultural experience', 'Bwindi community hospital visit'],
    pricing: { nonRes: '$3,500', res: 'UGX 4,200,000', cit: 'UGX 2,600,000' }
  },
  {
    title: 'Murchison Falls & Chimp Trek',
    country: 'Uganda',
    description: '6 Nights | Murchison Falls NP + Kibale Forest. The Nile forces through a 7-metre gorge with a thunderous roar. Complete with chimpanzee tracking in Kibale — the world\'s best.',
    image: 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?auto=format&fit=crop&w=800&q=80',
    rating: 4.8, reviewCount: 72, packageType: 'Family', category: 'Safari', duration: '6 Nights',
    highlights: ['Nile boat cruise to the falls', 'Game drives (lion, giraffe, buffalo)', 'Chimpanzee tracking Kibale', 'Delta viewing at Lake Albert'],
    pricing: { nonRes: '$2,800', res: 'UGX 3,400,000', cit: 'UGX 2,100,000' }
  },
  {
    title: 'Accessible Uganda Safari',
    country: 'Uganda',
    description: '5 Nights | Nairobi + Entebbe + Queen Elizabeth NP. Thoughtfully designed for travellers with mobility challenges. Fully equipped vehicles, paved viewing areas, and specially trained guides.',
    image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800&q=80',
    rating: 4.9, reviewCount: 41, packageType: 'Inclusive', category: 'Safari', duration: '5 Nights',
    highlights: ['Wheelchair-adapted game vehicles', 'Flat terrain game drives', 'Tree-climbing lion viewpoints', 'Kazinga Channel boat cruise'],
    pricing: { nonRes: '$2,400', res: 'UGX 2,900,000', cit: 'UGX 1,800,000' }
  },
  // RWANDA (3)
  {
    title: 'Rwanda Gorilla & Golden Monkey',
    country: 'Rwanda',
    description: '4 Nights | Volcanoes National Park. Track both gorillas in the bamboo highlands AND playful golden monkeys in the Virunga volcanic range — a double primate experience.',
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&w=800&q=80',
    rating: 5.0, reviewCount: 88, packageType: 'Adventure', category: 'Nature', duration: '4 Nights',
    highlights: ['Gorilla trekking permit', 'Golden monkey tracking', 'Dian Fossey Gorilla Fund tour', 'Kigali Genocide Memorial visit'],
    pricing: { nonRes: '$2,900', res: 'RWF 2,800,000', cit: 'RWF 1,700,000' }
  },
  {
    title: 'Kigali City & Nyungwe Forest',
    country: 'Rwanda',
    description: '5 Nights | Kigali + Nyungwe NP. Africa\'s cleanest capital city followed by an ancient montane rainforest. Canopy walks, colobus monkeys, and a network of forest trails.',
    image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7, reviewCount: 54, packageType: 'Family', category: 'Nature', duration: '5 Nights',
    highlights: ['Nyungwe canopy walkway', 'Chimpanzee tracking permit', 'Kigali city food & culture tour', 'Inema Arts Centre visit'],
    pricing: { nonRes: '$2,100', res: 'RWF 2,000,000', cit: 'RWF 1,200,000' }
  },
  {
    title: 'Lake Kivu Relaxation Retreat',
    country: 'Rwanda',
    description: '4 Nights | Gisenyi, Lake Kivu. Rwanda\'s great lake — ringed by green hills, lava-formed islands, and warm volcanic springs. Kayaking, island hopping, and lakeside luxury.',
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?auto=format&fit=crop&w=800&q=80',
    rating: 4.6, reviewCount: 37, packageType: 'Couple', category: 'Beach', duration: '4 Nights',
    highlights: ['Island hopping by boat', 'Kayaking on the lake', 'Napoleon Island (fruit bats)', 'Congo-Nile trail cycling'],
    pricing: { nonRes: '$1,600', res: 'RWF 1,550,000', cit: 'RWF 900,000' }
  },
  // BOTSWANA (3)
  {
    title: 'Okavango Delta Mokoro Safari',
    country: 'Botswana',
    description: '6 Nights | Okavango Delta. Glide silently through the world\'s largest inland delta in a traditional mokoro dugout canoe. Spot hippos, crocs, and rare water birds up close.',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800&q=80',
    rating: 4.9, reviewCount: 79, packageType: 'Classical', category: 'Safari', duration: '6 Nights',
    highlights: ['Mokoro canal channels', 'Walking safari on islands', 'Wild camping in the delta', 'Scenic light aircraft transfer'],
    pricing: { nonRes: '$5,800', res: 'BWP 65,000', cit: 'BWP 42,000' }
  },
  {
    title: 'Chobe National Park Explorer',
    country: 'Botswana',
    description: '5 Nights | Chobe NP. Home to Africa\'s largest elephant population — over 50,000 individuals. Game drives along the Chobe River and sunset boat cruises among elephant herds.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8, reviewCount: 103, packageType: 'Family', category: 'Safari', duration: '5 Nights',
    highlights: ['Chobe River barge cruise', 'Big Five game drives', 'Victoria Falls day trip (optional)', 'Sundowner at the riverfront'],
    pricing: { nonRes: '$3,600', res: 'BWP 40,000', cit: 'BWP 26,000' }
  },
  {
    title: 'Kalahari Desert Discovery',
    country: 'Botswana',
    description: '5 Nights | Central Kalahari. The world\'s second largest game reserve. Track black-maned Kalahari lions, watch meerkats at sunrise, and sleep under a carpet of stars unspoilt by light pollution.',
    image: 'https://images.unsplash.com/photo-1471918458748-1f68bd3b65a8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8, reviewCount: 61, packageType: 'Adventure', category: 'Safari', duration: '5 Nights',
    highlights: ['Kalahari black-maned lion tracking', 'Meerkat morning walk', 'San Bushmen cultural experience', 'Stargazing with astronomy guide'],
    pricing: { nonRes: '$4,100', res: 'BWP 46,000', cit: 'BWP 29,000' }
  }
];

export const articles = [
  {
    title: 'The Great Migration: A Guide to Kenya\'s Maasai Mara',
    slug: 'great-migration-maasai-mara-guide',
    excerpt: 'Everything you need to know to witness the spectacular movement of millions of wildebeest across the Mara River.',
    body: 'The Great Migration is the largest overland animal movement on earth, involving over 1.5 million wildebeest, 200,000 zebras, and 350,000 gazelles. Between July and October every year, this parade floods into Kenya\'s Maasai Mara from Tanzania\'s Serengeti in search of fresh grass.\n\n## The Mara River Crossings\n\nThe most dramatic moment occurs at the Mara River. Crocodiles wait patiently as the wildebeest steel themselves for the crossing.\n\n## When to Go\n\n- **July-August**: First herds arrive. Main crossings begin.\n- **September-October**: Peak crossing month.\n- **November**: Herds begin the southward return.\n\n## Best Camps\n\nStay at Governors\' Migration Camp, Mahali Mzuri, or Angama Mara.',
    author: 'David L.',
    category: 'Safari Guide',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    country: 'Kenya',
    published: true
  },
  {
    title: 'Uganda: Beyond the Gorillas — 5 Destinations You Must Visit',
    slug: '5-uganda-destinations-beyond-gorillas',
    excerpt: 'Bwindi is just the beginning. Discover Murchison Falls, Kibale, Fort Portal, Queen Elizabeth NP, and Lake Victoria.',
    body: 'Uganda is far more than its famous mountain gorillas. Called the "Pearl of Africa" by Winston Churchill, the country packs extraordinary biodiversity into a compact landmass.\n\n## 1. Murchison Falls\n\nThe entire force of the River Nile squeezed through a seven-metre gorge.\n\n## 2. Kibale Forest\n\nThe best place on earth to track chimpanzees — over 1,500 habituated individuals.\n\n## 3. Queen Elizabeth NP\n\nThe Ishasha sector is where lions routinely climb fig trees.\n\n## 4. Fort Portal & Crater Lakes\n\nOver 30 explosion craters filled with emerald-green lakes.\n\n## 5. Lake Victoria & Ssese Islands\n\nDeserted white-sand beaches and some of the best freshwater fishing in the world.',
    author: 'Michael K.',
    category: 'Destination Spotlight',
    image: 'https://images.unsplash.com/photo-1577744226961-fb38df6440fd?auto=format&fit=crop&w=800&q=80',
    country: 'Uganda',
    published: true
  },
  {
    title: 'Accessible Safaris: How We Make Africa Inclusive for Every Traveller',
    slug: 'accessible-safaris-inclusive-africa',
    excerpt: 'From wheelchair-adapted game vehicles to sensory-friendly itineraries — a deep dive into how AfriVibe designs safaris for all travellers.',
    body: 'At AfriVibe Safaris, inclusivity is the foundation of what we do. We believe that a life-changing African safari should be available to every human being.\n\n## Wheelchair-Adapted Vehicles\n\n- Hydraulic or ramp-assisted boarding\n- Swiveling, secured seats at roof-hatch height\n- Medical-grade storage\n\n## Sensory-Friendly Itineraries\n\n- Quiet private game drives\n- Pre-visit VR familiarisation\n- Ample downtime between activities\n\n## Best Accessible Parks\n\n- Nairobi NP (paved circuits)\n- Amboseli (flat terrain)\n- Murchison Falls (boat cruises)',
    author: 'Sarah Jenkins',
    category: 'Inclusive Travel',
    image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800&q=80',
    published: true
  },
  {
    title: 'Wildlife Spotlight: The African Elephant',
    slug: 'wildlife-spotlight-african-elephant',
    excerpt: 'From Amboseli\'s matriarchs to Chobe\'s herds — elephant intelligence, culture, and conservation.',
    body: 'The African elephant is the world\'s largest land animal — up to 6 tonnes. They are among the most emotionally complex creatures alive.\n\n## Social Structure\n\nMatriarchal societies led by the oldest female.\n\n## Where to See Them\n\n- Amboseli, Kenya — Kilimanjaro backdrop\n- Chobe, Botswana — 50,000+ individuals\n- Tarangire, Tanzania — giant old bulls\n\n## Conservation\n\nPopulations declined from 10 million (1900) to 415,000 today. AfriVibe supports the Amboseli Elephant Research Project.',
    author: 'Jane G.',
    category: 'Wildlife & Conservation',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80',
    published: true
  },
  {
    title: 'Botswana\'s Okavango Delta: The Safari That Changes Everything',
    slug: 'okavango-delta-botswana-guide',
    excerpt: 'A UNESCO World Heritage Site. The Okavango Delta floods the Kalahari every year, creating Africa\'s most unique safari environment.',
    body: 'The Okavango Delta is one of the world\'s great natural wonders. Floodwaters from Angola fan out into channels, islands, and lagoons.\n\n## The Mokoro Experience\n\nGlide at water-level through papyrus-lined waterways by traditional dugout canoe.\n\n## Key Areas\n\n- Moremi Game Reserve\n- Chief\'s Island — exceptional predator concentration\n- Khwai — renowned for wild dog\n\n## Wildlife Calendar\n\n- May-Aug: Flood season, mokoro safaris\n- Sep-Oct: Dry season, walking safaris\n- Nov-Apr: Green season, baby animals',
    author: 'David L.',
    category: 'Destination Spotlight',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800&q=80',
    country: 'Botswana',
    published: true
  },
  {
    title: 'Tanzania\'s Serengeti: Planning the Perfect Safari',
    slug: 'serengeti-safari-planning-guide',
    excerpt: 'The definitive planning guide for Tanzania\'s crown jewel — from big cats in Central Serengeti to remote Kogatende crossings.',
    body: 'The Serengeti is the oldest and most studied ecosystem in Africa. 30,000 square kilometres of savannah supporting the most intact predator-prey dynamic on earth.\n\n## Regions\n\n- Central (Seronera): Resident leopards, lion prides\n- Western Corridor: Grumeti River crossings\n- Northern (Kogatende): Main Mara River crossings\n- Southern (Ndutu): Calving grounds, 8,000 births/day\n\n## Ngorongoro Crater\n\n25,000 animals in a 19km volcanic caldera. Black rhino, flamingo, lion prides year-round.',
    author: 'AfriVibe Team',
    category: 'Safari Guide',
    image: 'https://images.unsplash.com/photo-1447797709393-85d5736a40f4?auto=format&fit=crop&w=800&q=80',
    country: 'Tanzania',
    published: true
  },
  {
    title: 'Rwanda Rising: The Land of a Thousand Hills',
    slug: 'rwanda-land-of-thousand-hills-guide',
    excerpt: 'From gorillas of Volcanoes NP to Kigali, Nyungwe, and Lake Kivu — Rwanda is Africa\'s most inspiring destination.',
    body: 'Rwanda is Africa\'s most remarkable comeback story. Clean, safe, forested, and genuinely proud.\n\n## Volcanoes National Park\n\nGorilla permits ($1,500 USD) fund park management. Populations have grown from 620 to over 1,000.\n\n## Kigali\n\nAfrica\'s cleanest and safest city. The Genocide Memorial is essential.\n\n## Nyungwe\n\nAfrica\'s largest montane rainforest. 60km canopy walkway, 13 primate species.\n\n## Lake Kivu\n\nOne of only three volcanic lakes in the world. Ringed by terraced hills and fishing villages.',
    author: 'AfriVibe Team',
    category: 'Destination Spotlight',
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&w=800&q=80',
    country: 'Rwanda',
    published: true
  },
  {
    title: 'Travel Tips: How to Plan Your First African Safari',
    slug: 'how-to-plan-first-african-safari',
    excerpt: 'Choosing a country, picking the right season, understanding pricing tiers, packing the right gear — everything for first-timers.',
    body: 'Planning your first African safari is exciting and mildly overwhelming. This guide covers everything.\n\n## Choose Your Country\n\n- Kenya — Classic safari, migration\n- Tanzania — Serengeti + Zanzibar\n- Uganda — Gorillas + primates\n- Rwanda — Gorillas + culture\n- Botswana — Okavango exclusivity\n\n## Pick Your Season\n\nDry season (Jun-Oct) is classic. Green season (Nov-May) brings lower prices and baby animals.\n\n## Pricing Tiers\n\n- Non-Resident (USD)\n- Resident (local currency)\n- Citizen (discounted)\n\n## Essential Packing\n\nNeutral colours, layers, binoculars, SPF 50, camera with 300mm lens, yellow fever certificate.',
    author: 'AfriVibe Team',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    published: true
  }
];
