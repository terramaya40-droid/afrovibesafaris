import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({});
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error: error.message });
  }
});

// Get packages by country
router.get('/:country', async (req, res) => {
  try {
    // Basic regex match for countries (e.g. Kenya matches "Kenya & Tanzania")
    const packages = await Package.find({ country: new RegExp(req.params.country, 'i') });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country packages', error: error.message });
  }
});

export default router;
