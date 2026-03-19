import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
