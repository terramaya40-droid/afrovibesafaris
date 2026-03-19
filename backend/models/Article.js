import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true, default: 'AfriVibe Team' },
  category: {
    type: String,
    enum: ['Travel Tips', 'Destination Spotlight', 'Wildlife & Conservation', 'Inclusive Travel', 'Safari Guide'],
    required: true
  },
  image: { type: String, required: true },
  country: { type: String }, // optional — relates article to a specific country page
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);
