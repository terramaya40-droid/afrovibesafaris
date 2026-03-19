import express from 'express';
import Quote from '../models/Quote.js';

const router = express.Router();

// Get all quote requests (Admin)
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find({}).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
});

// Submit a new quote request
router.post('/', async (req, res) => {
  try {
    const newQuote = new Quote(req.body);
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting quote request', error: error.message });
  }
});

// Update quote status (Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updatedQuote);
  } catch (error) {
    res.status(400).json({ message: 'Error updating quote status', error: error.message });
  }
});

export default router;
