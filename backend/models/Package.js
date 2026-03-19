import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  packageType: { type: String, required: true },
  category: { type: String, default: 'Safari' },
  duration: { type: String, default: '5 Nights' },
  highlights: [{ type: String }],
  pricing: {
    nonRes: { type: String, required: true },
    res: { type: String, required: true },
    cit: { type: String, required: true }
  }
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
