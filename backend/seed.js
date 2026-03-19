import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from './models/Package.js';
import Article from './models/Article.js';
import Admin from './models/Admin.js';
// NOTE: Quotes and Testimonials are NOT deleted — they are user-generated data
// This seed only manages: Packages, Articles, and the Admin user

dotenv.config({ path: './backend/.env' });

// ============================================================
// 15 PACKAGES ACROSS 5 COUNTRIES (3 per country)
// ============================================================
const packages = [
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

// ============================================================
// ARTICLES — Destination-focused with real locations
// ============================================================
const articles = [
  {
    title: 'The Great Migration: A Guide to Kenya\'s Maasai Mara',
    slug: 'great-migration-maasai-mara-guide',
    excerpt: 'Everything you need to know to witness the spectacular movement of millions of wildebeest across the Mara River — Kenya\'s most iconic wildlife event.',
    body: `The Great Migration is the largest overland animal movement on earth, involving over 1.5 million wildebeest, 200,000 zebras, and 350,000 gazelles. Between July and October every year, this irresistible parade floods into Kenya's Maasai Mara from Tanzania's Serengeti in search of fresh grass.

## The Mara River Crossings

The most dramatic moment of the migration occurs at the Mara River. Crocodiles — some over 4 metres long — wait patiently as the wildebeest steel themselves for the crossing. The chaos that ensues is primal and breathtaking. Key crossing points include Lookout Hill, Serena Crossing, and Sand River Gate.

## When to Go

- **July–August**: First herds arrive from Serengeti. Main crossings begin near Sand River.
- **September–October**: Peak crossing month. Largest herds and most frequent crossings.
- **November**: Herds begin the southward return through Mara Triangle.

## Best Camps

Stay in a mobile tented camp *directly* on the river for the most intimate experience. Our recommended camps include Governors' Migration Camp, Mahali Mzuri, and Angama Mara — all positioned near established crossing points.

## Wildlife Beyond the Migration

Even outside migration season, the Mara hosts the Big Five year-round. The Mara Triangle is especially reliable for cheetah, lion prides, and large elephant herds. The Narok region surrounding the reserve is home to the Maasai people whose cultural visits add immeasurable depth to any safari.`,
    author: 'David L.',
    category: 'Safari Guide',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    country: 'Kenya',
    published: true
  },
  {
    title: 'Uganda: Beyond the Gorillas — 5 Destinations You Must Visit',
    slug: '5-uganda-destinations-beyond-gorillas',
    excerpt: 'Bwindi is just the beginning. Discover Murchison Falls, the chimp forests of Kibale, the crater lakes of Fort Portal, Queen Elizabeth NP, and the islands of Lake Victoria.',
    body: `Uganda is far more than its famous mountain gorillas. Called the "Pearl of Africa" by Winston Churchill, the country packs extraordinary biodiversity, landscapes, and cultures into a compact landmass. Here are five destinations that should be on every Uganda itinerary.

## 1. Murchison Falls — The World's Mightiest Waterfall

The entire force of the River Nile is squeezed through a seven-metre gorge with explosive power at Murchison Falls. A boat cruise from Paraa Lodge to the base of the falls is Uganda's most iconic experience — watch Nile crocodiles, hippos, and hundreds of bird species from the water's edge.

## 2. Kibale Forest — The Primate Capital of the World

Kibale National Park has the highest density of primates in Africa. It is the best place on earth to track **chimpanzees** — over 1,500 habituated individuals live here. The forest also hosts 12 other primate species including red colobus and l'Hoest's monkey.

## 3. Queen Elizabeth National Park — The Tree-Climbing Lions

The Ishasha sector of Queen Elizabeth NP is the only place in East Africa where lions routinely climb fig trees. The park's Kazinga Channel boat cruise is also praised alongside Murchison's — hippo pods nearly block the waterway.

## 4. Fort Portal & The Crater Lakes

Fort Portal is Uganda's most charming town, ringed by over 30 explosion craters filled with emerald-green lakes. The nearby Rwenzori Mountains — the "Mountains of the Moon" — offer some of Africa's most dramatic highland trekking.

## 5. Lake Victoria & The Ssese Islands

Africa's largest lake contains over 84 islands. The Ssese archipelago offers deserted white-sand beaches, forest walks with colobus monkeys, and some of the best freshwater fishing in the world.`,
    author: 'Michael K.',
    category: 'Destination Spotlight',
    image: 'https://images.unsplash.com/photo-1577744226961-fb38df6440fd?auto=format&fit=crop&w=800&q=80',
    country: 'Uganda',
    published: true
  },
  {
    title: 'Accessible Safaris: How We Make Africa Inclusive for Every Traveller',
    slug: 'accessible-safaris-inclusive-africa',
    excerpt: 'From wheelchair-adapted game vehicles to sensory-friendly itineraries — a deep dive into how AfriVibe designs safaris for travellers with mobility, sensory, and cognitive differences.',
    body: `At AfriVibe Safaris, inclusivity is not an afterthought — it is the foundation of what we do. We believe that a life-changing African safari should be available to every human being, regardless of physical or cognitive ability.

## Wheelchair-Adapted Game Vehicles

All of our Inclusive safari vehicles are custom-fitted with:
- **Hydraulic or ramp-assisted boarding** for ease of entry
- **Swiveling, secured seats** at roof-hatch height for unobstructed views
- **Reinforced restraints** for rough terrain
- **Medical-grade storage** for equipment and medication

## Sensory-Friendly Itineraries

For travellers on the autism spectrum or with sensory sensitivities, we design itineraries that:
- Avoid peak-season crowds and unpredictable timing
- Include quiet private game drives with longer, calmer stops
- Allow for pre-visit virtual reality familiarisation of the destination
- Build in ample downtime between activities

## Hearing & Vision Impairment Services

- **BSL/ASL-fluent guides** available on request
- **Tactile wildlife experiences** — feel real casts of animal footprints, horns, and hides
- **Audio-described game drives** with enhanced narrative commentary

## Safari Therapy Programme

Our certified therapy guides partner with occupational therapists and psychologists to design healing experiences for individuals recovering from trauma, PTSD, or chronic mental health conditions. The immersive calm of the African bush has measurable therapeutic outcomes.

## Our Inclusive Destinations

The best parks for accessibility include:
- **Nairobi National Park, Kenya** — paved viewing circuits
- **Amboseli, Kenya** — flat terrain, wide tracks
- **Murchison Falls, Uganda** — accessible boat cruises
- **Queen Elizabeth NP, Uganda** — Kazinga Channel boat safaris`,
    author: 'Sarah Jenkins',
    category: 'Inclusive Travel',
    image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800&q=80',
    published: true
  },
  {
    title: 'Wildlife Spotlight: The African Elephant — Gentle Giants in Crisis',
    slug: 'wildlife-spotlight-african-elephant',
    excerpt: 'Meet the world\'s largest land animal. From Amboseli\'s matriarchs to Chobe\'s river-crossing herds — learn about elephant intelligence, culture, and the conservation challenges they face.',
    body: `The African elephant is the world's largest land animal — an adult bull can stand 3.3 metres at the shoulder and weighs up to 6 tonnes. Despite their size, they are among the most emotionally complex and intelligent creatures alive.

## Social Structure

Elephant herds are matriarchal societies led by the oldest and most experienced female. Her knowledge of seasonal water sources, safe migration routes, and threat identification is essential to the herd's survival. Young bulls are gradually ousted from the natal herd between ages 10–15 and form loose bachelor groups.

## Intelligence & Emotion

Elephants are one of only a handful of species that pass the **mirror self-recognition test** — evidence of self-awareness. They demonstrate grief behaviours at the bones of their dead, exhibit complex play and humour, and form multi-generational bonds that last decades.

## Where to See Them in the Wild

- **Amboseli, Kenya**: Africa's best elephant viewing. Enormous herds with Kilimanjaro as a backdrop.
- **Chobe, Botswana**: The world's largest elephant population — over 50,000 individuals. Spectacular river crossings.
- **Tarangire, Tanzania**: Giant old bulls and a high density of family herds.
- **Bwindi Buffer Zone, Uganda**: Forest elephants in the mist — a completely different experience.
- **Nyungwe, Rwanda**: Forest elephant tracks frequently found on trail walks.

## Conservation Threats

African elephant populations have declined from 10 million in 1900 to approximately **415,000 today**. Primary threats include:
- **Ivory poaching**: Despite the 1989 CITES ban, illegal trade persists
- **Habitat loss**: Human settlement fragments migration corridors
- **Human-wildlife conflict**: A growing challenge as farms expand into traditional elephant range

## How AfriVibe Contributes

A portion of every safari we book is directed to the **Amboseli Elephant Research Project** — the world's longest-running elephant study. We also support anti-poaching ranger training in all five of our operating countries.`,
    author: 'Jane G.',
    category: 'Wildlife & Conservation',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80',
    published: true
  },
  {
    title: 'Botswana\'s Okavango Delta: The Safari Destination That Changes Everything',
    slug: 'okavango-delta-botswana-guide',
    excerpt: 'A UNESCO World Heritage Site. A miracle of hydrology. The Okavango Delta floods the Kalahari Desert every year, creating Africa\'s most unique and exclusive safari environment.',
    body: `The Okavango Delta is one of the world's great natural wonders. Every year, floodwaters originating 1,000 kilometres away in Angola's highlands flow into the heart of the Kalahari Desert — and instead of reaching the sea, simply fan out into a vast inland inland labyrinth of channels, islands, and lagoons to sustain an extraordinary concentration of wildlife.

## The Mokoro Experience

A mokoro is a traditional dugout canoe. Poled silently through papyrus-lined waterways by expert Batswana guides, a mokoro safari is unlike any game drive. You glide at water-level, eye-to-eye with hippos, beneath nesting herons, through fleets of water lilies.

## Key Safari Areas

- **Moremi Game Reserve**: The only formally protected area within the Delta. Outstanding all-season wildlife viewing.
- **Chief's Island**: Deep inside Moremi. The concentration of predators — lion, leopard, wild dog — is exceptional.
- **Khwai Community Concession**: Multiple ecosystems. Renowned for wild dog dens and excellent elephant viewing.
- **Gomoti Private Reserve**: Water-based safaris combined with walking and night drives.

## Getting There

The Delta is only accessible by light aircraft — all camps have their own airstrips. This exclusivity keeps visitor numbers low and wildlife encounters unpressured. Charter flights from Maun are the standard gateway.

## Wildlife Calendar

- **May–August (Winter/Flood Season)**: Water is high. Mokoro safaris and boat trips dominate. Wildlife concentrates around permanent water.
- **September–October (Dry Season)**: Water recedes. Walking safaris possible. Large mixed herds gather.
- **November–April (Summer/Green Season)**: Bird breeding season. Baby animals abundant. Lower rates.

## Conservation & Community

Botswana operates a **low-volume, high-value** tourism model — strictly limited visitor numbers ensure ecological integrity. A significant portion of conservation fees flows directly to local community trusts in the Ngamiland District.`,
    author: 'David L.',
    category: 'Destination Spotlight',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800&q=80',
    country: 'Botswana',
    published: true
  },
  {
    title: 'Tanzania\'s Serengeti: Planning the Perfect Safari ',
    slug: 'serengeti-safari-planning-guide',
    excerpt: 'From the Central Serengeti\'s year-round big cats to the Western Corridor river crossings and the remote Loliondo concessions — the definitive planning guide for Tanzania\'s crown jewel.',
    body: `The Serengeti is the oldest and most studied ecosystem in Africa. Its 30,000 square kilometres of open savannah, kopjes, and seasonal wetlands support the most intact predator-prey dynamic on earth. Planning correctly unlocks a completely different experience depending on which sector you visit and when.

## Understanding the Regions

### Central Serengeti (Seronera)
The most accessible and most visited area. Seronera Valley is famous for its resident **leopards** — often spotted in sausage trees. Large lion prides patrol the kopjes year-round. Suitable for all budgets including mid-range camps.

### Western Corridor (Grumeti)
A more exclusive zone. The Grumeti River is the first crisis point for northbound wildebeest — massive crocodiles and June/July crossings. Private conservancies like Singita Grumeti offer unmatched privacy.

### Northern Serengeti (Kogatende)
The main Mara River crossing zone for the northward migration (August–October). A remote and dramatic setting with few visitors relative to the Mara side of the border.

### Southern Serengeti (Ndutu)
The calving grounds. January to March — roughly 8,000 wildebeest calves are born *every day*. This attracts the highest density of predators in the ecosystem. Extraordinary for photography.

## Ngorongoro Crater

An extinct volcanic caldera 19 kilometres in diameter and 600 metres deep. The crater floor hosts 25,000 animals — one of the densest wildlife concentrations on earth. Permanent water means no migration; the same animals stay inside all year. Key species: black rhino, hippo, flamingo (Lake Magadi), and the Ngorongoro lion prides.

## Essential Logistics

- **International arrival**: Kilimanjaro International Airport (JRO) or Julius Nyerere (DAR)
- **Internal transfers**: Light aircraft to Seronera (SIA) or Kogatende (GTZ) airstrips
- **Currency**: USD cash widely accepted
- **Visas**: Available on arrival or via the Tanzania e-visa portal`,
    author: 'AfriVibe Team',
    category: 'Safari Guide',
    image: 'https://images.unsplash.com/photo-1447797709393-85d5736a40f4?auto=format&fit=crop&w=800&q=80',
    country: 'Tanzania',
    published: true
  },
  {
    title: 'Rwanda Rising: Why the Land of a Thousand Hills Is Africa\'s Most Inspiring Destination',
    slug: 'rwanda-land-of-thousand-hills-guide',
    excerpt: 'From the gorillas of Volcanoes National Park to the vibrant streets of Kigali, the conservation miracle of Nyungwe, and the tranquil shores of Lake Kivu — Rwanda is extraordinary.',
    body: `Rwanda is Africa's most remarkable comeback story. Thirty years after an unimaginable tragedy, this small landlocked nation has rebuilt itself into one of the continent's most respected and visited destinations — clean, safe, forested, and genuinely proud.

## Why Rwanda Works

Rwanda operates on a **premium conservation model**. Gorilla permits ($1,500 USD each) generate revenue that goes directly into park management and community development. The result: gorilla populations have increased from 620 to over 1,000 in the past decade. Deforestation has reversed. Local communities have a financial stake in conservation.

## Volcanoes National Park

Home to five of the eight Virunga volcanoes and a significant portion of the world's mountain gorilla population. Trekking groups are limited to eight people, with a one-hour time limit in the gorilla's presence. The experience is irreplaceable.

- **Habituated families**: Susa A, Kwitonda, Umubano, Hirwa groups are among the most visited.
- **Golden monkeys**: Found only in the bamboo zones of the Virungas.
- **Dian Fossey Gorilla Fund headquarters**: Based in Musanze, open for guided tours.

## Kigali — Africa's Most Liveable Capital

Kigali is consistently ranked Africa's cleanest and safest city. The **Kigali Genocide Memorial** is a sobering and essential visit. The Kimironko Market and Inema Arts Centre showcase Rwanda's creative renaissance. The restaurant scene — from Rwandan brochettes to contemporary fine dining — punches well above its weight.

## Nyungwe National Park

Africa's largest surviving montane rainforest. A 60-kilometre **canopy walkway** sways above the ancient treetops. The park harbours 13 primate species including chimpanzees, colobus monkeys, and L'Hoest's monkeys, plus 310 bird species.

## Lake Kivu

The sixth largest lake in Africa and one of only three volcanic lakes in the world that contain dissolved carbon dioxide and methane at depth. On the surface, it is simply beautiful — ringed by terraced hills, small fishing villages, and upmarket lakeside lodges.`,
    author: 'AfriVibe Team',
    category: 'Destination Spotlight',
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&w=800&q=80',
    country: 'Rwanda',
    published: true
  },
  {
    title: 'Travel Tips: How to Plan Your First African Safari (From Scratch)',
    slug: 'how-to-plan-first-african-safari',
    excerpt: 'Choosing a country, picking the right time of year, understanding pricing tiers, packing the right gear — we break down everything a first-time safari traveller needs to know.',
    body: `Planning your first African safari is one of the most exciting things you will ever do. It is also mildly overwhelming. This guide covers everything a first-timer needs to make confident, informed decisions.

## Step 1: Choose Your Country

Each of our five destinations offers a different experience:

| Country | Best For | Signature Experience |
|---|---|---|
| **Kenya** | Classic safari, migration | Maasai Mara wildebeest crossing |
| **Tanzania** | Diversity + Serengeti | Ngorongoro Crater + Zanzibar |
| **Uganda** | Gorillas + primates | Mountain gorilla trekking |
| **Rwanda** | Gorillas + culture | Volcanoes NP + Kigali |
| **Botswana** | Exclusivity + wilderness | Okavango Delta mokoro |

## Step 2: Pick Your Season

The dry season (June–October) is the classic safari window across East and Southern Africa. Wildlife congregates around water, vegetation is low, and animals are easier to spot. The green season (November–May) brings lower prices, baby animals, and lush landscapes — but higher rainfall and sometimes muddy roads.

## Step 3: Understand Pricing Tiers

At AfriVibe we operate three pricing tiers:
- **Non-Resident** (USD): International visitors
- **Resident** (local currency): Foreigners with valid work/residence permits
- **Citizen** (local currency, discounted): East African community passport holders

## Step 4: Essential Packing List

- Neutral colours (khaki, olive, beige) — avoid bright white or blue
- Layers: mornings and evenings in the bush are cold
- Binoculars (8x42 is the gold standard)
- Sun protection: hat, SPF 50 sunscreen, UV sunglasses
- Camera with telephoto lens (minimum 300mm)
- European/universal travel adapter
- Yellow fever certificate (required for Uganda and Rwanda)
- Malaria prophylaxis (consult your GP 6 weeks before travel)

## Step 5: Request a Quote

The best safaris are custom designed. Our specialists will match your travel dates, budget, interests, and group size to put together a proposal that fits perfectly. It costs nothing and takes 24 hours.`,
    author: 'AfriVibe Team',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    published: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    // ==== PACKAGES: full replace (content owned by admin) ====
    await Package.deleteMany();
    await Package.insertMany(packages);
    console.log(`✅ Inserted ${packages.length} packages`);

    // ==== ARTICLES: full replace (content owned by admin) ====
    await Article.deleteMany();
    await Article.insertMany(articles);
    console.log(`✅ Inserted ${articles.length} articles`);

    // ==== ADMIN USER: upsert (never destroy existing admin) ====
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      await Admin.create({
        username: 'admin',
        password: process.env.ADMIN_PASSWORD || 'AfriVibe@2026!'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists — skipping');
    }

    // ==== QUOTES & TESTIMONIALS: NOT touched (user-generated data) ====
    console.log('ℹ️  Quotes and Testimonials preserved (user-generated data)');

    console.log('\n🎉 Database seeding complete');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
