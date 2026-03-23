import express from 'express';
const router = express.Router();
import Destination from '../models/Destination.js';
import verifyToken from '../middleware/auth.js';

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

// Admin: Create 
router.post('/', verifyToken, async (req, res) => {
  try {
    const { id, name, subtitle, description, image } = req.body;
    const destination = new Destination({ id, name, subtitle, description, image });
    const saved = await destination.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: Update
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Destination not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
