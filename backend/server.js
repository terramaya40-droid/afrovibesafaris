import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import packagesRouter from './routes/packages.js';
import quotesRouter from './routes/quotes.js';
import testimonialsRouter from './routes/testimonials.js';
import articlesRouter from './routes/articles.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AfriVibe Backend is running' });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/packages', packagesRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/articles', articlesRouter);

import Package from './models/Package.js';
import Article from './models/Article.js';
import Admin from './models/Admin.js';

// One-time seed endpoint — hit /api/seed once to populate the database
app.get('/api/seed', async (req, res) => {
  try {
    // Dynamic import to avoid loading seed data on every request
    const seedModule = await import('./seedData.js');
    const packages = seedModule.packages;
    const articles = seedModule.articles;

    // Packages — replace (operator-owned content)
    await Package.deleteMany();
    await Package.insertMany(packages);

    // Articles — replace (operator-owned content)
    await Article.deleteMany();
    await Article.insertMany(articles);

    // Admin — upsert only (never destroy existing)
    const exists = await Admin.findOne({ username: 'admin' });
    if (!exists) {
      await Admin.create({
        username: 'admin',
        password: process.env.ADMIN_PASSWORD || 'AfriVibe@2026!'
      });
    }

    res.json({
      status: 'ok',
      message: `Seeded ${packages.length} packages and ${articles.length} articles.`
    });
  } catch (error) {
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
