import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  travelers: { type: Number, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  destination: { type: String, required: true },
  safariType: { type: String, required: true },
  pricingTarget: { type: String, required: true },
  nationality: { type: String },
  numTravelers: { type: Number },
  specialRequests: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Quote Sent', 'Booked', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('Quote', quoteSchema);
