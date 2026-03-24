import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userLocation: { type: String, required: true, default: 'Global' },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  packageTitle: { type: String }, // For easier display without population if needed
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  sharedPhotos: [{ type: String }],
  status: { 
    type: String, 
    enum: ['Pending Approval', 'Approved', 'Rejected'],
    default: 'Pending Approval'
  }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
