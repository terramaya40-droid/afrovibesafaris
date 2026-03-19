import express from 'express';
import Testimonial from '../models/Testimonial.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Get approved testimonials (Public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.json(testimonials);
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

export default router;
