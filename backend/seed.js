import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from './models/Package.js';
import Article from './models/Article.js';
import Destination from './models/Destination.js';
import Gallery from './models/Gallery.js';
import Admin from './models/Admin.js';
import { packages, articles, destinations, gallery } from './seedData.js';

dotenv.config({ path: './backend/.env' });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/afrovibesafaris';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding');

    // Packages — replace
    await Package.deleteMany();
    await Package.insertMany(packages);
    console.log(`✅ Seeded ${packages.length} packages`);

    // Articles — replace
    await Article.deleteMany();
    await Article.insertMany(articles);
    console.log(`✅ Seeded ${articles.length} articles`);

    // Destinations — replace
    if (destinations) {
      await Destination.deleteMany();
      await Destination.insertMany(destinations);
      console.log(`✅ Seeded ${destinations.length} destinations`);
    }

    // Gallery — replace
    if (gallery) {
      await Gallery.deleteMany();
      await Gallery.insertMany(gallery);
      console.log(`✅ Seeded ${gallery.length} gallery items`);
    }

    // Admin — upsert
    const exists = await Admin.findOne({ username: 'admin' });
    if (!exists) {
      await Admin.create({
        username: 'admin',
        password: process.env.ADMIN_PASSWORD || 'AfriVibe@2026!'
      });
      console.log('✅ Admin user created');
    }

    console.log('\n🎉 Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
