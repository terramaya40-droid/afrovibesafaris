import express from 'express';
const router = express.Router();
import Destination from '../models/Destination.js';

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single destination by id string (e.g. 'kenya')
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findOne({ id: req.params.id });
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Create or Update
router.post('/', async (req, res) => {
  try {
    const { id, name, subtitle, description, image } = req.body;
    const destination = await Destination.findOneAndUpdate(
      { id },
      { name, subtitle, description, image },
      { upsert: true, new: true }
    );
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
