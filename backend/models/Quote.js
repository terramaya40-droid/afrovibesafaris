import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  travelers: { type: Number, required: true },
  dates: { type: String, required: true },
  destination: { type: String, required: true },
  safariType: { type: String, required: true },
  specialNotes: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Quote Sent', 'Booked', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('Quote', quoteSchema);
