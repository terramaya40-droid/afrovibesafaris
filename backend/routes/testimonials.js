import express from 'express';
import Testimonial from '../models/Testimonial.js';
import verifyToken from '../middleware/auth.js';
import { sendTestimonialNotification } from '../utils/emailService.js';

const router = express.Router();

// Get approved testimonials (Public)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const testimonials = await Testimonial.find({ status: 'Approved' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Testimonial.countDocuments({ status: 'Approved' });
    
    res.json({
      testimonials,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalCount: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
});

// Get all testimonials (Admin Moderation - Protected)
router.get('/admin', verifyToken, async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all testimonials', error: error.message });
  }
});

// Submit a new testimonial
router.post('/', async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const saved = await newTestimonial.save();

    // Send email notification to admin asynchronously
    sendTestimonialNotification(saved).catch(err => console.error("Failed to send testimonial email", err));

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting testimonial', error: error.message });
  }
});

// Admin update status (Approve/Reject - Protected)
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating testimonial status', error: error.message });
  }
});

// Admin update full review content (Protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating testimonial', error: error.message });
  }
});

export default router;
