import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from './models/Package.js';
import Quote from './models/Quote.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

const mockPackages = [
  {
    title: 'Luxury Classic Safari',
    country: 'Kenya & Tanzania',
    description: '8 Nights: Masai Mara • Serengeti • Ngorongoro. Premium lodges and expert guides.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 124,
    packageType: 'Luxury',
    pricing: { nonRes: '$6,800', res: 'KES 250,000', cit: 'KES 180,000' }
  },
  {
    title: 'Wildlife Explorer',
    country: 'Kenya',
    description: '7 Nights: Amboseli • Masai Mara. Perfect balance of comfort and adventure.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 89,
    packageType: 'Family',
    pricing: { nonRes: '$3,200', res: 'KES 120,000', cit: 'KES 90,000' }
  },
  {
    title: 'Gorilla Trekking Adventure',
    country: 'Uganda',
    description: '6 Nights: Bwindi Impenetrable Forest. Thrilling mountain gorilla encounters.',
    image: 'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 56,
    packageType: 'Adventure',
    pricing: { nonRes: '$2,800', res: 'UGX 3,500,000', cit: 'UGX 2,000,000' }
  }
];

const mockQuotes = [
  { name: 'John Smith', email: 'john@example.com', phone: '+1234567890', travelers: 2, dates: 'Aug 2026', destination: 'Kenya (Maasai Mara)', safariType: 'Classical', status: 'Pending' },
  { name: 'The Patel Family', email: 'patel@example.com', phone: '+1987654321', travelers: 4, dates: 'Dec 2025', destination: 'Tanzania & Rwanda', safariType: 'Family', status: 'Quote Sent' }
];

const mockTestimonials = [
  { userName: 'Sarah W.', packageTitle: 'Luxury Classic Safari', rating: 4, reviewText: 'Incredible wildlife viewing...', status: 'Pending Approval' },
  { userName: 'Marcus L.', packageTitle: 'Wildlife Explorer', rating: 5, reviewText: 'Top notch service from AfriVibe...', status: 'Approved' }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding script');

    await Package.deleteMany();
    await Quote.deleteMany();
    await Testimonial.deleteMany();
    console.log('Cleared existing data');

    const createdPackages = await Package.insertMany(mockPackages);
    console.log(`Inserted ${createdPackages.length} packages`);

    await Quote.insertMany(mockQuotes);
    console.log('Inserted quotes');

    await Testimonial.insertMany(mockTestimonials);
    console.log('Inserted testimonials');

    console.log('Database seeding complete');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
