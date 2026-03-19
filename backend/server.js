import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import packagesRouter from './routes/packages.js';
import quotesRouter from './routes/quotes.js';
import testimonialsRouter from './routes/testimonials.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
// Basic Route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AfriVibe Backend is running' });
});

app.use('/api/packages', packagesRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/testimonials', testimonialsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
